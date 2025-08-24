"use client";
import React, { useEffect, useRef } from "react";
import smartapp from "../../Public/assets/smartapp.png";
import differentfromothers from "../../Public/assets/differentfromothers.png";
import tenantapp from "../../Public/assets/tenantapp.png";
const featureData = [
  {
    id: 1,
    title: "Hostel Booking",
    description: "Find and book the best hostels with all necessary amenities.",
    icon: "🏠",
  },
  {
    id: 2,
    title: "PG Accommodation",
    description:
      "Comfortable and affordable PG options for students and professionals.",
    icon: "🏢",
  },
  {
    id: 3,
    title: "Room Sharing",
    description: "Find roommates and share accommodations to save costs.",
    icon: "👥",
  },
  {
    id: 4,
    title: "Verified Listings",
    description:
      "All our listings are verified for your safety and convenience.",
    icon: "✅",
  },
  {
    id: 5,
    title: "24/7 Support",
    description: "Round-the-clock customer support for all your queries.",
    icon: "📞",
  },
  {
    id: 6,
    title: "Easy Payments",
    description: "Secure and hassle-free payment options available.",
    icon: "💳",
  },
];

const Middle = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPercentage =
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
          100;
        const hue = Math.round((scrollPercentage * 3.6) % 360);
        containerRef.current.style.backgroundColor = `hsl(${hue}, 70%, 95%)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const additionalFeatures = [
    {
      title: "SPECIAL S-MART FEATURES",
      description:
        "MANAGE: FOOD MENU, CUSTOM SALES, MONTHLY REPORTS, OFFERS ZONE, NOTIFY ON WHATSAPP, TENANT NOTICE, COMPLAINT & LEADS",
      imgSrc: smartapp,
      alt: "Special S-Mart Features",
    },
    {
      title: "DIFFERENT FROM OTHERS",
      description:
        "MANAGE: KITCHEN STOCKS, EMPLOYEE ATTENDANCE & SALARY, ELECTRICITY BILL AND SMART TENANT & EMPLOYEE VERIFICATION",
      imgSrc:differentfromothers,
      alt: "Different from Others",
    },
    {
      title: "S-MART TENANT APP",
      description:
        "FOR TRANSPARENCY, EASY RECORDS AND HASSLE FREE COMMUNICATION.",
      imgSrc:tenantapp,
      alt: "S-Mart Tenant App",
    },
  ];

  const mappedFeatureData = featureData.map((feature) => ({
    title: feature.title,
    description: feature.description,
    imgSrc: feature.image || "/public/assets/placeholder.png",
    alt: feature.title || "Feature image",
    icon: feature.icon,
  }));

  const features = [...mappedFeatureData, ...additionalFeatures];

  return (
    <div
      ref={containerRef}
      className="py-14 transition-colors duration-300"
      style={{ backgroundColor: "hsl(0, 70%, 95%)" }}
    >
      <div className="mx-auto px-2 lg:px-20">
        <p className="text-center text-[#b0751c] uppercase text-base font-bold leading-7 text-primary-500">
          --- <span>How the app can benefit hostel and PG owners</span> ---
        </p>
        <h2 className="text-center font-display text-4xl font-bold tracking-tight text-slate-900 mb-10">
          Explore our <span className="text-[#9e6818]">S-mart Features</span>
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-5 text-center text-slate-700 md:grid-cols-3 md:w-105 md:mx-auto ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#fff] rounded-xl px-8 py-15 hover:bg-[#a5a4a4] hover:text-white shadow-sm "
            >
              <div className="text-center">
                {/* Icon or Image */}
                <div className="mx-auto h-28 w-28 overflow-hidden flex items-center justify-center">
                  {feature.icon ? (
                    <span className="text-5xl">{feature.icon}</span>
                  ) : (
                    <div className="relative w-24 h-28">
                      <img
                        src={feature.imgSrc}
                        alt={feature.alt}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = "none";
                          const fallback = document.createElement("div");
                          fallback.className =
                            "w-full h-full flex items-center justify-center bg-gray-200 text-gray-400";
                          fallback.textContent =
                            feature.title?.charAt(0) || "?";
                          e.target.parentNode.appendChild(fallback);
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="mt-4 font-bold text-lg">{feature.title}</h3>

                {/* Description */}
                <p className="mt-2 text-lg">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Middle;
