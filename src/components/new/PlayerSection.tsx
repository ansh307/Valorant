"use client";

import { AnimatePresence, motion, useSpring } from "framer-motion";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import {
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import type { ComponentProps } from "react";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "../../lib/utils";
import Animation2Title from "../Animated2Title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export type VideoPlayerProps = ComponentProps<typeof MediaController>;

export const VideoPlayer = ({ style, ...props }: VideoPlayerProps) => (
  <MediaController
    style={{
      ...style,
    }}
    {...props}
  />
);

export type VideoPlayerControlBarProps = ComponentProps<typeof MediaControlBar>;

export const VideoPlayerControlBar = (props: VideoPlayerControlBarProps) => (
  <MediaControlBar {...props} />
);

export type VideoPlayerTimeRangeProps = ComponentProps<typeof MediaTimeRange>;

export const VideoPlayerTimeRange = ({
  className,
  ...props
}: VideoPlayerTimeRangeProps) => (
  <MediaTimeRange
    className={cn(
      "[--media-range-thumb-opacity:0] [--media-range-track-height:2px]",
      className
    )}
    {...props}
  />
);

export type VideoPlayerTimeDisplayProps = ComponentProps<
  typeof MediaTimeDisplay
>;

export const VideoPlayerTimeDisplay = ({
  className,
  ...props
}: VideoPlayerTimeDisplayProps) => (
  <MediaTimeDisplay className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerVolumeRangeProps = ComponentProps<
  typeof MediaVolumeRange
>;

export const VideoPlayerVolumeRange = ({
  className,
  ...props
}: VideoPlayerVolumeRangeProps) => (
  <MediaVolumeRange className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerPlayButtonProps = ComponentProps<typeof MediaPlayButton>;

export const VideoPlayerPlayButton = ({
  className,
  ...props
}: VideoPlayerPlayButtonProps) => (
  <MediaPlayButton className={cn("", className)} {...props} />
);

export type VideoPlayerSeekBackwardButtonProps = ComponentProps<
  typeof MediaSeekBackwardButton
>;

export const VideoPlayerSeekBackwardButton = ({
  className,
  ...props
}: VideoPlayerSeekBackwardButtonProps) => (
  <MediaSeekBackwardButton className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerSeekForwardButtonProps = ComponentProps<
  typeof MediaSeekForwardButton
>;

export const VideoPlayerSeekForwardButton = ({
  className,
  ...props
}: VideoPlayerSeekForwardButtonProps) => (
  <MediaSeekForwardButton className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerMuteButtonProps = ComponentProps<typeof MediaMuteButton>;

export const VideoPlayerMuteButton = ({
  className,
  ...props
}: VideoPlayerMuteButtonProps) => (
  <MediaMuteButton className={cn("", className)} {...props} />
);

export type VideoPlayerContentProps = ComponentProps<"video">;

export const VideoPlayerContent = ({
  className,
  ...props
}: VideoPlayerContentProps) => (
  <video className={cn("mb-0 mt-0", className)} {...props} />
);

export const PlayerSection = () => {
  const [showVideoPopOver, setShowVideoPopOver] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false); // 👈 track visibility

  const sectionRef = useRef<HTMLElement | null>(null);

  // detect when section is visible
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // section reached
            observer.disconnect(); // load once, then stop observing
          }
        });
      },
      { threshold: 0.3 } // section visible by 30%
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const SPRING = { mass: 0.1 };
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const opacity = useSpring(0, SPRING);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    opacity.set(1);
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - bounds.left);
    y.set(e.clientY - bounds.top);
  };

  const handleOnClick = (src: string) => {
    setSelectedVideo(src);
    setShowVideoPopOver(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center bg-valorantbackground"
      style={{
        backgroundImage: `url("/img/background/background-1.png")`,
        backgroundPosition: "50% 0px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "color-burn",
      }}
    >
      {/* Title */}
      <div className="absolute top-24 grid content-start justify-items-center gap-6 text-center">
        <Animation2Title
          title="Gear Up for the <b>n</b>ew Se<b>a</b>s<b>o</b>n <br />  Are You Ready?"
          containerClass="!text-black text-center"
        />
      </div>

      {/* Subtitle */}
      <div className="absolute bottom-20 grid content-start justify-items-center gap-6 text-center">
        <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
          Click the video to play
        </span>
      </div>

      {/* Popover */}
      <AnimatePresence>
        {showVideoPopOver && selectedVideo && (
          <VideoPopOver
            setShowVideoPopOver={setShowVideoPopOver}
            selectedVideo={selectedVideo}
          />
        )}
      </AnimatePresence>

      {/* Carousel */}
      <Carousel
        opts={{ loop: true }}
        setApi={(api) => {
          if (!api) return;
          setActiveIndex(api.selectedScrollSnap());
          api.on("select", () => {
            setActiveIndex(api.selectedScrollSnap());
          });
        }}
        className="mt-16"
      >
        <CarouselContent className="relative w-full h-full">
          {/* Item 1 */}
          <CarouselItem>
            <div
              onMouseMove={handlePointerMove}
              onMouseLeave={() => opacity.set(0)}
              onClick={
                activeIndex === 0
                  ? () => handleOnClick("/videos/hero-new-3.mp4")
                  : undefined
              }
              className="w-52 mx-auto"
            >
              <motion.div
                style={{ x, y, opacity }}
                className="relative z-20 flex w-fit select-none items-center justify-center gap-2 p-2 text-sm text-white mix-blend-exclusion"
              >
                <IoMdPlay className="size-4 fill-white" /> Play
              </motion.div>

              {isVisible ? ( // 👈 only render video once section visible
                <video
                  autoPlay
                  muted
                  playsInline
                  loop
                  className="h-52 w-52 object-cover ml-6"
                >
                  <source src="/videos/hero-new-3.mp4" />
                </video>
              ) : (
                <div className="h-52 w-52 bg-gray-900 ml-6 animate-pulse rounded-lg" />
              )}
            </div>
          </CarouselItem>

          {/* Item 2 */}
          <CarouselItem>
            <div
              onMouseMove={handlePointerMove}
              onMouseLeave={() => opacity.set(0)}
              onClick={
                activeIndex === 1
                  ? () => handleOnClick("/videos/hero-new-2.mp4")
                  : undefined
              }
              className="w-52 mx-auto"
            >
              <motion.div
                style={{ x, y, opacity }}
                className="relative z-20 flex w-fit select-none items-center justify-center gap-2 p-2 text-sm text-white mix-blend-exclusion"
              >
                <IoMdPlay className="size-4 fill-white" /> Play
              </motion.div>

              {isVisible ? (
                <video
                  autoPlay
                  muted
                  playsInline
                  loop
                  className="h-52 w-52 object-cover ml-6"
                >
                  <source src="/videos/hero-new-2.mp4" />
                </video>
              ) : (
                <div className="h-52 w-52 bg-gray-900 ml-6 animate-pulse rounded-lg" />
              )}
            </div>
          </CarouselItem>
        </CarouselContent>

        {/* Navigation */}
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 border-none" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 border-none" />
      </Carousel>
    </section>
  );
};

interface VideoPopOverProps {
  setShowVideoPopOver: (showVideoPopOver: boolean) => void;
  selectedVideo: string | null;
}

export const VideoPopOver = ({
  setShowVideoPopOver,
  selectedVideo,
}: VideoPopOverProps) => {
  return (
    <div className="fixed left-0 top-0 z-[101] flex h-screen w-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-background/90 absolute left-0 top-0 h-full w-full backdrop-blur-lg"
        onClick={() => setShowVideoPopOver(false)}
      ></motion.div>
      <motion.div
        initial={{ clipPath: "inset(43.5% 43.5% 33.5% 43.5% )", opacity: 0 }}
        animate={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
        exit={{
          clipPath: "inset(43.5% 43.5% 33.5% 43.5% )",
          opacity: 0,
          transition: {
            duration: 1,
            type: "spring",
            stiffness: 100,
            damping: 20,
            opacity: { duration: 0.2, delay: 0.8 },
          },
        }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="relative aspect-video max-w-7xl"
      >
        <VideoPlayer style={{ width: "100%", height: "100%" }}>
          <VideoPlayerContent
            src={selectedVideo ? selectedVideo : "/videos/hero-new-1.mp4"}
            autoPlay
            slot="media"
            className="w-full object-cover"
            style={{ width: "100%", height: "100%" }}
          />

          <span
            onClick={() => setShowVideoPopOver(false)}
            className="absolute right-2 top-2 z-10 cursor-pointer rounded-full p-1 transition-colors"
          >
            <AiOutlinePlus className="size-5 rotate-45 text-white" />
          </span>
          <VideoPlayerControlBar className="absolute bottom-0 left-1/2 flex w-full max-w-7xl -translate-x-1/2 items-center justify-center px-5 mix-blend-exclusion md:px-10 md:py-5">
            <VideoPlayerPlayButton className="h-4 bg-transparent  " />
            <VideoPlayerTimeRange className="bg-transparent " />
            <VideoPlayerMuteButton className="size-4 bg-transparent " />
          </VideoPlayerControlBar>
        </VideoPlayer>
      </motion.div>
    </div>
  );
};
