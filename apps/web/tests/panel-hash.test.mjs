import test from 'node:test';
import assert from 'node:assert/strict';
import { PANEL_IDS, panelIndexFromHash } from '../lib/panel-hash.mjs';

test('PANEL_IDS: los 5 paneles en orden', () => {
  assert.deepEqual(PANEL_IDS, ['inicio', 'sobre', 'proyectos', 'experiencia', 'contacto']);
});

test('panelIndexFromHash: hash válido -> índice', () => {
  assert.equal(panelIndexFromHash('#sobre'), 1);
  assert.equal(panelIndexFromHash('contacto'), 4);
  assert.equal(panelIndexFromHash('#inicio'), 0);
});

test('panelIndexFromHash: vacío o desconocido -> -1 (no mueve nada)', () => {
  assert.equal(panelIndexFromHash(''), -1);
  assert.equal(panelIndexFromHash('#'), -1);
  assert.equal(panelIndexFromHash('#otra-cosa'), -1);
  assert.equal(panelIndexFromHash(undefined), -1);
});
