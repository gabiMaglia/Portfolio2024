import { useUserStore } from "@/store/store";
import { useTranslations } from "next-intl";
import { groupStack } from "@/lib/stack.mjs";

const AboutPanel = ({ index }) => {
  const t = useTranslations("About");
  const phrases = useUserStore((state) => state.phrases) || {};
  const skills = useUserStore((state) => state.skill) || [];
  const stack = groupStack(skills);

  const paragraphs = [
    phrases.mainPhrase || t("para1"),
    phrases.phrase1    || t("para2"),
  ];

  return (
    <section inert={index === 0 ? undefined : ""} className="panel p-ink" data-d-panel data-ui="paper">
      <div className="about-layout">

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
        </div>

        <div className="about-stack reveal d2">
          {stack.map(({ group, items }) => (
            <div key={group} className="stack-group">
              <h3 className="t-note stack-label">{t(`stackGroups.${group}`)}</h3>
              <ul className="stack-items">
                {items.map((name) => (
                  <li key={name} className="skill-name">{name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutPanel;
