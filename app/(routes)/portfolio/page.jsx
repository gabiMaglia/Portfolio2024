"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "zustand";


const proyects = [
  {
    title: "Chevromax ",
    image:
      "https://res.cloudinary.com/atlasair/image/upload/v1707430114/portada_oyrwtl.png",
    description:
      "Here I work fixng some component bugs and upgrading the heroku server stack where the back end was hosted. Frontend bug fix: used car list loads..",
    technoligies: "VueJS, Express",
    github: "/",
    deploy: "/",
  },
  {
    title: "Gimnasio Craneo  ",
    image:
      "https://res.cloudinary.com/atlasair/image/upload/v1706819945/cranseo3_cx0y04.png",
    description: "Static Landing Page from scratch develope whit React",
    technoligies: "ReactJS, Express",
    github: "/",
    deploy: "/",
  },
  {
    title: "Pokedex PI  ",
    image:
      "https://res.cloudinary.com/atlasair/image/upload/v1708116694/poked_q8qtkp.png",
    description:
      "This is my project for Henry's bootcamp. Here, I used React in the front end and Express in the back end. The global state is managed by Redux, and for persistence, PostgreSQL through Sequelize",
    technoligies: "ReactJS, Express",
    github: "/",
    deploy: "/",
  },
  {
    title: "HiperMegaRed  ",
    image:
      "https://res.cloudinary.com/atlasair/image/upload/v1707430192/HMR_pnhnhw.jpg",
    description:
      "Full-featured e-commerce. My main contribution here was to develop the management system of creation, authentication and authorization for users",
    technoligies: "ReactJS, Express, Redux",
    github: "/",
    deploy: "/",
  },
];

const PortfolioPage = () => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
 
  return (
    <>
      <motion.div
        className="h-full"
        initial={{ y: "-200vh" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1 }}
      >
        <div className="h-[600vh] relative" ref={ref}>
          <div className="w-screen h-[calc(100vh-6rem)] flex items-center justify-center text-8xl text-center ">
            My Work
          </div>
          <div className="sticky top-0 flex h-screen gap-4 items-center overflow-hidden">
            <motion.div style={{ x }} className="flex">
              <div className="h-screen w-screen flex items-center justify-center bg-black " />
              {proyects.map((proyect, index) => (
                <div
                  key={index}
                  className="h-screen w-screen flex items-center justify-center bg-black "
                >
                  <div className="flex flex-col gap-8 text-white">
                    <h2 className= 'className="text-xl font-bold md:text-4xl lg:text-6xl xl:text-8xl'>{proyect.title}</h2>
                    <div className="relative w-80 h-56 md:w-96 md:h-64 lg:w-[500px] lg:h-[350px] xl:w-[600px] xl:h-[420px]">
                      <Image src={proyect.image} alt={proyect.title} fill />
                    </div>
                    <p className="w-80 md:w96 lg:w-[500px] lg:text-lg xl:w-[600px]"> {proyect.description}</p>
                    <i>{proyect.technoligies}</i>
                    <span className= 'flex'>
                      <Link  className="flex justify-end" href={proyect.github}>
                        <button  className="p-2 text-sm md:p-4 md:text-md lg:p-8 lg:text-lg bg-white text-gray-600 font-semibold m-4 rounded">Deploy</button>
                      </Link>
                      <Link  className="flex justify-end" href={proyect.deploy}>
                        <button  className="p-2 text-sm md:p-4 md:text-md lg:p-8 lg:text-lg bg-white text-gray-600 font-semibold m-4 rounded">Github</button>
                      </Link>
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
            <div className="w-screen h-screen flex flex-col gap-16 items-center text-center">
              <h2 className="text-8xl">Do you like my work?</h2>
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
