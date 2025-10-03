import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const Contact = () => {
  return (
    <div
      id="contact"
      className="py-20 min-h-96 w-screen bg-black text-blue-50 px-10"
    >
      <div
        className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden border-hsla"
        style={{
          backgroundImage: `url("/img/background/vtc-background-2.png")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
          backgroundSize: "120% auto",
          backgroundBlendMode: "",
        }}
      >
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <div
            className={
              " bg-valorantdarkgray w-[17rem] h-64 absolute lg:translate-y-96 translate-y-60"
            }
            style={{
              clipPath: "polygon(21% 24%, 100% 0, 100% 100%, 30% 90%)",
            }}
          />
          <div
            className={
              "md:scale-75 lg:translate-y-52 translate-y-60 -rotate-[30deg]"
            }
          >
            <img
              src={"/img/vtc-trophy.png"}
              className="w-72 h-full "
              alt="vtc-trophy.png"
            />
          </div>
        </div>

        {/* Phnx and jett */}
        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-96">
          <div
            className={" bg-valorant w-96 h-[23rem] absolute "}
            style={{
              clipPath: "polygon(13% 0, 100% 0, 70% 99%, 0 79%)",
            }}
          />
          <div
            className={"md:scale-125"}
            style={{
              clipPath: "polygon(13% 0, 100% 0, 70% 100%, 0 79%)",
            }}
          >
            <img src={"/img/jett-phnx.png"} alt="jett-phnx.png" />
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <AnimatedTitle
            title="VALOR<b>A</b>NT <br />CH<b>A</b>MPIO<b>N</b>S <br /> P<b>A</b>RIS"
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <p className="mt-10 mb-5 font-sans text-[10px] uppercase max-w-96 ">
            Watch the biggest plays as the best teams in VALORANT compete at
            Champions September 12 - October 5.
          </p>

          <Button title="Watch Now" containerClass="mt-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
