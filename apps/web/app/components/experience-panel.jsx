import { useUserStore } from "@/store/store";
import { useLocale, useTranslations } from "next-intl";
import { formatExpDate } from "@/lib/format-date.mjs";

const ExperiencePanel = ({ index }) => {
  const t = useTranslations("Experience");
  const locale = useLocale();
  const experiences = useUserStore((state) => state.experiences) || [];

  return (
    <section inert={index === 0 ? undefined : ""} className="panel p-ink" data-d-panel data-ui="paper">
      <div className="exp-content">
        <div className="exp-header layer pll-back sec-head">
          <span className="t-kicker reveal">04 — {t("title")}</span>
          <h2 className="display t-title reveal d1">
            {t("headlinePt1")}{" "}
            <span className="ser accent">{t("headlineAccent")}</span>
          </h2>
        </div>

        <div className="layer pll-mid exp-list">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="exp-row reveal">
              <span className="t-note exp-num">{String(index + 1).padStart(2, "0")}</span>
              <span className="display exp-company">{exp.institution_exp}</span>
              <span className="exp-role">{exp.title_exp}</span>
              <span className="t-note exp-date">
                {formatExpDate(exp.startDate_exp, locale, t("present"))} — {formatExpDate(exp.endDate_exp, locale, t("present"))}
              </span>
            </div>
          ))}
          {experiences.length === 0 && (
            <div className="t-note exp-empty">{t("empty")}</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExperiencePanel;
