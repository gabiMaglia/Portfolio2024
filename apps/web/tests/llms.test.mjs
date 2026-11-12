import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildLlmsTxt } from '../lib/llms.mjs';

const projects = [
  { id: 'n', title_pro: 'Net-Gauge', deployLink_pro: ' https://github.com/x/y', order_pro: 3 },
  { id: 'c', title_pro: 'Chevromax', kind_pro: 'Maintenance', year_pro: 2024, technologies_pro: 'Vue', order_pro: 6 },
  { id: 'g', title_pro: 'Global Traffic', kind_pro: 'Web app', year_pro: 2026, description_pro: 'Trade on a 3D globe', deployLink_pro: 'https://globaltraffic.earth', technologies_pro: 'Next.js', order_pro: 1 },
  { id: 'h', title_pro: 'HushSplit', year_pro: 2026, deployLink_pro: '/apps/hushsplit', order_pro: 2 },
];
const experiences = [
  { institution_exp: 'Old Co', title_exp: 'Dev', startDate_exp: 'Jan 2019', endDate_exp: 'Jan 2020' },
  { institution_exp: 'Darwoft', title_exp: 'Fullstack', startDate_exp: 'Mar 2023', endDate_exp: 'Present Day', description_exp: 'Apps  for\nclients' },
];
const socials = [{ url: 'https://github.com/gabiMaglia' }, { url: 'mailto:x@y.z' }];
const txt = buildLlmsTxt({ projects, experiences, socials, description: 'Fullstack developer.', presentLabel: 'Present' });

test('D-22: proyectos en el orden del panel, con link absoluto', () => {
  const g = txt.indexOf('Global Traffic'), h = txt.indexOf('HushSplit'), c = txt.indexOf('Chevromax');
  assert.ok(g < h && h < c);
  assert.match(txt, /\[Global Traffic\]\(https:\/\/globaltraffic\.earth\): Trade on a 3D globe\. Web app, 2026\. Next\.js\./);
  assert.match(txt, /\[HushSplit\]\(https:\/\/www\.gabrielmaglia\.me\/apps\/hushsplit\)/);
  assert.match(txt, /- Chevromax: Maintenance, 2024\. Vue\./);
});

test('D-22: links con espacios de la DB salen limpios', () => {
  assert.match(txt, /\[Net-Gauge\]\(https:\/\/github\.com\/x\/y\)/);
});

test('D-22: experiencia más nueva primero, espacios normalizados', () => {
  assert.ok(txt.indexOf('Darwoft') < txt.indexOf('Old Co'));
  assert.match(txt, /Darwoft, Fullstack \(2023–Present\): Apps for clients\./);
});

test('D-22: sólo perfiles http(s), sin mailto', () => {
  assert.match(txt, /- https:\/\/github\.com\/gabiMaglia/);
  assert.doesNotMatch(txt, /mailto:/);
});

test('D-22: sin datos (DB caída) sale igual, con fallback al sitio', () => {
  const empty = buildLlmsTxt({});
  assert.match(empty, /^# Gabriel Maglia/);
  assert.match(empty, /See https:\/\/www\.gabrielmaglia\.me\/en#proyectos/);
});

test('D-22: la ruta tolera errores de la DB y responde text/plain', () => {
  const src = readFileSync(new URL('../app/llms.txt/route.js', import.meta.url), 'utf8');
  assert.match(src, /\(\) => \[\]/);
  assert.match(src, /text\/plain; charset=utf-8/);
});
