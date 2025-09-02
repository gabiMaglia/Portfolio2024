'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/store";
import { IconSend, IconArrowMoveDown, IconArrowMoveUp } from "@tabler/icons-react";

const Work = () => {
  const userProyects = useUserStore((state) => state.proyects);
  const [expanded, setExpanded] = useState(false);

  const gridRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(0);

  // Recalcula alturas en mount, cambio de expanded y resize
  const recalcHeights = () => {
    const grid = gridRef.current;
    if (!grid) return;

    // Altura colapsada = alto de la PRIMERA CARD (una fila, porque tus cards son cuadradas)
    const firstCard = grid.firstElementChild ;
    const collapsed = firstCard ? firstCard.offsetHeight : 0;

    // Altura expandida = scrollHeight del grid
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

      {/* 🔹 WRAPPER con animación suave de altura */}
      <div
        className="overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{ maxHeight: maxHeight ? `${maxHeight}px` : undefined }}
      >
        <div
          ref={gridRef}
          className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 dark:text-black"
        >
          {userProyects.map((proyect) => (
            <div
              key={proyect.id}
              className="aspect-square max-w-[20rem] bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group"
              style={{ backgroundImage: `url(${proyect.img1_pro})` }}
            >
              <div className="bg-white w-10/12 h-[6rem] max-h-[6rem] rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7 shadow-lg">
                <div>
                  <h3 className="font-semibold">{proyect.title_pro}</h3>
                  <p className="text-sm text-gray-70 font-Ovo">{proyect.technologies_pro}</p>
                </div>
                <div className="border rounded-full border-black w-8 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-pink-300 transition">
                  <IconSend stroke={2} className="w-8 p-1" />
                </div>
              </div>
            </div>
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
    </div>
  );
};

export default Work;
