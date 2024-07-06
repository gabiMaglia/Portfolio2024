"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useUserStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Homepage = () => {
  const persona = useUserStore((state) => state.persona);
  const router = useRouter();
  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="h-full flex flex-col justify-center align-middle lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
        {/* IMAGE CONTAINER */}
        <div className="h-1/2 mx-auto w-[240px] md:w-[420px] lg:h-full lg:w-1/2 relative">
          <Image
            src="/gabi2.png"
            alt="Gabriel Maglia"
            fill
            className="object-contain"
          />
        </div>
        {/* TEXT CONTAINER */}
        <div className="h-1/2 lg:h-full lg:w-1/2 flex flex-col gap-8 items-center justify-center">
          {/* TITLE */}
          <span className="text-justify flex flex-col justify-start lg:text-left text-4xl md:text-6xl font-bold">
            <h2>Hello there !!</h2>
            <h1>
              {` I am ${persona?.name_persona} ${persona?.surname_persona}`}
            </h1>
          </span>
          {/* DESCRIPTION */}
          <p className="text-justify  md:text-xl">
            Welcome to my personal portfolio where you can learn something about
            me and look for my works, you can also contact with me, I will be in
            touch in no time!
          </p>
          {/* BUTTONS */}
          <div className=" w-full flex justify-center lg:justify-normal gap-4 z-50">
            <Button
              className="p-4 rounded-lg ring-1 ring-black hover:bg-black hover:text-white"
              onClick={() => router.push("/portfolio")}
            >
              View my work
            </Button>
            <Button
              className="p-4 rounded-lg ring-1 ring-black hover:bg-black hover:text-white"
              variant="custom"
              onClick={() => router.push("/contact")}
            >
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Homepage;
