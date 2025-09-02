'use client'

import PropTypes from "prop-types";
import {React, useEffect, useRef, useState} from "react";
import Image from "next/image";
import logo from "../../public/Logo.png";
import Link from "next/link";
import { useUserStore } from "@/store/store";
import { IconMoon, IconSun, IconMenuDeep, IconSquareRoundedX } from "@tabler/icons-react";

const Navbar = ({isDarkMode, setIsDarkMode}) => {
    const [isScroll, setIsScroll] = useState(false);
    const socialMedia = useUserStore((state) => state.social);
    const sideMenuRef = useRef(null);

    const openMenu = () => {
        sideMenuRef.current.style.transform = "translateX(-16rem)";
    };
    const closeMenu = () => {
        sideMenuRef.current.style.transform = "translateX(0)";
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScroll(true);
            } else {
                setIsScroll(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

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

    const handleDarkModeToggle = () => {setIsDarkMode(prev => !prev)}

    return (
        <div>
            <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 dark:shadow-white/20 ${isScroll ? "bg-white bg-opacity-50 backdrop-blur-lg  dark:bg-transparent " : ""}`}>
                <a href="#top">
                    <Image src={logo} alt="Logo" className={`w-28 cursor-pointer mr-14 ${isDarkMode ? "filter invert" : ""}`} />
                </a>

                <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 dark:border dark:border-white/50 dark:bg-transparent ${!isScroll ? "bg-white shadow-sm bg-opacity-50 " : ""}`}>
                    <li>
                        <a className="font-Ovo" href="#top">
                            Home
                        </a>
                    </li>
                    <li>
                        <a className="font-Ovo" href="#about">
                            About
                        </a>
                    </li>
                  
                    <li>
                        <a className="font-Ovo" href="#work">
                            My Work
                        </a>
                    </li>
                    <li>
                        <a className="font-Ovo" href="#experience">
                            Experience
                        </a>
                    </li>
                    <li>
                        <a className="font-Ovo" href="#contact">
                            Contact Me
                        </a>
                    </li>
                </ul>
                <div className="flex items-center gap-4">
                    <button>
                        {isDarkMode ? <IconSun onClick={handleDarkModeToggle} alt="Toggle light mode" className="w-6" stroke={1} /> :<IconMoon onClick={handleDarkModeToggle} stroke={1} alt="Toggle dark mode" className="w-6" />}
                    </button>
                    <div className={`hidden lg:flex gap-3 items-center px-10 py-2.5  rounded-full ml-4 shadow-sm  ${isDarkMode ? " bg-white shadow-sm bg-opacity-20" : ""} ${isScroll ? "bg-none border-none shadow-none" : ""} ${!isScroll ? "bg-white shadow-sm bg-opacity-50" : ""} font-Ovo`}>
                        {socialMediaList}
                    </div>
                    <button onClick={openMenu} className="block md:hidden ml-3">
                        <IconMenuDeep stroke={1} />
                    </button>
                </div>
                {/* mobile menu */}
                <ul ref={sideMenuRef} className="flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 dark:bg-darkHover dark:text-white">
                    <button onClick={closeMenu} className="absolute right-6 top-6">
                        <IconSquareRoundedX stroke={1} className="cursor-pointer w-8" />
                    </button>
                    
                    <li>
                        <a className="font-Ovo" href="#top">
                            Home
                        </a>
                    </li>
                    <li>
                        <a className="font-Ovo" href="#about">
                            About
                        </a>
                    </li>
                    <li>
                        <a className="font-Ovo" href="#work">
                            My Work
                        </a>
                    </li>
                    <li>
                        <a className="font-Ovo" href="#experience">
                            Experience
                        </a>
                    </li>
                    <li>
                        <a className="font-Ovo" href="#contact">
                            Contact Me
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
Navbar.propTypes = {
    isDarkMode: PropTypes.bool.isRequired,
    setIsDarkMode: PropTypes.func.isRequired,
};

export default Navbar;
