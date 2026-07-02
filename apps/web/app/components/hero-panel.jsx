import { useTranslations } from "next-intl";

const HeroPanel = () => {
  const t = useTranslations("Hero");

  return (
    <section className="panel p-paper" data-d-panel data-ui="ink">
      {/* ghost outline behind */}
      <div
        className="layer pll-back"
        style={{ position: "absolute", right: "-4vw", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 0 }}
        aria-hidden="true"
      >
        <span
          className="display outline"
          style={{ fontSize: "min(38vw, 30rem)", opacity: 0.1, whiteSpace: "nowrap", display: "block" }}
        >
          Maglia
        </span>
      </div>

      <div className="layer pll-fore col hero-wrap">
        <span className="kicker reveal" style={{ marginBottom: "clamp(18px,3vh,40px)" }}>
          {t("kicker")}
        </span>

        <div className="hero-mid">
          <h1 className="display hero-h1 reveal d1" style={{ fontSize: "clamp(4.2rem,15vw,17rem)" }}>
            <span style={{ display: "block" }}>Gabriel</span>
            <span style={{ display: "block" }}>Maglia</span>
          </h1>

          <div className="reveal d2 hero-below">
            <p className="ser" style={{ fontSize: "clamp(1.3rem,2.4vw,2.2rem)", lineHeight: 1.15, marginBottom: "clamp(18px,2.4vh,32px)" }}>
              {t("leadPre")} <span style={{ color: "var(--accent)" }}>{t("leadAccent")}</span> {t("leadPost")}
            </p>
            <p style={{ fontSize: "clamp(.9rem,1.1vw,1.05rem)", lineHeight: 1.6, opacity: 0.72, maxWidth: 440, fontWeight: 500 }}>
              {t("sub")}
            </p>
          </div>
        </div>

        <div className="reveal d3 hero-meta">
          <span className="tag-pill">
            <span className="dot" /> {t("available")}
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", opacity: 0.7 }}>
            {t("roles")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroPanel;
