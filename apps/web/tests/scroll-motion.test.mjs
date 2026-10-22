import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import {
  chromeSegments, shouldActivate, snapTargetIdx, shouldSkipSnap, isSingleTouch, UI_FOR_SURFACE, REVEAL_NEAR, SNAP_TTL_MS,
} from '../lib/scroll-motion.mjs';

const VW = 1000;
const N = 5;

test('chromeSegments: elemento entero en un panel -> mismo panel a ambos lados', () => {
  // reposo en panel 1: curX = -VW
  assert.deepEqual(chromeSegments(100, 200, -VW, VW, N), { a: 1, b: 1, cut: 0 });
});

test('chromeSegments: el seam cae dentro del elemento -> corte exacto', () => {
  // track corrido 400px: seam entre panel 0 y 1 en x=600; elemento 550..650
  const s = chromeSegments(550, 650, -400, VW, N);
  assert.deepEqual(s, { a: 0, b: 1, cut: 50 });
});

test('chromeSegments: borde izquierdo exacto sobre el seam no genera corte', () => {
  assert.deepEqual(chromeSegments(600, 700, -400, VW, N), { a: 1, b: 1, cut: 0 });
});

test('chromeSegments: se clampa a [0, N-1]', () => {
  assert.deepEqual(chromeSegments(10, 20, 500, VW, N), { a: 0, b: 0, cut: 0 });
  assert.deepEqual(chromeSegments(10, 20, -(N - 1) * VW - 500, VW, N), { a: 4, b: 4, cut: 0 });
});

test('shouldActivate: vecino cercano activa, lejano no', () => {
  assert.equal(shouldActivate(0), true);
  assert.equal(shouldActivate(REVEAL_NEAR - 0.01), true);
  assert.equal(shouldActivate(-(REVEAL_NEAR - 0.01)), true);
  assert.equal(shouldActivate(1), false);
  assert.equal(shouldActivate(-1.5), false);
});

test('al 50% del recorrido el panel entrante ya está activado', () => {
  assert.equal(shouldActivate(0.5), true);
});

test('snapTargetIdx: sin velocidad redondea, con flick va al siguiente', () => {
  assert.equal(snapTargetIdx(1.4, 0, N), 1);
  assert.equal(snapTargetIdx(1.4, 1, N), 2);
  assert.equal(snapTargetIdx(1.4, -1, N), 1);
  assert.equal(snapTargetIdx(2.0, 1, N), 3);
  assert.equal(snapTargetIdx(4, 1, N), 4);
  assert.equal(snapTargetIdx(0, -1, N), 0);
});

test('D-02: shouldSkipSnap salta solo el mismo destino en vuelo y vence por tiempo', () => {
  const last = { idx: 2, at: 1000 };
  assert.equal(shouldSkipSnap(2, last, 1100), true);
  assert.equal(shouldSkipSnap(3, last, 1100), false);
  assert.equal(shouldSkipSnap(2, null, 1100), false);
  assert.equal(shouldSkipSnap(2, last, 1000 + SNAP_TTL_MS + 1), false);
});

test('D-02: isSingleTouch exige exactamente un dedo', () => {
  assert.equal(isSingleTouch({ length: 1 }), true);
  assert.equal(isSingleTouch({ length: 2 }), false);
  assert.equal(isSingleTouch({ length: 0 }), false);
  assert.equal(isSingleTouch(undefined), false);
});

test('A1: la tinta del chrome nunca es la del fondo de su panel', () => {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'app/components');
  let seen = 0;
  for (const f of readdirSync(root).filter((x) => x.endsWith('-panel.jsx'))) {
    const src = readFileSync(join(root, f), 'utf8');
    const m = /className="panel p-(paper|ink|accent)"[^>]*data-ui="(ink|paper|accent)"/.exec(src);
    assert.ok(m, `${f}: panel sin p-* / data-ui`);
    seen += 1;
    assert.equal(UI_FOR_SURFACE[m[1]], m[2], `${f}: data-ui no coincide con la tinta de la superficie`);
    assert.notEqual(UI_FOR_SURFACE[m[1]], m[1] === 'accent' ? 'accent' : m[1]);
  }
  assert.equal(seen, 5);
});
