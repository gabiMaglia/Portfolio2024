// Verifica contra `next start` que los paneles 2-5 salen con `inert` en el HTML del SSR
// (Tab no debe alcanzarlos antes de hidratar) y que el hero no.
const base = process.env.BASE_URL ?? 'http://localhost:3000';
let failed = false;
for (const locale of ['es', 'en']) {
  const html = await (await fetch(`${base}/${locale}`)).text();
  const panels = html.match(/<section[^>]*data-d-panel[^>]*>/g) ?? [];
  const inert = panels.map((p) => /\binert=""/.test(p));
  const ok = panels.length === 5 && inert[0] === false && inert.slice(1).every(Boolean);
  console.log(`${ok ? 'OK  ' : 'FAIL'} /${locale}: ${panels.length} paneles, inert=${JSON.stringify(inert)}`);
  if (!ok) failed = true;
}
process.exit(failed ? 1 : 0);
