import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import { pathToRegexp } from 'next/dist/compiled/path-to-regexp/index.js';
import { APPS, appsRewrites, pickAppsLocale } from '../lib/apps.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => readFileSync(join(root, f), 'utf8');

test('T-017: rewrites de las dos landings hacia sus hosts de origen', () => {
  const r = appsRewrites();
  const dest = (src) => r.find((x) => x.source === src)?.destination;
  assert.equal(dest('/apps/listbuddy/:path*'), 'https://gabimaglia.github.io/listbuddy-site/:path*');
  assert.equal(dest('/apps/netgauge/:path*'), 'https://net-gauge-brown.vercel.app/:path*');
  assert.equal(dest('/apps/listbuddy'), 'https://gabimaglia.github.io/listbuddy-site/');
  assert.equal(dest('/apps/netgauge'), 'https://net-gauge-brown.vercel.app/');
  assert.equal(dest('/apps/listbuddy/:path*/'), 'https://gabimaglia.github.io/listbuddy-site/:path*/');
  assert.equal(dest('/apps/netgauge/:path*/'), 'https://net-gauge-brown.vercel.app/:path*/');
  assert.equal(r.length, 8);
  // la regla con slash va antes que la genérica, si no el slash se pierde
  for (const id of ['listbuddy', 'netgauge']) {
    const i = (src) => r.findIndex((x) => x.source === src);
    assert.ok(i(`/apps/${id}/:path*/`) < i(`/apps/${id}/:path*`), id);
  }
});

test('T-017: next.config registra los rewrites de /apps y no redirige el slash', () => {
  const src = read('next.config.mjs');
  assert.match(src, /skipTrailingSlashRedirect:\s*true/);
  assert.match(src, /appsRewrites/);
  assert.match(src, /rewrites\s*\(/);
});

test('T-017: el índice /apps lista las dos apps con link', () => {
  assert.deepEqual(APPS.map((a) => a.href), ['/apps/listbuddy/', '/apps/netgauge/']);
  for (const a of APPS) assert.ok(a.name && a.id);
});

test('T-017: pickAppsLocale elige por Accept-Language, es por defecto', () => {
  assert.equal(pickAppsLocale('en-US,en;q=0.9'), 'en');
  assert.equal(pickAppsLocale('es-AR,es;q=0.9,en;q=0.8'), 'es');
  assert.equal(pickAppsLocale('fr-FR'), 'es');
  assert.equal(pickAppsLocale(null), 'es');
});

// El matcher se evalúa tal como lo interpreta Next (path-to-regexp), no por regex ad hoc
const matcher = (() => {
  const m = /matcher:\s*(\[[^\]]*\])/.exec(read('middleware.js'))[1];
  return Function(`return ${m}`)();
})();
const intercepted = (path) => matcher.some((p) => pathToRegexp(p).test(path));

test('T-017: el middleware next-intl NO intercepta /apps ni sus subrutas', () => {
  for (const p of ['/apps', '/apps/', '/apps/listbuddy/', '/apps/netgauge/en/', '/apps/listbuddy/legal/']) {
    assert.equal(intercepted(p), false, p);
  }
});

test('T-017: el middleware sigue interceptando el portfolio', () => {
  for (const p of ['/', '/es', '/en', '/es/algo', '/application', '/appsy']) {
    assert.equal(intercepted(p), true, p);
  }
  assert.equal(intercepted('/_next/static/x.js'), false);
  assert.equal(intercepted('/api/phrases'), false);
});

test('T-017: el portfolio enlaza a /apps (es/en) desde Contacto', () => {
  assert.match(read('app/components/contact-panel.jsx'), /href="\/apps"/);
  for (const l of ['es', 'en']) assert.ok(JSON.parse(read(`messages/${l}.json`)).Contact.appsLink);
  for (const l of ['es', 'en']) {
    const a = JSON.parse(read(`messages/${l}.json`)).Apps;
    assert.ok(a.title && a.kicker && a.listbuddy && a.netgauge && a.open);
  }
});

test('T-017: el middleware quita el slash final del portfolio (comportamiento previo)', () => {
  const src = read('middleware.js');
  assert.match(src, /endsWith\('\/'\)/);
  assert.match(src, /NextResponse\.redirect\([^)]*308/);
});
