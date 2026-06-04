import { useUserStore } from "@/store/store";
import { useTranslations } from "next-intl";

const AboutPanel = () => {
  const t = useTranslations("About");
  const phrases = useUserStore((state) => state.phrases) || {};
  const skills = useUserStore((state) => state.skill) || [];
  const stackChips = skills.filter((s) => s.type === "hard").slice(0, 12);

  const paragraphs = [
    phrases.mainPhrase || t("para1"),
    phrases.phrase1    || t("para2"),
  ];

  const fallbackStack = [
    "React", "Next.js", "TypeScript", "Node.js",
    "PostgreSQL", "Tailwind", "React Native", "Figma",
  ];

  return (
    <section className="panel p-ink" data-d-panel data-ui="paper">
      <div className="about-layout">

        {/* ── kicker + headline ─────────────────────────── */}
        <div className="layer pll-back">
          <span className="kicker reveal">02 — {t("title")}</span>
          <h2 className="display reveal d1 about-headline">
            {t("headlinePt1")}<br />{t("headlinePt2")}<br />
            <span className="ser" style={{ color: "var(--accent)" }}>{t("headlineAccent")}</span>{" "}
            {t("headlineEnd")}
          </h2>
        </div>

        {/* ── paras  |  stats ───────────────────────────── */}
        <div className="layer pll-mid about-body">
          <div className="about-paras reveal d2">
            {paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: "clamp(.98rem,1.2vw,1.16rem)", lineHeight: 1.6, opacity: 0.78, fontWeight: 500 }}>
                {p}
              </p>
            ))}
          </div>

          <div className="about-stats reveal d3">
            <div className="stat">
              <div className="display" style={{ color: "var(--accent)", fontSize: "clamp(3rem,5vw,4.8rem)", lineHeight: 1 }}>+4</div>
              <div style={{ fontSize: 12, opacity: 0.62, maxWidth: 180, lineHeight: 1.4, fontWeight: 500, marginTop: 6 }}>
                {t("statYearsLabel")}
              </div>
            </div>
            <div className="stat">
              <div className="display" style={{ color: "var(--accent)", fontSize: "clamp(3rem,5vw,4.8rem)", lineHeight: 1 }}>∞</div>
              <div style={{ fontSize: 12, opacity: 0.62, maxWidth: 180, lineHeight: 1.4, fontWeight: 500, marginTop: 6 }}>
                {t("statLearnLabel")}
              </div>
            </div>
          </div>
        </div>

        {/* ── stack chips ───────────────────────────────── */}
        <div className="layer pll-fore about-stack reveal d4">
          <span className="kicker" style={{ opacity: 0.5, marginBottom: 12, display: "block" }}>{t("stackLabel")}</span>
          <div className="chips">
            {(stackChips.length > 0 ? stackChips : fallbackStack.map((n) => ({ id: n, name: n }))).map((skill) => (
              <span key={skill.id} className="chip">{skill.name}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutPanel;
