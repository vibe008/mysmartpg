"use client";
import React, { useEffect, useRef } from "react";
import wowImage from "../../Public/assets/wow.png";
import treeBgImage from "../../Public/assets/TREE-BG-01.png";
import carGif from "../../Public/assets/car.gif";
import cyclistGif from "../../Public/assets/cyclist.gif";
const Homepage = ({ setIsOpen }) => {
  const mainRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        const scrollPercentage =
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
          100;
        const hue = Math.round((scrollPercentage * 3.6) % 360);
        mainRef.current.style.backgroundColor = `hsl(${hue}, 70%, 95%)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={mainRef}
      style={{ backgroundImage: `url(${treeBgImage})`,backgroundPosition:"bottom" }}
      className="relative min-h-screen overflow-x-hidden bg-no-repeat bg-cover transition-colors duration-300 ease-in-out"
    >
      {/* Content Wrapper */}
      <div className="flex flex-wrap items-center justify-center gap-12 px-6 py-16 max-w-[1400px] mx-auto">
        {/* Left Content */}
        <div className="flex-1 min-w-[350px] max-w-[600px] text-left">
          <a
            href="/CommingSoon"
            className="inline-block text-orange-600 text-[clamp(2rem,5vw,3rem)] border-2 border-black mb-4 px-6 py-1 rounded-xl no-underline transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            WOW
          </a>
          <h1 className="text-gray-500 font-light leading-snug mb-4 text-[clamp(1.5rem,4vw,2.25rem)]">
            Accessibility Anywhere, Anytime: <br /> Seamlessly manage your
            business from <br /> any device, Mobile-Tab-Desktop <br />
            Compatibility
          </h1>
          <h3 className="text-gray-600 font-light leading-8 mb-6 text-[clamp(1.2rem,3vw,1.5rem)]">
            Tailored Applications for Every Platform <br /> Download Now
          </h3>
          <ul className="flex flex-wrap gap-4 mt-6 list-none justify-start max-[768px]:flex-col max-[768px]:items-center max-[768px]:gap-3">
            {["IOS", "ANDROID", "WINDOWS"].map((platform) => (
              <li
              onClick={()=>{
                if(platform === "IOS"){
                  setIsOpen(true)
                }
                if(platform === "ANDROID"){
                  setIsOpen(true)
                }
                if(platform === "WINDOWS"){
                  window.open("https://web.mysmartpg.com/", "_blank");
                }
              }}
                key={platform}
                className="border border-black px-4 py-2 rounded-md text-[clamp(0.9rem,2.5vw,1rem)] cursor-pointer transition-colors duration-200 hover:bg-gray-100"
              >
                {platform}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content */}
        <div className="flex-1 min-w-[300px] text-center">
          <img
            src={wowImage}
            alt="WOW App Preview"
            className="w-full max-w-[600px] h-auto mx-auto"
          />
        </div>
      </div>
      {/* Moving Car */}
      <div
      style={{ backgroundImage: `url(${carGif})`}}
        className="movingCar absolute bottom-0 left-[30%] bg-no-repeat bg-center bg-contain animate-moveRight
    w-[clamp(180px,25vw,220px)] h-[clamp(60px,8vw,80px)]
  "
      ></div>

      {/* Moving Cyclist */}
      <div
      style={{ backgroundImage: `url(${cyclistGif})`}}
        className="movingCyclist absolute bottom-0 left-[38%] bg-no-repeat bg-center bg-contain animate-moveRightSlow
    w-[clamp(50px,10vw,60px)] h-[clamp(55px,10vw,70px)]
  "
      ></div>

      {/* Keyframes */}
      <style>
        {`
          @keyframes moveRight {
            0% { left: -25%; }
            100% { left: 100%; }
          }
          @keyframes moveRightSlow {
            0% { left: -25%; }
            100% { left: 100%; }
          }
          .animate-moveRight {
            animation: moveRight 22s linear infinite;
          }
          .animate-moveRightSlow {
            animation: moveRightSlow 30s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Homepage;
