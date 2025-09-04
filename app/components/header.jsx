import React from "react";
import Image from "next/image";
import gabiPic from "../../public/gabi.png";
import { IconDownload, IconContract } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { HEADER, VIEWPORT } from '@/lib/motion-config';

const Header = () => {
    const t = useTranslations("Header");
    return (
        <div
            className="w-[100vw] h-screen flex items-center justify-center"
            id="top"
        >
            <motion.div {...HEADER.section} viewport={VIEWPORT} className="w-[100vw] h-screen flex items-center justify-center" id="top">
                <div className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4">
                    <motion.div {...HEADER.avatar} viewport={VIEWPORT}>
                        <Image src={gabiPic} alt="Gabriel Maglia" className="object-contain w-32" />
                    </motion.div>

                    <motion.h3 {...HEADER.h3} viewport={VIEWPORT} className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-Ovo">
                        {t('greeting')}
                    </motion.h3>

                    <motion.h1 {...HEADER.h1} viewport={VIEWPORT} className="text-3xl sm:text-6xl lg:text-[66px] font-Ovo">
                        {t('headline')}
                    </motion.h1>

                    <motion.p {...HEADER.p} viewport={VIEWPORT} className="max-w-2xl mx-auto font-Ovo">
                        {t('description')}
                    </motion.p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                        <motion.a {...HEADER.ctaPrimary} viewport={VIEWPORT} className="px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2" href="#contact">
                            {t('contact')}
                            <IconContract stroke={1} />
                        </motion.a>

                        <motion.a {...HEADER.ctaSecondary} viewport={VIEWPORT} className="px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2" href="/Gabriel Maglia - Fullstack Developer ESP.pdf" download>
                            {t('resume')}
                            <IconDownload stroke={1} />
                        </motion.a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Header;
