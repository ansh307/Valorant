import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import clsx from "clsx";
import ReactLenis from "lenis/react";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
  titleClassName?: string;
};

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
  titleClassName,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  // Scroll-based animation for movement and rotation
  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0]
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0]
  );

  return (
    <motion.span
      className={clsx(
        "inline-block text-valorant",
        titleClassName,
        isSpace && "w-4"
      )}
      style={{
        x,
        rotateX,
      }}
    >
      {char}
    </motion.span>
  );
};

type Animation2TitleProps = {
  title: string;
  containerClass?: string;
  titleClassName?: string;
};

const Animation2Title = ({
  title,
  containerClass,
  titleClassName,
}: Animation2TitleProps) => {
  const containerRef = useRef(null);

  // Hook into scroll for this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  return (
    <ReactLenis root>
      <div
        ref={containerRef}
        className={clsx("animated-title", containerClass)}
      >
        {title.split("<br />").map((line, lineIndex) => (
          <div
            key={lineIndex}
            className="flex-center max-w-full gap-2 px-10 md:gap-3"
          >
            {line.split(" ").map((word, wordIdx) => {
              // If word contains an HTML tag like <b>, render it directly
              if (word.includes("<b>") || word.includes("</b>")) {
                return (
                  <span
                    key={wordIdx}
                    className="inline-flex special-font font-zentry font-black "
                    dangerouslySetInnerHTML={{ __html: word }}
                  />
                );
              }

              // For normal words, split them into characters
              const characters = word.split("");
              const centerIndex = Math.floor(characters.length / 2);

              return (
                <span
                  key={wordIdx}
                  className="inline-flex special-font font-zentry font-black"
                >
                  {characters.map((char, charIndex) => (
                    <CharacterV1
                      key={charIndex}
                      char={char}
                      index={charIndex}
                      centerIndex={centerIndex}
                      scrollYProgress={scrollYProgress}
                      titleClassName={titleClassName}
                    />
                  ))}
                  {/* Space between words */}
                  <span className="w-3" />
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </ReactLenis>
  );
};

export default Animation2Title;
