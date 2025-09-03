import React from "react";
import Image from "next/image";
import gabiPic from '../../../public/gabi.png'
import { IconDownload, IconContract } from '@tabler/icons-react';

const Header = () => {
    return (
        <div className="w-[100vw] h-screen flex items-center justify-center" id="top">
            <div className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 ">
                <div>
                    <Image
                        src={gabiPic}
                        alt="Gabriel Maglia"
                        className="object-contain w-32"
                    />
                </div>
                <h3 className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-Ovo"> {`Hi I am Gabriel Maglia`}  </h3>
                <h1 className=" text-3xl sm:text-6xl lg:text-[66px] font-Ovo " > frontend web developer based in Rosario </h1>
                <p className="max-w-2xl mx-auto font-Ovo" >
                    Welcome to my personal portfolio where you can learn something about
                    me and look for my works, you can also contact with me, I will be in
                    touch in no time!
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                    <a
                        className="px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2"
                        href="#contact"
                     
                    >
                        Contact Me
                    <IconContract stroke={1} />
                    </a>
                    <a
                        className="px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2"
                        href="/Gabriel Maglia - Fullstack Developer ESP.pdf"
                        download
                       
                    >
                        My Resume
                    <IconDownload stroke={1} />
                    </a>
                </div>
            </div>
        </div>

    );
};

export default Header;
