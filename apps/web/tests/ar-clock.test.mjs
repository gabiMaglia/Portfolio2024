import test from 'node:test';
import assert from 'node:assert/strict';
import { AR_TZ, formatArTime, msUntilNextMinute } from '../lib/ar-clock.mjs';

test('la zona es America/Argentina/Buenos_Aires', () => {
  assert.equal(AR_TZ, 'America/Argentina/Buenos_Aires');
});

test('formatArTime: UTC-3 sin importar la zona del runtime', () => {
  assert.equal(formatArTime(new Date('2026-01-15T17:32:00Z')), '14:32');
  assert.equal(formatArTime(new Date('2026-07-01T02:59:00Z')), '23:59');
});

test('formatArTime: medianoche es 00:00, no 24:00', () => {
  assert.equal(formatArTime(new Date('2026-01-15T03:00:00Z')), '00:00');
});

test('msUntilNextMinute: alinea el tick al próximo minuto', () => {
  assert.equal(msUntilNextMinute(new Date('2026-01-15T17:32:15.500Z')), 44500);
  assert.equal(msUntilNextMinute(new Date('2026-01-15T17:32:00.000Z')), 60000);
});
