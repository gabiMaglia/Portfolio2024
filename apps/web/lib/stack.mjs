// El panel muestra solo los skills con grupo asignado, en este orden de columnas.
export const STACK_GROUPS = ['frontend', 'backend', 'data', 'ai'];

const FALLBACK = {
  frontend: ['React', 'Next.js', 'TypeScript', 'React Native'],
  backend: ['Node', 'NestJS', 'Express'],
  data: ['PostgreSQL', 'Docker', 'AWS', 'Azure DevOps'],
  ai: ['Claude Code', 'Claude Design', 'Agent Skills', 'Agentic AI'],
};

export function groupStack(skills = []) {
  const groups = STACK_GROUPS.map((group) => ({
    group,
    items: skills
      .filter((s) => s?.type === 'hard' && s?.group_skill === group && s?.name)
      .sort((a, b) => (a.order_skill ?? Infinity) - (b.order_skill ?? Infinity))
      .map((s) => s.name),
  })).filter((g) => g.items.length > 0);

  return groups.length > 0
    ? groups
    : STACK_GROUPS.map((group) => ({ group, items: FALLBACK[group] }));
}
