import { useUserStore } from "@/store/store";
import { useTranslations } from "next-intl";

const HARDCODED_LINKS = [
  { id: "gh", name: "GitHub",   url: "https://github.com/gabiMaglia",          handle: "gabiMaglia" },
  { id: "li", name: "LinkedIn", url: "https://linkedin.com/in/gabriel-maglia", handle: "gabriel-maglia" },
  { id: "cv", name: "CV",       url: "/Gabriel Maglia - Fullstack Developer ESP.pdf", handle: "Descargar PDF" },
];

const ContactPanel = () => {
  const t = useTranslations("Contact");
  const socials = useUserStore((state) => state.social) || [];

  const links = socials.length > 0
    ? socials.map((s) => ({
        id: s.id,
        name: s.name,
        url: s.url,
        handle: s.url.replace(/^https?:\/\//, "").split("/").pop() || s.name,
      }))
    : HARDCODED_LINKS;

  return (
    <section className="panel p-accent" data-d-panel data-ui="ink">
      {/* scrolling marquee background */}
      <div className="layer pll-back mq-wrap" aria-hidden="true">
        <div className="mq-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="display outline" style={{ fontSize: "min(22vw,16rem)", opacity: 0.14, lineHeight: 1 }}>
              {t("marqueeWord")}&nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="layer pll-fore contact-wrap">
        <span className="kicker reveal">05 — {t("title")}</span>

        <h2 className="display reveal d1" style={{ fontSize: "clamp(3rem,11vw,11rem)", lineHeight: 0.86, marginTop: 16 }}>
          {t("title")}{" "}
          <span className="ser">{t("titleAccent")}</span>
        </h2>

        <p className="reveal d2" style={{ marginTop: 20, fontSize: "clamp(1rem,1.4vw,1.3rem)", maxWidth: 430, lineHeight: 1.5, fontWeight: 500, opacity: 0.82 }}>
          {t("description")}
        </p>

        <a className="email-link reveal d2" href="mailto:Gab.Maglia@gmail.com">
          Gab.Maglia@gmail.com <span style={{ marginLeft: 14 }}>→</span>
        </a>

        <div className="contact-socials reveal d3">
          {links.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="social">
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: ".18em", textTransform: "uppercase", opacity: 0.6 }}>
                {link.name}
              </span>
              <span className="social-handle" style={{ fontSize: "clamp(1rem,1.4vw,1.3rem)", fontWeight: 700 }}>
                {link.handle}
              </span>
            </a>
          ))}
        </div>

        <div className="reveal d4" style={{ marginTop: "clamp(34px,5vh,60px)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".06em", opacity: 0.6 }}>
          © {new Date().getFullYear()} Gabriel Maglia — {t("footer")}
        </div>
      </div>
    </section>
  );
};

export default ContactPanel;
