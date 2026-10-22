import test from 'node:test';
import assert from 'node:assert/strict';
import { formatExpDate } from '../lib/format-date.mjs';

test('es: mes y año en español', () => {
  assert.equal(formatExpDate('July 2024', 'es', 'Presente'), 'Julio de 2024');
  assert.equal(formatExpDate('January 2022', 'es', 'Presente'), 'Enero de 2022');
});

test('en: mes y año en inglés', () => {
  assert.equal(formatExpDate('July 2024', 'en', 'Present'), 'July 2024');
});

test('abreviaturas y typos de la DB se resuelven por prefijo de 3 letras', () => {
  assert.equal(formatExpDate('Jun 2023', 'es', 'Presente'), 'Junio de 2023');
  assert.equal(formatExpDate('Aprlil 2017', 'es', 'Presente'), 'Abril de 2017');
});

test('"hoy" en cualquier forma de la DB -> etiqueta traducida', () => {
  for (const raw of ['Present Day', 'Present', 'Dia presente', 'Día presente', 'presente']) {
    assert.equal(formatExpDate(raw, 'es', 'Presente'), 'Presente', raw);
  }
});

test('texto que no es "Mes AAAA" se devuelve tal cual', () => {
  assert.equal(formatExpDate('2019', 'es', 'Presente'), '2019');
  assert.equal(formatExpDate('', 'es', 'Presente'), '');
  assert.equal(formatExpDate(null, 'es', 'Presente'), '');
});
