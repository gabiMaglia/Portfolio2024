import test from 'node:test';
import assert from 'node:assert/strict';
import { buildInitialState, createUserStore } from '../store/user-store.mjs';

const data = {
  data: { main_phrase: 'hola', phrase1: 'a', phrase2: 'b', phrase3: 'c' },
  socialData: [{ id: 1 }],
  restOfData: {
    proyects: [{ id: 3, title_pro: 'C' }, { id: 1, title_pro: 'A' }],
    experiences: [
      { id: 'x', startDate_exp: 'March 2022' },
      { id: 'y', startDate_exp: 'January 2020' },
    ],
    skills: [{ id: 9 }],
  },
};

test('buildInitialState ordena proyectos por id y experiencias por fecha', () => {
  const s = buildInitialState(data);
  assert.deepEqual(s.proyects.map((p) => p.title_pro), ['A', 'C']);
  assert.deepEqual(s.experiences.map((e) => e.id), ['y', 'x']);
  assert.equal(s.phrases.mainPhrase, 'hola');
});

test('cada store creado es independiente (sin singleton entre requests)', () => {
  const a = createUserStore(buildInitialState(data));
  const b = createUserStore(buildInitialState({}));
  assert.equal(a.getState().proyects.length, 2);
  assert.equal(b.getState().proyects.length, 0);
  b.getState().setSocial([{ id: 5 }]);
  assert.equal(a.getState().social.length, 1);
  assert.equal(a.getState().social[0].id, 1);
});

test('T-021: proyectos por order_pro, sin orden al final, y a igual orden el más nuevo', () => {
  const s = buildInitialState({ restOfData: { proyects: [
    { id: 'u1', title_pro: 'viejo', year_pro: 2022 },
    { id: 'u2', title_pro: 'nuevo', year_pro: 2025 },
    { id: 'u3', title_pro: 'segundo', order_pro: 2 },
    { id: 'u4', title_pro: 'primero', order_pro: 1 },
  ] } });
  assert.deepEqual(s.proyects.map((p) => p.title_pro), ['primero', 'segundo', 'nuevo', 'viejo']);
});
