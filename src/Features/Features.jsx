"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCalculator,
  faChalkboardUser,
  faChartSimple,
  faClipboardUser,
  faCoffee,
  faFileInvoice,
  faFileLines,
  faFileShield,
  faMobileRetro,
  faMoneyCheck,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Swiper for mobile/tablet only
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Configure Font Awesome
config.autoAddCss = false;

// Add global styles for the slider
const globalStyles = `
  .slick-slide > div {
    margin: 0 10px;
  }
  .slick-list {
    margin: 0 -10px;
  }
  .slick-prev:before,
  .slick-next:before {
    color: #000 !important;
  }
  .slick-dots li button:before {
    font-size: 12px !important;
  }
  .slick-dots li.slick-active button:before {
    color: #4f46e5 !important;
  }
`;

const data = [
  {
    name: "One app",
    icon: faMobileRetro,
    description: "to manage all your business",
    color: "text-[#FFD43B]",
  },
  {
    name: "Records",
    icon: faFileLines,
    description: "digital manager for tenant records",
    color: "text-[#e6c893]",
  },
  {
    name: "Admission",
    icon: faClipboardUser,
    description: "online & digital tenant registration",
    color: "text-[#95e4f4]",
  },
  {
    name: "Collection ",
    icon: faMoneyCheck,
    description: "hassel free rent collection",
    color: "text-[#3fea10]",
  },
  {
    name: "Accountant",
    icon: faFileInvoice,
    description: "digital & S-mart accountant",
    color: "text-[#8D6F64]",
  },
  {
    name: "Manager",
    icon: faUsersGear,
    description: "Rooms,lead & complaint manager",
    color: "text-[#FFD43B]",
  },
  {
    name: "Tenant app ",
    icon: faChalkboardUser,
    description: "For transparent and easy record",
    color: "text-[#63E6BE]",
  },
  {
    name: "Roles ",
    icon: faUsersGear,
    description: "manage employee attendance,records and roles ",
    color: "text-[#3fea10]",
  },
  {
    name: "Audit",
    icon: faChartSimple,
    description: "Smart audit system profit/loss records",
    color: "text-[#95e4f4]",
  },
  {
    name: "Calculate ",
    icon: faCalculator,
    description: "calculate and manage electricity bill",
    color: "text-[#8D6F64]",
  },
  {
    name: "Backup",
    icon: faFileShield,
    description: "Google cloud backup & restore ",
    color: "text-[#95e4f4]",
  },
  {
    name: "Remainder",
    icon: faBell,
    description: "Billing, updates and collection remainder",
    color: "text-[#3fea10]",
  },
  {
    name: "Reports ",
    icon: faFileInvoice,
    description: "create expense and sales report ",
    color: "text-[#95e4f4]",
  },
];

const SmartFeaturesForYou = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileLike, setIsMobileLike] = useState(false); // tablet/mobile detection

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const mq = window.matchMedia("(max-width: 1023.98px)");
    const update = () => setIsMobileLike(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [isMounted]);

  if (!isMounted) {
    return null; // Don't render slider during SSR or before hydration
  }

  const settings = {
    dots: false,
    infinite: true,
    pauseOnHover: true,
    swipeToSlide: true,
    autoplay: true,
    speed: 10000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <div className="h-[15rem] sm:h-[16rem] md:h-[17rem] lg:h-[17rem] relative mt-10 sm:mt-12 md:mt-16 lg:mt-20 px-2 sm:px-4 bg-[#ffe0ac]">
      <div className="absolute bg-gray-400 rounded-lg text-white -top-4 sm:-top-5 md:-top-6 left-2 sm:left-3 md:left-5 h-[2.5rem] sm:h-[2.8rem] md:h-[3rem] border-black z-10">
        <h1 className="text-lg sm:text-xl md:text-2xl text-center p-1 px-2 sm:px-3 leading-tight flex items-center justify-center h-full">
          S-mart Features
        </h1>
      </div>
      <div className="h-1"></div>
      <div className="w-auto mx-auto mt-6 sm:mt-8 md:mt-10">
        <div className="mt-3 sm:mt-4 md:mt-5">
          {isMobileLike ? (
            <Swiper
              spaceBetween={20}
              centeredSlides={false}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={false}
              breakpoints={{
                0: { slidesPerView: 1 },
                600: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
              }}
              modules={[Autoplay, Pagination, Navigation]}
            >
              {data.map((d, index) => (
                <SwiperSlide key={index}>
                  <div className="px-1">
                    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-[200px] mx-1">
                      <div className="flex flex-col justify-between h-full p-3">
                        <div className="flex justify-center items-center h-[60px]">
                          <FontAwesomeIcon
                            icon={d.icon}
                            className={`${d.color} custom-icon-class`}
                            style={{ fontSize: "2.5rem" }}
                          />
                        </div>

                        <div className="flex justify-center items-center text-center h-[50px]">
                          <h5
                            className={`card-title ${d.color} m-0 font-weight-bold`}
                            style={{ fontSize: "1.1rem", lineHeight: "1.2" }}
                          >
                            {d.name}
                          </h5>
                        </div>

                        <div className="flex justify-center items-center text-center h-[60px]">
                          <p className="m-0 text-sm leading-tight px-2">{d.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Slider {...settings}>
              {data.map((d, index) => (
                <div key={index} className="px-1">
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-[200px] mx-1">
                    <div className="flex flex-col justify-between h-full p-3">
                      <div className="flex justify-center items-center h-[60px]">
                        <FontAwesomeIcon
                          icon={d.icon}
                          className={`${d.color} custom-icon-class`}
                          style={{ fontSize: "2.5rem" }}
                        />
                      </div>

                      <div className="flex justify-center items-center text-center h-[50px]">
                        <h5
                          className={`card-title ${d.color} m-0 font-weight-bold`}
                          style={{ fontSize: "1.1rem", lineHeight: "1.2" }}
                        >
                          {d.name}
                        </h5>
                      </div>

                      <div className="flex justify-center items-center text-center h-[60px]">
                        <p className="m-0 text-sm leading-tight px-2">{d.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartFeaturesForYou;
