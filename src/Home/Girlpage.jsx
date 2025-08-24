"use client";
import { useTypewriter } from "react-simple-typewriter";
// Removed Next.js Image import as we'll use regular img tag
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import roomicon from "../../Public/assets/roomicon.png";
import registration from "../../Public/assets/registration.png";
import accountant from "../../Public/assets/accountant.png";
import team from "../../Public/assets/team.png";
import multiplebusiness from "../../Public/assets/multiplebusiness.png";
import businessplatform from "../../Public/assets/businessplatform.png";
import smartapp from "../../Public/assets/smartapp.png";
import differentfromothers from "../../Public/assets/differentfromothers.png";
import tenant from "../../Public/assets/tenant.png";
import girl from "../../Public/assets/girl.gif";
// We'll import and register ScrollTrigger only in useEffect
// Using useEffect ensures this only runs on the client side

const NewHomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (mainRef.current) {
        const scrollPercentage =
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
          100;
        const hue = Math.round((scrollPercentage * 3.6) % 360);
        mainRef.current.style.backgroundColor = `hsl(${hue}, 70%, 95%)`;
      }
    };

    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [mounted]);

  const getBackgroundVariant = (index) => {
    const variants = [
      "bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200",
      "bg-gradient-to-r from-cyan-50 to-teal-50 border-cyan-200",
      "bg-gradient-to-bl from-pink-50 to-rose-50 border-pink-200",
      "bg-gradient-to-tr from-indigo-50 to-purple-50 border-indigo-200",
      "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200",
      "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200",
    ];
    return variants[index % variants.length];
  };
  // Define features array inside the component
  const features = [
    {
      title: "ROOM SEATS MANAGEMENT",
      description:
        "MANAGE YOUR ROOMS, SEATS, SERVICES, RECORDS & RENTS SMARTLY",
      imgSrc: roomicon,
      alt: "Room Seats Management",
    },
    {
      title: "ADMISSIONS & REGISTRATION",
      description:
        "KEEP DIGITAL RECORDS OF TENANT, ALLOT SEATS/ROOM & MANAGE DIGITAL ADMISSION WITH ZERO PAPER WORK.",
      imgSrc: registration,
      alt: "Admissions & Registration",
    },
    {
      title: "S-MART DIGITAL ACCOUNTANT",
      description:
        "S-MART BILLING FOR RENT COLLECTION & PAYMENTS, KEEP RECORDS OF EXPENSE WITH CATEGORIES, & PROFIT-LOSS REPORT",
      imgSrc: accountant,
      alt: "S-Mart Digital Accountant",
    },
    {
      title: "MULTIPLE USERS",
      description:
        "MANAGE YOUR BUSINESSES BY YOUR S-MART TEAM WORK, MAKE ROLES & RESPONSIBILITIES.",
      imgSrc: team,
      alt: "Multiple Users",
    },
    {
      title: "ONE DASHBOARD FOR MULTIPLE BUSINESSES.",
      description: "CREATE MULTIPLE ACCOUNTS ON 1 S-MART APP.",
      imgSrc: multiplebusiness,
      alt: "One Dashboard for Multiple Businesses",
    },
    {
      title: "ONLINE BUNSINESS PLATFORM",
      description:
        "MARKET YOUR S-MART PROPERTY ONLINE, GET MORE LEADS & CONVERT LEADS INTO TENANT MORE FASTER",
      imgSrc: businessplatform,
      alt: "Online Business Platform",
    },
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
        "MANAGE; KITCHEN STOCKS, EMPLOYEE ATTENDANCE & SALARY, ELECTRICITY BILL AND SMART TENANT & EMPLOYEE VERIFICATION",
      imgSrc: differentfromothers,
      alt: "Different from Others",
    },
    {
      title: "S-MART TENANT APP",
      description:
        "FOR TRANSPARENCY, EASY RECORDS AND HASSLE FREE COMMUNICATION.",
      imgSrc: tenant,
      alt: "S-Mart Tenant App",
    },
  ];

  // Rest of your component state and functions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    businessName: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [typeEffect] = useTypewriter({
    words: ["PGs", "Hostel"],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 40,
  });

  const contentRef = useRef(null);

  useEffect(() => {
    // Remove ScrollTrigger management to prevent conflicts with AllSlider
    // ScrollTrigger is now managed centrally in AllSlider.jsx

    // Initialize animations without ScrollTrigger
    const initAnimations = () => {
      try {
        // Simple fade-in animation for content
        if (contentRef.current) {
          gsap.fromTo(
            contentRef.current,
            { x: -50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
            }
          );
        }

        // Simple fade-in for text elements
        const textElements = document.querySelectorAll(".reveal-text");
        textElements.forEach((text, index) => {
          if (!text) return;

          const originalContent = text.textContent;
          text.style.opacity = 0;

          // Simple fade in with staggered delay
          gsap.to(text, {
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            ease: "power2.out",
          });
        });
      } catch (error) {
        console.error("Animation error:", error);
      }
    };

    // Initialize simpler animations
    const timer = setTimeout(() => {
      initAnimations();
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);

      // Kill all GSAP animations
      gsap.globalTimeline.clear();

      // Reset text opacities
      const textElements = document.querySelectorAll(".reveal-text");
      textElements.forEach((text) => {
        if (text) {
          text.style.opacity = "";
        }
      });
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.mobile) {
      setError("Please fill in all required fields");
      return;
    }

    // Validate mobile number format
    if (!/^\d{10}$/.test(formData.mobile)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(
        "https://admin.shivomgroup.com/hosteladmin/public/api/client-demo-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit request");
      }

      // Success case
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        city: "",
        businessName: "",
        location: "",
      });

      // Auto-close modal after 2 seconds
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div ref={mainRef} className="min-h-screen transition-colors duration-300">
      <div
        ref={containerRef}
        className={`min-h-screen w-full transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
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

        <div className="relative z-10">
          <div
            className={`section w-full flex gap-3 flex-col lg:flex-row justify-between items-start px-4 sm:px-6 lg:px-10 py-8 lg:py-10`}
          >
            {/* Left Container */}
            <div className="lftcontainer w-full lg:sticky lg:top-0 lg:w-1/2 pl-2 lg:pl-4 lg:py-[3rem]">
              <h1 className="text-2xl lg:text-5xl py-4 pl-0 lg:pl-2 font-bold lg:py-3">
                S-mart way to rent <br /> your&nbsp;
                <span className="text-[#ED7C24]">{typeEffect}</span>
              </h1>
              <div className="reveal-text">
                <p className="text-sm font-semibold lg:text-base lg:w-3/4 pl-0 lg:pl-3 text-justify leading-tight">
                  Discover a world of convenience with the S-Mart app, offering
                  a myriad of features from audit trails to hassle-free rent
                  collection. From maintaining electricity bills to transparent
                  record-keeping, enjoy seamless operations with Google Cloud
                  backup and restoration. Stay organized with expense reports,
                  admission management, and tenant complaints, all in one
                  user-friendly platform for efficient property management.
                </p>
              </div>
              <div ref={contentRef}>
                {/* We Manage Section */}
                <div className="mt-5 lg:mt-10 font-bold text-base lg:text-lg text-left">
                  <h1 className="px-2 lg:px-4 lg:ml-1">We Manage</h1>
                  <div className="mt-3  sm:ml-0 lg:ml-2 flex flex-wrap gap-2 lg:gap-4">
                    {[
                      "Hostel",
                      "PGs",
                      "Studio",
                      "Co-living",
                      "Student Housing",
                    ].map((item) => (
                      <div
                        key={item}
                        className="shadow h-[5rem] w-[7rem] flex items-center flex-col p-2 gap-2 rounded-lg border border-gray-200"
                      >
                        <div className="h-9 w-9 rounded-full bg-[#f5edc3] flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="22"
                            height="22"
                            fill="#ED7C24"
                          >
                            <path d="M22 11V20H20V17H4V20H2V4H4V14H12V7H18C20.2091 7 22 8.79086 22 11ZM8 13C6.34315 13 5 11.6569 5 10C5 8.34315 6.34315 7 8 7C9.65685 7 11 8.34315 11 10C11 11.6569 9.65685 13 8 13Z"></path>
                          </svg>
                        </div>
                        <h2 className="text-sm text-center font-semibold">
                          {item}
                        </h2>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Get Started Form */}
                <div className="max-w-md mt-5 ml-2">
                  <div className="m-3">
                    <label htmlFor="mobile-number" className="sr-only">
                      Enter Mobile Number
                    </label>
                    <div className="flex rounded-lg shadow-sm">
                      <input
                        type="text"
                        id="mobile-number"
                        name="mobile-number"
                        placeholder="Enter Mobile Number"
                        className="py-2 placeholder-orange-500 px-4 block w-full border-gray-200 shadow-sm rounded-l-lg text-sm focus:ring-orange-700 focus:border-orange-700 focus:ring-1 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                      <button
                        type="button"
                        className="py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-r-lg bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 disabled:pointer-events-none"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Get Start
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="currentColor"
                        >
                          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Container */}
            <div className="rgtContainer w-full lg:w-1/2">
              <div className="rgt opacity-100 lg:-mb-[5rem] h-full flex justify-center items-center">
                <div className="relative w-full max-w-[400px] h-[450px]">
                  <img
                    src={girl}
                    alt="home"
                    className="object-contain w-full h-full"
                    style={{ maxWidth: "400px" }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-5 w-full lg:w-auto mr-0 lg:mr-4 items-center">
                <div>
                  <p className="text-center uppercase text-xl font-bold mt-8 md:mt-12 lg:mt-24 text-primary-500">
                    ---
                    <span> How the app can benefit hostel and PG owners </span>
                    ---
                  </p>
                  <h2 className="text-center font-display text-4xl font-bold tracking-tight text-slate-900 mb-6 md:mb-8 lg:mb-10">
                    Explore our &nbsp;
                    <span className="text-[#e27f1b]">S-mart Features</span>
                  </h2>
                </div>
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="border border-black flex justify-center items-center shadow-lg h-auto sm:h-[14rem] bg-[#fff] hover:bg-[#a5a4a4] w-full rounded text-[#000] hover:text-white p-6    transform transition duration-500 hover:scale-105"
                  >
                    <div className="text-center">
                      <div className="mx-auto h-[5rem] w-[5rem] overflow-hidden">
                        <img
                          src={feature.imgSrc}
                          alt={feature.alt}
                          width={80}
                          height={80}
                          className="object-cover mt-1"
                        />
                      </div>
                      <h3 className="my-3 font-display text-lg text-black font-black">
                        {feature.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-6">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Component */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Overlay */}
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                {/* Modal Content */}
                <div
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all 
                w-full sm:w-[500px] md:w-[600px] lg:w-[600px]"
                >
                  <div className="bg-white w-full sm:w-[600px] lg:w-[600px] px-4 pt-5 pb-4 sm:p-6 sm:pb-44">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Schedule a Demo
                      </h3>
                      <button
                        onClick={() => !isLoading && setIsModalOpen(false)}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        disabled={isLoading}
                      >
                        <span className="text-2xl">&times;</span>
                      </button>
                    </div>

                    {error && (
                      <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                      </div>
                    )}

                    {success ? (
                      <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                        Demo request submitted successfully! The modal will
                        close shortly.
                      </div>
                    ) : (
                      <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mobile Number *
                          </label>
                          <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
                            required
                            maxLength="10"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Business Name
                          </label>
                          <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Enter your location"
                          />
                        </div>

                        <div className="mt-6 flex justify-end">
                          <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            disabled={isLoading}
                            className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
                          >
                            {isLoading ? "Submitting..." : "Submit"}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewHomePage;
