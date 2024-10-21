"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useUserStore } from "@/store/store";
import ProyectCard from "@/components/ProyectCard";


const PortfolioPage = () => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const [proyects, setProyects] = useState([]);

  const userProyects = useUserStore((state) => state.proyects);

  useEffect(() => {
    setProyects(userProyects);
  }, [userProyects]);

  return (
    <>
      <motion.div
        className="h-full"
        initial={{ y: "-200vh" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1 }}
      >
        <div className="h-[600vh] relative" ref={ref}>
          <div className="w-screen h-[calc(100vh-6rem)] flex items-center justify-center text-4xl md:text-6xl lg:text-8xl text-center ">
            My Work
          </div>
          <div className="sticky top-0 flex h-screen gap-4 items-center overflow-hidden isolate rounded-xl bg-white/20 shadow-lg ring-2 ring-black/5">
            <div>
              <motion.div style={{ x }} className="flex  will-change-transform">
                <div className="h-screen w-screen flex items-center justify-center px-10 z-10" />
                <div className="h-screen w-screen flex items-center justify-center "></div>
                {proyects?.map((proyect, index) => (
                  <div
                    key={index}
                    className="h-screen w-screen flex items-center gap-6 justify-center "
                  >
                    <ProyectCard proyect={proyect} />
                  </div>
                ))}
                <div className="h-screen w-screen flex items-center justify-center "></div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="w-screen h-screen flex flex-col gap-16 items-center text-center justify-center">
          <h2 className="text-4xl md:text-6xl lg:text-8xl">Do you like my work?</h2>
          <div className="relative">
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              viewBox="0 0 300 300"
              className="w-64 h-64 md:w-[500px] md:h-[500px] "
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
                />
              </defs>
              <text fill="#000">
                <textPath xlinkHref="#circlePath" className="text-xl">
                  Full Stack Developer
                </textPath>
              </text>
            </motion.svg>
            <Link
              href="/contact"
              className="w-16 h-16 md:w-28 md:h-28 absolute top-0 left-0 right-0 bottom-0 m-auto bg-black text-white rounded-full flex items-center justify-center"
            >
              Hire Me
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PortfolioPage;
