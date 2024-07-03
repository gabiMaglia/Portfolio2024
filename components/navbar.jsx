"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import NavLink from "./navLink";
import { useUserStore } from "@/store/store";

const links = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/about",
    title: "About",
  },
  {
    url: "/portfolio",
    title: "Portfolio",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const socialMedia = useUserStore((state) => state.social);

  const topVariant = {
    closed: {
      rotate: 0,
      backgroundColor: "rgb(0,0,0)",
    },
    opened: {
      rotate: 45,
      backgroundColor: "rgb(255,255,255)",
    },
  };
  const centerVariant = {
    closed: {
      opacity: 1,
      backgroundColor: "rgb(0,0,0)",
    },
    opened: {
      opacity: 0,
      rotate: 45,
      backgroundColor: "rgb(255,255,255)",
    },
  };
  const bottomVariant = {
    closed: {
      rotate: 0,
      backgroundColor: "rgb(0,0,0)",
    },
    opened: {
      rotate: -45,
      backgroundColor: "rgb(255,255,255)",
    },
  };

  const listVariants = {
    closed: {
      x: "100vw",
    },
    opened: {
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };
  const listItemsVariants = {
    closed: {
      x: -10,
      opacity: 0,
    },
    opened: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <div className="h-full flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 text-xl">
      {/* LINKS */}
      <div className="hidden md:flex gap-4 w-1/3">
        {links.map((link) => (
          <NavLink link={link} key={link.title} />
        ))}
      </div>
      {/* LOGO */}
      <div className="md:hidden lg:flex xl:w-1/3 xl:justify-center">
        <Link
          href="/"
          className="text-sm bg-black rounded-md p-1 font-semibold flex items-center justify-center"
        >
          <span className="text-white mr-1"> FullStack</span>
          <span className="w-12 h-8 rounded bg-white text-black flex items-center justify-center">
            .dev
          </span>
        </Link>
      </div>
      {/* SOCIAL */}
      <div className=" hidden md:flex md:justify-center gap-4 w-1/3">
        {socialMedia.map((socialMedia) => (
          <Link key={socialMedia.id} href={socialMedia.url}>
            <Image
              src={socialMedia.img}
              alt={socialMedia.name}
              width={24}
              height={24}
            />
          </Link>
        ))}
      </div>
      {/* RESPONSIVEMENU */}
      <div className="md:hidden">
        {/* MENUBUTTON */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-10 h-8 flex flex-col justify-between z-50 relative"
        >
          <motion.div
            variants={topVariant}
            animate={open ? "opened" : "closed"}
            className={`w-10 h-1 ${
              open ? "bg-white" : "bg-black"
            } rounded origin-left`}
          ></motion.div>
          <motion.div
            variants={centerVariant}
            animate={open ? "opened" : "closed"}
            className={`w-10 h-1 ${open ? "bg-white" : "bg-black"} rounded`}
          ></motion.div>
          <motion.div
            variants={bottomVariant}
            animate={open ? "opened" : "closed"}
            className={`w-10 h-1 ${
              open ? "bg-white" : "bg-black"
            } rounded origin-left`}
          ></motion.div>
        </button>
        {/* MENULIST */}
        {open && (
          <motion.div
            variants={listVariants}
            initial={"closed"}
            animate={"opened"}
            className="absolute top-0 left-0 w-screen h-screen bg-black text-white flex flex-col z-10 items-center justify-center gap-8 text-4xl"
          >
            {links.map((link) => (
              <motion.div
                key={link.title}
                variants={listItemsVariants}
                className=""
              >
                <Link href={link.url}>{link.title}</Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
