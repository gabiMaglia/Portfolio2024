"use client";

import { React } from "react";
import { useUserStore } from "@/store/store";
import { IconMessageForward } from "@tabler/icons-react";
const Work = () => {
    const userProyects = useUserStore((state) => state.proyects);

    console.log(userProyects);

    return (
        <div id="work" className="w-full px-[12%] py-10 scroll-mt-20">
            <h4 className="text-center mb-2 text-lg font-Ovo">My portfolio</h4>
            <h2 className="text-center text-5xl font-Ovo">My latest work</h2>
            <p className="text-center max-w-2xl mx-auto mt-15 font-Ovo">
                Welcome to my development porfolio! explore a collection of projects
                showcasing my expertise in front-end development
            </p>
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {userProyects.map((proyect) => (
                    <div
                        key={proyect.id}
                        className="aspect-square max-w-[25rem] bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group"
                        style={{ backgroundImage: `url(${proyect.img1_pro})` }}
                    >
                        <div className="bg-white w-10/12 h-[6rem] m-h-[6rem] rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7 shadow-lg">
                            <div>
                                <h3 className="font-semibold">{proyect.title_pro}</h3>
                                <p className="text-sm text-gray-70 font-Ovo">{proyect.technologies_pro}</p>
                            </div>
                            <div className='border rounded-full border-black w-8 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-pink-300 transition'>
                                <IconMessageForward stroke={2} className="w-8" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Work;
