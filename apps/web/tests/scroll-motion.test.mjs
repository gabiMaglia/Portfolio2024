import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import {
  chromeSegments, revealOpacity, REVEAL_FAR, REVEAL_STEP, REVEAL_SPAN, snapTargetIdx, shouldSkipSnap, isSingleTouch, UI_FOR_SURFACE, SNAP_TTL_MS,
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

// Reveal guiado por posición (ADR-006): o = clamp((F - k*n - max(d,0)) / S, 0, 1)
test('revealOpacity: a d=.5 todo .reveal vale 1 (criterio: visible al llegar a vw/2)', () => {
  for (let n = 0; n <= 4; n += 1) assert.equal(revealOpacity(0.5, n), 1);
});

test('revealOpacity: panel centrado o que sale/entra desde la izquierda queda visible', () => {
  for (let n = 0; n <= 4; n += 1) for (const d of [0, -0.3, -1, -4]) assert.equal(revealOpacity(d, n), 1);
});

test('revealOpacity: panel a un viewport de distancia (d=1) está oculto', () => {
  for (let n = 0; n <= 4; n += 1) assert.equal(revealOpacity(1, n), 0);
});

test('revealOpacity: monótona no creciente en d y no creciente en n', () => {
  for (let n = 0; n <= 4; n += 1) {
    let prev = 2;
    for (let d = -1; d <= 1.5; d += 0.01) {
      const o = revealOpacity(d, n);
      assert.ok(o <= prev + 1e-12, `d=${d} n=${n}`);
      assert.ok(o >= 0 && o <= 1);
      prev = o;
    }
  }
  for (let d = 0; d <= 1; d += 0.05) for (let n = 0; n < 4; n += 1) assert.ok(revealOpacity(d, n + 1) <= revealOpacity(d, n) + 1e-12);
});

test('revealOpacity: el stagger escalona (n=4 arranca después y llega a 1 en d=.55)', () => {
  assert.ok(revealOpacity(0.9, 0) > 0 && revealOpacity(0.9, 4) === 0);
  assert.ok(revealOpacity(0.55, 4) >= 0.9999);
});

test('ADR-006: constantes F/k/S del CSS (--rv-far/--rv-step/--rv-span) == módulo', () => {
  const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'app/globals.css'), 'utf8');
  const get = (name) => Number(new RegExp(`${name}\\s*:\\s*([\\d.]+)`).exec(css)?.[1]);
  assert.equal(get('--rv-far'), REVEAL_FAR);
  assert.equal(get('--rv-step'), REVEAL_STEP);
  assert.equal(get('--rv-span'), REVEAL_SPAN);
});

test('2c: Home/End hacen preventDefault y usan scrollTo con scrollBehavior (mismo camino que la nav)', () => {
  const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'app/components/portfolio-shell.jsx'), 'utf8');
  for (const [key, top] of [['Home', '0'], ['End', 'maxScroll']]) {
    const m = new RegExp(`e\\.key === "${key}"\\) \\{([^}]*)\\}`).exec(src);
    assert.ok(m, `rama ${key}`);
    assert.match(m[1], /e\.preventDefault\(\)/, `${key} sin preventDefault`);
    assert.match(m[1], new RegExp(`scrollTo\\(\\{ top: ${top}, behavior`), `${key} sin scrollTo con behavior`);
  }
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
