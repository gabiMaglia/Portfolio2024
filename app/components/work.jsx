'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/store";
import { IconSend, IconArrowMoveDown, IconArrowMoveUp } from "@tabler/icons-react";
import ProjectModal from "./project-modal";
import ProjectDetail from "./project-detail";

const Work = () => {
  const userProyects = useUserStore((state) => state.proyects);
  const [expanded, setExpanded] = useState(false);

  const gridRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(0);

  // Modal state
  const [selectedProject, setSelectedProject] = useState(null);
  const openProject = (proyect) => setSelectedProject(proyect);
  const closeProject = () => setSelectedProject(null);

  const recalcHeights = () => {
    const grid = gridRef.current;
    if (!grid) return;
    const firstCard = grid.firstElementChild;
    const collapsed = firstCard ? firstCard.offsetHeight : 0;
    const expandedHeight = grid.scrollHeight;
    setMaxHeight(expanded ? expandedHeight : collapsed);
  };

  useLayoutEffect(() => {
    recalcHeights();
  }, [expanded, userProyects]);

  useEffect(() => {
    const onResize = () => recalcHeights();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggleShowMore = () => setExpanded((e) => !e);

  return (
    <div id="work" className="w-full px-[12%] py-10 scroll-mt-20">
      <h4 className="text-center mb-2 text-lg font-Ovo">My portfolio</h4>
      <h2 className="text-center text-5xl font-Ovo">My latest work</h2>
      <p className="text-center max-w-2xl mx-auto mt-15 mb-16 font-Ovo">
        Welcome to my development porfolio! explore a collection of projects
        showcasing my expertise in front-end development
      </p>

      {/* Grid con colapso/expand */}
      <div
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{ maxHeight: maxHeight ? `${maxHeight}px` : undefined }}
      >
        <div
          ref={gridRef}
          className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 dark:text-black"
        >
          {userProyects.map((proyect) => (
            <button
              key={proyect.id}
              type="button"
              onClick={() => openProject(proyect)}
              className="aspect-square max-w-[20rem] bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group text-left focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-300"
              style={{ backgroundImage: `url(${proyect.img1_pro})` }}
            >
              <div className="bg-white dark:bg-neutral-900 w-10/12 h-[6rem] max-h-[6rem] rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7 shadow-lg border border-gray-200 dark:border-white/10">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{proyect.title_pro}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-Ovo">{proyect.technologies_pro}</p>
                </div>
                <div className="border rounded-full border-black dark:border-white w-8 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] dark:shadow-[2px_2px_0_rgba(255,255,255,0.8)] group-hover:bg-pink-300 dark:group-hover:bg-pink-500/40 transition">
                  <IconSend stroke={2} className="w-8 p-1 text-black dark:text-white" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {userProyects.length > 0 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={toggleShowMore}
            className="w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-lightHover duration-500 dark:text-white dark:border-white dark:hover:bg-darkHover font-Ovo"
          >
            {expanded ? "Show less" : "Show more"}
            {expanded ? <IconArrowMoveUp stroke={2} /> : <IconArrowMoveDown stroke={2} />}
          </button>
        </div>
      )}

      {/* Modal */}
      <ProjectModal open={!!selectedProject} onClose={closeProject}>
        <ProjectDetail project={selectedProject} />
      </ProjectModal>
    </div>
  );
};

export default Work;
