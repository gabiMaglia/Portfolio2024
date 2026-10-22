import test from 'node:test';
import assert from 'node:assert/strict';
import { copyText } from '../lib/clipboard.mjs';

test('copyText: escribe y devuelve true', async () => {
  let got = null;
  const nav = { clipboard: { writeText: async (t) => { got = t; } } };
  assert.equal(await copyText('a@b.c', nav), true);
  assert.equal(got, 'a@b.c');
});

test('copyText: sin Clipboard API (contexto inseguro) devuelve false sin lanzar', async () => {
  assert.equal(await copyText('x', {}), false);
  assert.equal(await copyText('x', undefined), false);
});

test('copyText: si el navegador rechaza (permiso/activación) devuelve false', async () => {
  const nav = { clipboard: { writeText: async () => { throw new DOMException('no', 'NotAllowedError'); } } };
  assert.equal(await copyText('x', nav), false);
});
