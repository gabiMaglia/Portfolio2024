/* ============================================================
   SECCIONES — cada panel del recorrido horizontal
   ============================================================ */
const { useRef } = React;

/* ---------- 01 · INICIO ---------- */
function HeroPanel({ d }) {
  const h = d.hero;
  return (
    <section className="panel p-paper" data-d-panel data-ui="ink" data-name="Inicio" data-i="0">
      {/* eco fantasma detrás */}
      <div className="layer pll-back" style={S.heroGhost} aria-hidden="true">
        <span className="display outline" style={S.heroGhostTxt}>{d.last}</span>
      </div>

      <div className="layer pll-fore col hero-wrap" style={S.heroWrap}>
        <span className="kicker reveal" style={{marginBottom:'clamp(18px,3vh,40px)'}}>
          {h.kicker} &nbsp;/&nbsp; {d.location}
        </span>

        <h1 className="display reveal d1" style={S.heroName}>
          <span style={{display:'block'}}>{d.first}</span>
          <span style={{display:'block'}}>
            {d.last}<span style={{color:'var(--accent)'}}>®</span>
          </span>
        </h1>

        <div className="reveal d2 hero-below" style={S.heroBelow}>
          <p className="ser" style={S.heroTag}>
            {h.lead} <span style={{color:'var(--accent)'}}>{h.leadAccent}</span> {h.leadTail}
          </p>
          <p style={S.heroSub}>{h.sub}</p>
        </div>

        <div className="reveal d3 hero-meta" style={S.heroMeta}>
          <span style={S.tagPill}><span className="dot" style={{position:'relative',top:0}} /> {d.available}</span>
          <span style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'.16em',textTransform:'uppercase',opacity:.7}}>
            {d.role} · {d.roleAlt}
          </span>
        </div>
      </div>
    </section>
  );
}

/* ---------- 02 · SOBRE MÍ ---------- */
function AboutPanel({ d }) {
  const a = d.about;
  return (
    <section className="panel p-ink" data-d-panel data-ui="paper" data-name="Sobre mí" data-i="1">
      <div className="about-grid" style={S.aboutGrid}>
        <div className="col layer pll-mid" style={{justifyContent:'center'}}>
          <span className="kicker reveal">02 — {a.title}</span>
          <h2 className="display reveal d1" style={S.aboutH}>
            Construyo<br/>cosas que<br/><span className="ser" style={{fontWeight:400,letterSpacing:0,color:'var(--accent)'}}>se sienten</span> bien.
          </h2>
          <div className="reveal d2 about-paras" style={S.aboutParas}>
            {a.paras.map((p,i)=>(<p key={i} style={S.aboutP}>{p}</p>))}
          </div>
          <div className="reveal d3 stats-row" style={S.statsRow}>
            {a.stats.map((s,i)=>(
              <div key={i} style={S.stat}>
                <div className="display" style={S.statK}>{s.k}</div>
                <div style={S.statV}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col layer pll-fore reveal d2 about-right" style={S.aboutRight}>
          <image-slot id="about-portrait" shape="rounded" radius="2"
            placeholder="Tu retrato"
            style={{width:'100%',height:'min(58vh,560px)'}}></image-slot>
          <div style={S.stackWrap}>
            <span className="kicker" style={{opacity:.55}}>Stack</span>
            <div style={S.chips}>
              {a.stack.map((t,i)=>(<span key={i} style={S.chip}>{t}</span>))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 03 · PROYECTOS ---------- */
function ProjectsPanel({ d }) {
  const p = d.projects;
  return (
    <section className="panel p-paper" data-d-panel data-ui="ink" data-name="Proyectos" data-i="2">
      <div style={{width:'100%'}}>
        <div className="col layer pll-back" style={S.projHead}>
          <span className="kicker reveal">03 — {p.title}</span>
          <div className="reveal d1" style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:24,flexWrap:'wrap'}}>
            <h2 className="display" style={S.projTitle}>Trabajos<br/>selectos</h2>
            <p style={S.projIntro}>{p.intro}</p>
          </div>
        </div>
        <div className="layer pll-mid reveal d2 proj-grid" style={S.projGrid}>
          {p.items.map((it,i)=>(
            <a className="proj-card" key={i} href="#" onClick={(e)=>e.preventDefault()} style={S.card}>
              <image-slot id={it.slot} shape="rounded" radius="2"
                placeholder={`Shot ${it.n}`} style={{width:'100%',height:'clamp(150px,22vh,230px)'}}></image-slot>
              <div style={S.cardMeta}>
                <span className="display" style={S.cardN}>{it.n}</span>
                <div className="col" style={{gap:3,flex:1}}>
                  <span style={S.cardName}>{it.name}</span>
                  <span style={S.cardStack}>{it.type} · {it.stack}</span>
                </div>
                <span style={S.cardYear}>{it.year}</span>
                <span className="card-arrow" style={S.cardArrow}>↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 04 · EXPERIENCIA ---------- */
function ExperiencePanel({ d }) {
  const e = d.experience;
  return (
    <section className="panel p-ink" data-d-panel data-ui="paper" data-name="Experiencia" data-i="3">
      <div style={{width:'100%',maxWidth:1280,margin:'0 auto'}}>
        <div className="layer pll-back col" style={{marginBottom:'clamp(28px,5vh,64px)'}}>
          <span className="kicker reveal">04 — {e.title}</span>
          <h2 className="display reveal d1" style={S.expTitle}>
            Dónde dejé <span className="ser" style={{fontWeight:400,letterSpacing:0,color:'var(--accent)'}}>huella</span>
          </h2>
        </div>
        <div className="layer pll-mid exp-list" style={{borderTop:'1px solid rgba(239,231,214,.18)'}}>
          {e.items.map((it,i)=>(
            <div className="exp-row reveal" key={i} style={{...S.expRow, transitionDelay:`${i*0.07}s`}}>
              <span style={S.expIdx}>0{i+1}</span>
              <span className="display" style={S.expCompany}>{it.company}</span>
              <span style={S.expRole}>{it.role}</span>
              <span style={S.expPeriod}>{it.period}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 05 · CONTACTO ---------- */
function ContactPanel({ d }) {
  const c = d.contact;
  return (
    <section className="panel p-accent" data-d-panel data-ui="ink" data-name="Contacto" data-i="4">
      {/* marquee de fondo */}
      <div className="layer pll-back" style={S.mqWrap} aria-hidden="true">
        <div className="mq-track" style={S.mqTrack}>
          {Array.from({length:6}).map((_,i)=>(
            <span key={i} className="display outline" style={S.mqWord}>Trabajemos&nbsp;·&nbsp;</span>
          ))}
        </div>
      </div>

      <div className="layer pll-fore col" style={S.contactWrap}>
        <span className="kicker reveal">05 — {d.contact.title}</span>
        <h2 className="display reveal d1" style={S.contactH}>
          {c.title} <span className="ser" style={{fontWeight:400,letterSpacing:0}}>{c.titleAccent}</span>
        </h2>
        <p className="reveal d2" style={S.contactSub}>{c.sub}</p>

        <a className="email-link reveal d2" href={`mailto:${c.email}`} style={S.email}>
          {c.email}<span style={{marginLeft:14}}>→</span>
        </a>

        <div className="reveal d3 contact-socials" style={S.socials}>
          {c.links.map((l,i)=>(
            <a key={i} href={l.href} target="_blank" rel="noreferrer" className="social" style={S.social}>
              <span style={S.socialLabel}>{l.label}</span>
              <span className="social-handle" style={S.socialHandle}>{l.handle}</span>
            </a>
          ))}
        </div>

        <div className="reveal d4" style={S.contactFoot}>
          © {new Date().getFullYear()} {d.name} — Diseñado y construido con intención.
        </div>
      </div>
    </section>
  );
}

/* ===================== ESTILOS (inline) ===================== */
const S = {
  /* hero */
  heroGhost:{ position:'absolute', right:'-4vw', top:'50%', transform:'translateY(-50%)', pointerEvents:'none', zIndex:0 },
  heroGhostTxt:{ fontSize:'min(38vw,30rem)', opacity:.10, whiteSpace:'nowrap', display:'block' },
  heroWrap:{ position:'relative', zIndex:2, maxWidth:1180, width:'100%' },
  heroName:{ fontSize:'clamp(4.2rem,15vw,17rem)' },
  heroBelow:{ marginTop:'clamp(20px,3.4vh,46px)', maxWidth:'min(720px,62vw)' },
  heroTag:{ fontSize:'clamp(1.3rem,2.4vw,2.2rem)', lineHeight:1.15, fontStyle:'italic', marginBottom:'clamp(18px,2.4vh,32px)' },
  heroSub:{ fontSize:'clamp(.9rem,1.1vw,1.05rem)', lineHeight:1.6, opacity:.72, maxWidth:440, fontWeight:500 },
  heroMeta:{ marginTop:'clamp(26px,4vh,52px)', display:'flex', gap:22, alignItems:'center', flexWrap:'wrap' },
  tagPill:{ display:'inline-flex', alignItems:'center', gap:9, padding:'8px 15px',
    border:'1px solid currentColor', borderRadius:100, fontFamily:'var(--font-mono)',
    fontSize:11, letterSpacing:'.14em', textTransform:'uppercase' },

  /* about */
  aboutGrid:{ width:'100%', maxWidth:1320, margin:'0 auto', display:'grid',
    gridTemplateColumns:'1.1fr .9fr', gap:'clamp(36px,6vw,110px)', alignItems:'center' },
  aboutH:{ fontSize:'clamp(2.6rem,6vw,6rem)', margin:'18px 0 26px' },
  aboutParas:{ maxWidth:520, display:'flex', flexDirection:'column', gap:16 },
  aboutP:{ fontSize:'clamp(.98rem,1.2vw,1.16rem)', lineHeight:1.6, opacity:.78, fontWeight:500 },
  statsRow:{ display:'flex', gap:'clamp(28px,5vw,72px)', marginTop:'clamp(26px,4vh,48px)' },
  stat:{ display:'flex', flexDirection:'column', gap:4 },
  statK:{ fontSize:'clamp(2.4rem,4vw,3.4rem)', color:'var(--accent)', lineHeight:1 },
  statV:{ fontSize:12, opacity:.62, maxWidth:150, lineHeight:1.4, fontWeight:500 },
  aboutRight:{ gap:24 },
  stackWrap:{ display:'flex', flexDirection:'column', gap:12 },
  chips:{ display:'flex', flexWrap:'wrap', gap:8 },
  chip:{ padding:'7px 13px', border:'1px solid rgba(239,231,214,.28)', borderRadius:100,
    fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.05em' },

  /* projects */
  projHead:{ marginBottom:'clamp(22px,3.5vh,44px)', gap:18 },
  projTitle:{ fontSize:'clamp(2.4rem,5.5vw,5.4rem)', lineHeight:.9 },
  projIntro:{ fontFamily:'var(--font-mono)', fontSize:12, lineHeight:1.6, opacity:.62, maxWidth:300, paddingBottom:8 },
  projGrid:{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'clamp(14px,1.6vw,26px)' },
  card:{ display:'flex', flexDirection:'column', gap:14, color:'inherit', textDecoration:'none', cursor:'pointer' },
  cardMeta:{ display:'flex', alignItems:'center', gap:12, paddingTop:2, borderTop:'1px solid rgba(22,20,15,.16)' },
  cardN:{ fontSize:'1.5rem', lineHeight:1, color:'var(--accent)' },
  cardName:{ fontSize:14, fontWeight:700 },
  cardStack:{ fontFamily:'var(--font-mono)', fontSize:10.5, letterSpacing:'.02em', opacity:.6 },
  cardYear:{ fontFamily:'var(--font-mono)', fontSize:11, opacity:.5 },
  cardArrow:{ fontSize:16, opacity:0, transform:'translate(-4px,4px)', transition:'all .3s var(--ease)' },

  /* experience */
  expTitle:{ fontSize:'clamp(2.6rem,6vw,6rem)', marginTop:14 },
  expRow:{ display:'grid', gridTemplateColumns:'auto 1.4fr 1fr auto', alignItems:'center',
    gap:'clamp(16px,3vw,48px)', padding:'clamp(18px,2.6vh,34px) 4px',
    borderBottom:'1px solid rgba(239,231,214,.18)' },
  expIdx:{ fontFamily:'var(--font-mono)', fontSize:12, opacity:.5 },
  expCompany:{ fontSize:'clamp(1.6rem,3.4vw,3rem)', lineHeight:1 },
  expRole:{ fontSize:'clamp(.9rem,1.1vw,1.05rem)', opacity:.72, fontWeight:500 },
  expPeriod:{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'.08em', opacity:.6, justifySelf:'end' },

  /* contact */
  mqWrap:{ position:'absolute', top:'50%', left:0, right:0, transform:'translateY(-50%)', overflow:'hidden', zIndex:0, pointerEvents:'none' },
  mqTrack:{ display:'flex', whiteSpace:'nowrap', animation:'mq 26s linear infinite' },
  mqWord:{ fontSize:'min(22vw,16rem)', opacity:.14, lineHeight:1 },
  contactWrap:{ position:'relative', zIndex:2, maxWidth:1100, width:'100%' },
  contactH:{ fontSize:'clamp(3rem,11vw,11rem)', lineHeight:.86 },
  contactSub:{ marginTop:20, fontSize:'clamp(1rem,1.4vw,1.3rem)', maxWidth:430, lineHeight:1.5, fontWeight:500, opacity:.82 },
  email:{ display:'inline-flex', alignItems:'center', marginTop:'clamp(28px,4vh,52px)',
    fontFamily:'var(--font-display)', fontWeight:800, letterSpacing:'-.02em',
    fontSize:'clamp(1.5rem,4vw,3.2rem)', color:'inherit', textDecoration:'none',
    borderBottom:'2px solid currentColor', paddingBottom:6, lineHeight:1 },
  socials:{ display:'flex', gap:'clamp(20px,3vw,46px)', marginTop:'clamp(28px,4vh,48px)', flexWrap:'wrap' },
  social:{ display:'flex', flexDirection:'column', gap:3, color:'inherit', textDecoration:'none' },
  socialLabel:{ fontFamily:'var(--font-mono)', fontSize:10.5, letterSpacing:'.18em', textTransform:'uppercase', opacity:.6 },
  socialHandle:{ fontSize:'clamp(1rem,1.4vw,1.3rem)', fontWeight:700 },
  contactFoot:{ marginTop:'clamp(34px,5vh,60px)', fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'.06em', opacity:.6 },
};

Object.assign(window, { HeroPanel, AboutPanel, ProjectsPanel, ExperiencePanel, ContactPanel, S });
