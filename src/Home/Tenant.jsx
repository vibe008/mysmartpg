import React, { useEffect, useState } from "react";
import TenantApp from "../../Public/assets/websiteTAPP.jpg";

const Tenant = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const contents = [
    <ContentOne key="content1" />,
    <ContentTwo key="content2" />,
  ];

  useEffect(() => {
    // Simple interval to toggle between contents
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % contents.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simple fade transition
  const getTransitionStyle = (index) => ({
    transition: "opacity 0.7s ease-in-out",
    opacity: index === activeIndex ? 1 : 0,
    position: index === activeIndex ? "relative" : "absolute",
    top: 0,
    left: 0,
    right: 0,
    visibility: index === activeIndex ? "visible" : "hidden",
    height: "100%",
    width: "100%",
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-gradient-to-tr from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full relative z-10 px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent text-6xl">
            S-Mart Tenant
          </h1>
          <h3 className="max-w-2xl mx-auto pt-6 text-xl text-center text-slate-700 font-medium">
            Where convenience and comfort set you apart
          </h3>
        </div>

        {/* Main content */}
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
            {/* App mockup with increased dimensions */}
            <div className="h-[500px] w-[420px] relative rounded-3xl overflow-hidden">
              <div className="absolute w-[90%] m-auto inset-0 rounded-3xl p-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500">
                <div className="h-full w-full rounded-3xl bg-white flex items-center justify-center">
                  <div className="w-full h-full rounded-3xl overflow-hidden">
                    <img
                      src={TenantApp}
                      alt="S-Mart Tenant App"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Feature content */}
            <div
              className="w-full max-w-2xl relative"
              style={{ minHeight: "400px" }}
            >
              {contents.map((content, index) => (
                <div key={content.key} style={getTransitionStyle(index)}>
                  {content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentOne = () => (
  <div className="flex flex-col gap-6">
    <div className="grid md:grid-cols-2 gap-6">
      <FeatureCard
        title="Easy Payments"
        text="Effortlessly pay through our app's seamless feature. Enjoy convenience at your fingertips for smoother transactions."
        icon="💳"
        variant="purple"
      />
      <FeatureCard
        title="Easy Complaints"
        text="Lodge complaints through our S-Mart app. From room maintenance to food quality, report issues for swift resolution."
        icon="📝"
        variant="cyan"
      />
    </div>
    <FeatureCard
      title="Renting Rewarding"
      text="Assured monthly rewards on timely rent payment. Redeem coins to unlock offers and use cashback on next month's rent."
      icon="🎁"
      variant="pink"
    />
  </div>
);

const ContentTwo = () => (
  <div className="flex flex-col gap-6">
    <div className="grid md:grid-cols-2 gap-6">
      <FeatureCard
        title="Daily Delights"
        text="Unlock personalized meal recommendations for every mealtime, eliminating menu guessing."
        icon="🍽️"
        variant="indigo"
      />
      <FeatureCard
        title="Effortless Communication"
        text="Stay connected effortlessly! Notify delays, departures, or return using S-Mart Tenant app."
        icon="💬"
        variant="emerald"
      />
    </div>
    <FeatureCard
      title="Payment Reminder"
      text="Never miss a payment deadline again! Timely reminders ensure seamless rent payments."
      icon="⏰"
      variant="orange"
    />
  </div>
);

const FeatureCard = ({ icon, title, text, variant = "default" }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getVariantStyles = (variant) => {
    const variants = {
      purple:
        "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:border-purple-300 hover:shadow-purple-200/50",
      cyan: "bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200 hover:border-cyan-300 hover:shadow-cyan-200/50",
      pink: "bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:border-pink-300 hover:shadow-pink-200/50",
      indigo:
        "bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:border-indigo-300 hover:shadow-indigo-200/50",
      emerald:
        "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:border-emerald-300 hover:shadow-emerald-200/50",
      orange:
        "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:border-orange-300 hover:shadow-orange-200/50",
    };
    return variants[variant] || variants.purple;
  };

  const getTitleColor = (variant) => {
    const colors = {
      purple: "text-purple-700",
      cyan: "text-cyan-700",
      pink: "text-pink-700",
      indigo: "text-indigo-700",
      emerald: "text-emerald-700",
      orange: "text-orange-700",
    };
    return colors[variant] || colors.purple;
  };

  return (
    <div
      className={`relative p-6 border-2 ${getVariantStyles(
        variant
      )} shadow-lg rounded-2xl transform transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-xl group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <div
            className={`p-3 rounded-xl bg-white shadow-md transform transition-all duration-300 ${
              isHovered ? "scale-110" : ""
            }`}
          >
            <span className="text-2xl">{icon}</span>
          </div>
          <h3
            className={`ml-4 text-lg font-bold ${getTitleColor(
              variant
            )} transition-all duration-300`}
          >
            {title}
          </h3>
        </div>

        <div
          className={`w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mb-4 transition-all duration-300 ${
            isHovered ? "w-20" : ""
          }`}
        ></div>

        <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
};

export default Tenant;
