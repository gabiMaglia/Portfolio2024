import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import vm from 'node:vm';
import { FONT_GATE_SCRIPT, FONT_GATE_TIMEOUT_MS } from '../lib/font-gate.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

const run = (fonts) => {
  const attrs = new Map();
  const timers = [];
  const doc = {
    documentElement: { setAttribute: (k, v) => attrs.set(k, v), removeAttribute: (k) => attrs.delete(k) },
    fonts,
    readyState: 'loading',
  };
  const listeners = {};
  const win = { addEventListener: (ev, fn) => { listeners[ev] = fn; } };
  vm.runInNewContext(FONT_GATE_SCRIPT, { document: doc, window: win, setTimeout: (fn, ms) => timers.push({ fn, ms }) });
  return { attrs, timers, fire: (ev) => listeners[ev]?.() };
};

test('M1: marca pending y lo libera cuando las fuentes están listas', async () => {
  let resolve;
  const ready = new Promise((r) => { resolve = r; });
  const { attrs, fire } = run({ ready });
  assert.equal(attrs.get('data-fonts'), 'pending');
  resolve(); // fonts.ready resuelta ANTES de load no libera: todavía no se pidió ninguna fuente
  await ready;
  await Promise.resolve();
  assert.equal(attrs.get('data-fonts'), 'pending');
  fire('load');
  await ready;
  await Promise.resolve();
  assert.equal(attrs.has('data-fonts'), false);
});

test('M1: el timeout de seguridad libera el gate', () => {
  const { attrs, timers } = run({ ready: new Promise(() => {}) });
  assert.equal(timers[0].ms, FONT_GATE_TIMEOUT_MS);
  timers[0].fn();
  assert.equal(attrs.has('data-fonts'), false);
});

test('M1: sin document.fonts no se oculta nada', () => {
  assert.equal(run(undefined).attrs.size, 0);
});

test('M1: el gate solo oculta .ghost (decorativo, aria-hidden); nunca body ni el árbol a11y', () => {
  const css = read('app/globals.css').replace(/\/\*[\s\S]*?\*\//g, '');
  assert.match(css, /html\[data-fonts="pending"\]\s+\.ghost\s*\{[^}]*visibility\s*:\s*hidden/);
  for (const m of css.matchAll(/([^{}]*data-fonts[^{}]*)\{/g)) {
    assert.match(m[1].trim(), /\.ghost$/, `el gate alcanza algo más que .ghost: ${m[1].trim()}`);
  }
  assert.match(read('app/layout.js'), /FONT_GATE_SCRIPT/);
  assert.match(read('app/components/hero-panel.jsx'), /className="ghost" aria-hidden="true"/);
});
