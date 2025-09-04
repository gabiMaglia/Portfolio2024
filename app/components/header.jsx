import React from "react";
import Image from "next/image";
import gabiPic from "../../public/gabi.png";
import { IconDownload, IconContract } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const Header = () => {
    const t = useTranslations("Header");
    return (
        <div
            className="w-[100vw] h-screen flex items-center justify-center"
            id="top"
        >
            <div className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 ">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                >
                    <Image
                        src={gabiPic}
                        alt="Gabriel Maglia"
                        className="object-contain w-32"
                    />
                </motion.div>
                <motion.h3
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-Ovo">

                    {t("greeting")}{" "}
                </motion.h3>
                <motion.h1
                    initial={{ y: -30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className=" text-3xl sm:text-6xl lg:text-[66px] font-Ovo ">
                    {t("headline")}{" "}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="max-w-2xl mx-auto font-Ovo">{t("description")}</motion.p>
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                    <motion.a
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2"
                        href="#contact"
                    >
                        {t("contact")}
                        <IconContract stroke={1} />
                    </motion.a>
                    <motion.a
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2"
                        href="/Gabriel Maglia - Fullstack Developer ESP.pdf"
                        download
                    >
                        {t("resume")}
                        <IconDownload stroke={1} />
                    </motion.a>
                </div>
            </div>
        </div>
    );
};

export default Header;
