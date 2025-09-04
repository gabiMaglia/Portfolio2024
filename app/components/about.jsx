import { useUserStore } from "@/store/store";
import Image from "next/image";
import gabiPic from "../../public/gabi.png";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const About = () => {
  const userSkills = useUserStore((state) => state.skill);
  const userPhrases = useUserStore((state) => state.phrases);
  const t = useTranslations("About");

  const hardSkillsList = userSkills.map(
    (e) =>
      e.type === "hard" && (
        <motion.li
          whileInView={{ scale: 1.05 }}
          whileHover={{ scale: 1.1 }}
          key={e.id}
          className="flex items-center justify-center w-32 h-22 gap-3 rounded-md p-2 text-sm border border-gray-400 bg-neutral-100 z-10 dark:border-white/50 dark:hover:shadow-white dark:bg-darkHover/50"
        >
          <Image src={e.img_skill} alt={e.name} height={18} width={18} />
          <h3 className="font-semibold ">{e.name}</h3>
        </motion.li>
      )
  );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="about"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="text-center mb-2 text-lg font-Ovo"
      >
        {t("intro")}
      </motion.h4>
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-5xl font-Ovo"
      >
        {t("title")}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex w-full flex-col lg:flex-row items-center gap-20 my-20"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-64 sm:w-80 rounded-3xl max-w-none"
        >
          <Image
            src={gabiPic}
            alt="Gabriel Maglia"
            className="object-contain w-full rounded-3xl"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex-1"
        >
          <p className="mb-10 max-w-2xl font-Ovo">{userPhrases.mainPhrase}</p>
          <motion.h4

            initial={{ y: 20, opacity:0 }}
                    whileInView={{ y:0 , opacity:1 }}
                    transition={{ duration: 0.5, delay:0.4}} 

           className="text-center mb-4 text-lg font-Ovo">
            {t("technologies")}
          </motion.h4>
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-7 max-w-2xl md:border-[0.5px] border-gray-400 rounded-xl p-6 
             cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black 
             dark:hover:shadow-white dark:bg-darkHover/50 dark:hover:bg-darkHover/30
             justify-items-center sm:justify-items-start"
          >
            {hardSkillsList}
          </motion.ul>

          {/* <h4>Soft Skills</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black">
                        {state?.skills?.map(
                            (e) =>
                                e.type === "soft" && (
                                    <li
                                        key={e.id}
                                        className="flex items-center justify-center w-32 h-22 gap-3 rounded p-2 text-sm bg-black text-white z-10 "
                                    >
                                        <Image
                                            src={e.img_skill}
                                            alt={e.name}
                                            height={18}
                                            width={18}
                                        />
                                        <h3 className="font-semibold">{e.name}</h3>
                                    </li>
                                )
                        )}
                    </ul> */}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;
