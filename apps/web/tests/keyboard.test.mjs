import test from 'node:test';
import assert from 'node:assert/strict';
import { isInteractiveTarget } from '../lib/keyboard.mjs';

const el = (tag, closestMap = {}) => ({
  tagName: tag,
  closest: (sel) => (sel.split(',').some((s) => s.trim() === tag.toLowerCase()) ? el(tag) : closestMap.parent ?? null),
});

test('foco en a/button/input es interactivo', () => {
  for (const t of ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT']) assert.equal(isInteractiveTarget(el(t)), true);
});
test('hijo de un link es interactivo', () => {
  assert.equal(isInteractiveTarget(el('SPAN', { parent: el('A') })), true);
});
test('body o null no son interactivos', () => {
  assert.equal(isInteractiveTarget(el('BODY')), false);
  assert.equal(isInteractiveTarget(null), false);
});
