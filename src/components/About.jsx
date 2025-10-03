import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AnimatedTitle from "./AnimatedTitle";
import Animation2Title from "./Animated2Title";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div
      id="about"
      className="min-h-screen w-screen"
      style={{
        backgroundImage: `url("/img/background/background-2.png")`,
        backgroundPosition: "center 20%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "150% auto",
        backgroundColor: "#ece7e1",
      }}
    >
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-sans text-sm uppercase md:text-[10px]">
          DEFY THE LIMITS
        </p>

        <Animation2Title
          title="M<b>a</b>ster Your Strategy <br />       Unleash Your Precisi<b>o</b>n"
          containerClass="mt-14 !text-black text-center"
        />

        <div className="about-subtext">
          <p>FIGHT AROUND THE WORLD</p>
          <p className="text-gray-500">
            Each map is a playground to showcase your creative thinking.
            Purpose-built for team strategies, spectacular plays, and clutch
            moments. Make the play others will imitate for years to come..
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about-new.jpg"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
