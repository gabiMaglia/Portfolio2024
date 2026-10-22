import { useUserStore } from "@/store/store";
import { useTranslations } from "next-intl";
import CopyEmail from "./copy-email";

const EMAIL = "Gab.Maglia@gmail.com";

const HARDCODED_LINKS = [
  { id: "gh", name: "GitHub",   url: "https://github.com/gabiMaglia",          handle: "gabiMaglia" },
  { id: "li", name: "LinkedIn", url: "https://linkedin.com/in/gabriel-maglia", handle: "gabriel-maglia" },
  { id: "cv", name: "CV",       url: "/Gabriel Maglia - Fullstack Developer ESP.pdf", handle: "Descargar PDF" },
];

const ContactPanel = ({ index }) => {
  const t = useTranslations("Contact");
  const socials = useUserStore((state) => state.social) || [];

  const links = (socials.length > 0
    ? socials.map((s) => ({
        id: s.id,
        name: s.name,
        url: s.url,
        handle: s.url.replace(/^https?:\/\//, "").split("/").pop() || s.name,
      }))
    : HARDCODED_LINKS
  ).filter((l) => !l.url.startsWith("mailto:") && !/mail/i.test(l.name));

  return (
    <section inert={index === 0 ? undefined : ""} className="panel p-accent" data-d-panel data-ui="ink">
      {/* scrolling marquee background */}
      <div className="layer pll-back mq-wrap" aria-hidden="true">
        <div className="mq-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="display outline mq-word">
              {t("marqueeWord")}&nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="layer pll-fore contact-wrap">
        <div className="sec-head">
          <span className="t-kicker reveal">05 — {t("title")}</span>

          <h2 className="display t-title t-title--2xl reveal d1">
            {t("title")}{" "}
            <span className="ser">{t("titleAccent")}</span>
          </h2>
        </div>

        <p className="t-body contact-lead reveal d2">{t("description")}</p>

        <CopyEmail
          className="reveal d2"
          email={EMAIL}
          copiedLabel={t("copied")}
          hint={t("copyHint")}
        />

        <div className="contact-socials reveal d3">
          {links.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="social-name">
              {link.name}
            </a>
          ))}
        </div>

        <div className="t-fine contact-foot reveal d4">
          © {new Date().getFullYear()} Gabriel Maglia — {t("footer")}
        </div>
      </div>
    </section>
  );
};

export default ContactPanel;
