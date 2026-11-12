import { useState } from "react";
import { useUserStore } from "@/store/store";
import Image from "next/image";
import { useTranslations } from "next-intl";

const thumbOf = (project) => project.img1_pro || project.img2_pro || project.img3_pro || null;
const hrefOf = (project) => project.deployLink_pro || project.githubLink_pro || null;
const metaOf = (project) => [project.kind_pro, project.year_pro].filter(Boolean).join(", ");
// Sin link no hay <a href="#">: sería un control que no lleva a ningún lado
const linkProps = (href) => (href ? { href, target: "_blank", rel: "noreferrer" } : {});

const ProjectsPanel = ({ index }) => {
  const t = useTranslations("Work");
  const projects = useUserStore((state) => state.proyects) || [];
  const [activeId, setActiveId] = useState(null);
  const active = projects.find((project) => project.id === activeId) ?? projects[0];
  const Plate = active && hrefOf(active) ? "a" : "div";

  return (
    <section inert={index === 0 ? undefined : ""} className="panel p-paper" data-d-panel data-ui="ink">
      <div className="proj-content">
        {/* header */}
        <div className="layer pll-back proj-head sec-head">
          <span className="t-kicker reveal">03 — {t("portfolio")}</span>
          <div className="reveal d1 proj-head-row">
            <h2 className="display t-title">{t("headline")}</h2>
            <p className="t-note proj-desc">{t("description")}</p>
          </div>
        </div>

        {/* paralaje y reveal en elementos distintos: ADR-004 */}
        <div className="layer pll-mid proj-grid-wrap">
          {active && (
            <div className="reveal d2 work-stage">
              {/* portada: refleja la fila activa; el contenido accesible vive en el índice */}
              <div className="work-plate" aria-hidden="true">
                <Plate className="work-plate-image" tabIndex={-1} {...linkProps(hrefOf(active))}>
                  {projects.map((project) =>
                    thumbOf(project) ? (
                      <Image
                        key={project.id}
                        src={thumbOf(project)}
                        alt=""
                        fill
                        sizes="58vw"
                        quality={75}
                        data-on={project.id === active.id ? "" : undefined}
                      />
                    ) : null
                  )}
                  <span className="work-plate-fig">
                    Fig. {String(projects.indexOf(active) + 1).padStart(2, "0")} — {active.title_pro}
                  </span>
                </Plate>
                <div className="work-plate-caption">
                  <span className="display work-plate-title">{active.title_pro}</span>
                  <p className="work-plate-text">
                    {metaOf(active) && <span className="ser">{metaOf(active)}. </span>}
                    {active.description_pro}
                  </p>
                  <span className="t-fine">{active.technologies_pro}</span>
                </div>
              </div>

              <ol className="work-index" aria-label={t("index")}>
                {projects.map((project) => {
                  const href = hrefOf(project);
                  const thumb = thumbOf(project);
                  const Row = href ? "a" : "div";
                  return (
                    <li key={project.id}>
                      <Row
                        className="work-row"
                        data-current={project.id === active.id ? "" : undefined}
                        onMouseEnter={() => setActiveId(project.id)}
                        onFocus={() => setActiveId(project.id)}
                        {...linkProps(href)}
                      >
                        {thumb && (
                          <span className="work-row-thumb">
                            <Image src={thumb} alt="" fill sizes="100vw" quality={70} />
                          </span>
                        )}
                        <h3 className="display work-row-title">{project.title_pro}</h3>
                        <span className="ser work-row-meta">{metaOf(project)}</span>
                        <span className="work-row-detail">
                          <span>{project.description_pro}</span>
                          <span className="t-fine">{project.technologies_pro}</span>
                          {href && <span className="sr-only">{t("external")}</span>}
                        </span>
                      </Row>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPanel;
