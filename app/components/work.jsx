"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { useUserStore } from "@/store/store";
import {
  IconSend,
  IconArrowMoveDown,
  IconArrowMoveUp,
} from "@tabler/icons-react";
import ProjectModal from "./project-modal";
import ProjectDetail from "./project-detail";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const Work = () => {
  const userProyects = useUserStore((state) => state.proyects);
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations("Work");
  const tm = useTranslations("ProjectModal");
  const gridRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(0);

  const [selectedProject, setSelectedProject] = useState(null);
  const openProject = (proyect) => setSelectedProject(proyect);
  const closeProject = () => setSelectedProject(null);

  const recalcHeights = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const firstCard = grid.firstElementChild;
    const collapsed = firstCard ? firstCard.offsetHeight : 0;
    const expandedHeight = grid.scrollHeight;
    setMaxHeight(expanded ? expandedHeight : collapsed);
  }, [expanded]);

  useLayoutEffect(() => {
    recalcHeights();
  }, [recalcHeights, userProyects]); 

  useEffect(() => {
    const onResize = () => recalcHeights();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [recalcHeights]); 

  const toggleShowMore = () => setExpanded((e) => !e);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="work"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="text-center mb-2 text-lg font-Ovo"
      >
        {t("portfolio")}
      </motion.h4>
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-5xl font-Ovo"
      >
        {t("title")}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center max-w-2xl mx-auto mt-15 mb-16 font-Ovo"
      >
        {t("description")}
      </motion.p>

      <motion.div

      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.7}}
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{ maxHeight: maxHeight ? `${maxHeight}px` : undefined }}
      >
        <div
          ref={gridRef}
          className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 dark:text-black"
        >
          {userProyects.map((proyect) => (
            <modal
              key={proyect.id}
              type="button"
              onClick={() => openProject(proyect)}
              className="aspect-square max-w-[20rem] bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group text-left focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-300"
              style={{ backgroundImage: `url(${proyect.img1_pro})` }}
            >
              <div className="bg-white dark:bg-neutral-900 w-10/12 h-[6rem] max-h-[6rem] rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7 shadow-lg border border-gray-200 dark:border-white/10">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {proyect.title_pro}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-Ovo">
                    {proyect.technologies_pro}
                  </p>
                </div>
                <div className="border rounded-full border-black dark:border-white w-8 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] dark:shadow-[2px_2px_0_rgba(255,255,255,0.8)] group-hover:bg-pink-300 dark:group-hover:bg-pink-500/40 transition">
                  <IconSend
                    stroke={2}
                    className="w-8 p-1 text-black dark:text-white"
                  />
                </div>
              </div>
            </modal>
          ))}
        </div>
      </motion.div>

      {userProyects.length > 0 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={toggleShowMore}
            className="w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-lightHover duration-500 dark:text-white dark:border-white dark:hover:bg-darkHover font-Ovo"
          >
            {expanded ? t("showLess") : t("showMore")}
            {expanded ? (
              <IconArrowMoveUp stroke={2} />
            ) : (
              <IconArrowMoveDown stroke={2} />
            )}
          </button>
        </div>
      )}

      <ProjectModal open={!!selectedProject} title={tm("title")} onClose={closeProject}>
        <ProjectDetail project={selectedProject} />
      </ProjectModal>
    </motion.div>
  );
};

export default Work;
