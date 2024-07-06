"use client";

import { easeOut, motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import NavBar from "../components/navbar";

const pathBox = {
  "/": "Home",
  "/about": "About",
  "/portfolio": "Portfolio",
  "/contact": "Contact Me",
};

const TransitionProvider = ({ children }) => {
  const pathName = usePathname();

  return (
    <AnimatePresence mode="wait">
    <div
      key={pathName}
      className="w-screen h-screen  bg-[url('/public/fondo.gif')]"
    >
      <motion.div
        className="h-screen w-screen fixed bg-black rounded-b-[100px] z-40"
        animate={{ height: "0dvh" }}
        exit={{ height: "140dvh" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.div
        className="fixed m-auto top-0 bottom-0 left-0 right-0 text-white text-8xl cursor-default  w-fit h-fit flex items-center justify-center z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, height: '0dvh', display:'none', top: '-15dvh', ease: "easeOut" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeIn" }}
      >
       <p className=" font-zootype lg:text-8xl md:text-6xl text-4xl ">
        {pathBox[pathName]}
        
        </p> 
      </motion.div>
      <motion.div
        className="h-screen w-screen fixed bg-black rounded-t-[100px] bottom-0 z-30"
        initial={{ height: "140dvh" }}
        animate={{ height: "0dvh", transition: { delay: 0.5 } }}
      />
      <div className="h-24">
        <NavBar />
      </div>
      <div className="h-[calc(100vh-6rem)]">{children}</div>
    </div>
  </AnimatePresence>
  );
};

export default TransitionProvider;
