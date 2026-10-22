import test from 'node:test';
import assert from 'node:assert/strict';
import { syncHtmlLang } from '../lib/html-lang.mjs';

const doc = (lang) => ({ documentElement: { lang } });

test('actualiza lang cuando cambia el locale (soft-nav es->en)', () => {
  const d = doc('es');
  syncHtmlLang(d, 'en');
  assert.equal(d.documentElement.lang, 'en');
});
test('no reescribe si ya coincide', () => {
  let writes = 0;
  const d = { documentElement: { get lang() { return 'es'; }, set lang(_) { writes++; } } };
  syncHtmlLang(d, 'es');
  assert.equal(writes, 0);
});
test('sin document (SSR) no lanza', () => {
  assert.doesNotThrow(() => syncHtmlLang(null, 'en'));
});
