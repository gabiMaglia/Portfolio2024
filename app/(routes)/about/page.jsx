"use client";
import { useRef } from "react";
import Brain from "@/components/brain";
import { motion, useInView, useScroll } from "framer-motion";
import Image from "next/image";

const skills = [
  { img: "", skill: "Javascript" },
  { img: "", skill: "HTML" },
  { img: "", skill: "CSS" },
  { img: "", skill: "React" },
  { img: "", skill: "Redux" },
  { img: "", skill: "NextJs" },
  { img: "", skill: "Tailwind CSS" },
  { img: "", skill: "Express" },
  { img: "", skill: "Postgres SQL" },
  { img: "", skill: "MongoDB" },
];

const experienceList = [
  {
    img: "",
    company: "Genoma Studio",
    title: "Full-stack Developer",
    startDate: "Enero 2022",
    endDate: "Junio 2023",
    description:
      "I contributed to upgrading the versions of both hosting services (Heroku and Firebase), assisted with simple tasks, and participated in the construction of some React.js components.",
  },
  {
    img: "",
    company: "Apple",
    title: "Full-stack Developer",
    startDate: "Enero 2022",
    endDate: "Junio 2025",
    description:
      "I contributed to upgrading the versions of both hosting services (Heroku and Firebase), assisted with simple tasks, and participated in the construction of some React.js components.",
  },
  {
    img: "",
    company: "Genoma DAR",
    title: "Front-stack Developer",
    startDate: "Enero 2022",
    endDate: "Junio 2023",
    description:
      "I contributed to upgrading the versions of both hosting services (Heroku and Firebase), assisted with simple tasks, and participated in the construction of some React.js components.",
  },
];

const AboutPage = () => {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({ container: containerRef });

  const skillRef = useRef();
  const isSkillRefInView = useInView(skillRef, { margin: "-100px" });

  const experienceRef = useRef();
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });

  return (
    <>
      <motion.div
        className="h-full md:flex"
        initial={{ y: "-200vh" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1 }}
      >
        {/* CONTAINER */}
        <div
          className="h-full w-full  overflow-scroll overflow-x-hidden lg:flex "
          ref={containerRef}
        >
          {/* TEXTCONTAINER */}
          <div className="p-8 sm:p-8 md:px-12 lg:px-20 xl:px-48 flex flex-col gap-24 md:gap-32 lg:gap-48 xl:gap-64 lg:w-2/3 lg:pr-0">
            {/* BIOGRAPHYCONTAINER */}
            <div className="flex flex-col gap-12 pt-20 justify-center pb-48">
              <h2 className="font-bold text-2xl">About Me</h2>
              <p className="text-lg">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <span className="italic">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </span>
              <div className="self-end">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="104"
                  height="51"
                >
                  <path
                    d="M0 0 C0.99 0.33 1.98 0.66 3 1 C1.58442484 5.24672548 0.13754553 7.86245447 -3 11 C-4.53911294 12.79700352 -6.05831174 14.61116269 -7.5625 16.4375 C-8.34753906 17.38496094 -9.13257812 18.33242188 -9.94140625 19.30859375 C-11.62941566 21.5154979 -12.89363304 23.47030691 -14 26 C-7.39224297 22.1130841 -1.74243383 18.18349819 3.44140625 12.50390625 C5 11 5 11 7 11 C7 10.34 7 9.68 7 9 C9.97 8.505 9.97 8.505 13 8 C13 8.66 13 9.32 13 10 C11.0324413 11.85999285 8.94444402 13.53390198 6.84765625 15.24609375 C4.75201831 16.96005081 4.75201831 16.96005081 4 20 C2.34467377 21.01866229 0.67739862 22.01810813 -1 23 C-1.99 24.485 -1.99 24.485 -3 26 C-2.15695313 25.566875 -1.31390625 25.13375 -0.4453125 24.6875 C0.65039062 24.130625 1.74609375 23.57375 2.875 23 C3.96554688 22.443125 5.05609375 21.88625 6.1796875 21.3125 C9 20 9 20 11 20 C10.01048763 22.50536111 9.33667113 23.78183711 7.046875 25.265625 C2.53300435 27.20014099 -0.98243788 28.51462176 -6 28 C-6.495 26.515 -6.495 26.515 -7 25 C-8.3303125 25.99 -8.3303125 25.99 -9.6875 27 C-13 29 -13 29 -15.47314453 28.91503906 C-18.05668258 28.76492096 -18.05668258 28.76492096 -19.92529297 30.40527344 C-20.52486816 31.05012695 -21.12444336 31.69498047 -21.7421875 32.359375 C-22.41636719 33.06320313 -23.09054688 33.76703125 -23.78515625 34.4921875 C-24.47480469 35.23726562 -25.16445312 35.98234375 -25.875 36.75 C-37.58246931 49.27632822 -37.58246931 49.27632822 -46.4375 49.75 C-47.37722656 49.80671875 -48.31695312 49.8634375 -49.28515625 49.921875 C-51.65144944 49.98996977 -54.00803976 50.01789762 -56.375 50 C-59.81680055 49.88077364 -59.81680055 49.88077364 -62.40625 50.484375 C-70.56055727 52.10541199 -79.38683593 51.41059532 -87 48 C-89.93267366 44.93092291 -90.80347113 43.06999049 -91.5625 38.9375 C-90.79747046 34.94234576 -89.01330422 33.68080169 -86 31 C-76.72086972 25.10247696 -65.90422215 22.28216145 -55.4375 19.25 C-54.78195129 19.05950073 -54.12640259 18.86900146 -53.45098877 18.67272949 C-44.37303117 16.05410422 -35.2622599 13.86304152 -26 12 C-32.11443707 12.46701269 -38.04972085 13.35853932 -44.0625 14.5625 C-49.80293107 15.70333005 -55.14541058 16.31363872 -61 16 C-61.33 14.68 -61.66 13.36 -62 12 C-52.70424971 2.70424971 -34.14878707 0.9092707 -21.46606445 0.79785156 C-18.64193079 0.81824487 -15.82195498 0.88909347 -13 1 C-13 1.66 -13 2.32 -13 3 C-13.77859375 3.02578125 -14.5571875 3.0515625 -15.359375 3.078125 C-28.76577383 3.75771204 -43.03901361 5.5838853 -55.3203125 11.265625 C-57 12 -57 12 -59 12 C-59 12.66 -59 13.32 -59 14 C-46.89712853 12.02103416 -34.92221178 9.95787965 -23.08203125 6.734375 C-20 6 -20 6 -16 6 C-16 6.99 -16 7.98 -16 9 C-16.99 9.33 -17.98 9.66 -19 10 C-18.30132812 9.91621094 -17.60265625 9.83242187 -16.8828125 9.74609375 C-15.97273438 9.64425781 -15.06265625 9.54242188 -14.125 9.4375 C-13.22007813 9.33308594 -12.31515625 9.22867187 -11.3828125 9.12109375 C-9 9 -9 9 -7 10 C-6.773125 9.46375 -6.54625 8.9275 -6.3125 8.375 C-4.56617944 5.21499137 -2.3597151 2.7323017 0 0 Z M-17.9375 12.75 C-19.21947266 12.95882813 -19.21947266 12.95882813 -20.52734375 13.171875 C-26.03261347 15.01566202 -28.48183849 20.09567503 -31.375 24.8125 C-33.89497964 28.84571932 -36.39046706 32.68617202 -39.5625 36.25 C-42.2211025 38.63698795 -42.2211025 38.63698795 -42 41 C-42.721875 41.2475 -43.44375 41.495 -44.1875 41.75 C-47.24713266 43.10983674 -49.4673738 44.82917754 -52 47 C-44.2139232 47.55614834 -39.60831711 45.89233608 -33.51953125 41.01171875 C-24.47105983 33.08575059 -16.75065895 23.94995083 -10 14 C-10 13.34 -10 12.68 -10 12 C-12.77956571 12 -15.20599177 12.27352638 -17.9375 12.75 Z M-38.5 17.1875 C-39.34280518 17.41163574 -40.18561035 17.63577148 -41.05395508 17.86669922 C-43.70371088 18.57386005 -46.35203454 19.28616667 -49 20 C-49.83450684 20.22413574 -50.66901367 20.44827148 -51.52880859 20.67919922 C-53.91648814 21.32260301 -56.30230511 21.97245144 -58.6875 22.625 C-59.40421875 22.81860107 -60.1209375 23.01220215 -60.859375 23.21166992 C-76.76191642 27.3158212 -76.76191642 27.3158212 -89 37 C-89 40.45412155 -88.73542253 42.2373396 -86.3125 44.75 C-78.06408408 49.2086032 -69.97144906 49.51574495 -60.96875 47.66796875 C-58.80203991 47.190176 -58.80203991 47.190176 -58 45 C-58.2475 43.9275 -58.495 42.855 -58.75 41.75 C-59 38 -59 38 -56.9375 34.75 C-54.33608576 32.01705358 -51.48461208 30.45867483 -48 29 C-48 29.66 -48 30.32 -48 31 C-48.721875 31.20625 -49.44375 31.4125 -50.1875 31.625 C-54.07250691 33.52433671 -55.59203798 35.38805697 -58 39 C-57.9593157 41.80485127 -57.9593157 41.80485127 -57 44 C-55.31026274 44.88556744 -55.31026274 44.88556744 -53 45 C-46.28920466 41.28764513 -41.54948872 35.7022502 -36.9375 29.6875 C-36.50066895 29.1200708 -36.06383789 28.5526416 -35.61376953 27.96801758 C-32.48142366 23.82004658 -30.05372631 19.76091099 -28 15 C-31.59019939 15 -35.04715502 16.26425035 -38.5 17.1875 Z "
                    fill="#000000"
                    transform="translate(91,0)"
                  />
                </svg>
              </div>
              {/* ScrollSVG */}
              <motion.svg
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
              className="flex flex-col gap-12 justify-center pb-48"
              ref={skillRef}
            >
              <motion.h2
                className="font-bold text-2xl"
                initial={{ x: "-300px" }}
                animate={isSkillRefInView ? { x: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                Skills
              </motion.h2>
              {/* SkillList */}
              <motion.div
                initial={{ x: "-300px" }}
                animate={isSkillRefInView ? { x: 0 } : {}}
                className="flex flex-wrap gap-4"
              >
                {skills.map((e, key) => (
                  <div
                    key={key}
                    className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black"
                  >
                    {e.skill}
                  </div>
                ))}
              </motion.div>
              {/* ScrollSVG */}
              <motion.svg
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
              className="flex flex-col gap-12 justify-center pb-48"
              ref={experienceRef}
            >
              <motion.div
                className=""
                initial={{ x: "-1000px" }}
                animate={isExperienceRefInView ? { x: 0 } : {}}
                transition={{ delay: 0.2 }}
              >
                {/* EXPERIENCE TITLE */}
                <h2 className="font-bold  text-2xl">EXPERIENCE</h2>

                {/* EXPERIENCE LIST ITEM */}
                <div className="flex flex-col">
                  {experienceList.map((item, index) => {
                    const isOven = index % 2 === 0;

                    return (
                      <div key={index} className="flex justify-between">
                        {
                          /* LEFT */
                          !isOven ? (
                            <div className="w-1/3 flex flex-col justify-between md:justify-evenly lg:justify-around ">
                              <div className="bg-white font-semibold rounded-b-lg rounded-s-lg">
                                {item.title}
                              </div>

                              <div className="p-3 text-sm italic">
                                {item.description}
                              </div>

                              <div className="p-3 text-red-400 text-sm font-semibold">
                                {`${item.startDate} to ${item.endDate}`}
                              </div>

                              <div className="p-1 rounded bg-white text-sm font-semibold w-fit">
                                {item.company}
                              </div>
                            </div>
                          ) : (
                            <div className="w-1/3 "></div>
                          )
                        }
                        {/* CENTER */}
                        <div className="w-1/6 flex justify-center">
                          {/* LINE */}
                          <div className="w-1 h-full bg-black rounded relative">
                            {/* LINE CIRCLE */}
                            <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
                          </div>
                        </div>
                        {
                          /* RIGHT  */
                          isOven ? (
                            <div className="w-1/3 flex flex-col justify-between ">
                              <div className="bg-white font-semibold rounded-b-lg rounded-s-lg">
                                {item.title}
                              </div>

                              <div className="p-3 text-sm italic">
                                {item.description}
                              </div>

                              <div className="p-3 text-red-400 text-sm font-semibold">
                                {`${item.startDate} to ${item.endDate}`}
                              </div>

                              <div className="p-1 rounded bg-white text-sm font-semibold w-fit">
                                {item.company}
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
          <div className="hidden lg:block w-1/3 sticky top-10  z-30">
            <Brain scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AboutPage;
