/* ============================================================
   APP — motor de recorrido horizontal + UI fija + tweaks
   ============================================================ */
const { useEffect, useRef, useState } = React;
const D = window.PORTFOLIO_DATA;

const PALETTES = {
  "Naranja quemado": ["#efe7d6", "#16140f", "#e2552e"],
  "Verde oliva":     ["#ece7d6", "#14160f", "#7e8b2c"],
  "Azul cobalto":    ["#e9e9ea", "#11141d", "#2f5bd6"],
  "Lima ácido":      ["#ece7da", "#0f0f0d", "#c6e04a"],
};
const FONTS = {
  "Archivo":       '"Archivo", system-ui, sans-serif',
  "Syne":          '"Syne", system-ui, sans-serif',
  "Space Grotesk": '"Space Grotesk", system-ui, sans-serif',
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#efe7d6", "#16140f", "#e2552e"],
  "display": "Archivo",
  "snap": false
}/*EDITMODE-END*/;

/* luminancia para decidir texto sobre el acento */
function lum(hex){
  const c = hex.replace('#','');
  const r = parseInt(c.substr(0,2),16)/255, g = parseInt(c.substr(2,2),16)/255, b = parseInt(c.substr(4,2),16)/255;
  const f = (x)=> x<=0.03928 ? x/12.92 : Math.pow((x+0.055)/1.055,2.4);
  return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b);
}
const UI_COLOR = (palette)=>({ ink: palette[1], paper: palette[0] });

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const trackRef = useRef(null);
  const spacerRef = useRef(null);
  const [active, setActive] = useState(0);

  const panels = [HeroPanel, AboutPanel, ProjectsPanel, ExperiencePanel, ContactPanel];
  const N = panels.length;

  /* ---- aplicar paleta + tipografía ---- */
  useEffect(()=>{
    const [paper, ink, accent] = t.palette;
    const r = document.documentElement.style;
    r.setProperty('--paper', paper);
    r.setProperty('--ink', ink);
    r.setProperty('--accent', accent);
    r.setProperty('--accent-ink', lum(accent) > 0.45 ? ink : paper);
    r.setProperty('--font-display', FONTS[t.display] || FONTS.Archivo);
  }, [t.palette, t.display]);

  /* ---- MOTOR de scroll ---- */
  useEffect(()=>{
    const track = trackRef.current;
    const spacer = spacerRef.current;
    if(!track || !spacer) return;
    const panelEls = Array.from(track.querySelectorAll('[data-d-panel]'));

    let vw = window.innerWidth, vh = window.innerHeight;
    let travel = 0, maxScroll = 1;
    const activated = new Set();

    function layout(){
      vw = window.innerWidth; vh = window.innerHeight;
      travel = (N - 1) * vw;
      maxScroll = Math.max(1, (N - 1) * vh * 1.08);
      spacer.style.height = (maxScroll + vh) + 'px';
    }
    layout();

    let curX = 0, targetX = 0;
    function frac(){ return Math.min(1, Math.max(0, window.scrollY / maxScroll)); }

    function setUI(idx){
      const el = panelEls[idx]; if(!el) return;
      const want = el.getAttribute('data-ui'); // "ink" | "paper"
      const map = UI_COLOR(t.palette);
      document.documentElement.style.setProperty('--ui', map[want] || map.ink);
    }

    let lastActive = -1;
    function raf(){
      const f = frac();
      targetX = -f * travel;
      curX += (targetX - curX) * 0.10;
      if(Math.abs(targetX - curX) < 0.4) curX = targetX;
      track.style.transform = `translate3d(${curX}px,0,0)`;

      // parallax por panel
      for(let i=0;i<panelEls.length;i++){
        const d = (i * vw + curX) / vw; // 0 = centrado
        panelEls[i].style.setProperty('--d', d.toFixed(4));
      }

      // panel activo
      const idx = Math.round(f * (N - 1));
      if(idx !== lastActive){
        lastActive = idx;
        setActive(idx);
        setUI(idx);
        activated.add(idx);
        panelEls.forEach((el,i)=> el.setAttribute('data-active', activated.has(i) ? '1' : '0'));
      }

      // progreso
      const fill = document.getElementById('pbar-fill');
      if(fill) fill.style.width = (f*100).toFixed(2) + '%';

      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);
    setUI(0); activated.add(0);
    panelEls[0] && panelEls[0].setAttribute('data-active','1');

    // trackpad horizontal → scroll vertical
    function onWheel(e){
      if(Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 0){
        window.scrollBy(0, e.deltaX);
        e.preventDefault();
      }
      document.body.classList.add('scrolled');
    }

    // touch swipe horizontal → scroll vertical
    let tx0 = 0, ty0 = 0;
    function onTouchStart(e){ tx0 = e.touches[0].clientX; ty0 = e.touches[0].clientY; }
    function onTouchMove(e){
      const dx = tx0 - e.touches[0].clientX;
      const dy = ty0 - e.touches[0].clientY;
      if(Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 6){
        window.scrollBy(0, dx * 2.2);
        e.preventDefault();
      }
      document.body.classList.add('scrolled');
    }
    // snap opcional
    let snapTO = null;
    function onScroll(){
      document.body.classList.add('scrolled');
      if(!t.snap) return;
      clearTimeout(snapTO);
      snapTO = setTimeout(()=>{
        const f = frac();
        const idx = Math.round(f * (N - 1));
        window.scrollTo({ top: (idx/(N-1))*maxScroll, behavior:'smooth' });
      }, 150);
    }
    function onKey(e){
      const step = maxScroll/(N-1);
      if(['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)){
        e.preventDefault(); window.scrollBy({ top: step, behavior:'smooth' });
      } else if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){
        e.preventDefault(); window.scrollBy({ top:-step, behavior:'smooth' });
      } else if(e.key==='Home'){ window.scrollTo({top:0,behavior:'smooth'}); }
      else if(e.key==='End'){ window.scrollTo({top:maxScroll,behavior:'smooth'}); }
    }
    window.addEventListener('resize', layout);
    window.addEventListener('wheel', onWheel, { passive:false });
    window.addEventListener('scroll', onScroll, { passive:true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive:true });
    window.addEventListener('touchmove', onTouchMove, { passive:false });

    // ocultar loader
    const loader = document.getElementById('loading');
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(()=>{
      if(loader){ loader.style.opacity='0'; setTimeout(()=>loader.remove(), 650); }
    });

    return ()=>{
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', layout);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [t.palette, t.display, t.snap, N]);

  function goTo(i){
    const vh = window.innerHeight;
    const maxScroll = Math.max(1, (N - 1) * vh * 1.08);
    window.scrollTo({ top: (i/(N-1))*maxScroll, behavior:'smooth' });
  }

  return (
    <React.Fragment>
      <div id="stage">
        <div id="track" ref={trackRef}>
          {panels.map((P,i)=><P key={i} d={D} />)}
        </div>
      </div>
      <div id="spacer" ref={spacerRef}></div>

      {/* ---- UI fija ---- */}
      <div className="frame frame--tl">
        <a href="#" onClick={(e)=>{e.preventDefault();goTo(0);}} className="sig">
          {D.first} <em>{D.last}</em>
        </a>
      </div>

      <div className="frame frame--tr">
        <nav className="nav">
          {D.nav.map((n,i)=>(
            <button key={i} className={active===i?'on':''} onClick={()=>goTo(i)}>{n.label}</button>
          ))}
        </nav>
      </div>

      <div className="hint">
        Scroll <span className="ln"></span> avanzá
      </div>

      <div className="pbar"><div className="pbar__fill" id="pbar-fill"></div></div>

      <div className="counter">
        <b>{D.nav[active].n}</b> {D.nav[active].label}
        <span style={{opacity:.5}}>— {D.nav[N-1].n}</span>
      </div>

      <TweaksPanel>
        <TweakSection label="Paleta de contraste" />
        <TweakColor label="Esquema" value={t.palette}
          options={Object.values(PALETTES)}
          onChange={(v)=>setTweak('palette', v)} />
        <TweakSection label="Tipografía" />
        <TweakRadio label="Titulares" value={t.display}
          options={Object.keys(FONTS)}
          onChange={(v)=>setTweak('display', v)} />
        <TweakSection label="Recorrido" />
        <TweakToggle label="Imán a secciones (snap)" value={t.snap}
          onChange={(v)=>setTweak('snap', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
