"use client";
import React, { useState, useEffect, useRef } from "react";
import Footer from "../Home/Footer";
import contactBg from "../../Public/assets/bhopal.jpg";

const Contactpage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [particles, setParticles] = useState([]);
  const [floatingDots, setFloatingDots] = useState([]);

  // Refs for sections needing background color changing effect
  const contactSectionRef = useRef(null);
  const findUsSectionRef = useRef(null);
  const enquirySectionRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // Generate particles only on client side
    setParticles(
      [...Array(25)].map(() => ({
        size: `${Math.random() * 8 + 4}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
        duration: `${2 + Math.random() * 2}s`,
        color: ["#3B82F6", "#93C5FD", "#6366F1"][Math.floor(Math.random() * 3)],
      }))
    );

    setFloatingDots(
      [...Array(10)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
        duration: `${2 + Math.random() * 2}s`,
      }))
    );
  }, []);

  // Scroll-based background color change (same logic as in Girlpage.jsx)
  useEffect(() => {
    const updateBG = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
      const hue = Math.round((scrollPercentage * 3.6) % 360);
      const bg = `hsl(${hue}, 70%, 95%)`;

      [contactSectionRef.current, findUsSectionRef.current, enquirySectionRef.current].forEach(
        (el) => {
          if (el) el.style.backgroundColor = bg;
        }
      );
    };

    // Initial set and listener
    updateBG();
    window.addEventListener("scroll", updateBG, { passive: true });
    return () => window.removeEventListener("scroll", updateBG);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.contact ||
      !formData.subject ||
      !formData.message
    ) {
      setError("Please fill all required fields");
      return;
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate contact number format
    if (!/^\d{10}$/.test(formData.contact)) {
      setError("Please enter a valid 10-digit contact number");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Create the API request payload
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.contact.trim(), // Mapping to 'mobile' as API expects
        city: formData.address.trim(), // Some APIs expect 'city' instead of 'address'
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };

      console.log("Submitting payload:", payload); // For debugging

      const response = await fetch(
        "https://admin.shivomgroup.com/hosteladmin/public/api/enquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      // First get the response text to handle cases where json parsing fails
      const responseText = await response.text();
      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error("Invalid server response format");
      }

      if (!response.ok) {
        // Try to get more specific error message from response
        const errorMessage =
          data.message ||
          data.error ||
          (data.errors ? Object.values(data.errors).join(", ") : null) ||
          "Failed to submit enquiry";
        throw new Error(errorMessage);
      }

      // Success case
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        contact: "",
        address: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Full API Error:", {
        error: err,
        formData: formData,
        timestamp: new Date().toISOString(),
      });

      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Updated Gradient */}
      <div className="relative bg-[#ebc4a7] py-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/50 to-gray-900/70"></div>

        {/* Enhanced floating particles with background */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            backgroundImage: `url(${contactBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.9, // Adjust opacity as needed
          }}
        >
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-bounce opacity-70"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            ></div>
          ))}
        </div>

        {/* Animated wave effect */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-20"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-[#d9b091] animate-pulse"
            ></path>
          </svg>
        </div>

        <div
          className={`BhopalBg h-[35rem] relative z-10 transition-all duration-1500 transform ${
            isVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-16 opacity-0 scale-95"
          }`}
        >
          <div className="text-center bg-gradient-to-b from-black/40 to-transparent gap-6 flex flex-col items-center justify-center h-[100%] text-white">
            <h2 className="text-7xl font-bold bg-gradient-to-r from-blue-50 via-white to-indigo-50 bg-clip-text text-transparent animate-pulse transform transition-all duration-1000 hover:scale-105">
              Get In Touch
            </h2>
            <div className="flex space-x-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
            <p className="text-xl font-medium max-w-3xl leading-relaxed transform transition-all duration-1000 hover:scale-105 text-slate-100">
              We operate from our office located in the heart of Bhopal city.
              <br />
              Feel free to contact us for any support or visit our office during
              business hours.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Cards Section with dynamic background */}
      <div
        ref={contactSectionRef}
        className="relative py-20 transition-colors duration-300"
      >
        <div className="container mx-auto px-4">
          <h1
            className={`text-center text-5xl font-bold text-slate-800 mb-16 transition-all duration-1500 transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            <span className="bg-gradient-to-r from-slate-600 to-gray-700 bg-clip-text text-transparent relative">
              Contact Us
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-slate-600 to-gray-700 rounded-full animate-pulse"></div>
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {/* Phone Card */}
            <div
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 hover:rotate-1 p-10 text-center relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setActiveCard(0)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/15 transition-all duration-700 ${
                  activeCard === 0
                    ? "opacity-100 scale-110"
                    : "opacity-0 scale-100"
                }`}
              ></div>
              <div className="relative z-10">
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center transform transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-125 shadow-lg">
                  <svg
                    className="w-12 h-12 text-white transform group-hover:scale-110 transition-transform duration-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-slate-700 mb-6 group-hover:text-blue-500 transition-all duration-500 transform group-hover:scale-105">
                  CALL US
                </h3>
                <div className="space-y-3">
                  <p className="text-xl font-semibold text-gray-700 hover:text-blue-500 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:translate-x-2">
                    0755-493-7957
                  </p>
                  <p className="text-xl font-semibold text-gray-700 hover:text-blue-500 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:translate-x-2">
                    91+7879868904
                  </p>
                </div>
              </div>
            </div>

            {/* Visit Card */}
            <div
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 hover:rotate-1 p-10 text-center relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setActiveCard(1)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/15 transition-all duration-700 ${
                  activeCard === 1
                    ? "opacity-100 scale-110"
                    : "opacity-0 scale-100"
                }`}
              ></div>
              <div className="relative z-10">
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center transform transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-125 shadow-lg">
                  <svg
                    className="w-12 h-12 text-white transform group-hover:scale-110 transition-transform duration-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-slate-700 mb-6 group-hover:text-teal-500 transition-all duration-500 transform group-hover:scale-105">
                  VISIT US
                </h3>
                <div className="space-y-2">
                  <p className="font-medium text-gray-700 leading-relaxed hover:text-teal-500 transition-all duration-500 transform hover:scale-105">
                    D-3, Vidya Vihar, In Front of BU,
                  </p>
                  <p className="font-medium text-gray-700 leading-relaxed hover:text-teal-500 transition-all duration-500 transform hover:scale-105">
                    Narmadapuram Road,
                  </p>
                  <p className="font-medium text-gray-700 leading-relaxed hover:text-teal-500 transition-all duration-500 transform hover:scale-105">
                    Bhopal MP-462026
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 hover:rotate-1 p-10 text-center relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setActiveCard(2)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br from-amber-200/10 to-orange-100/15 transition-all duration-700 ${
                  activeCard === 2
                    ? "opacity-100 scale-110"
                    : "opacity-0 scale-100"
                }`}
              ></div>
              <div className="relative z-10">
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-100 rounded-full flex items-center justify-center transform transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-125 shadow-lg">
                  <svg
                    className="w-12 h-12 text-gray-800 transform group-hover:scale-110 transition-transform duration-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-slate-700 mb-6 group-hover:text-orange-500 transition-all duration-500 transform group-hover:scale-105">
                  CONTACT US
                </h3>
                <p className="text-lg font-semibold text-gray-700 hover:text-orange-500 transition-all duration-500 cursor-pointer break-all transform hover:scale-105">
                  contact@shivomsecuranation.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Map Section with dynamic background */}
      <div
        ref={findUsSectionRef}
        className="w-full mx-auto px-8 py-20 transition-colors duration-300"
      >
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-800 mb-6 transform transition-all duration-1000 hover:scale-105">
            <span className="bg-gradient-to-r from-slate-600 to-gray-700 bg-clip-text text-transparent relative">
              Find Us
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-slate-600 to-gray-700 rounded-full animate-pulse"></div>
            </span>
          </h2>
        </div>
        <div className="max-w-6xl mx-auto overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105 hover:shadow-[0_25px_50px_-12px_rgba(30,41,59,0.25)]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.365680231038!2d77.4400797!3d23.232504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4269e09fe1bf%3A0x680f5a969dc28a6c!2sShivom%20Securanation!5e0!3m2!1sen!2sin!4v1715161702734"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="w-full h-96"
            referrerPolicy="no-referrer-when-downgrade"
            title="Shivom Securanation Location"
          ></iframe>
        </div>
      </div>

      {/* Compact Enquiry Form with dynamic background */}
      <div
        ref={enquirySectionRef}
        className="py-12 relative overflow-hidden transition-colors duration-300"
      >
        {/* Simplified Background Elements - now client-side only */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/20 animate-pulse"></div>
          {floatingDots.map((dot, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-teal-400 rounded-full animate-ping opacity-30"
              style={{
                left: dot.left,
                top: dot.top,
                animationDelay: dot.delay,
                animationDuration: dot.duration,
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-500 bg-clip-text text-transparent">
              Enquiry Here
            </h2>
            <div className="w-24 h-1 from-teal-500 to-cyan-500 rounded-full mx-auto mb-3"></div>
            <p className="text-lg">
              Fields marked with <span>*</span> are required
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                Your enquiry has been submitted successfully!
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Name Input */}
              <div className="group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full backdrop-blur-sm border border-teal-400/30 rounded-lg py-3 px-5 text-lg text-white placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-teal-500 focus:bg-slate-100/20 transition-all duration-300 group-hover:bg-slate-100/15"
                  placeholder="Enter Name *"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full backdrop-blur-sm border border-teal-400/30 rounded-lg py-3 px-5 text-lg text-white placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-teal-500 focus:bg-slate-100/20 transition-all duration-300 group-hover:bg-slate-100/15"
                  placeholder="Enter Email *"
                  required
                />
              </div>

              {/* Contact Input */}
              <div className="group">
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="w-full backdrop-blur-sm border border-teal-400/30 rounded-lg py-3 px-5 text-lg text-white placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-teal-500 focus:bg-slate-100/20 transition-all duration-300 group-hover:bg-slate-100/15"
                  placeholder="Enter Contact Number *"
                  required
                  maxLength="10"
                />
              </div>

              {/* Subject Input */}
              <div className="group">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full backdrop-blur-sm border border-teal-400/30 rounded-lg py-3 px-5 text-lg text-white placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-teal-500 focus:bg-slate-100/20 transition-all duration-300 group-hover:bg-slate-100/15"
                  placeholder="Subject *"
                  required
                />
              </div>
            </div>

            {/* Address Input */}
            <div className="group mb-4">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full backdrop-blur-sm border border-teal-400/30 rounded-lg py-3 px-5 text-lg text-white placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-teal-500 focus:bg-slate-100/20 transition-all duration-300 group-hover:bg-slate-100/15"
                placeholder="Enter Address"
              />
            </div>

            {/* Message Textarea */}
            <div className="group mb-6">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full backdrop-blur-sm border border-teal-400/30 rounded-lg py-3 px-5 text-lg text-white placeholder-teal-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-teal-500 focus:bg-slate-100/20 transition-all duration-300 group-hover:bg-slate-100/15 resize-none"
                rows="4"
                placeholder="Enter Your Message *"
                required
              ></textarea>
            </div>

            {/* Compact Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative inline-flex items-center justify-center px-12 py-3 text-lg font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full overflow-hidden shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-500 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                <span className="relative z-10 flex items-center gap-2">
                  {isLoading ? "Submitting..." : "Submit Message"}
                  {!isLoading && (
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contactpage;
