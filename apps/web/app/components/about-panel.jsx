import { useUserStore } from "@/store/store";
import { useTranslations } from "next-intl";

const AboutPanel = ({ index }) => {
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
    <section inert={index === 0 ? undefined : ""} className="panel p-ink" data-d-panel data-ui="paper">
      <div className="about-layout">

        {/* LEFT — everything stacked */}
        <div className="about-left col layer pll-mid">
          <div className="sec-head">
            <span className="t-kicker reveal">02 — {t("title")}</span>

            <h2 className="display t-title reveal d1">
              {t("headlinePt1")}<br />{t("headlinePt2")}<br />
              <span className="ser accent">{t("headlineAccent")}</span>{" "}
              {t("headlineEnd")}
            </h2>
          </div>

          <div className="about-paras reveal d2">
            {paragraphs.map((p, i) => (
              <p key={i} className="t-body">{p}</p>
            ))}
          </div>

          <div className="about-stats reveal d3">
            <div className="stat">
              <div className="display stat-num">+4</div>
              <div className="t-label stat-label">{t("statYearsLabel")}</div>
            </div>
            <div className="stat">
              <div className="display stat-num">∞</div>
              <div className="t-label stat-label">{t("statLearnLabel")}</div>
            </div>
          </div>
        </div>

        {/* RIGHT — stack, same height as left, items spread top to bottom */}
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
