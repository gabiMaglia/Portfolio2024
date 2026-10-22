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

// ADR-005: dentro de un .ui-ink (texto pintado con background-clip:text) ningún descendiente
// crea grupo de pintura ni fija color/background: queda fuera de la máscara y no se ve.
test('ADR-005: descendientes de .ui-ink no fijan opacity/transform/filter/blend/will-change/color/background', () => {
  const FORBIDDEN = /(^|[;\s])(opacity|transform|filter|mix-blend-mode|will-change|color|background[\w-]*)\s*:/;
  // el shell y los componentes de chrome que montan .ui-ink (switch, masthead)
  const src = ['portfolio-shell', 'lang-switch', 'masthead'].map((f) => read(`app/components/${f}.jsx`)).join('\n').replace(/=>/g, '=_');
  const stack = [];
  const roots = []; // { own: Set(clases del .ui-ink), kids: [{tag, classes}] }
  for (const m of src.matchAll(/<(\/?)([A-Za-z][\w.]*)([^<>]*?)(\/?)>/g)) {
    const [, close, tag, attrs, selfClose] = m;
    if (close) { stack.pop(); continue; }
    const cls = (/className=(?:"([^"]*)"|\{`([^`]*)`\})/.exec(attrs) || [])[1] ?? (/className=\{`([^`]*)`\}/.exec(attrs) || [])[1] ?? '';
    const classes = cls.replace(/\$\{[^}]*\}/g, ' ').split(/\s+/).filter(Boolean);
    const root = stack.find((e) => e.root)?.root;
    if (root) root.kids.push({ tag, classes });
    const entry = { root: classes.includes('ui-ink') ? { own: new Set(classes), kids: [] } : null };
    if (entry.root) roots.push(entry.root);
    if (!selfClose) stack.push(entry);
  }
  assert.ok(roots.length >= 3, `.ui-ink en el chrome: ${roots.length}`);
  const ownClasses = new Set(roots.flatMap((r) => [...r.own]));
  const bad = [];
  for (const { sel, body } of ruleList()) {
    if (!FORBIDDEN.test(body)) continue;
    for (const one of sel.split(',')) {
      if (one.includes('::')) continue;
      const parts = one.trim().split(/[\s>+~]+/);
      const last = parts.pop();
      const lastClasses = [...last.matchAll(/\.([\w-]+)/g)].map((c) => c[1]);
      const lastTag = /^[a-z][\w-]*/.exec(last)?.[0];
      const viaAncestor = parts.some((p) => [...p.matchAll(/\.([\w-]+)/g)].some((c) => ownClasses.has(c[1])));
      for (const r of roots) for (const k of r.kids) {
        const byClass = k.classes.some((c) => lastClasses.includes(c));
        const byTag = lastTag && lastTag === k.tag && lastClasses.length === 0 && viaAncestor;
        if (byClass || byTag) bad.push(`${one.trim()} -> <${k.tag} ${k.classes.join('.')}>`);
      }
    }
  }
  assert.deepEqual([...new Set(bad)], []);
});

// ADR-006: el reveal es función de --d (posición). Una transición o data-active lo haría
// depender del tiempo: el panel entrante llegaría a vw/2 con el reveal a medias.
test('ADR-006: .reveal sin transition/transition-delay de opacity/transform ni selectores [data-active', () => {
  for (const { sel, body } of ruleList()) {
    const hitsReveal = sel.split(',').some((one) => /\.reveal\b/.test(one.trim().split(/[\s>+~]+/).pop()));
    if (hitsReveal) assert.doesNotMatch(body, /(^|[;\s])transition(-[\w]+)?\s*:/, `transition en ${sel}`);
    if (/\[data-active/.test(sel)) assert.doesNotMatch(sel, /\.reveal|\.d[1-4]/, `data-active alcanza .reveal: ${sel}`);
  }
  assert.doesNotMatch(css, /data-active/);
  for (const f of componentFiles) {
    const src = read(`app/components/${f}`);
    assert.doesNotMatch(src, /data-active|transitionDelay/, `${f}: reveal por tiempo/activación`);
  }
});

test('ADR-006: .reveal deriva opacity/transform de --d y --rv-*', () => {
  const m = /\n\.reveal\s*\{([^}]*)\}/.exec(css);
  assert.ok(m, 'regla .reveal');
  assert.match(m[1], /var\(--d\)/);
  assert.match(m[1], /var\(--rv-far\)/);
  assert.match(m[1], /opacity\s*:/);
  assert.match(m[1], /transform\s*:/);
});

test('T-011: el switch de idioma no usa Tailwind ni overlay/spinner, y su pista sigue el gradiente del chrome', () => {
  for (const f of ['localeSwitcher.jsx', 'lang-switch.jsx']) {
    const src = read(`app/components/${f}`);
    assert.doesNotMatch(src, /className="[^"]*\b(w|h|px|py|rounded|flex|bg|text)-[\w[\]/]+/, `${f}: clase utilitaria`);
    assert.doesNotMatch(src, /overlay|spinner/i, f);
  }
  assert.doesNotMatch(css, /locale-overlay|locale-spinner/);
  assert.match(css, /\.lang-switch__track::before\s*\{[^}]*var\(--ui-a\)[^}]*var\(--ui-b\)/);
});

test('T-011: el thumb se desliza con --ease y el área táctil es >=44px', () => {
  assert.match(css, /\.lang-switch__thumb\s*\{[^}]*transition:\s*transform var\(--dur-base\) var\(--ease\)/);
  assert.match(css, /--tap-lg:\s*44px/);
  assert.match(css, /\.lang-switch\s*\{[^}]*min-height:\s*var\(--tap-lg\)/);
});

test('T-013: nav y logo con área táctil >=24px; foco visible propio del chrome', () => {
  assert.match(css, /--tap-min:\s*24px/);
  assert.match(css, /\.nav button\s*\{[^}]*min-height:\s*var\(--tap-min\)/);
  assert.match(css, /\.frame :focus-visible/);
});

test('T-011 C2: StoreProvider se remonta por locale (ADR-002)', () => {
  assert.match(read('app/[locale]/layout.js'), /<StoreProvider key=\{locale\}/);
});

test('T-013: el skip link es lo primero que renderiza el shell', () => {
  const src = read('app/components/portfolio-shell.jsx');
  const body = src.slice(src.indexOf('return (\n    <>'));
  assert.match(body.replace(/\{\/\*[\s\S]*?\*\/\}/g, '').trim().replace(/^return \(\s*<>\s*/, ''), /^<SkipLink/);
});

// ---- T-012: carrusel de proyectos
test('T-012: el panel muestra todos los proyectos (sin slice a 4)', () => {
  const src = read('app/components/projects-panel.jsx');
  assert.doesNotMatch(src, /slice\(\s*0\s*,\s*4\s*\)/);
  assert.match(src, /data-hscroll/);
});

test('T-012: carrusel con scroll-snap nativo y sin traspaso de gestos al navegador', () => {
  const m = /\.proj-grid\s*\{([^}]*)\}/.exec(css);
  assert.ok(m, 'regla .proj-grid');
  assert.match(m[1], /scroll-snap-type:\s*x mandatory/);
  assert.match(m[1], /overscroll-behavior-x:\s*contain/);
  assert.match(css, /\.proj-card\s*\{[^}]*scroll-snap-align:\s*start/);
});

test('T-012: botones prev/next con aria-disabled (no pierden el foco al llegar al borde)', () => {
  const src = read('app/components/action-button.jsx');
  assert.match(src, /aria-disabled/);
  assert.doesNotMatch(src, /\sdisabled=\{/);
  assert.match(read('app/components/carousel-controls.jsx'), /ActionButton/);
});

test('T-012 + ADR-004: el scroller va dentro del wrapper .reveal, nunca en el mismo elemento', () => {
  const src = read('app/components/projects-panel.jsx');
  assert.doesNotMatch(src, /className="[^"]*\breveal\b[^"]*\bproj-grid\b|className="[^"]*\bproj-grid\b[^"]*\breveal\b/);
});

test('T-012: el shell separa gestos con wheelRoute/inHScroll y el snap usa el tween propio', () => {
  const src = read('app/components/portfolio-shell.jsx');
  assert.match(src, /wheelRoute\(/);
  assert.match(src, /inHScroll\(/);
  assert.match(src, /snapDurationMs\(/);
  assert.match(src, /easeSnap\(/);
});

test('T-012: mobile = lista vertical con scroll interno y fade; flecha visible en táctil', () => {
  const mobile = /@media \(max-width: 768px\) \{[\s\S]*$/.exec(css)?.[0] ?? '';
  assert.match(mobile, /\.proj-grid\s*\{[^}]*overflow-y:\s*auto/);
  assert.match(mobile, /\.proj-grid\[data-fade-end\]\s*\{[^}]*mask-image/);
  assert.match(css, /@media \(hover: none\)[\s\S]*\.card-arrow\s*\{[^}]*opacity:\s*1/);
});
