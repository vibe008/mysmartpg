import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Smartphone, Tablet, Monitor } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import now from "../../Public/assets/now.png";
import hostelSofa from "../../Public/assets/hostelSofa.png";
import oneApp from "../../Public/assets/oneapp.png";
import wow1 from "../../Public/assets/wow1.png";

const carouselData = [
  {
    bgGradient: "from-slate-100 via-gray-100 to-zinc-100",
    overlayPattern: "geometric",
    textColor: "text-slate-700",
    pcolor: "text-orange-600",
    title: "NO WORRY FOR HUSTLE",
    description: "TO GIVE YOUR HOSTEL / PG ON RENT",
    description1: "S-MART WAY TO RENT YOUR PROPERTY",
    buttonColor: "from-orange-500 to-red-500",
    buttonText: "NOW",
    imgSrc: now,
    alt: "S-MART property management interface on mobile device",
    textSize: "text-3xl lg:text-5xl",
    h4Size: "text-xl lg:text-3xl",
    accentColor: "orange-500",
  },
  {
    bgGradient: "from-amber-200 via-yellow-100 to-orange-100",
    overlayPattern: "waves",
    textColor: "text-gray-700",
    pcolor: "text-slate-800",
    title: "Hostel/PG management On your finger tip",
    description:
      "Are you tired of juggling multiple tasks and struggling? To keep up with the demands of running a hostel or PG business..!",
    description1:
      "Say goodbye to stress & troubles Hello to efficiency with our innovative System.",
    buttonColor: "from-slate-600 to-gray-700",
    buttonText: "One Stop Solution",
    imgSrc: hostelSofa,
    alt: "Comfortable hostel room with modern furniture and natural lighting",
    textSize: "text-3xl lg:text-5xl",
    h4Size: "text-xl lg:text-3xl",
    accentColor: "slate-600",
  },
  {
    bgGradient: "from-gray-900 via-slate-800 to-zinc-900",
    overlayPattern: "dots",
    textColor: "text-orange-400",
    pcolor: "text-teal-400",
    title: "To manage your all business",
    description:
      "Manage all your business in just one dashboard. 10 second is much enough to access your multiple branches.",
    description1:
      "Free from paper work, provides you S-Mart team, all on just one click with super secured cloud storage",
    buttonColor: "from-teal-500 to-cyan-500",
    buttonText: "One app",
    imgSrc: oneApp,
    alt: "Mobile app interface showing property management features",
    textSize: "text-3xl lg:text-5xl",
    h4Size: "text-xl lg:text-3xl",
    accentColor: "teal-500",
  },
  {
    bgGradient: "from-blue-50 via-sky-50 to-indigo-50",
    overlayPattern: "circles",
    textColor: "text-gray-700",
    pcolor: "text-gray-800",
    title:
      "Accessibility Anywhere, Anytime: Seamlessly manage your business from any device",
    description: "Tailored Applications for Every Platform",
    description1: "Mobile, Tablet, Desktop Compatibility",
    platforms: [
      { name: "IOS", icon: <Smartphone className="w-4 h-4" /> },
      { name: "ANDROID", icon: <Tablet className="w-4 h-4" /> },
      { name: "WINDOWS", icon: <Monitor className="w-4 h-4" /> },
    ],
    buttonColor: "from-blue-500 to-indigo-500",
    buttonText: "WOW",
    imgSrc: wow1,
    alt: "Device compatibility icons with platform names",
    textSize: "text-3xl lg:text-5xl",
    h4Size: "text-xl lg:text-3xl",
    accentColor: "blue-500",
  },
];

const EnhancedCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const renderOverlayPattern = (pattern) => {
    const commonClass = "absolute bg-white opacity-10 rounded-full";
    switch (pattern) {
      case "geometric":
        return <div className={`${commonClass} w-16 h-16 top-10 left-10 animate-spin`} />;
      case "waves":
        return <div className={`${commonClass} w-32 h-4 top-20 left-1/2 animate-pulse`} />;
      case "dots":
        return (
          <div className="absolute inset-0 grid grid-cols-8 gap-2 p-4 opacity-10 pointer-events-none">
            {Array(32)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="w-2 h-2 bg-white rounded-full animate-pulse" />
              ))}
          </div>
        );
      case "circles":
        return (
          <>
            <div className={`${commonClass} w-24 h-24 top-12 left-12 animate-bounce`} />
            <div className={`${commonClass} w-16 h-16 bottom-10 right-10 animate-bounce`} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative h-[700px] w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        className="h-full"
        observer={true}
        observeParents={true}
      >
        {carouselData.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className={`relative h-[700px] w-full bg-gradient-to-br ${slide.bgGradient} transition-all duration-1000 flex items-center`}
            >
              {renderOverlayPattern(slide.overlayPattern)}

              <div className="relative z-10 container mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-6 items-center w-full">
                  <div className={`space-y-6 ${slide.textColor}`}>
                    <button
                      className={`relative px-6 py-2 rounded-full bg-gradient-to-r ${slide.buttonColor} text-white font-semibold text-sm`}
                      type="button"
                    >
                      <span className="z-10 relative">{slide.buttonText}</span>
                    </button>
                    <h1 className={`${slide.textSize} font-bold`}>{slide.title}</h1>
                    <h4 className={`${slide.h4Size} ${slide.pcolor}`}>{slide.description}</h4>
                    <p className={`text-base ${slide.pcolor}`}>{slide.description1}</p>

                    {slide.platforms && (
                      <div className="flex gap-3 mt-4 flex-wrap">
                        {slide.platforms.map((p) => (
                          <div
                            key={p.name}
                            className="flex gap-2 items-center px-4 py-2 bg-white/80 rounded-xl text-sm"
                          >
                            {p.icon}
                            <span>{p.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative group w-full max-w-2xl mx-auto lg:mx-0">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${slide.buttonColor} rounded-3xl blur-2xl opacity-20 pointer-events-none`}
                    />
                    <div className="relative p-2 sm:p-4 rounded-3xl border border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
                      <img
                        src={slide.imgSrc}
                        alt={slide.alt || "Carousel visual"}
                        className="rounded-xl w-full h-auto max-h-[300px] sm:max-h-[400px] object-contain mx-auto"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button
        aria-label="Previous Slide"
        className="custom-prev hidden lg:flex absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow z-20 hover:bg-gray-100 transition"
        type="button"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        aria-label="Next Slide"
        className="custom-next hidden lg:flex absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow z-20 hover:bg-gray-100 transition"
        type="button"
      >
        <ChevronRight size={18} />
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-white/40">
        <div
          className={`h-full bg-gradient-to-r ${carouselData[currentSlide].buttonColor} transition-all duration-500`}
          style={{
            width: `${((currentSlide + 1) / carouselData.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default EnhancedCarousel;
