// navigator.clipboard solo existe en contextos seguros y writeText exige activación del usuario:
// cualquier rechazo se traduce en false para que el llamador use su camino alternativo.
export const copyText = async (text, nav = globalThis.navigator) => {
  if (!nav?.clipboard?.writeText) return false;
  try {
    await nav.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};
