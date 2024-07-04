import Image from "next/image";
import Link from "next/link";

import { CardHeader, Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Github, Link2Icon } from "lucide-react";
import ParticleBackground from "./particles-js";
import { Button } from "./ui/button";

const ProyectCard = ({ proyect }) => {
  return (
    <Card className="group overflow-hidden relative  max-w-[320px]  h-[520px] xl:h-[620px] md:max-w-[620px] md:w-[620px] xl:max-w-[720px] xl:w-[720px] bg-gradient-to-b from-blue-50 to-red-50">
      <CardHeader className="p-0 h-4/6">
        <Badge
          variant={"custom"}
          className="p-3 uppercase text-sm justify-center font-medium mb-2 top-4 left-5"
        >
          {proyect.title_pro}
        </Badge>
        <div className="relative mx-auto w-[320px] h-full md:max-w-[420px] md:w-[420px] xl:max-w-[520px] xl:w-[520px]  ">
          <Image
            className=" shadow-2xl w-full max-h-[280px]"
            alt={proyect.title_pro}
            src={proyect.img1_pro}
            fill
            priority
          />
        </div>
        <Badge
          variant={"custom"}
          className="uppercase w-full justify-center text-sm font-medium mb-2 top-4 left-5"
        >
          {proyect.technologies_pro}
        </Badge>
      </CardHeader>
      {/* DESCRIPTION */}
      <div className="h-1/6 max-h-32 overflow-scroll px-8 py-6">
        <p className=" text-muted-foreground text-center text-sm">
          {proyect.description_pro}
        </p>
      </div>
      {/* LINKS */}
      <span className="h-1/6 flex gap-11 justify-center">
        <span className="flex gap-2  my-auto">
          <Link2Icon className="self-center" />
          <Link
            target="_blank"
            className="flex justify-end"
            href={proyect.githubLink_pro}
          >
            <Button variant="custom" className="p-2 px-4 flex flex-col text-sm  bg-black text-white font-semibold rounded">
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
            <Button variant="custom" className="p-2 px-4 flex flex-col text-sm bg-black text-white font-semibold  rounded">
              Github
            </Button>
          </Link>
        </span>
      </span>
    </Card>
  );
};

export default ProyectCard;
