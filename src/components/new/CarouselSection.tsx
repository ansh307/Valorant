"use client";

import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import React, { useEffect, useState } from "react";

import { cn } from "../../lib/utils";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import Animation2Title from "../Animated2Title";

const CarouselSection = () => {
  const images = [
    {
      src: "/img/agents/Gekko.png",
      alt: "Gekko",
      title: "Gekko",
    },
    {
      src: "/img/agents/Deadlock.png",
      alt: "Deadlock",
      title: "Deadlock",
    },
    {
      src: "/img/agents/Harbor.png",
      alt: "Harbor",
      title: "Harbor",
    },
    {
      src: "/img/agents/Iso.png",
      alt: "Iso",
      title: "Iso",
    },
    {
      src: "/img/agents/Skye.jpg",
      alt: "Skye",
      title: "Skye",
    },
    {
      src: "/img/agents/Viper.jpg",
      alt: "Viper",
      title: "Viper",
    },
  ];
  return (
    <div
      className="flex h-[130vh] w-screen items-end justify-center overflow-hidden bg-valorant relative"
      style={{
        backgroundImage: `url("/img/background/background-red.png")`,
        backgroundPosition: "center 20%",
        backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        backgroundSize: "150% auto",
      }}
    >
      <div className="absolute top-20 grid content-start justify-items-center gap-6 text-center">
        <Animation2Title
          title="<b>n</b>ew <b>a</b>g<b>e</b>nts <br />  Let the Action Begin?"
          titleClassName="text-valorantbackground"
          containerClass="!text-black text-center"
        />
      </div>
      <Carousel_006
        images={images}
        className="mb-24"
        loop={true}
        showNavigation={true}
        showPagination={true}
      />
    </div>
  );
};

interface Carousel_006Props {
  images: { src: string; alt: string; title: string }[];
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

const Carousel_006 = ({
  images,
  className,
  autoplay = false,
  loop = true,
  showNavigation = true,
  showPagination = true,
}: Carousel_006Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className={cn("w-full", className)}
      opts={{
        loop,
        slidesToScroll: 1,
      }}
      plugins={
        autoplay
          ? [
              Autoplay({
                delay: 2000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]
          : []
      }
    >
      <CarouselContent className="flex h-[500px] w-full">
        {images.map((img, index) => (
          <CarouselItem
            key={index}
            className="relative flex h-[86%] w-full basis-[73%] items-center justify-center sm:basis-[50%] md:basis-[30%] lg:basis-[25%] xl:basis-[21%]"
          >
            <motion.div
              initial={false}
              animate={{
                clipPath:
                  current !== index
                    ? "inset(0% 0 0% 0 round 2rem)"
                    : "inset(0 0 0 0 round 2rem)",
              }}
              className="h-full w-full overflow-hidden rounded-3xl"
            >
              <div
                className={`relative h-full w-full ${
                  current !== index ? "grayscale-[30%] blur-[0px]" : ""
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full scale-100 object-cover"
                />
              </div>
            </motion.div>
            <AnimatePresence mode="wait">
              {current === index && (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-0 left-2 flex h-[14%] w-full translate-y-full items-center justify-center p-2 text-center font-medium tracking-tight text-white"
                >
                  {img.title}
                </motion.div>
              )}
            </AnimatePresence>
          </CarouselItem>
        ))}
      </CarouselContent>

      {showNavigation && (
        <div className="absolute -bottom-10 right-0 flex w-full items-center justify-between gap-2 px-4">
          <button
            aria-label="Previous slide"
            onClick={() => api?.scrollPrev()}
            className="rounded-full bg-black/10 p-2"
          >
            <FiChevronLeft className="text-white" />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => api?.scrollNext()}
            className="rounded-full bg-black/10 p-2"
          >
            <FiChevronRight className="text-white" />
          </button>
        </div>
      )}

      {showPagination && (
        <div className="flex w-full items-center justify-center absolute -bottom-10">
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: images.length }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-2 w-2 cursor-pointer rounded-full transition-all ",
                  current === index ? "bg-valorantlightgray" : "bg-[#D9D9D9]"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </Carousel>
  );
};

export { CarouselSection };
