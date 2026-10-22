import test from 'node:test';
import assert from 'node:assert/strict';
import { carouselState, stepTarget, wheelRoute, inHScroll, formatCounter } from '../lib/carousel.mjs';

// 7 cards de 200px (step 200) en una vista de 700px: scrollWidth 1400, max scroll 700
const base = { clientWidth: 700, scrollWidth: 1400, step: 200 };
const at = (scrollLeft) => ({ ...base, scrollLeft });

test('carouselState: inicio => card 0 y prev deshabilitado', () => {
  assert.deepEqual(carouselState(at(0), 7), { index: 0, atStart: true, atEnd: false });
});

test('carouselState: medio => card inicial visible', () => {
  assert.deepEqual(carouselState(at(405), 7), { index: 2, atStart: false, atEnd: false });
});

test('carouselState: final => último card (07/07) y next deshabilitado', () => {
  assert.deepEqual(carouselState(at(700), 7), { index: 6, atStart: false, atEnd: true });
  // tolerancia de subpíxel
  assert.equal(carouselState(at(699.4), 7).atEnd, true);
});

test('carouselState: contenido que no desborda => ambos deshabilitados', () => {
  const s = carouselState({ scrollLeft: 0, clientWidth: 900, scrollWidth: 900, step: 200 }, 3);
  assert.deepEqual(s, { index: 0, atStart: true, atEnd: true });
});

test('carouselState: n=1 y step inválido no explotan', () => {
  assert.equal(carouselState({ ...base, step: 0, scrollLeft: 0 }, 1).index, 0);
});

test('stepTarget: avanza y retrocede 1 card', () => {
  assert.equal(stepTarget(1, at(0)), 200);
  assert.equal(stepTarget(1, at(200)), 400);
  assert.equal(stepTarget(-1, at(400)), 200);
});

test('stepTarget: se clampa en ambos extremos', () => {
  assert.equal(stepTarget(-1, at(0)), 0);
  assert.equal(stepTarget(1, at(600)), 700);
  assert.equal(stepTarget(1, at(700)), 700);
});

test('wheelRoute: vertical sobre el carrusel sigue siendo del shell', () => {
  assert.equal(wheelRoute(0, 120, true), 'default');
  assert.equal(wheelRoute(10, 120, true), 'default');
});

test('wheelRoute: horizontal sobre el carrusel es del carrusel (nativo)', () => {
  assert.equal(wheelRoute(80, 4, true), 'native');
  assert.equal(wheelRoute(-80, 0, true), 'native');
});

test('wheelRoute: horizontal fuera del carrusel mueve el shell', () => {
  assert.equal(wheelRoute(80, 4, false), 'shell-x');
  assert.equal(wheelRoute(0, 0, false), 'default');
});

const el = (over, parent = null, hscroll = false) => ({
  closest: (sel) => {
    assert.equal(sel, '[data-hscroll]');
    return hscroll ? { scrollWidth: over.sw, clientWidth: over.cw } : parent;
  },
});

test('inHScroll: dentro de un scroller con overflow horizontal', () => {
  assert.equal(inHScroll(el({ sw: 1400, cw: 700 }, null, true)), true);
});

test('inHScroll: scroller sin overflow (mobile) o fuera de él => false', () => {
  assert.equal(inHScroll(el({ sw: 390, cw: 390 }, null, true)), false);
  assert.equal(inHScroll(el({}, null, false)), false);
  assert.equal(inHScroll(null), false);
});

test('formatCounter: dos dígitos', () => {
  assert.equal(formatCounter(0, 7), '01/07');
  assert.equal(formatCounter(6, 7), '07/07');
  assert.equal(formatCounter(0, 12), '01/12');
});
