import { useUserStore } from "@/store/store";
import Image from "next/image";
import { useTranslations } from "next-intl";

const ProjectsPanel = ({ index }) => {
  const t = useTranslations("Work");
  const projects = useUserStore((state) => state.proyects) || [];
  const visible = projects.slice(0, 4);

  return (
    <section inert={index === 0 ? undefined : ""} className="panel p-paper" data-d-panel data-ui="ink">
      <div className="proj-content" style={{ width: "100%" }}>
        {/* header */}
        <div className="layer pll-back proj-head">
          <span className="kicker reveal">03 — {t("portfolio")}</span>
          <div className="reveal d1" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <h2 className="display" style={{ fontSize: "clamp(2.4rem,5.5vw,5.4rem)", lineHeight: 0.9 }}>
              {t("headlineLine1")}<br />{t("headlineLine2")}
            </h2>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.6, opacity: 0.62, maxWidth: 300, paddingBottom: 8 }}>
              {t("description")}
            </p>
          </div>
        </div>

        {/* grid */}
        <div className="layer pll-mid reveal d2 proj-grid">
          {visible.map((project, index) => {
            const thumb = project.img1_pro || project.img2_pro || project.img3_pro || null;
            const num = String(index + 1).padStart(2, "0");
            const href = project.deployLink_pro || project.githubLink_pro || null;
            // Sin link no hay <a href="#">: sería un control que no lleva a ningún lado
            const linkProps = href ? { href, target: "_blank", rel: "noreferrer" } : {};
            const Card = href ? "a" : "div";
            return (
              <Card key={project.id} className="proj-card" {...linkProps}>
                <div className="proj-card-thumb">
                  {thumb ? (
                    <Image
                      src={thumb}
                      alt={project.title_pro}
                      fill
                      sizes="(max-width: 720px) 90vw, 25vw"
                      quality={70}
                    />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: "rgba(22,20,15,.08)", display: "grid", placeItems: "center" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, opacity: 0.4 }}>{num}</span>
                    </div>
                  )}
                </div>
                <div className="proj-card-meta">
                  <span className="display" style={{ fontSize: "1.5rem", lineHeight: 1, color: "var(--accent)" }}>{num}</span>
                  <div className="col" style={{ gap: 3, flex: 1 }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{project.title_pro}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: ".02em", opacity: 0.6 }}>
                      {project.technologies_pro}
                    </span>
                  </div>
                  <span
                    className="card-arrow"
                    style={{ fontSize: 16, opacity: 0, transform: "translate(-4px, 4px)", transition: "all .3s var(--ease)" }}
                  >
                    ↗
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPanel;
