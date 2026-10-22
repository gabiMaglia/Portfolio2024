import { useUserStore } from "@/store/store";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCarousel } from "@/hooks/use-carousel";
import { formatCounter } from "@/lib/carousel.mjs";
import CarouselControls from "./carousel-controls";

const ProjectsPanel = ({ index }) => {
  const t = useTranslations("Work");
  const projects = useUserStore((state) => state.proyects) || [];
  const carousel = useCarousel(projects.length);

  return (
    <section inert={index === 0 ? undefined : ""} className="panel p-paper" data-d-panel data-ui="ink">
      <div className="proj-content">
        {/* header */}
        <div className="layer pll-back proj-head sec-head">
          <span className="t-kicker reveal">03 — {t("portfolio")}</span>
          <div className="reveal d1 proj-head-row">
            <h2 className="display t-title">
              {t("headlineLine1")}<br />{t("headlineLine2")}
            </h2>
            <p className="t-note proj-desc">{t("description")}</p>
          </div>
        </div>

        {/* grid */}
        {/* paralaje y reveal en elementos distintos: ADR-004 */}
        <div className="layer pll-mid proj-grid-wrap">
        <div
          className="reveal d2 proj-carousel"
          role="region"
          aria-roledescription={t("carouselRole")}
          aria-label={t("carousel")}
        >
        <div
          ref={carousel.ref}
          className="proj-grid"
          data-hscroll
          tabIndex={0}
          onKeyDown={carousel.onKeyDown}
        >
          {projects.map((project, index) => {
            const thumb = project.img1_pro || project.img2_pro || project.img3_pro || null;
            const num = String(index + 1).padStart(2, "0");
            const href = project.deployLink_pro || project.githubLink_pro || null;
            // Sin link no hay <a href="#">: sería un control que no lleva a ningún lado
            const linkProps = href ? { href, target: "_blank", rel: "noreferrer" } : {};
            const Card = href ? "a" : "div";
            const title = project.title_pro?.trim();
            const tech = project.technologies_pro?.trim();
            const alt = tech ? t("thumbAlt", { title, tech }) : t("thumbAltNoTech", { title });
            return (
              <Card key={project.id} className="proj-card" {...linkProps}>
                <div className="proj-card-thumb">
                  {thumb ? (
                    <Image
                      src={thumb}
                      alt={alt}
                      fill
                      sizes="(max-width: 768px) 90px, 30vw"
                      quality={70}
                    />
                  ) : (
                    <div className="proj-card-empty">
                      <span className="t-fine">{num}</span>
                    </div>
                  )}
                </div>
                <div className="proj-card-meta">
                  <span className="display proj-card-num">{num}</span>
                  <div className="col proj-card-text">
                    <span className="proj-card-title">{project.title_pro}</span>
                    <span className="t-fine">{project.technologies_pro}</span>
                  </div>
                  {href && <span className="sr-only">{t("external")}</span>}
                  <span className="card-arrow" aria-hidden="true">↗</span>
                </div>
              </Card>
            );
          })}
        </div>
        {projects.length > 0 && (
          <CarouselControls
            counter={formatCounter(carousel.index, projects.length)}
            prevLabel={t("prev")}
            nextLabel={t("next")}
            onPrev={() => carousel.go(-1)}
            onNext={() => carousel.go(1)}
            prevDisabled={carousel.atStart}
            nextDisabled={carousel.atEnd}
          />
        )}
        </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPanel;
