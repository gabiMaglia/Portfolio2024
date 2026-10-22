import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import { contrastRatio, over, hexToRgb } from '../lib/contrast.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(join(root, 'app/globals.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');

const rootBlock = /:root\s*\{([^}]*)\}/.exec(css)[1];
const hex = (name) => hexToRgb(new RegExp(`--${name}\\s*:\\s*(#[0-9a-fA-F]{6})`).exec(rootBlock)[1]);
const num = (block, name) => Number(new RegExp(`--${name}\\s*:\\s*([\\d.]+)`).exec(block)[1]);

const PAPER = hex('paper');
const INK = hex('ink');
const ACCENT = hex('accent');
const accentBlock = /\.p-accent\s*\{([^}]*)\}/.exec(css)[1];

// superficie -> fondo, tinta, y de dónde sale cada alpha
const SURFACES = {
  paper: { bg: PAPER, fg: INK, o: (n) => num(rootBlock, n) },
  ink: { bg: INK, fg: PAPER, o: (n) => num(rootBlock, n) },
  accent: { bg: ACCENT, fg: INK, o: (n) => (new RegExp(`--${n}\\s*:`).test(accentBlock) ? num(accentBlock, n) : num(rootBlock, n)) },
};

test('roles .t-* (color-mix sobre --fg): >=4.5:1 en las 3 superficies', () => {
  const roles = [];
  for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const t = /color-mix\(in srgb, var\(--fg\) calc\(var\(--(o-[\w]+)\) \* 100%\)/.exec(m[2]);
    if (t) roles.push({ sel: m[1].trim(), token: t[1] });
  }
  assert.ok(roles.length >= 5, `roles con atenuación: ${roles.length}`);
  for (const { sel, token } of roles) {
    for (const [name, s] of Object.entries(SURFACES)) {
      const ratio = contrastRatio(over(s.fg, s.bg, s.o(token)), s.bg);
      assert.ok(ratio >= 4.5, `${sel} sobre ${name}: ${ratio.toFixed(2)}:1 < 4.5`);
    }
  }
});

test('texto con opacity propia: skill-name (chico en mobile) >=4.5 sobre ink; social-name (grande) >=3 sobre accent', () => {
  const ink = SURFACES.ink;
  const skill = contrastRatio(over(ink.fg, ink.bg, ink.o('o-faint')), ink.bg);
  assert.ok(skill >= 4.5, `skill-name: ${skill.toFixed(2)}`);
  const acc = SURFACES.accent;
  const social = contrastRatio(over(acc.fg, acc.bg, acc.o('o-faint')), acc.bg);
  assert.ok(social >= 3, `social-name: ${social.toFixed(2)}`);
});

test('tinta a pleno: sobre accent y sobre paper/ink >=4.5 (base de todo lo demás)', () => {
  for (const s of Object.values(SURFACES)) assert.ok(contrastRatio(s.fg, s.bg) >= 4.5);
});

test('el chrome fijo no se atenúa: nav, contador y hint van a pleno (sobre accent no llegan a AA)', () => {
  for (const sel of ['.nav button', '.counter__of', '.hint', '.counter', '.sig', '.masthead', '.lang-switch__opt']) {
    for (const m of css.matchAll(new RegExp(`(^|[}\\s])${sel.replace('.', '\\.')}\\s*\\{([^}]*)\\}`, 'g'))) {
      assert.doesNotMatch(m[2], /(^|[;\s])opacity\s*:\s*(var\(--o-|0?\.)/, `${sel} atenuado`);
    }
  }
});

test('kicker pleno por default (sin atenuación)', () => {
  const k = /\.t-kicker\s*\{([^}]*)\}/.exec(css)[1];
  assert.doesNotMatch(k, /opacity|color-mix/);
});

test('hover de tarjetas: se atenúa la miniatura, no el texto', () => {
  assert.doesNotMatch(css, /\.proj-card:not\(:hover\)\s*\{[^}]*opacity/);
  assert.match(css, /\.proj-card:not\(:hover\) \.proj-card-thumb\s*\{[^}]*opacity/);
});

test('T-016: thumb sobre accent: relleno >=3:1 con accent (WCAG 1.4.11) y aro de tinta >=3:1 con ambos', () => {
  const thumb = hex('thumb-on-accent');
  assert.ok(contrastRatio(thumb, ACCENT) >= 3, `thumb/accent ${contrastRatio(thumb, ACCENT)}`);
  assert.ok(contrastRatio(INK, ACCENT) >= 3);
  assert.ok(contrastRatio(INK, thumb) >= 3);
});
