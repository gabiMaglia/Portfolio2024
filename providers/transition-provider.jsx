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
       <div className="fixed inset-0 bg-fixed bg-gradient-to-b from-blue-50 to-red-100 z-[-10]"></div>
      <div
        key={pathname}
        className="w-screen h-screen"
      >
        <motion.div
          className="h-screen w-screen fixed bg-black rounded-b-[100px] z-40"
          animate={{ height: "0vh" }}
          exit={{ height: "110vh" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.div
          className=" fixed m-auto top-0 bottom-0 right-0 left-0 text-white cursor-default z-50 w-fit h-fit text-8xl "
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="text-sm font-bold md:text-text-xl lg:text-text-4xl ">
          {pathBox[pathname]}

          </p>
        </motion.div>
        <motion.div
          className="h-screen w-screen fixed  bg-blur bg-black rounded-t-[100px] bottom-0 z-30"
          initial={{ height: "110vh" }}
          animate={{ height: "0vh", transition: { delay: 1 } }}
        />
        <div className="h-24">
          <NavBar />
        </div>
        <div className="h-[calc(100vh-6rem)] ">{children}</div>
      </div>
    </AnimatePresence>
  );
};

export default TransitionProvider;
