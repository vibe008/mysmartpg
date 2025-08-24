"use client";
import React, { useState, useEffect, useRef } from "react";
import Middle from "./Middle";
import SmartFeaturesForYou from "./Features";
import AllSlider from "../Home/AllSlider";
import Footer from "../Home/Footer";
import servicesImage from "../../Public/assets/SERVICES.png";
import treeBgImage from "../../Public/assets/TREE-BG-01.png";
import carGif from "../../Public/assets/car.gif";
import cyclistGif from "../../Public/assets/cyclist.gif";

const Homepage = () => {
  const [imageError, setImageError] = useState(false);
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        ref={mainRef}
        className="relative min-h-screen overflow-x-hidden bg-no-repeat bg-cover transition-colors duration-300 ease-in-out "
        style={{ backgroundImage: `url(${treeBgImage})`,backgroundPosition:"bottom" }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20 h-auto max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-8">
          <div className="max-w-[600px] text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-[5.5rem] font-light text-gray-500 mb-4">
              Ranked#1
            </h1>
            <h3 className="text-lg sm:text-xl lg:text-[1.5rem] leading-snug text-gray-700 font-light mb-6">
              Special Smart Feature &gt; Totally{" "}
              <br className="hidden sm:block" />
              Different from others &gt; No worry to{" "}
              <br className="hidden sm:block" />
              Vacant hostel/PG
            </h3>
          </div>

            <div className="mt-5 flex justify-center">
            {!imageError ? (
              <img
                src={servicesImage}
                alt="S-Mart Features"
                className="w-full max-w-[700px] h-auto object-contain"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="text-center text-red-500">
                <p>Feature image not available</p>
              </div>
            )}
          </div>
        </div>

        <div
          className="absolute bottom-0 left-[-25%] bg-no-repeat bg-center bg-contain animate-[moveRight_22s_linear_infinite]"
          style={{
            backgroundImage: `url(${carGif})`,
            width: "clamp(200px, 25vw, 330px)",
            height: "clamp(70px, 10vw, 105px)",
          }}
        />
        <div
          className="absolute bottom-0 left-[-25%] bg-no-repeat bg-center bg-contain animate-[moveRight_30s_linear_infinite]"
          style={{
            backgroundImage: `url(${cyclistGif})`,
            width: "clamp(60px, 8vw, 88px)",
            height: "clamp(70px, 10vw, 100px)",
          }}
        />

        <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 " />

        
      </div>

      <Middle />
      <AllSlider />
      <SmartFeaturesForYou />
      <Footer />

      {/* Keyframes */}
      <style>{`
        @keyframes moveRight {
          0% {
            left: -25%;
          }
          100% {
            left: 110%;
          }
        }
      `}</style>
    </>
  );
};

export default Homepage;
