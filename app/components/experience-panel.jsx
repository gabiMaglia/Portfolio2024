import { useUserStore } from "@/store/store";
import { useTranslations } from "next-intl";

const ExperiencePanel = () => {
  const t = useTranslations("Experience");
  const experiences = useUserStore((state) => state.experiences) || [];

  return (
    <section className="panel p-ink" data-d-panel data-ui="paper">
      <div className="exp-content" style={{ width: "100%", maxWidth: 1280, margin: "0 auto" }}>
        <div className="exp-header layer pll-back col" style={{ marginBottom: "clamp(28px,5vh,64px)" }}>
          <span className="kicker reveal">04 — {t("title")}</span>
          <h2 className="display reveal d1" style={{ fontSize: "clamp(2.6rem,6vw,6rem)", marginTop: 14 }}>
            {t("headlinePt1")}{" "}
            <span className="ser" style={{ color: "var(--accent)" }}>{t("headlineAccent")}</span>
          </h2>
        </div>

        <div className="layer pll-mid exp-list">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="exp-row reveal" style={{ transitionDelay: `${index * 0.07}s` }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, opacity: 0.5 }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="display" style={{ fontSize: "clamp(1.6rem,3.4vw,3rem)", lineHeight: 1 }}>
                {exp.institution_exp}
              </span>
              <span style={{ fontSize: "clamp(.9rem,1.1vw,1.05rem)", opacity: 0.72, fontWeight: 500 }}>
                {exp.title_exp}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".08em", opacity: 0.6, justifySelf: "end" }}>
                {exp.startDate_exp} — {exp.endDate_exp}
              </span>
            </div>
          ))}
          {experiences.length === 0 && (
            <div style={{ padding: "clamp(28px,5vh,56px) 4px", opacity: 0.4, fontFamily: "var(--font-mono)", fontSize: 12 }}>
              {t("empty")}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExperiencePanel;
