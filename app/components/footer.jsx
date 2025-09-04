import React from "react";
import Image from "next/image";
import logo from "../../public/Logo.png";
import { IconMailForward } from '@tabler/icons-react';
import Link from "next/link";
import { useUserStore } from "@/store/store";
import PropTypes from "prop-types";
import { useTranslations } from "next-intl";

const Footer = ({ isDarkMode }) => {
    const socialMedia = useUserStore((state) => state.social || []);
    const t = useTranslations('Footer');

    const socialMediaList = socialMedia.map((socialMedia) => (
        <div key={socialMedia.name}>
            <Link
                className="flex "
                target="_blank"
                rel="noopener noreferrer"
                href={socialMedia.url}
            >
                <Image
                    layout="fixed"
                    src={socialMedia.img}
                    alt={socialMedia.name}
                    width={24}
                    height={24}
                />
            </Link>
        </div>
    ))

    return (
        <div className="mt-20 w-full" >
            <div className="text-center">

                <a href="#top">
                    <Image src={logo} alt="Logo" className={`w-36 mx-auto ${isDarkMode ? "filter invert" : ""}`} />
                </a>
                <a href="#contact" className="w-max flex items-center  gap-2 mx-auto">
                    <IconMailForward stroke={1} className="w-6" />
                    <p>Gab.Maglia@gmail.com</p>
                </a>

            </div>

            <div className="text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-2">
                <p>© 2025 Gabriel Maglia.</p>
                <div className={`flex gap-3 items-center justify-evenly px-4 py-2 rounded-full shadow-sm  ${isDarkMode ? " bg-white shadow-sm bg-opacity-20" : ""}  font-Ovo`}>
                    {socialMediaList}
                </div>
            </div>

        </div>
    );
};
Footer.propTypes = {
    isDarkMode: PropTypes.bool.isRequired,
};

export default Footer;
