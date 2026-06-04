import { useUserStore } from "@/store/store";
import { useTranslations } from "next-intl";

const AboutPanel = () => {
  const t = useTranslations("About");
  const phrases = useUserStore((state) => state.phrases) || {};
  const skills = useUserStore((state) => state.skill) || [];
  const stackChips = skills.filter((s) => s.type === "hard").slice(0, 8);

  const paragraphs = [
    phrases.mainPhrase || t("para1"),
    phrases.phrase1    || t("para2"),
  ];

  return (
    <section className="panel p-ink" data-d-panel data-ui="paper">
      <div className="about-grid">
        {/* left — text */}
        <div className="col layer pll-mid">
          <span className="kicker reveal">02 — {t("title")}</span>

          <h2 className="display reveal d1" style={{ fontSize: "clamp(2.6rem,6vw,6rem)", margin: "18px 0 26px" }}>
            {t("headlinePt1")}<br />{t("headlinePt2")}<br />
            <span className="ser" style={{ color: "var(--accent)" }}>{t("headlineAccent")}</span>{" "}
            {t("headlineEnd")}
          </h2>

          <div className="about-paras reveal d2">
            {paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: "clamp(.98rem,1.2vw,1.16rem)", lineHeight: 1.6, opacity: 0.78, fontWeight: 500 }}>
                {p}
              </p>
            ))}
          </div>

          <div className="stats-row reveal d3">
            <div className="stat">
              <div className="display" style={{ color: "var(--accent)", fontSize: "clamp(2.4rem,4vw,3.4rem)", lineHeight: 1 }}>+4</div>
              <div style={{ fontSize: 12, opacity: 0.62, maxWidth: 150, lineHeight: 1.4, fontWeight: 500 }}>
                {t("statYearsLabel")}
              </div>
            </div>
            <div className="stat">
              <div className="display" style={{ color: "var(--accent)", fontSize: "clamp(2.4rem,4vw,3.4rem)", lineHeight: 1 }}>∞</div>
              <div style={{ fontSize: 12, opacity: 0.62, maxWidth: 150, lineHeight: 1.4, fontWeight: 500 }}>
                {t("statLearnLabel")}
              </div>
            </div>
          </div>
        </div>

        {/* right — portrait + stack */}
        <div className="col layer pll-fore about-right reveal d2">
          <div className="about-portrait">
            <img src="/gabi.png" alt="Gabriel Maglia" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span className="kicker" style={{ opacity: 0.55 }}>{t("stackLabel")}</span>
            <div className="chips">
              {stackChips.length > 0
                ? stackChips.map((skill) => (
                    <span key={skill.id} className="chip">{skill.name}</span>
                  ))
                : ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind", "React Native", "Figma"].map((name) => (
                    <span key={name} className="chip">{name}</span>
                  ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPanel;
