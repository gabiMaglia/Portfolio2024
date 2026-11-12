import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import {
  SITE_URL, LOCALES, isLocale, languageAlternates, sameAsOf, personJsonLd, serializeJsonLd,
} from '../lib/site.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const msgs = (l) => JSON.parse(read(`messages/${l}.json`));

test('T-028: archivos de metadatos presentes', () => {
  for (const f of [
    'app/robots.js', 'app/sitemap.js', 'app/manifest.js', 'app/icon.png', 'app/apple-icon.png', 'app/favicon.ico',
    'app/[locale]/opengraph-image.jsx', 'app/[locale]/twitter-image.jsx', 'app/llms.txt/route.js',
    'assets/og/archivo-800.ttf', 'assets/og/instrument-serif-italic.ttf', 'assets/og/space-mono-400.ttf',
  ]) assert.ok(existsSync(join(root, f)), f);
});

test('hreflang: cada locale + x-default, URLs absolutas', () => {
  const alt = languageAlternates();
  assert.deepEqual(Object.keys(alt).sort(), [...LOCALES, 'x-default'].sort());
  for (const url of Object.values(alt)) assert.ok(url.startsWith(SITE_URL), url);
  assert.equal(alt.es, `${SITE_URL}/es`);
});

test('isLocale rechaza segmentos con punto (soft-404 de /robots.txt)', () => {
  assert.ok(isLocale('es') && isLocale('en'));
  for (const s of ['robots.txt', 'x.png', 'foo', '']) assert.equal(isLocale(s), false, s);
});

test('[locale]/layout corta con notFound y define generateMetadata', () => {
  const src = read('app/[locale]/layout.js');
  assert.match(src, /if \(!isLocale\(locale\)\) notFound\(\)/);
  assert.match(src, /export function generateMetadata/);
  assert.match(src, /canonical: `\/\$\{locale\}`/);
  assert.match(src, /application\/ld\+json/);
});

test('Meta: título y descripción propios por idioma, largos razonables', () => {
  const es = msgs('es').Meta, en = msgs('en').Meta;
  assert.notEqual(es.title, en.title);
  assert.notEqual(es.description, en.description);
  for (const m of [es, en]) {
    assert.ok(m.title.length <= 60, m.title);
    assert.ok(m.description.length >= 110 && m.description.length <= 160, m.description);
  }
});

test('sameAs sólo con URLs http(s): sin mailto ni vacíos', () => {
  assert.deepEqual(
    sameAsOf([{ url: 'https://github.com/x' }, { url: 'mailto:a@b.c\n' }, { url: null }, { url: ' http://y.z ' }]),
    ['https://github.com/x', 'http://y.z'],
  );
});

test('JSON-LD: Person + WebSite + ProfilePage con proyectos e imágenes absolutas', () => {
  const ld = personJsonLd({
    locale: 'en',
    meta: msgs('en').Meta,
    socials: [{ url: 'https://github.com/gabiMaglia' }, { url: 'mailto:x@y.z' }],
    skills: [{ type: 'hard', name: 'React' }, { type: 'soft', name: 'Teamwork' }],
    projects: [{ title_pro: 'HushSplit', img1_pro: '/work/hushsplit-1.jpg', year_pro: 2026, deployLink_pro: 'https://h.example' }],
  });
  const types = ld['@graph'].map((n) => n['@type']);
  assert.deepEqual(types, ['WebSite', 'Person', 'ProfilePage']);
  const person = ld['@graph'][1];
  assert.deepEqual(person.sameAs, ['https://github.com/gabiMaglia']);
  assert.deepEqual(person.knowsAbout, ['React']);
  const work = ld['@graph'][2].hasPart[0];
  assert.equal(work.image, `${SITE_URL}/work/hushsplit-1.jpg`);
  assert.equal(work.dateCreated, '2026');
});

test('serializeJsonLd no deja cerrar el <script>', () => {
  assert.doesNotMatch(serializeJsonLd({ a: '</script><script>alert(1)</script>' }), /<\/script/i);
});

test('public/ sin assets huérfanos: cada archivo suelto se referencia en el código', () => {
  const sources = ['app', 'lib', 'providers', 'store'].flatMap((d) => walk(join(root, d))).map((f) => readFileSync(f, 'utf8')).join('\n');
  const allowed = new Set(['work']);
  for (const f of readdirSync(join(root, 'public'))) {
    if (allowed.has(f)) continue;
    assert.ok(sources.includes(f), `public/${f} no se usa`);
  }
});

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : /\.(m?js|jsx)$/.test(e.name) ? [join(dir, e.name)] : []);
}

test('sitemap incluye /apps y cada landing con slash final', () => {
  const src = read('app/sitemap.js');
  assert.match(src, /\$\{SITE_URL\}\/apps`/);
  assert.match(src, /APPS\.map\(\(app\) => \(\{ url: `\$\{SITE_URL\}\$\{app\.href\}`/);
});

test('JSON-LD: proyectos ordenados por order_pro como el panel', () => {
  const ld = personJsonLd({ locale: 'es', meta: msgs('es').Meta, projects: [
    { title_pro: 'C' }, { title_pro: 'B', order_pro: 2 }, { title_pro: 'A', order_pro: 1 },
  ] });
  assert.deepEqual(ld['@graph'][2].hasPart.map((w) => w.name), ['A', 'B', 'C']);
});
