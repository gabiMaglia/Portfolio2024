'use client'

import {React, useEffect, useRef, useState} from "react";
import Image from "next/image";
import logo from "../../public/Logo.png";
import Link from "next/link";
import { useUserStore } from "@/store/store";
import { IconMoon, IconMenuDeep, IconSquareRoundedX } from "@tabler/icons-react";

const Navbar = () => {
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

    return (
        <div>
            <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 ${isScroll ? "bg-white bg-opacity-50 backdrop-blur-lg" : ""}`}>
                <a href="#top">
                    <Image src={logo} alt="Logo" className="w-28 cursor-pointer mr-14" />
                </a>

                <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${!isScroll ? "bg-white shadow-sm bg-opacity-50" : ""}`}>
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
                        <a className="font-Ovo" href="#services">
                            Services
                        </a>
                    </li>
                    <li>
                        <a className="font-Ovo" href="#work">
                            My Work
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
                        <IconMoon stroke={1} alt="Toggle dark mode" className="w-6" />
                    </button>
                    <div className="hidden lg:flex gap-3 items-center px-10 py-2.5 border border-gray-500 rounded-full ml-4 font-Ovo">
                        {socialMedia.map((socialMedia) => (
                            <div key={socialMedia.name}>
                                <Link
                                    className="flex backdrop-blur-lg"
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
                        ))}
                    </div>
                    <button onClick={openMenu} className="block md:hidden ml-3">
                        <IconMenuDeep stroke={1} />
                    </button>
                </div>
                {/* mobile menu */}
                <ul ref={sideMenuRef} className="flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500">
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
                        <a className="font-Ovo" href="#services">
                            Services
                        </a>
                    </li>
                    <li>
                        <a className="font-Ovo" href="#work">
                            My Work
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

export default Navbar;
