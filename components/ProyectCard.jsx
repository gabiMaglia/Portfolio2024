import Image from "next/image";
import Link from "next/link";

import { Badge } from "./ui/badge";
import { Github, Link2Icon } from "lucide-react";
import { Button } from "./ui/button";

const ProyectCard = ({ proyect }) => {
  return (

    <div className="h-screen w-screen">
      <div className="flex flex-col h-full w-full justify-evenly md:justify-start  gap-8  bg-none">
          <h2
  
           className=" h-1/6 uppercase font-extrabold text-2xl md:text=6xl lg:text-8xl "
         >
           {proyect.title_pro}
         </h2>
        <div className=" relative w-[320px] h-[220px] md:w-[620px] md:h-[420px]  lg:w-[820px] lg:h-[620px] ">
          <Image src={proyect.img1_pro} alt={proyect.title_pro} fill />
        </div>
        <span className="h-2/6 flex flex-col justify-around gap-6">
          <p className="w-80  md:w96 lg:w-[500px] lg:text-lg xl:w-[600px]">
            {proyect.description_pro}
          </p>
          <Badge
            variant={"custom"}
            className="p-3 uppercase w-fit"
          >
          <i>{proyect.technologies_pro}</i>
          </Badge>
        </span>
        <span className="h-1/6 flex gap-7 ">
          <span className="flex gap-2  my-auto">
            <Link2Icon className="self-center" />
            <Link
              target="_blank"
              className="flex justify-end"
              href={proyect.githubLink_pro}
            >
              <Button
                variant="custom"
                className="p-2 px-4 flex flex-col text-sm  bg-black text-white font-semibold rounded"
              >
                Deploy
              </Button>
            </Link>
          </span>
          <span className="flex gap-2  my-auto">
            <Github className="self-center" />
            <Link
              target="_blank"
              className="flex justify-end"
              href={proyect.deployLink_pro}
            >
              <Button
                variant="custom"
                className="p-2 px-4 flex flex-col text-sm bg-black text-white font-semibold  rounded"
              >
                Github
              </Button>
            </Link>
          </span>
        </span>
      </div>
    </div>
  );
};

export default ProyectCard;
