import test from 'node:test';
import assert from 'node:assert/strict';
import { otherLocale, isModifiedClick } from '../lib/locale-switch.mjs';

test('otherLocale alterna es<->en y cae a es ante un valor raro', () => {
  assert.equal(otherLocale('es'), 'en');
  assert.equal(otherLocale('en'), 'es');
  assert.equal(otherLocale('fr'), 'en');
});

test('isModifiedClick: ctrl/meta/shift/alt o botón != 0 abren fuera (no optimista)', () => {
  assert.equal(isModifiedClick({ button: 0 }), false);
  assert.equal(isModifiedClick({ button: 0, metaKey: true }), true);
  assert.equal(isModifiedClick({ button: 0, ctrlKey: true }), true);
  assert.equal(isModifiedClick({ button: 0, shiftKey: true }), true);
  assert.equal(isModifiedClick({ button: 0, altKey: true }), true);
  assert.equal(isModifiedClick({ button: 1 }), true);
});
