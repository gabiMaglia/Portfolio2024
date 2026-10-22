// M1: las fuentes se piden recién al primer layout y el swap (fallback -> real) mueve
// ghost/nav/logo (CLS ~0.09). Se oculta el body (visibility, no cuenta como shift) hasta
// que las fuentes cargan (se espera al evento load: antes de eso fonts.ready ya está resuelto
// porque todavía no se pidió ninguna fuente); sin JS el atributo nunca se pone y el sitio se ve igual.
export const FONT_GATE_TIMEOUT_MS = 2000;

export const FONT_GATE_SCRIPT = `(function(d){var e=d.documentElement;if(!d.fonts||!d.fonts.ready)return;e.setAttribute('data-fonts','pending');var done=function(){e.removeAttribute('data-fonts')};var w=function(){d.fonts.ready.then(done,done)};d.readyState==='complete'?w():window.addEventListener('load',w);setTimeout(done,${FONT_GATE_TIMEOUT_MS});})(document);`;
