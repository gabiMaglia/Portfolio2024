// El panel viaja en el hash de la URL al cambiar de idioma: así sobrevive a la navegación
// (y a abrir el link en otra pestaña) sin sessionStorage.
export const PANEL_IDS = ['inicio', 'sobre', 'proyectos', 'experiencia', 'contacto'];

export const panelIndexFromHash = (hash, ids = PANEL_IDS) => ids.indexOf(String(hash ?? '').replace(/^#/, ''));
