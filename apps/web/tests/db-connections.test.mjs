// D-19: guardas contra el agotamiento de conexiones de la base de producción.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (rel) => readFileSync(new URL(rel, import.meta.url), 'utf8');

test('las cinco consultas pasan por unstable_cache con revalidate', () => {
  const src = read('../lib/queries.js');
  assert.match(src, /import \{ unstable_cache \} from 'next\/cache'/);
  assert.match(src, /revalidate: REVALIDATE/);
  for (const fn of ['fetchExperiences', 'fetchProyects', 'fetchSkills', 'fetchSocials', 'fetchUserPhrases']) {
    assert.match(src, new RegExp(`export const ${fn} = cached\\(`), `${fn} sin caché`);
  }
});

test('el cliente de Postgres suelta rápido las conexiones ociosas', () => {
  const src = read('../../../packages/db/src/client.ts');
  assert.match(src, /max: 1,/);
  const idle = Number(src.match(/idle_timeout: (\d+)/)?.[1]);
  assert.ok(idle > 0 && idle <= 10, `idle_timeout=${idle}`);
  assert.match(src, /max_lifetime:/);
});
