import { useUserStore } from "@/store/store";
import { useTranslations } from "next-intl";

const AboutPanel = () => {
  const t = useTranslations("About");
  const phrases = useUserStore((state) => state.phrases) || {};
  const skills = useUserStore((state) => state.skill) || [];
  const stackChips = skills.filter((s) => s.type === "hard").slice(0, 10);

  const paragraphs = [
    phrases.mainPhrase || t("para1"),
    phrases.phrase1    || t("para2"),
  ];

  const fallbackStack = [
    "React", "Next.js", "TypeScript", "Node.js",
    "PostgreSQL", "Tailwind", "React Native", "Figma",
  ];

  const stackItems = stackChips.length > 0
    ? stackChips
    : fallbackStack.map((n) => ({ id: n, name: n }));

  return (
    <section className="panel p-ink" data-d-panel data-ui="paper">
      <div className="about-layout">

        {/* ── LEFT — kicker + headline + [paras | stats] ── */}
        <div className="col layer pll-mid about-left">
          <span className="kicker reveal">02 — {t("title")}</span>

          <h2 className="display reveal d1 about-headline">
            {t("headlinePt1")}<br />{t("headlinePt2")}<br />
            <span className="ser" style={{ color: "var(--accent)" }}>{t("headlineAccent")}</span>{" "}
            {t("headlineEnd")}
          </h2>

          {/* paras + stats side by side */}
          <div className="about-body reveal d2">
            <div className="about-paras">
              {paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: "clamp(.98rem,1.2vw,1.16rem)", lineHeight: 1.6, opacity: 0.78, fontWeight: 500 }}>
                  {p}
                </p>
              ))}
            </div>

            <div className="about-stats reveal d3">
              <div className="stat">
                <div className="display" style={{ color: "var(--accent)", fontSize: "clamp(2.4rem,4vw,3.8rem)", lineHeight: 1 }}>+4</div>
                <div style={{ fontSize: 12, opacity: 0.62, maxWidth: 150, lineHeight: 1.4, fontWeight: 500, marginTop: 6 }}>
                  {t("statYearsLabel")}
                </div>
              </div>
              <div className="stat">
                <div className="display" style={{ color: "var(--accent)", fontSize: "clamp(2.4rem,4vw,3.8rem)", lineHeight: 1 }}>∞</div>
                <div style={{ fontSize: 12, opacity: 0.62, maxWidth: 150, lineHeight: 1.4, fontWeight: 500, marginTop: 6 }}>
                  {t("statLearnLabel")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT — stack column (where image was) ─────── */}
        <div className="about-stack reveal d2">
          {stackItems.map((skill) => (
            <span key={skill.id} className="skill-name">{skill.name}</span>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutPanel;
