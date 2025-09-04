import { useUserStore } from "@/store/store";
import Image from "next/image";
import gabiPic from "../../public/gabi.png";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ABOUT, VIEWPORT } from "@/lib/motion-config";

const About = () => {
  const userSkills = useUserStore((s) => s.skill);
  const userPhrases = useUserStore((s) => s.phrases);
  const t = useTranslations("About");

  const hardSkillsList = userSkills.map(
    (e) =>
      e.type === "hard" && (
        <motion.li
          key={e.id}
          whileInView={ABOUT.skillItem.withInView}
          whileHover={ABOUT.skillItem.withHover}

          className="flex items-center justify-center w-32 h-22 gap-3 rounded-md p-2 text-sm border border-gray-400 bg-neutral-100 z-10 dark:border-white/50 dark:hover:shadow-white dark:bg-darkHover/50"
        >
          <Image src={e.img_skill} alt={e.name} height={18} width={18} />
          <h3 className="font-semibold ">{e.name}</h3>
        </motion.li>
      )
  );

  return (
    <motion.div {...ABOUT.section} viewport={VIEWPORT} id="about" className="w-full px-[12%] py-10 scroll-mt-20">
      <motion.h4 {...ABOUT.h4} viewport={VIEWPORT} className="text-center mb-2 text-lg font-Ovo">
        {t("intro")}
      </motion.h4>

      <motion.h2 {...ABOUT.h2} viewport={VIEWPORT} className="text-center text-5xl font-Ovo">
        {t("title")}
      </motion.h2>

      <motion.div {...ABOUT.row} viewport={VIEWPORT} className="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
        <motion.div {...ABOUT.img} viewport={VIEWPORT} className="w-64 sm:w-80 rounded-3xl max-w-none">
          <Image src={gabiPic} alt="Gabriel Maglia" className="object-contain w-full rounded-3xl" />
        </motion.div>

        <motion.div {...ABOUT.rightCol} viewport={VIEWPORT} className="flex-1">
          <p className="mb-10 max-w-2xl font-Ovo">{userPhrases.mainPhrase}</p>

          <motion.h4 {...ABOUT.subTechH4} viewport={VIEWPORT} className="text-center mb-4 text-lg font-Ovo">
            {t("technologies")}
          </motion.h4>

          <motion.ul {...ABOUT.skillsUl} viewport={VIEWPORT} className="grid grid-cols-2 sm:grid-cols-3 gap-7 max-w-2xl md:border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white dark:bg-darkHover/50 dark:hover:bg-darkHover/30 justify-items-center sm:justify-items-start">
            {hardSkillsList}
          </motion.ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;
