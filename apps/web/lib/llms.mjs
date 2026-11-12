// /llms.txt generado desde la DB (D-22): mismo orden y datos que el portfolio, en inglés.
// Puro: recibe filas ya traídas para poder testearlo sin DB.
import { SITE_URL, sameAsOf } from './site.mjs';
import { buildInitialState } from '../store/user-store.mjs';
import { formatExpYear } from './format-date.mjs';

const clean = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
const absolute = (href) => {
  const h = clean(href);
  return h.startsWith('/') ? `${SITE_URL}${h}` : h;
};
const link = (label, href) => (clean(href) ? `[${label}](${absolute(href)})` : label);
const sentence = (s) => (s && !/[.!?]$/.test(s) ? `${s}.` : s);

// `description` y `presentLabel` vienen de messages/en.json (Meta.description, Experience.present)
export function buildLlmsTxt({ projects = [], experiences = [], socials = [], description = '', presentLabel = 'Present' } = {}) {
  // buildInitialState ordena igual que el panel (order_pro / año; experiencias más nuevas primero)
  const state = buildInitialState({ restOfData: { proyects: projects, experiences } });
  const present = presentLabel;

  const work = state.proyects
    .filter((p) => p?.title_pro)
    .map((p) => {
      const meta = [clean(p.kind_pro), p.year_pro].filter(Boolean).join(', ');
      const parts = [sentence(clean(p.description_pro)), sentence(meta), sentence(clean(p.technologies_pro))].filter(Boolean);
      return `- ${link(clean(p.title_pro), p.deployLink_pro || p.githubLink_pro)}: ${parts.join(' ')}`;
    });

  const jobs = state.experiences
    .filter((e) => e?.institution_exp)
    .map((e) => {
      const years = [formatExpYear(e.startDate_exp, present), formatExpYear(e.endDate_exp, present)].filter(Boolean).join('–');
      const head = [clean(e.institution_exp), clean(e.title_exp)].filter(Boolean).join(', ');
      const desc = clean(e.description_exp);
      return `- ${head}${years ? ` (${years})` : ''}${desc ? `: ${sentence(desc)}` : ''}`;
    });

  const profiles = sameAsOf(socials).map((url) => `- ${url}`);

  return [
    '# Gabriel Maglia',
    '',
    `> ${description} Frontend-focused: product thinking, interface design, implementation and production deployment. Available for projects.`,
    '',
    `The portfolio is a single page per language: ${SITE_URL}/en (English) and ${SITE_URL}/es (Spanish). Both carry the same content: about, stack, selected work, experience and contact.`,
    '',
    '## Selected work',
    '',
    ...(work.length ? work : [`- See ${SITE_URL}/en#proyectos`]),
    '',
    '## Apps',
    '',
    `- [Apps index](${SITE_URL}/apps): products built beyond the portfolio (listBuddy, NetGauge, HushSplit).`,
    '',
    '## Experience',
    '',
    ...(jobs.length ? jobs : [`- See ${SITE_URL}/en#experiencia`]),
    '',
    '## Contact',
    '',
    ...profiles,
    `- Contact form and email on the portfolio's contact panel: ${SITE_URL}/en#contacto`,
    '',
  ].join('\n');
}
