// Using regular img tag instead of next/image for Vite compatibility
import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";

const Subscription = () => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Fetching subscription data...");
        let response = await fetch(
          "https://admin.shivomgroup.com/hosteladmin/public/api/subscription-models-details"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();
        console.log("Received data:", data);
        setProducts(data.data || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching subscription data:", error);
        setError(error.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-2">Loading subscription plans...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Error loading subscription plans: {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">
          No subscription plans available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div data-color="black" className="py-8">
      <div className="section text-center my-3 sm:my-5">
        <div className="max-w-2xl mx-auto px-2">
          <h1 className="uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
            You're Just One Step Away!
          </h1>
          <h6 className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
            Choose your perfect plan and join the{" "}
            <span className="font-semibold text-blue-600">S-Mart family</span>{" "}
            today
          </h6>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-3 sm:mt-4 rounded-full"></div>
        </div>

        {/* Desktop view - original layout */}
        <div className="hidden lg:flex xl:flex gap-4 sm:gap-6 lg:gap-7 my-3 sm:my-5 mx-2 sm:mx-4 md:mx-6 lg:mx-7">
          {products.map((item) => (
            <div
              key={item.id || item.planName} // Added unique key
              className="card rounded shadow-lg border-2 w-full sm:max-w-md md:max-w-lg lg:w-[28rem] xl:w-[28rem] mx-auto lg:mx-0 h-auto min-h-[400px] sm:min-h-[450px] lg:h-[50vh]"
              style={{ borderColor: item.styleAndTitel?.borderColor || "#ccc" }}
            >
              <div
                className="card-header font-bold rounded relative px-3 sm:px-4 py-3 sm:py-4"
                style={{
                  backgroundColor: item.styleAndTitel?.borderColor || "#f0f0f0",
                }}
              >
                <div className="hidden-box absolute -top-3 sm:-top-5 left-3 sm:left-4">
                  <h6
                    className="rounded p-1 sm:p-1 bg-white text-gray-500 border-2 text-xs sm:text-sm"
                    style={{
                      borderColor: item.styleAndTitel?.borderColor || "#ccc",
                    }}
                  >
                    {item.styleAndTitel?.planTitle || "Plan"}
                  </h6>
                </div>
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div className="plan-name flex-1 min-w-0">
                    <h5 className="fw-bold text-sm sm:text-base md:text-lg truncate text-left">
                      {item.planName || "S-mart Plan"}
                    </h5>
                  </div>
                  <div className="price text-right flex-shrink-0">
                    <h5 className="m-0 fw-bold text-sm sm:text-base md:text-lg">
                      ₹{item.perBedDisAmount || 0}/bed
                    </h5>
                    <h6 className="text-decoration-line-through fw-bold text-xs sm:text-sm">
                      ₹{item.perBedAmount || 0}/bed
                    </h6>
                  </div>
                </div>

                <div
                  className="absolute right-2 sm:right-2"
                  style={{ bottom: "-20px" }}
                >
                  <h6
                    className="bg-yellow-400 text-black py-1 ps-2 pe-3 sm:pe-4 text-xs sm:text-sm font-medium shadow-md"
                    style={{
                      clipPath:
                        "polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)",
                    }}
                  >
                    {item.discount || 0}% off
                  </h6>
                </div>
              </div>

              <div className="card-body px-3 sm:px-4 py-3 sm:py-4 h-[250px] sm:h-[300px] md:h-[350px] lg:h-[55vh] overflow-auto">
                <div className="mt-2 sm:mt-2 space-y-2 sm:space-y-3 text-left">
                  {item.features?.map((point, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-300 pb-2 mb-2 text-xs sm:text-sm text-gray-800 leading-relaxed break-words flex gap-2 sm:gap-3 items-start"
                    >
                      <div className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px] flex items-center justify-center flex-shrink-0">
                        <FontAwesomeIcon
                          icon={faHandPointer}
                          style={{
                            color: item.styleAndTitel?.borderColor || "#ccc",
                            fontSize:
                              typeof window !== "undefined" &&
                              window.innerWidth < 640
                                ? "16px"
                                : "24px",
                          }}
                        />
                      </div>
                      <p className="flex-1 text-xs sm:text-sm leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="card-footer rounded px-3 sm:px-4 py-3 sm:py-4"
                style={{
                  backgroundColor:
                    item.styleAndTitel?.footerBackgroundColor || "#f8f9fa",
                }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-2">
                  <div className="flex-1">
                    <p className="p-0 m-0 text-xs sm:text-sm md:text-base leading-tight">
                      Contact us for more details and discount
                    </p>
                  </div>
                  <div className="w-full sm:w-auto">
                    <button
                      className="btn flex justify-center sm:justify-between items-center gap-2 text-white px-3 sm:px-4 py-2 rounded w-full sm:w-auto text-xs sm:text-sm"
                      style={{
                        backgroundColor:
                          item.styleAndTitel?.borderColor || "#007bff",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        className="sm:w-4 sm:h-4"
                        fill="currentColor"
                      >
                        <path d="M16.8 19L14 22.5L11.2 19H6C5.44772 19 5 18.5523 5 18V7.10256C5 6.55028 5.44772 6.10256 6 6.10256H22C22.5523 6.10256 23 6.55028 23 7.10256V18C23 18.5523 22.5523 19 22 19H16.8ZM2 2H19V4H3V15H1V3C1 2.44772 1.44772 2 2 2Z" />
                      </svg>
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet view - slider */}
        <div className="block lg:hidden xl:hidden my-3 sm:my-5 mx-2 sm:mx-4 md:mx-6">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {products.map((item) => (
                <div
                  key={item.id || item.planName}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div
                    className="card rounded shadow-lg border-2 w-full max-w-md mx-auto h-auto min-h-[550px] sm:min-h-[550px]"
                    style={{
                      borderColor: item.styleAndTitel?.borderColor || "#ccc",
                    }}
                  >
                    <div
                      className="card-header font-bold rounded relative px-3 sm:px-4 py-3 sm:py-4"
                      style={{
                        backgroundColor:
                          item.styleAndTitel?.borderColor || "#f0f0f0",
                      }}
                    >
                      <div className="hidden-box absolute -top-3 sm:-top-5 left-3 sm:left-4">
                        <h6
                          className="rounded p-1 sm:p-1 bg-white text-gray-500 border-2 text-xs sm:text-sm"
                          style={{
                            borderColor:
                              item.styleAndTitel?.borderColor || "#ccc",
                          }}
                        >
                          {item.styleAndTitel?.planTitle || "Plan"}
                        </h6>
                      </div>
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <div className="plan-name flex-1 min-w-0">
                          <h5 className="fw-bold text-sm sm:text-base md:text-lg truncate text-left">
                            {item.planName || "S-mart Plan"}
                          </h5>
                        </div>
                        <div className="price text-right flex-shrink-0">
                          <h5 className="m-0 fw-bold text-sm sm:text-base md:text-lg">
                            ₹{item.perBedDisAmount || 0}/bed
                          </h5>
                          <h6 className="text-decoration-line-through fw-bold text-xs sm:text-sm">
                            ₹{item.perBedAmount || 0}/bed
                          </h6>
                        </div>
                      </div>

                      <div
                        className="absolute right-2 sm:right-2"
                        style={{ bottom: "-20px" }}
                      >
                        <h6
                          className="bg-yellow-400 text-black py-1 ps-2 pe-3 sm:pe-4 text-xs sm:text-sm font-medium shadow-md"
                          style={{
                            clipPath:
                              "polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)",
                          }}
                        >
                          {item.discount || 0}% off
                        </h6>
                      </div>
                    </div>

                    <div className="card-body px-3 sm:px-4 py-3 sm:py-4 h-[250px] sm:h-[300px] md:h-[350px] overflow-auto">
                      <div className="mt-2 sm:mt-2 space-y-2 sm:space-y-3 text-left">
                        {item.features?.map((point, index) => (
                          <div
                            key={index}
                            className="border-b border-gray-300 pb-2 mb-2 text-xs sm:text-sm text-gray-800 leading-relaxed break-words flex gap-2 sm:gap-3 items-start"
                          >
                            <div className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px] flex items-center justify-center flex-shrink-0">
                              <FontAwesomeIcon
                                icon={faHandPointer}
                                style={{
                                  color:
                                    item.styleAndTitel?.borderColor || "#ccc",
                                  fontSize:
                                    typeof window !== "undefined" &&
                                    window.innerWidth < 640
                                      ? "16px"
                                      : "24px",
                                }}
                              />
                            </div>
                            <p className="flex-1 text-xs sm:text-sm leading-relaxed">
                              {point}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className="card-footer rounded px-3 sm:px-4 py-3 sm:py-4"
                      style={{
                        backgroundColor:
                          item.styleAndTitel?.footerBackgroundColor ||
                          "#f8f9fa",
                      }}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-2">
                        <div className="flex-1">
                          <p className="p-0 m-0 text-xs sm:text-sm md:text-base leading-tight">
                            Contact us for more details and discount
                          </p>
                        </div>
                        <div className="w-full sm:w-auto">
                          <button
                            className="btn flex justify-center sm:justify-between items-center gap-2 text-white px-3 sm:px-4 py-2 rounded w-full sm:w-auto text-xs sm:text-sm"
                            style={{
                              backgroundColor:
                                item.styleAndTitel?.borderColor || "#007bff",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="14"
                              height="14"
                              className="sm:w-4 sm:h-4"
                              fill="currentColor"
                            >
                              <path d="M16.8 19L14 22.5L11.2 19H6C5.44772 19 5 18.5523 5 18V7.10256C5 6.55028 5.44772 6.10256 6 6.10256H22C22.5523 6.10256 23 6.55028 23 7.10256V18C23 18.5523 22.5523 19 22 19H16.8ZM2 2H19V4H3V15H1V3C1 2.44772 1.44772 2 2 2Z" />
                            </svg>
                            Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            {products.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 z-10"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Dots indicator */}
          {products.length > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    currentSlide === index
                      ? "bg-blue-500 w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
