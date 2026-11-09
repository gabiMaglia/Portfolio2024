import test from 'node:test';
import assert from 'node:assert/strict';
import { groupStack } from '../lib/stack.mjs';

test('groupStack agrupa, ordena y excluye skills sin grupo o soft', () => {
  const out = groupStack([
    { type: 'hard', name: 'Next.js', group_skill: 'frontend', order_skill: 2 },
    { type: 'hard', name: 'React', group_skill: 'frontend', order_skill: 1 },
    { type: 'hard', name: 'Angular' },
    { type: 'soft', name: 'Creatividad', group_skill: 'frontend' },
    { type: 'hard', name: 'Docker', group_skill: 'data', order_skill: 1 },
  ]);
  assert.deepEqual(out, [
    { group: 'frontend', items: ['React', 'Next.js'] },
    { group: 'data', items: ['Docker'] },
  ]);
});

test('groupStack sin grupos en la DB usa el fallback completo', () => {
  assert.deepEqual(groupStack([{ type: 'hard', name: 'Angular' }]).map((g) => g.group), ['frontend', 'backend', 'data', 'ai']);
});
