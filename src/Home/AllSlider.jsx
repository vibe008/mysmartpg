"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SectionWrapper = ({
  title,
  data = [],
  image,
  video,
  variant = "default",
  isLastSection = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const sectionRef = useRef(null);

  // Handle mounting to prevent hydration issues
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Simple intersection observer for visibility
  useEffect(() => {
    if (!mounted || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [mounted]);

  const getVariantClasses = () => {
    const variants = {
      spiral: "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200",
      wave: "bg-gradient-to-r from-cyan-50 to-teal-50 border-cyan-200",
      magnetic: "bg-gradient-to-bl from-pink-50 to-rose-50 border-pink-200",
      morphing:
        "bg-gradient-to-tr from-indigo-50 to-purple-50 border-indigo-200",
      liquid:
        "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200",
      default: "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200",
    };
    return variants[variant] || variants.default;
  };

  // Don't render until mounted
  if (!mounted) {
    return (
      <div className="w-full min-h-[600px] bg-gray-50 rounded-xl flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className={`relative w-full px-3 pt-10 ${isLastSection ? "pb-5" : "pb-5"} 
      md:pt-16 ${isLastSection ? "md:pb-16" : "md:pb-28"} ${
        isLastSection ? "mb-0" : "my-6"
      } 
      min-h-[650px] md:min-h-[750px] lg:min-h-[850px] flex flex-col items-center justify-center 
      rounded-xl border-2 overflow-hidden transition-all duration-1000 
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"} 
      ${getVariantClasses()}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-1"></div>
        {!isMobile && (
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white to-transparent transform skew-y-1"></div>
        )}
      </div>

      {/* Floating Elements */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-white rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute top-6 right-6 w-1 h-1 bg-white rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-3 left-1/4 w-1.5 h-1.5 bg-white rounded-full opacity-40 animate-pulse"></div>
        </div>
      )}

      <div className="w-full text-[#854836] relative z-10">
        <div className="flex flex-col-reverse sm:flex-col-reverse md:flex-row lg:flex-row  align-center   gap-y-6 md:gap-x-6 mt-6 md:mt-10 w-full  ">
          {/* Text & Cards */}
          <div className="text-center relative md:ml-32 md:mr-1 flex-1 w-full md:min-h-[32rem] ">
            {/* Small Image */}
            <div
              className={`w-20 h-20 overflow-hidden rounded-full mx-auto mb-4 bg-white shadow border border-white transition-all duration-700 ${
                isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              {image && !imageError ? (
                <img
                  src={image}
                  className="object-cover p-1 transition-transform duration-300 hover:scale-105 w-full h-full"
                  alt={`${title} icon`}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                  Icon
                </div>
              )}
            </div>

            {/* Title */}
            <h1
              className={`text-center font-bold text-base sm:text-lg md:text-xl uppercase pb-2 bg-gradient-to-r from-[#854836] to-[#a0523d] bg-clip-text text-transparent transition-all duration-700 delay-200 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              {title}
            </h1>

            {/* Cards */}
            <div className="mt-2 space-y-6">
              {data.map((item, index) => (
                <div
                  key={`item-${index}`}
                  className={`text-center w-full max-w-xs mx-auto bg-white/80 backdrop-blur-sm px-2 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-700 hover:scale-[1.02] border border-white/30 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <h3 className="text-sm font-bold text-[#854836] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-700 leading-tight">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Video */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start mt-6 md:mt-16 px-2">
            <div
              className={`rounded-xl w-full max-w-md aspect-square overflow-hidden shadow-md border border-white bg-gray-100 transition-all duration-700 delay-500 ${
                isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              {video && (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML =
                      '<div class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">Video not available</div>';
                  }}
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/20 to-transparent"></div>
    </div>
  );
};

// Simplified component exports without error boundaries
const RegistrationBoard = () => (
  <SectionWrapper
    title="Admission and Registration"
    image="/assets/registration.png"
    video="/assets/ok.mp4"
    variant="spiral"
    data={[
      {
        title: "E-Registration System",
        description:
          "Efficiently manage admissions through our smart digital platform, saving valuable time and resources.",
      },
      {
        title: "Centralized Data Hub",
        description:
          "Access all tenant details in one secure location with comprehensive registration forms.",
      },
      {
        title: "Streamlined Booking",
        description:
          "Facilitate hassle-free bookings with intuitive functionality and enhanced user experience.",
      },
      {
        title: "Lifetime Data Storage",
        description:
          "Secure cloud storage ensures tenant details are preserved and easily accessible forever.",
      },
      {
        title: "Flexible Room Management",
        description:
          "Seamlessly switch tenants between rooms while maintaining complete registration history.",
      },
    ]}
  />
);

const SmartDigitalAccount = () => (
  <SectionWrapper
    title="Smart Digital Account"
    image="/assets/accountant.png"
    video="/assets/ok.mp4"
    variant="wave"
    data={[
      {
        title: "Automated Sales Manager",
        description:
          "Advanced billing system streamlines rent collection with minimal administrative overhead.",
      },
      {
        title: "Multi-Platform Sharing",
        description:
          "Instantly distribute bills, reports, and reminders via WhatsApp and mobile app.",
      },
      {
        title: "Smart Expense Tracking",
        description:
          "Categorize, track, and manage all expenses with intelligent automation features.",
      },
      {
        title: "Comprehensive Reports",
        description:
          "Generate detailed monthly sales and expense reports with one-click downloads.",
      },
      {
        title: "Advanced Audit System",
        description:
          "Monitor profit/loss with detailed analytics across monthly, quarterly, and yearly periods.",
      },
    ]}
  />
);

const MultipleUser = () => (
  <SectionWrapper
    title="Multiple User Management"
    image="/assets/team.png"
    video="/assets/ok.mp4"
    variant="magnetic"
    data={[
      {
        title: "Dynamic Role System",
        description:
          "Assign flexible roles for managers, wardens, and kitchen staff with customizable permissions.",
      },
      {
        title: "Employee Lifecycle",
        description:
          "Complete employee management from registration to role updates with full tracking.",
      },
      {
        title: "Cross-Business Access",
        description:
          "Enable seamless access across different business units and operational modules.",
      },
      {
        title: "Activity Intelligence",
        description:
          "Comprehensive activity logs with progress tracking and performance analytics.",
      },
    ]}
  />
);

const MultipleBusiness = () => (
  <SectionWrapper
    title="Unified Business Dashboard"
    image="/assets/multiplebusiness.png"
    video="/assets/ok.mp4"
    variant="morphing"
    data={[
      {
        title: "Centralized Control",
        description:
          "Manage multiple businesses from one powerful dashboard without platform switching.",
      },
      {
        title: "Operational Excellence",
        description:
          "Streamline sales, expenses, and audits through unified management interface.",
      },
      {
        title: "Granular Permissions",
        description:
          "Customize access roles per business for enhanced security and control.",
      },
      {
        title: "Advanced Analytics",
        description:
          "View individual business metrics or analyze comprehensive cross-business data.",
      },
      {
        title: "Seamless Integration",
        description:
          "Connect all your systems for a truly unified business management experience.",
      },
    ]}
  />
);

const OnlineBusinessPlatform = () => (
  <SectionWrapper
    title="Online Business Platform"
    image="/assets/businessplatform.png"
    video="/assets/ok.mp4"
    variant="liquid"
    data={[
      {
        title: "Professional Profiles",
        description:
          "Create stunning business profiles showcasing your hostel/PG with comprehensive details.",
      },
      {
        title: "Visual Showcase",
        description:
          "Display rooms, amenities, and features with high-quality galleries to attract prospects.",
      },
      {
        title: "Digital Marketing Tools",
        description:
          "Promote your business online with built-in marketing tools and social media integration.",
      },
      {
        title: "Dynamic Offers",
        description:
          "Create compelling discount offers and promotional campaigns to boost bookings.",
      },
      {
        title: "Smart Discovery",
        description:
          "Enable tenant searches across all listed properties through app and web platforms.",
      },
    ]}
  />
);

const SPECIALSMARTFEATURES = () => (
  <SectionWrapper
    title="Special Smart Features"
    image="/assets/smartapp.png"
    video="/assets/ok.mp4"
    variant="spiral"
    data={[
      {
        title: "Digital Menu System",
        description:
          "Effortlessly update food items and manage daily menus with real-time synchronization.",
      },
      {
        title: "Revenue Tracking",
        description:
          "Monitor additional revenue streams like canteen, laundry, and auxiliary services.",
      },
      {
        title: "Automated Reporting",
        description:
          "Generate comprehensive monthly summaries with detailed insights and downloadable formats.",
      },
      {
        title: "Smart Communication",
        description:
          "Send targeted offers and alerts via WhatsApp to maintain tenant engagement.",
      },
      {
        title: "Integrated CRM",
        description:
          "Manage leads and tenant communication in one platform with automated follow-ups.",
      },
    ]}
  />
);

const BusinessDashboard = () => (
  <SectionWrapper
    title="Unique Differentiators"
    image="/assets/differentfromothers.png"
    video="/assets/ok.mp4"
    variant="wave"
    isLastSection={true}
    data={[
      {
        title: "Intelligent Inventory",
        description:
          "Track kitchen stock usage with AI-powered insights to minimize waste and optimize purchasing.",
      },
      {
        title: "Complete HR Suite",
        description:
          "Comprehensive staff management with attendance tracking and automated payroll calculations.",
      },
      {
        title: "Transparent Billing",
        description:
          "Calculate and bill electricity usage with full transparency and automated meter readings.",
      },
      {
        title: "Digital Verification",
        description:
          "Secure tenant and employee verification with blockchain-based audit trails.",
      },
      {
        title: "Innovation Edge",
        description:
          "Access cutting-edge features not available in traditional hostel management systems.",
      },
    ]}
  />
);

// NEW RESPONSIVE SLIDER COMPONENT
const ResponsiveSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [mounted, setMounted] = useState(false);
  const sliderRef = useRef(null);

  const components = [
    { component: RegistrationBoard, title: "Admission and Registration" },
    { component: SmartDigitalAccount, title: "Smart Digital Account" },
    { component: MultipleUser, title: "Multiple User Management" },
    { component: MultipleBusiness, title: "Unified Business Dashboard" },
    { component: OnlineBusinessPlatform, title: "Online Business Platform" },
    { component: SPECIALSMARTFEATURES, title: "Special Smart Features" },
    { component: BusinessDashboard, title: "Unique Differentiators" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);
  console.log("currentSlide", currentSlide);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % components.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + components.length) % components.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Touch handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  useEffect(() => {
    if (sliderRef.current && mounted) {
      sliderRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide, mounted]);

  if (!mounted) {
    return (
      <div className="w-full h-[60vh] bg-gray-100 animate-pulse rounded-xl" />
    );
  }

  return (
    <div className="lg:hidden relative w-full overflow-hidden bg-transparent">
      {/* Slider Container */}
      <div
        className="relative w-full"
        style={{ height: "auto", minHeight: "70vh" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="overflow-hidden rounded-xl">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-300 ease-in-out"
            // style={{ width: `${components.length * 100}%` }}
          >
            {components.map(({ component: Component }, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full flex items-center justify-center"
                // style={{ width: `${100 / components.length}%` }}
              >
                <div className="w-full px-1">
                  <Component />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 z-20 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
        </button>

        <button
          onClick={nextSlide}
          disabled={currentSlide === components.length - 1}
          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-lg hover:bg-white transition-all duration-200 z-20 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-1 sm:space-x-2 py-3 sm:py-4 bg-transparent">
        {components.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? "bg-[#854836] scale-110"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-gray-700 shadow-sm z-20">
        {currentSlide + 1} / {components.length}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden mt-2">
        <div
          className="h-full bg-[#854836] transition-all duration-300 ease-out rounded-full"
          style={{
            width: `${((currentSlide + 1) / components.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

const NewSlider = () => {
  const containerRef = useRef(null);
  const slidesRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollTriggerRef = useRef(null);
  const resizeTimeout = useRef(null);

  // Handle mounting
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  // Handle screen size detection with debounce
  useEffect(() => {
    if (!mounted) return;

    const handleResize = () => {
      // Clear any existing timeout
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }

      // Set a new timeout
      resizeTimeout.current = setTimeout(() => {
        const newIsDesktop = window.innerWidth >= 1024;
        setIsDesktop(newIsDesktop);
      }, 150); // 150ms debounce time
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted]);

  // GSAP ScrollTrigger setup
  useEffect(() => {
    if (!mounted || !isDesktop || !containerRef.current || !slidesRef.current) {
      return;
    }

    const setupScrollTrigger = () => {
      // Kill any existing ScrollTrigger
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }

      const slides = slidesRef.current.children;
      if (slides.length === 0) return;

      // Set container height to viewport height
      const container = containerRef.current;
      container.style.height = `${window.innerHeight}px`;

      // Set slides container width based on number of slides
      const totalSlides = slides.length;
      slidesRef.current.style.width = `${totalSlides * 100}%`;

      // Reset any existing transforms
      gsap.set(slidesRef.current, { x: 0 });

      // Create a new ScrollTrigger
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 0.5,
        snap: {
          snapTo: 1 / (totalSlides - 1),
          duration: { min: 0.2, max: 0.6 },
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          gsap.to(slidesRef.current, {
            x: `-${self.progress * 100}%`,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
        onRefresh: () => {
          // Recalculate on refresh
          container.style.height = `${window.innerHeight}px`;
        },
      });

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    };

    // Setup with small delay to ensure DOM is ready
    const timer = setTimeout(setupScrollTrigger, 50);

    // Cleanup function
    return () => {
      clearTimeout(timer);

      // Kill the ScrollTrigger instance
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }

      // Reset any GSAP animations on the slides container
      if (slidesRef.current) {
        gsap.killTweensOf(slidesRef.current);
      }
    };
  }, [mounted, isDesktop]);

  // Global cleanup on unmount
  useEffect(() => {
    return () => {
      // Clean up any remaining timeouts
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }

      // Kill all ScrollTriggers safely
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger && typeof trigger.kill === "function") {
          trigger.kill();
        }
      });

      // Clear all GSAP animations
      gsap.globalTimeline.clear();
    };
  }, []);

  if (!mounted) {
    return <div className="w-full h-screen bg-gray-100 animate-pulse" />;
  }

  return (
    <div className="w-full">
      {/* Desktop Horizontal Scroll */}
      <div
        ref={containerRef}
        className="hidden lg:block relative w-full h-screen overflow-hidden"
      >
        <div className="h-full w-full">
          <div
            ref={slidesRef}
            className="flex h-full"
            style={{ width: `${7 * 100}%` }}
          >
            {[
              RegistrationBoard,
              SmartDigitalAccount,
              MultipleUser,
              MultipleBusiness,
              OnlineBusinessPlatform,
              SPECIALSMARTFEATURES,
              BusinessDashboard,
            ].map((Component, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center h-full flex-shrink-0 w-full"
                style={{
                  width: `${100 / 7}%`,
                  minWidth: "320px",
                  maxWidth: "100vw",
                }}
              >
                <Component />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Slider */}
      <div className="lg:hidden w-full px-2 sm:px-4 md:px-6">
        <ResponsiveSlider />
      </div>
    </div>
  );
};

// Export individual components
export {
  RegistrationBoard,
  SmartDigitalAccount,
  MultipleUser,
  MultipleBusiness,
  OnlineBusinessPlatform,
  SPECIALSMARTFEATURES,
  BusinessDashboard,
};

// Export main component as default
export default NewSlider;
