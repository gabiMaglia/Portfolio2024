import React from "react";
import Image from "next/image";
import gabiPic from '../../public/gabi.png'
import { IconDownload, IconContract } from '@tabler/icons-react';
import { useTranslations } from "next-intl";

const Header = () => {
    const t = useTranslations('Header');
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
                <h3 className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-Ovo"> {t('greeting')}  </h3>
                <h1 className=" text-3xl sm:text-6xl lg:text-[66px] font-Ovo " > {t('headline')} </h1>
                <p className="max-w-2xl mx-auto font-Ovo" >
                    {t('description')}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                    <a
                        className="px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2"
                        href="#contact"

                    >
                        {t('contact')}
                    <IconContract stroke={1} />
                    </a>
                    <a
                        className="px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2"
                        href="/Gabriel Maglia - Fullstack Developer ESP.pdf"
                        download

                    >
                        {t('resume')}
                    <IconDownload stroke={1} />
                    </a>
                </div>
            </div>
        </div>

    );
};

export default Header;
