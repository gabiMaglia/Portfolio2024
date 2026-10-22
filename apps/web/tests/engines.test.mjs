// Vercel descontinuó Node 20.x: el deploy falla si engines no fija una versión soportada.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (rel) => readFileSync(new URL(rel, import.meta.url), 'utf8');

test('apps/web/package.json fija engines.node 24.x (el que lee Vercel con Root Directory)', () => {
  const pkg = JSON.parse(read('../package.json'));
  assert.equal(pkg.engines?.node, '24.x');
});

test('package.json raíz fija engines.node 24.x', () => {
  const pkg = JSON.parse(read('../../../package.json'));
  assert.equal(pkg.engines?.node, '24.x');
});

test('.nvmrc apunta a Node 24', () => {
  assert.equal(read('../../../.nvmrc').trim(), '24');
});
