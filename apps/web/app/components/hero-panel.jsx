import { useTranslations } from "next-intl";

const HeroPanel = () => {
  const t = useTranslations("Hero");

  return (
    <section className="panel p-paper" data-d-panel data-ui="ink">
      {/* ghost outline behind */}
      <div className="ghost" aria-hidden="true">
        <span className="display outline ghost__text">Maglia</span>
      </div>

      <div className="layer pll-fore col hero-wrap">
        <span className="t-kicker hero-kicker reveal">{t("kicker")}</span>

        <div className="hero-mid">
          <h1 className="display hero-h1 reveal d1">
            <span>Gabriel</span>
            <span>Maglia</span>
          </h1>

          <div className="reveal d2 hero-below">
            <p className="t-lead hero-lead">
              {t("leadPre")} <span className="accent">{t("leadAccent")}</span> {t("leadPost")}
            </p>
            <p className="t-body hero-sub">{t("sub")}</p>
          </div>
        </div>

        <div className="reveal d3 hero-meta">
          <span className="tag-pill">
            <span className="dot" /> {t("available")}
          </span>
          <span className="t-meta">{t("roles")}</span>
        </div>
      </div>
    </section>
  );
};

export default HeroPanel;
