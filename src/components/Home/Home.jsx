import { Link } from "react-router-dom";
import thumbnailURL from "../../assets/shreyaji.png";
import { useState } from "react";
import ytIcon from "../../assets/youtube-color-icon.svg";

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hovered, setHovered] = useState(null);
  return (
    <div className="flex justify-center items-center flex-col gap-[1.5rem] h-[80vh] w-[100%] bg-[#F8F8F8]">
    

      <Link
      to="https://www.youtube.com/watch?v=9pIP8fWEUzo"
      className="flex gap-1 justify-center items-center container w-[fit-content]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-7 h-7 mr-1 rounded-full overflow-hidden">
        <img
          src={thumbnailURL}
          alt="Now Playing"
          className="w-full h-full object-cover animate-spin-slow"
        />
      </div>

   
        <p className="text-[0.75rem]">bairiyaa</p>
        <p className="text-[0.75rem] text-[#969696]">· current vibe</p>


      {isHovered && (
        <img src={ytIcon} alt="YouTube" className="w-4 transition-opacity duration-200" />
      )}
    </Link>



<div className=" text-[1.35rem] text-center leading-tight text-balance w-full sm:w-[90vw] md:w-[70vw] lg:w-[50vw]">
<h1 className="text-lg ">
  I’m Kalpana Bhatt — daughter of a{" "} 
  <span
    className="hover-word text-[#969696]"
    onMouseEnter={() => setHovered("mom")}
    onMouseLeave={() => setHovered(null)}
  >
     supermom
  </span>
  , shaped by{" "}
  <span
    className="hover-word text-[#969696]"
    onMouseEnter={() => setHovered("math")}
    onMouseLeave={() => setHovered(null)}
  >
    equations
  </span>
  , powered by{" "}
  <span
    className="hover-word text-[#969696]"
    onMouseEnter={() => setHovered("music")}
    onMouseLeave={() => setHovered(null)}
  >
    lo-fi beats
  </span>
  , now designing clarity{" "}
  <span
    className="hover-word text-[#969696]"
    onMouseEnter={() => setHovered("chaos")}
    onMouseLeave={() => setHovered(null)}
  >
    out of chaos
  </span>
  . I turn{" "}
  <span
    className="hover-word text-[#969696]"
    onMouseEnter={() => setHovered("ideas")}
    onMouseLeave={() => setHovered(null)}
  >
    half-baked ideas
  </span>{" "}
  into elegant, scalable interfaces that just make sense.
</h1>


  {hovered === "mom" && (
    <img src={thumbnailURL} className="absolute top-3 w-64" />
  )}
  {hovered === "math" && (
    <img src="/math.png" className="absolute top-0 left-full transition-opacity" />
  )}
  {hovered === "music" && (
    <img src="/lofi.png" className="absolute top-0 left-full transition-opacity" />
  )}
    {hovered === "chaos" && (
    <img src="/lofi.png" className="absolute top-0 left-full transition-opacity" />
  )}
    {hovered === "ideas" && (
    <img src="/lofi.png" className="absolute top-0 left-full transition-opacity" />
  )}
</div>
    </div>


   
  );
};

export default Home;
