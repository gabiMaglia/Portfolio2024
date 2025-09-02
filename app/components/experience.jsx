import { useUserStore } from "@/store/store";

const Experience = () => {
  const userExperiences = useUserStore((state) => state.experiences);

  return (
    <div id="experience" className="w-full px-[12%] py-10 scroll-mt-20">
      <h4 className="text-center mb-2 text-lg font-Ovo">My Job history</h4>
      <h2 className="text-center text-5xl font-Ovo">Experience</h2>
      <p className="text-center max-w-2xl mx-auto mt-15 mb-16 font-Ovo">
        Here are some of the companies I've worked for in the past
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userExperiences.map((item) => {
          return (
            <article
              key={item.id}
              className="
                  relative z-[1]
                  bg-white dark:bg-neutral-900
                  text-neutral-900 dark:text-neutral-100
                  w-full
                  box-border
                  gap-6 max-w-2xl border border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black dark:hover:shadow-white dark:bg-darkHover/50 dark:hover:bg-darkHover/30 
                "
            >
              <h3 className="font-semibold text-lg md:text-xl font-Ovo leading-snug">
                {item.title_exp}
              </h3>

              <p className="mt-2 text-sm md:text-base italic text-neutral-700 dark:text-neutral-300">
                {item.description_exp}
              </p>

              <div className="mt-3 text-sm font-semibold text-rose-600 dark:text-rose-400">
                {`${item.startDate_exp} to ${item.endDate_exp}`}
              </div>

              <div className="mt-2 p-1 rounded bg-neutral-100 dark:bg-neutral-800 text-sm font-semibold w-fit">
                {item.institution_exp}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
