import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

const rawCss = read('app/globals.css');
const css = rawCss.replace(/\/\*[\s\S]*?\*\//g, '');
// Sin :root (donde viven los tokens) ni el data-URI del grano
const outsideRoot = css.replace(/url\([^)]*\)/g, 'url()').replace(/:root\s*\{[^}]*\}/g, '');
// Bloque reduced-motion: único lugar legítimo de !important y duraciones literales
const reduced = /@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\n\}/.exec(outsideRoot)?.[0] ?? '';
const withoutReduced = outsideRoot.replace(reduced, '');

const componentFiles = readdirSync(join(root, 'app/components')).filter((f) => f.endsWith('.jsx'));

test('sin rgba/hsl/hex fuera de :root', () => {
  assert.doesNotMatch(withoutReduced, /\b(rgba?|hsla?)\(/);
  assert.doesNotMatch(withoutReduced, /:[^;{}]*#[0-9a-fA-F]{3,8}\b/);
});

test('inline style: <=5 y todos con valor dinámico', () => {
  const hits = [];
  for (const f of componentFiles) {
    const src = read(`app/components/${f}`);
    for (const m of src.matchAll(/style=\{\{[^}]*\}\}/g)) hits.push(m[0]);
  }
  assert.ok(hits.length <= 5, `hay ${hits.length} style inline`);
  for (const h of hits) assert.match(h, /\$\{/, `style estático: ${h}`);
});

test('escala tipográfica: <=8 --fs-* y font-size solo vía token', () => {
  const rootBlock = /:root\s*\{[^}]*\}/.exec(css)?.[0] ?? '';
  const tokens = new Set([...rootBlock.matchAll(/--fs-[\w-]+\s*:/g)].map((m) => m[0]));
  assert.ok(tokens.size > 0 && tokens.size <= 8, `tokens fs: ${tokens.size}`);
  for (const m of withoutReduced.matchAll(/font-size\s*:\s*([^;}]+)/g)) {
    assert.match(m[1].trim(), /^var\(--(fs|deco)-/, `font-size literal: ${m[1]}`);
  }
});

test('duraciones solo vía var(--dur-*)', () => {
  const decl = [...withoutReduced.matchAll(/(transition|animation)(-duration|-delay)?\s*:\s*([^;}]+)/g)];
  assert.ok(decl.length > 0);
  for (const m of decl) assert.doesNotMatch(m[3], /(^|[\s,])\.?\d*\.?\d+m?s\b/, `duración literal: ${m[0]}`);
});

test('!important solo dentro de prefers-reduced-motion', () => {
  assert.ok(reduced.length > 0, 'bloque reduced-motion presente');
  assert.doesNotMatch(withoutReduced, /!important/);
});

test('hover no cambia font-size/letter-spacing (reflow)', () => {
  for (const m of withoutReduced.matchAll(/[^{}]*:hover[^{]*\{([^}]*)\}/g)) {
    assert.doesNotMatch(m[1], /font-size|letter-spacing/, `reflow en hover: ${m[0].trim()}`);
  }
});

test('Tailwind eliminado', () => {
  assert.doesNotMatch(rawCss, /@tailwind/);
  assert.equal(existsSync(join(root, 'tailwind.config.js')), false);
  const pkg = JSON.parse(read('package.json'));
  const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
  assert.deepEqual(deps.filter((d) => /tailwind/.test(d)), []);
  if (existsSync(join(root, 'postcss.config.mjs'))) assert.doesNotMatch(read('postcss.config.mjs'), /tailwind/);
});

test('D-04: .hero-wrap sin space-between muerto', () => {
  for (const m of css.matchAll(/\.hero-wrap\s*\{([^}]*)\}/g)) {
    assert.doesNotMatch(m[1], /justify-content\s*:\s*space-between/);
  }
});

test('D-03: contenedores con overflow no usan justify-content:center', () => {
  for (const sel of ['.exp-list', '.contact-wrap']) {
    for (const m of css.matchAll(new RegExp(`${sel.replace('.', '\\.')}\\s*\\{([^}]*)\\}`, 'g'))) {
      if (/overflow-y\s*:\s*auto/.test(m[1])) assert.doesNotMatch(m[1], /justify-content\s*:\s*center/, sel);
    }
  }
});

// ADR-004: en un elemento .reveal, opacity/transform son del movimiento.
// Si una clase de contenido los fija, `.panel[data-active] .reveal` (0,3,0) la pisa.
const ruleList = () => {
  const out = [];
  for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) out.push({ sel: m[1].trim(), body: m[2] });
  return out;
};
const subjectClasses = (sel) =>
  sel.split(',').flatMap((one) => {
    if (one.includes('::')) return []; // pseudo-elementos no son el elemento
    const last = one.trim().split(/[\s>+~]+/).pop();
    return [...last.matchAll(/\.([\w-]+)/g)].map((c) => c[1]);
  });

test('ADR-004: ninguna clase con opacity/transform comparte elemento con .reveal', () => {
  const motion = new Set();
  for (const { sel, body } of ruleList()) {
    if (!/(^|[;\s])(opacity|transform)\s*:/.test(body)) continue;
    for (const c of subjectClasses(sel)) motion.add(c);
  }
  for (const c of ['reveal', 'd1', 'd2', 'd3', 'd4']) motion.delete(c);
  // Cero exenciones (T-010 resolvió pll-mid envolviendo el reveal en un hijo).
  const EXEMPT = new Set();
  const clash = [];
  for (const f of componentFiles) {
    const src = read(`app/components/${f}`);
    for (const m of src.matchAll(/className="([^"]*)"/g)) {
      const cls = m[1].split(/\s+/);
      if (!cls.includes('reveal')) continue;
      for (const c of cls) if (motion.has(c) && !EXEMPT.has(`${f}:${c}`)) clash.push(`${f}:${c}`);
    }
  }
  assert.deepEqual(clash, []);
});

test('ADR-004: los roles .t-* no declaran opacity (atenuación por color)', () => {
  for (const { sel, body } of ruleList()) {
    if (/^\.t-[\w-]+$/.test(sel)) assert.doesNotMatch(body, /(^|[;\s])opacity\s*:/, sel);
  }
});

test('T-010: :hover no toca propiedades de layout (los vecinos no se mueven)', () => {
  const LAYOUT = /(^|[;\s])(font-size|letter-spacing|line-height|padding[\w-]*|margin[\w-]*|width|height|gap|border-width)\s*:/;
  for (const m of withoutReduced.matchAll(/[^{}]*:hover[^{]*\{([^}]*)\}/g)) {
    assert.doesNotMatch(m[1], LAYOUT, `layout en hover: ${m[0].trim()}`);
  }
});

test('T-010: el chrome no transiciona color (el corte por glifo ES la transición)', () => {
  for (const sel of ['.frame', '.counter', '.nav button', '.sig', '.hint', '.pbar']) {
    for (const m of css.matchAll(new RegExp(`${sel.replace('.', '\\.')}\\s*\\{([^}]*)\\}`, 'g'))) {
      assert.doesNotMatch(m[1], /transition\s*:[^;]*\bcolor\b/, sel);
    }
  }
});
