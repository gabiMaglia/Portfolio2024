
import { useUserStore } from "@/store/store";
import Image from "next/image";
import gabiPic from "../../public/gabi.png";
import PropTypes from "prop-types";

const About = ({ isDarkMode }) => {
    const userSkills = useUserStore((state) => state.skill);
    const userPhrases = useUserStore((state) => state.phrases);
    const hardSkillsList = userSkills.map(
        (e) =>
            e.type === "hard" && (
                <li
                    key={e.id}
                    className="flex items-center justify-center w-32 h-22 gap-3 rounded-md p-2 text-sm border border-gray-400 bg-neutral-100 z-10 dark:border-white/50 dark:hover:shadow-white dark:bg-darkHover/50" 
                >
                    <Image
                        src={e.img_skill}
                        alt={e.name}
                        height={18}
                        width={18}
                    />
                    <h3 className="font-semibold ">{e.name}</h3>
                </li>
            )
    )
    return (
        <div id="about" className="w-full px-[12%] py-10 scroll-mt-20">
            <h4 className="text-center mb-2 text-lg font-Ovo">Introduction</h4>
            <h2 className="text-center text-5xl font-Ovo">About Me</h2>
            <div className="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
                <div className="w-64 sm:w-80 rounded-3xl max-w-none">
                    <Image
                        src={gabiPic}
                        alt="Gabriel Maglia"
                        className="object-contain w-full rounded-3xl"
                    />
                </div>
                <div className="flex-1">
                    <p className="mb-10 max-w-2xl font-Ovo">
                        {userPhrases.mainPhrase}
                    </p>
                    <h4 className="text-center mb-4 text-lg font-Ovo" >Technologies</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white dark:bg-darkHover/50 dark:hover:bg-darkHover/30" >
                        {hardSkillsList}
                    </ul>

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
                </div>
            </div>
        </div>
    );
};

export default About;

About.propTypes = {
    isDarkMode: PropTypes.bool.isRequired,
};