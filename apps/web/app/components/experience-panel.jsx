import { useUserStore } from "@/store/store";
import { useTranslations } from "next-intl";
import { formatExpYear } from "@/lib/format-date.mjs";

const Year = ({ value }) =>
  /^\d{4}$/.test(value) ? <time dateTime={value}>{value}</time> : value;

const ExperiencePanel = ({ index }) => {
  const t = useTranslations("Experience");
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

        {experiences.length === 0 ? (
          <div className="t-note exp-empty">{t("empty")}</div>
        ) : (
          <ol className="layer pll-mid exp-list">
            {experiences.map((exp) => (
              <li key={exp.id} className="exp-row reveal">
                <span className="t-note exp-date">
                  <Year value={formatExpYear(exp.startDate_exp, t("present"))} />
                  {" — "}
                  <Year value={formatExpYear(exp.endDate_exp, t("present"))} />
                </span>
                <div className="exp-main">
                  <h3 className="display exp-company">{exp.institution_exp}</h3>
                  <span className="exp-role">{exp.title_exp}</span>
                </div>
                {exp.description_exp && <p className="ser exp-desc">{exp.description_exp}</p>}
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
};

export default ExperiencePanel;
