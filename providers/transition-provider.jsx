"use client";

import { motion } from "framer-motion";
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
  const pathname = usePathname();
  

  return (
    <AnimatePresence>
      <div
        key={pathname}
        className="w-screen h-screen"
      >
        <motion.div
          className="h-screen w-screen fixed bg-black rounded-b-[100px] z-30"
          animate={{ height: "0vh" }}
          exit={{ height: "110vh" }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.div
          className="h-full fixed flex flex-col justify-center align-middle text-white cursor-default z-50 text-8xl "
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="text-4xl font-bold md:text-6xl lg:text-8xl">
          {pathBox[pathname]} 

          </p>
        </motion.div>
        <motion.div
          className="h-screen w-screen fixed  bg-blur bg-black rounded-t-[100px] bottom-0 z-10"
          initial={{ height: "110vh" }}
          animate={{ height: "0vh", transition: { delay: 1 } }}
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
