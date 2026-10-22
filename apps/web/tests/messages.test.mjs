import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = (l) => JSON.parse(readFileSync(join(root, `messages/${l}.json`), 'utf8'));
const keys = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? keys(v, `${p}${k}.`) : [`${p}${k}`]));

test('es y en tienen exactamente las mismas claves', () => {
  assert.deepEqual(keys(load('es')).sort(), keys(load('en')).sort());
});

test('T-011/013: claves nuevas presentes', () => {
  const k = new Set(keys(load('es')));
  for (const key of [
    'Lang.label', 'Lang.switchTo', 'Lang.names.es', 'Lang.names.en', 'A11y.skip',
    'Masthead.edition', 'Masthead.localTime',
    'Contact.copyEmail', 'Contact.copied', 'Contact.copyHint', 'Experience.present',
    'Work.thumbAlt', 'Work.thumbAltNoTech', 'Navbar.label',
  ]) assert.ok(k.has(key), key);
});
