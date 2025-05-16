"use client";

import { useRef, useState, useEffect } from "react";
import Brain from "@/components/brain";
import { motion, useInView, useScroll } from "framer-motion";
import { useUserStore } from "@/store/store";
import Image from "next/image";
import Signature from "@/components/signature";

const AboutPage = () => {
  const [state, setState] = useState({
    experiences: [],
    skills: [],
    phrases: [],
  });

  const userExperiences = useUserStore((state) => state.experiences);
  const userSkills = useUserStore((state) => state.skill);
  const userPhrases = useUserStore((state) => state.phrases);
  console.log(userPhrases)
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({ container: containerRef });

  const skillRef = useRef();
  const isSkillRefInView = useInView(skillRef, { margin: "-100px" });

  const experienceRef = useRef();
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });

  useEffect(() => {
    try {
      const sortedExperiences = userExperiences?.sort(
        (a, b) => a.startDate_exp.split(" ")[1] - b.startDate_exp.split(" ")[1]
      );
  
      setState({
        experiences: sortedExperiences,
        skills: userSkills,
        phrases: userPhrases,
      });
      
    } catch (error) {
      console.error(error)
    }
  }, [userSkills, userPhrases, userExperiences]);

  return (
    <>
      <motion.div
        className="h-full md:flex"
        initial={{ y: "-200dvh" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1 }}
      >
        {/* CONTAINER */}
        <div
          className="h-window w-full overflow-scroll overflow-x-hidden lg:flex "
          ref={containerRef}
        >
          {/* TEXTCONTAINER */}
          <div className="p-8 sm:p-8 md:px-12 lg:px-20 xl:px-48 flex flex-col gap-20 md:gap-32 lg:gap-48 xl:gap-64 lg:w-2/3 lg:pr-0">
            {/* BIOGRAPHYCONTAINER */}
            <div className="flex flex-col justify-center text-center md:text-left gap-12 pt-6 pb-14 md:pt-36 lg:pt-24  ">
              <h2 className="font-bold text-xl md:text-2xl backdrop-blur-sm ">About Me</h2>
              <p className="text-sm md:text-base  text-justify backdrop-blur-sm ">{state?.phrases?.mainPhrase}</p>
              <blockquote className="italic mt-[-30px] mb-[-10px] md:mt-0 md:mb-0 backdrop-blur-sm">
                {` "${state?.phrases?.phrase1}"`}
              </blockquote>
              <div className="self-end">
                <Signature/>
              </div>
              {/* ScrollSVG */}
              <motion.svg
              className="self-center md:self-start backdrop-blur-sm"
                initial={{ opacity: 0.2, y: 0 }}
                animate={{ opacity: 1, y: "10px" }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "easeOut",
                }}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width={50}
                height={50}
              >
                <path
                  d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                  stroke="#000000"
                  strokeWidth="1"
                ></path>
                <path d="M12 6V14" stroke="#000000" strokeWidth="1"></path>
                <path
                  d="M15 11L12 14L9 11"
                  stroke="#000000"
                  strokeWidth="1"
                ></path>
              </motion.svg>
            </div>
            {/* SKILLSCONTAINER */}
            <div
              className="flex flex-col gap-12 text-center md:text-left  pt-8  justify-center pb-14 "
              ref={skillRef}
            >
              <motion.h2
                className="font-bold text-2xl"
                initial={{ x: "-300px" }}
                animate={isSkillRefInView ? { x: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                <p className="font-bold uppercase">Skills</p>
              </motion.h2>
              {/* SkillList */}
              <motion.h4
                className="font-semi-bold text-2xl"
                initial={{ x: "-300px" }}
                animate={isSkillRefInView ? { x: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                <p className="font-semibold">Hard</p>
              </motion.h4>
              <motion.div
                initial={{ x: "-300px" }}
                animate={isSkillRefInView ? { x: 0 } : {}}
                className="flex justify-center md:justify-normal flex-wrap gap-4"
              >
                {state?.skills?.map(
                  (e, key) =>
                    e.type === "hard" && (
                      <div
                        key={key}
                        className="flex items-center justify-center w-32 h-22 gap-3 rounded p-2 text-sm bg-black text-white hover:bg-white hover:text-black z-10"
                      >
                        <Image
                          src={e.img_skill}
                          alt={e.name}
                          height={18}
                          width={18}
                        ></Image>
                        <p>{e.name}</p>
                      </div>
                    )
                )}
              </motion.div>
              
              <motion.h4
                className="font-semi-bold text-2xl"
                initial={{ x: "-300px" }}
                animate={isSkillRefInView ? { x: 0 } : {}}
                transition={{ delay: 0.2 }}
                >
                <p className="font-semibold">Soft</p>
              </motion.h4>
              <motion.div
                initial={{ x: "-300px" }}
                animate={isSkillRefInView ? { x: 0 } : {}}
                className="flex justify-center md:justify-normal flex-wrap gap-4"
              >
                {state?.skills?.map(
                  (e, key) =>
                    e.type === "soft" && (
                      <div
                        key={key}
                        className=" flex items-center justify-center w-32 h-22 gap-3 rounded p-2 text-sm bg-black text-white hover:bg-white hover:text-black z-10"
                      >
                        <Image
                          className="hover:backdrop-invert-0 p-1 bg-black"
                          src={e.img_skill}
                          alt={e.name}
                          height={18}
                          width={18}
                        ></Image>
                        <p>{e.name}</p>
                      </div>
                    )
                )}
              </motion.div>
              {/* ScrollSVG */}
              <motion.svg
              className="self-center md:self-start"
                initial={{ opacity: 0.2, y: 0 }}
                animate={{ opacity: 1, y: "10px" }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "easeOut",
                }}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width={50}
                height={50}
              >
                <path
                  d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                  stroke="#000000"
                  strokeWidth="1"
                ></path>
                <path d="M12 6V14" stroke="#000000" strokeWidth="1"></path>
                <path
                  d="M15 11L12 14L9 11"
                  stroke="#000000"
                  strokeWidth="1"
                ></path>
              </motion.svg>
            </div>
            {/* EXPERIENCECONTAINER */}
            <div
              className="flex flex-col text-center md:text-left gap-12  pt-8 justify-center pb-14"
              ref={experienceRef}
            >
              <motion.div
                className=""
                initial={{ x: "-1000px" }}
                animate={isExperienceRefInView ? { x: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                {/* EXPERIENCE TITLE */}
                <h2 className="font-bold pb-24 text-2xl">EXPERIENCE</h2>

                {/* EXPERIENCE LIST ITEM */}
                <div className="flex flex-col">
                  {state?.experiences?.map((item, index) => {
                    const isOven = index % 2 === 0;

                    return (
                      <div key={index} className="flex justify-between">
                        {
                          /* LEFT */
                          !isOven ? (
                            <div className="w-1/3 flex flex-col justify-between md:justify-evenly lg:justify-around ">
                              <div className=" p-1  bg-white font-semibold rounded-b-lg rounded-s-lg">
                                {item.title_exp}
                              </div>

                              <div className="p-3 text-xs md:text-sm md:text-justify lg:text-left italic">
                                {item.description_exp}
                              </div>

                              <div className="py-3 text-red-400 text-sm font-semibold">
                                {`${item.startDate_exp} to ${item.endDate_exp}`}
                              </div>

                              <div className="p-1 rounded bg-white text-sm font-semibold w-fit">
                                {item.institution_exp}
                              </div>
                            </div>
                          ) : (
                            <div className="w-1/3 "></div>
                          )
                        }
                        {/* CENTER */}
                        <div className="w-1/6 flex justify-center">
                          {/* LINE */}
                          <div className="w-0.5 md:w-1 h-full bg-black rounded relative">
                            {/* LINE CIRCLE */}
                            <div className="absolute w-4 h-4 md:w-5 md:h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
                          </div>
                        </div>
                        {
                          /* RIGHT  */
                          isOven ? (
                            <div className="w-1/3 flex flex-col justify-between ">
                              <div className=" p-1  bg-white font-semibold rounded-b-lg rounded-s-lg">
                                {item.title_exp}
                              </div>

                              <div className="py-3 text-xs md:text-sm md:text-justify lg:text-left italic">
                                {item.description_exp}
                              </div>

                              <div className="p-3 text-red-400 text-sm font-semibold">
                                {`${item.startDate_exp} to ${item.endDate_exp}`}
                              </div>

                              <div className="p-1 rounded bg-white text-sm font-semibold w-fit">
                                {item.institution_exp}
                              </div>
                            </div>
                          ) : (
                            <div className="w-1/3 "></div>
                          )
                        }
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
          {/* SVGCONTAINER */}
          <div className="hidden lg:block w-1/3 sticky right-[-20px] top-10">
            <Brain scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AboutPage;
