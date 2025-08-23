"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  FaStar,
  FaShieldAlt,
  FaBolt,
  FaUsers,
  FaSmile,
  FaAward,
  FaStarHalfAlt,
  FaUser,
  FaChartLine,
  FaDownload,
  FaHeart,
  FaThumbsUp,
  FaApple,
  FaAndroid,
  FaGlobe,
  FaQuoteLeft,
  FaSignOutAlt,
  FaRegHandPointer,
} from "react-icons/fa";
import { auth, provider, signInWithPopup } from "../firebase-config";
import Footer from "../Home/Footer";
const DownloadButton = ({  isDownloading, setIsDownloading, setIsOpen, isOpen }) => {
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [Last, setLast] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Email, setEMail] = useState("");
  const [isExistingUser, setExistingUser] = useState(null);
  const [localError, setLocalError] = useState(null);
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        console.log(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }, []);

  useEffect(() => {
    if (!location) return;
    const reverseGeocode = async () => {
      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}&localityLanguage=en`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }

        const data = await response.json();
        console.log('data', data.city)
        setCity(data.city)
      } catch (err) {
        console.log(err)
      }
    };

    reverseGeocode();
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using a placeholder URL since the original domain is not resolving
        const res = await fetch(
          "https://admin.shivomgroup.com/hosteladmin/public/api/download-android-apk"
        );
        console.log("res", res);
        if (!res.ok) throw new Error("Failed to fetch APK data");
        const data = await res.json();
        console.log("data", data);
        setApiData(data);

      } catch (err) {
        console.error("Error fetching APK data:", err);

      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleButtonHover = (e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 15px 35px rgba(255, 193, 140, 0.4)";
  };

  const handleButtonLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(255, 193, 140, 0.2)";
  };


  const saveUserData = async () => {
    const formData = new FormData();
    formData.append("name", name || "");
    formData.append("email", Email || "");
    formData.append("mobile", Mobile || "");
    formData.append("location", city || "");
    try {
      const res = await fetch(
        "https://admin.shivomgroup.com/hosteladmin/public/api/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            name: name || "",
            email: Email || "",
            mobile: Mobile || "",
            location: city || "",
          }),
        }
      );
      console.log("res", res);
      if (res.status === 201) {
        setIsOpen(false)
        Swal.fire({
          title: `Hey !! ${name}`,
          text: "Registered successfully !! Please download the app and start using it",
          icon: "success"
        }).then((res) => {
          DownloadAPK()
        })
      }
    } catch (err) {
      console.error("❌ Failed to send user data:", err);
    }
  };
  const DownloadAPK = async () => {
    try {
      const downloadSuccessful = await downloadWithProgress(
        apiData.data.file_path_url,
        `MySmartPG_${apiData.data.version || "latest"}.apk`,
      );
      console.log("downloadSuccessful", downloadSuccessful);
    } catch (err) {
      console.error("❌ Failed to download APK:", err);
    }
  }

  const handleDownload = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const name = user.displayName || "Google User";
      const email = user.email;
      const mobile = user.phoneNumber || "N/A";
      const img_url = user.photoURL || "";
      const newuser = {
        name: name,
        email: email,
        mobile: mobile,
        img_url: img_url,
        city: city
      }
      localStorage.setItem('user', JSON.stringify(newuser));
      const res = await fetch(`https://admin.shivomgroup.com/hosteladmin/public/api/check-user-exists?email=${email}`)
      const data = await res.json()
      if (data.data.exists) {
        setIsOpen(false)
        Swal.fire({
          title: `Hello ${name}`,
          text: "Your Record is already exists !! Please download the app",
          icon: "success"
        }).then((res) => {
          DownloadAPK()
        });
        // try {
        //   const downloadSuccessful = await downloadWithProgress(
        //     apiData.data.file_path_url,
        //     `MySmartPG_${apiData.data.version || "latest"}.apk`,
        //     (percent) => {
        //       console.log(`Downloaded: ${percent.toFixed(2)}%`);

        //     }
        //   );
        //   console.log("downloadSuccessful", downloadSuccessful);
        // } catch (err) {
        //   console.error("❌ Failed to download APK:", err);
        // }
      }
      else {
        await saveUserData({ name, email, mobile, img_url, city });
      }


    } catch (err) {
      console.error("❌ Failed to download APK:", err);
    }
  };

  async function downloadWithProgress(url, filename) {
    const link = document.createElement("a");
    link.href = url
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const HandleUserData = async () => {
    await existingUser({ Email: Email })
    const user = {
      name: name,
      email: Email,
      mobile: Mobile,
      city: city,
    }
    localStorage.setItem('user', JSON.stringify(user));

  };

  const existingUser = async ({ Email }) => {
    setExistingUser(Email)
    const res = await fetch(
      `https://admin.shivomgroup.com/hosteladmin/public/api/check-user-exists?email=${Email}`)
    const data = await res.json()
    if (data?.data?.exists) {
      if (data.data.exists) {
        setIsOpen(false)
        try {
          const downloadSuccessful = await downloadWithProgress(
            apiData.data.file_path_url,
            `MySmartPG_${apiData.data.version || "latest"}.apk`,
          );
          console.log("downloadSuccessful", downloadSuccessful);
        } catch (err) {
          console.error("❌ Failed to download APK:", err);
        }
      }
    }
    else {
      await saveUserData({ name, Email, Mobile, city });
    }

  }

  return (
    <>
      {/* iOS Button */}
      <button
        className="group relative bg-gradient-to-r from-amber-400 to-orange-400 text-amber-900 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
        onMouseEnter={handleButtonHover}
        onMouseLeave={handleButtonLeave}
        onClick={handleDownload}
        disabled={isDownloading || isLoading}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative flex items-center gap-3">
          <FaApple className="text-2xl" />
          <span className="text-lg">For iOS</span>
        </div>
      </button>


      <div>
        {/* Modal Toggle Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="group relative bg-gradient-to-r from-amber-400 to-orange-400 text-amber-900 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
        >
          Android APk
        </button>

        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
              >
                ✖
              </button>

              {/* Heading */}
              <h2 className="text-center text-xl font-semibold mb-5 text-gray-800">
                Verify through{" "}
                <span className="text-blue-500 font-bold">Google</span> account
              </h2>
              {/* Google Sign-In Button */}
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center justify-center gap-3 w-full bg-white text-gray-700 font-medium px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                {/* Google Logo */}
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#4285F4"
                    d="M23.49 12.27c0-.79-.07-1.54-.18-2.27H12v4.27h6.47a5.56 5.56 0 0 1-2.41 3.65v3h3.88c2.28-2.1 3.55-5.2 3.55-8.65z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.07 7.93-2.92l-3.88-3c-1.07.72-2.42 1.15-4.05 1.15-3.11 0-5.74-2.09-6.68-4.91H1.32v3.09C3.26 21.03 7.25 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.32 14.31A7.94 7.94 0 0 1 4.89 12c0-.8.14-1.56.43-2.31V6.6H1.32C.48 8.34 0 10.11 0 12c0 1.9.48 3.67 1.32 5.4l4-3.09z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.42-3.42C17.96 1.04 15.24 0 12 0 7.25 0 3.26 2.97 1.32 6.6l4 3.09C6.26 6.84 8.89 4.75 12 4.75z"
                  />
                </svg>

                {isDownloading ? "Signing in..." : "Sign in with Google"}
              </button>

              {/* OR Divider */}
              <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="px-3 text-gray-500 font-medium">OR</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              {/* Form */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={name}
                    placeholder="First name"
                    onChange={(v) => {
                      setName(v.target.value);
                      // console.log("vLUE",v.target.value)
                    }}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Mobile no"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={Mobile}
                  onChange={(v) => {
                    setMobile(v.target.value);
                  }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={Email}
                  onChange={(v) => {
                    setEMail(v.target.value);
                  }}
                />
                <button
                  onClick={HandleUserData}
                  className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-black shadow-md transition"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>


    </>
  );
};

const FeedbackForm = ({ user, onSignOut, setIsOpen, isOpen }) => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleReviewSubmit = async () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const existingUser = JSON.parse(savedUser);
      console.log('existingUser', existingUser)
    }
    console.log('savedUser', savedUser)
    if (!savedUser) {
      setSubmitError("Please sign in to submit a review");
      setIsOpen(true)
      return;
    }

    if (!reviewText.trim()) {
      setSubmitError("Please write a review before submitting");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    if (savedUser) {
      const existingUser = JSON.parse(savedUser);
      console.log('existingUser', existingUser)
      try {
        const formData = new FormData();
        formData.append("name", existingUser.name);
        formData.append("email", existingUser.email);
        formData.append("mobile", existingUser.mobile);
        formData.append("review", reviewText);
        formData.append("rating", rating.toString());
        formData.append("img_url", existingUser.photo || "");
        formData.append("location", existingUser.city);
  
        const response = await fetch(
          "https://admin.shivomgroup.com/hosteladmin/public/api/reviews",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
            body: formData,
          }
        );
        console.log('response', response)
        const data = await response.json();
        console.log('data', data)
        setSubmitSuccess(true);
        setReviewText("");
        setRating(5);
  
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } catch (err) {
        console.error("Feedback submission error:", err);
        setSubmitError(
          err.message || "Failed to submit feedback. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    }

  };

  return (
    <div className="text-center mt-24 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-700">
        Your Feedback Matters!
      </h2>
      <p className="mt-2 text-lg text-gray-600">
        Rate your experience and help us improve 🚀
      </p>

      <div className="flex justify-center mt-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={star <= rating ? "#D97706" : "currentColor"}
            className="w-8 h-8 text-gray-300 hover:text-amber-500 cursor-pointer transition duration-200"
            onClick={() => handleStarClick(star)}
          >
            <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>

      <div className="mt-6 max-w-xl mx-auto">
        <textarea
          rows="4"
          placeholder="Write your review..."
          className="w-full p-4 rounded-lg border border-gray-300 bg-white/90 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 resize-none text-gray-700 placeholder-gray-500"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          disabled={isSubmitting}
        ></textarea>

        {submitError && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {submitError}
          </div>
        )}

        {submitSuccess && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
            Thank you for your feedback! Your review has been submitted
            successfully.
          </div>
        )}

        <div className="mt-6">
          <button onClick={handleReviewSubmit} className="group relative bg-gradient-to-r from-amber-400 to-orange-400 text-amber-900 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const AnimatedRatingPage = ({ setIsOpen, isOpen }) => {
  const ratingRef = useRef(null);
  const downloadsRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const usersRef = useRef(null);
  const reviewsRef = useRef(null);
  const starsRef = useRef(null);
  const numberRef = useRef(null);
  const downloadNumberRef = useRef(null);
  const userNumberRef = useRef(null);
  const reviewCardsRef = useRef(null);
  const floatingElementsRef = useRef(null);
  const [currentReview, setCurrentReview] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [summaryData, setSummaryData] = useState({
    total_downloads: 0,
    total_users: 0,
    average_rating: "0.0",
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          "https://admin.shivomgroup.com/hosteladmin/public/api/reviews",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await res.json();
        const filterData = responseData?.data || [];

        const formatted = filterData.reverse().map((item) => ({
          name: item?.user_name || "Anonymous User",
          comment: item?.user_review || "No review text provided",
          rating: item?.user_rating || 5,
          avatar: (item?.user_name || "AU")
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase(),
          location: item?.user_location || "Location not specified",
          badge: item?.badge || "Verified User",
        }));

        setReviews(formatted);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setReviews([]);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const res = await fetch(
          "https://admin.shivomgroup.com/hosteladmin/public/api/reviews/summary",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await res.json();
        setSummaryData({
          total_downloads: responseData.data?.total_downloads || 0,
          total_users: responseData.data?.total_users || 0,
          average_rating: responseData.data?.average_rating || "0.0",
        });

        if (numberRef.current) {
          let start = 0;
          const end = parseFloat(responseData.data?.average_rating || "0.0");
          const increment = end / 30;
          const timer = setInterval(() => {
            start += increment;
            if (numberRef.current) {
              // Add null check
              if (start >= end) {
                numberRef.current.textContent = end.toFixed(1);
                clearInterval(timer);
              } else {
                numberRef.current.textContent = start.toFixed(1);
              }
            }
          }, 100);
        }

        if (downloadNumberRef.current) {
          let start = 0;
          const end = responseData.data?.total_downloads || 0;
          const increment = end / 35;
          const timer = setInterval(() => {
            start += increment;
            if (downloadNumberRef.current) {
              // Add null check
              if (start >= end) {
                downloadNumberRef.current.textContent = end;
                clearInterval(timer);
              } else {
                downloadNumberRef.current.textContent = Math.floor(start);
              }
            }
          }, 100);
        }

        if (userNumberRef.current) {
          let start = 0;
          const end = responseData.data?.total_users || 0;
          const increment = end / 35;
          const timer = setInterval(() => {
            start += increment;
            if (userNumberRef.current) {
              // Add null check
              if (start >= end) {
                userNumberRef.current.textContent = end;
                clearInterval(timer);
              } else {
                userNumberRef.current.textContent = Math.floor(start);
              }
            }
          }, 100);
        }
      } catch (error) {
        console.error("Failed to fetch summary data:", error);
      }
    };

    fetchSummaryData();
  }, []);

  const achievements = [
    { icon: FaShieldAlt, text: "100% Secure", color: "text-green-600" },
    { icon: FaBolt, text: "Lightning Fast", color: "text-orange-600" },
    { icon: FaUsers, text: "Community Driven", color: "text-blue-600" },
    { icon: FaSmile, text: "User Friendly", color: "text-amber-600" },
  ];

  const handleCardHover = (e) => {
    e.currentTarget.style.transform = "scale(1.08) rotateY(8deg)";
    e.currentTarget.style.boxShadow = "0 25px 50px rgba(255, 193, 140, 0.3)";
  };

  const handleCardLeave = (e) => {
    e.currentTarget.style.transform = "scale(1) rotateY(0deg)";
    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
  };

  const handleButtonHover = (e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 15px 35px rgba(255, 193, 140, 0.4)";
  };

  const handleButtonLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(255, 193, 140, 0.2)";
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  useEffect(() => {
    const createFloatingElements = () => {
      const container = floatingElementsRef.current;
      if (!container) return;

      container.innerHTML = "";

      // Use a consistent seed for initial render to avoid hydration mismatch
      const getRandomValue = () => {
        return typeof window !== "undefined" ? Math.random() : 0.5;
      };

      for (let i = 0; i < 20; i++) {
        const element = document.createElement("div");
        element.className =
          "absolute rounded-full opacity-20 pointer-events-none";
        element.style.width = getRandomValue() * 100 + 20 + "px";
        element.style.height = element.style.width;
        element.style.background = `linear-gradient(45deg, #ffe0ac, #ffc069, #ff9f43)`;
        element.style.left = getRandomValue() * 100 + "%";
        element.style.top = getRandomValue() * 100 + "%";

        container.appendChild(element);

        element.animate(
          [
            { transform: "translate(0, 0) rotate(0deg)" },
            {
              transform: `translate(${getRandomValue() * 200 - 100}px, ${getRandomValue() * 200 - 100
                }px) rotate(360deg)`,
            },
          ],
          {
            duration: getRandomValue() * 10000 + 5000,
            iterations: Infinity,
            direction: "alternate",
          }
        );
      }
    };

    createFloatingElements();

    const elements = [
      ratingRef.current,
      downloadsRef.current,
      usersRef.current,
      reviewsRef.current,
    ];
    elements.forEach((el, index) => {
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(50px)";
        setTimeout(() => {
          el.style.transition = "all 1s ease-out";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, index * 200);
      }
    });

    if (starsRef.current) {
      const stars = Array.from(starsRef.current.children);
      stars.forEach((star, index) => {
        star.style.opacity = "0";
        star.style.transform = "scale(0) rotate(360deg)";
        setTimeout(() => {
          star.style.transition = "all 0.8s ease-out";
          star.style.opacity = "1";
          star.style.transform = "scale(1) rotate(0deg)";
        }, 1000 + index * 200);
      });
    }

    if (reviewCardsRef.current) {
      const cards = Array.from(reviewCardsRef.current.children);
      cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(100px) rotateY(45deg)";
        setTimeout(() => {
          card.style.transition = "all 1s ease-out";
          card.style.opacity = "1";
          card.style.transform = "translateY(0) rotateY(0deg)";
        }, 2000 + index * 200);
      });
    }

    const sparkleInterval = setInterval(() => {
      if (starsRef.current) {
        const stars = Array.from(starsRef.current.children);
        stars.forEach((star, index) => {
          setTimeout(() => {
            star.style.transform = "scale(1.4) rotate(360deg)";
            setTimeout(() => {
              star.style.transform = "scale(1) rotate(0deg)";
            }, 400);
          }, index * 150);
        });
      }
    }, 4000);

    const reviewInterval =
      reviews.length > 0
        ? setInterval(() => {
          setCurrentReview((prev) => (prev + 1) % reviews.length);
        }, 5000)
        : null;

    return () => {
      clearInterval(sparkleInterval);
      if (reviewInterval) clearInterval(reviewInterval);
    };
  }, [reviews.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      <div
        ref={floatingElementsRef}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffe0ac' fill-opacity='0.2'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10 px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div
            ref={ratingRef}
            className="group bg-gradient-to-br from-white via-amber-50 to-orange-50 backdrop-blur-sm border border-amber-200 rounded-3xl p-10 text-center shadow-2xl w-full lg:w-1/3 hover:shadow-3xl transition-all duration-500 relative overflow-hidden flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <FaAward className="text-6xl text-gray-600 mr-6 transform group-hover:rotate-12 transition-transform duration-500" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <div className="text-7xl font-black text-gray-700 mb-2">
                      <span ref={numberRef}>0.0</span>/5
                    </div>
                    <div className="text-lg font-semibold text-gray-600">
                      Average Rating
                    </div>
                  </div>
                </div>
                <div
                  ref={starsRef}
                  className="flex justify-center text-amber-500 text-4xl mb-6 gap-2"
                >
                  <FaStar className="drop-shadow-lg" />
                  <FaStar className="drop-shadow-lg" />
                  <FaStar className="drop-shadow-lg" />
                  <FaStar className="drop-shadow-lg" />
                  <FaStarHalfAlt className="drop-shadow-lg" />
                </div>
              </div>
              <div>
                <div className="text-gray-600 text-sm font-medium">
                  Based on {reviews.length}+ verified reviews
                </div>
                <div className="mt-4 flex justify-center">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold border border-green-200">
                    ✓ Verified Reviews
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={usersRef}
            className="group bg-gradient-to-br from-white via-amber-50 to-orange-50 backdrop-blur-sm border border-amber-200 rounded-3xl p-10 text-center shadow-2xl w-full lg:w-1/3 hover:shadow-3xl transition-all duration-500 relative overflow-hidden flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <FaUser className="text-6xl text-gray-600 mr-6 transform group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <div className="text-7xl font-black text-gray-700 mb-2">
                      <span ref={userNumberRef}>0</span>+
                    </div>
                    <div className="text-lg font-semibold text-gray-600">
                      Total Users
                    </div>
                  </div>
                </div>
                <div className="text-gray-600 text-sm font-medium mb-4">
                  Active verified users on the platform
                </div>
              </div>
              <div className="flex justify-center gap-4">
                {achievements.slice(0, 2).map((achievement, index) => (
                  <div key={`achievement-${index}`} className="text-center">
                    <achievement.icon
                      className={`text-2xl mx-auto mb-1 ${achievement.color}`}
                    />
                    <div className="text-xs text-gray-600">
                      {achievement.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            ref={downloadsRef}
            className="group bg-gradient-to-br from-white via-amber-50 to-orange-50 backdrop-blur-sm border border-amber-200 rounded-3xl p-10 text-center shadow-2xl w-full lg:w-1/3 hover:shadow-3xl transition-all duration-500 relative overflow-hidden flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-200/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <FaChartLine className="text-6xl text-gray-600 mr-6 transform group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <div className="text-7xl font-black text-gray-700 mb-2">
                      <span ref={downloadNumberRef}>0</span>+
                    </div>
                    <div className="text-lg font-semibold text-gray-600">
                      Downloads
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-gray-600">
                <div className="text-center group/item">
                  <FaDownload className="text-3xl text-gray-600 mx-auto mb-2 group-hover/item:animate-bounce" />
                  <div className="text-sm font-medium">Multi-Platform</div>
                </div>
                <div className="text-center group/item">
                  <FaHeart className="text-3xl text-red-500 mx-auto mb-2 group-hover/item:animate-pulse" />
                  <div className="text-sm font-medium">User Favorite</div>
                </div>
                <div className="text-center group/item">
                  <FaThumbsUp className="text-3xl text-green-600 mx-auto mb-2 group-hover/item:animate-bounce" />
                  <div className="text-sm font-medium">98% Positive</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-8 mb-20">
          <DownloadButton
            isDownloading={isDownloading}
            setIsDownloading={setIsDownloading}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />

          <a
            href="https://web.mysmartpg.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-gradient-to-r from-amber-400 to-orange-400 text-amber-900 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-3">
              <FaGlobe className="text-2xl" />
              <span className="text-lg">Web App</span>
            </div>
          </a>
        </div>

        <div ref={reviewsRef} className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-black text-gray-700 mb-6">
              What Users Say
            </h2>
            <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
              Real feedback from our amazing community
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-6 py-2 rounded-full text-sm font-semibold border border-green-300">
                ✓ 100% Verified Reviews
              </div>
              <div className="bg-gradient-to-r from-amber-100 to-orange-200 text-amber-800 px-6 py-2 rounded-full text-sm font-semibold border border-amber-300">
                ⭐ {summaryData.average_rating}/5 Average Rating
              </div>
            </div>
          </div>

          {reviews.length > 0 ? (
            <>
              <div
                ref={reviewCardsRef}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {reviews
                  .slice(0, showAllReviews ? reviews.length : 3)
                  .map((review, index) => (
                    <div
                      key={`${review.name}-${index}`}
                      className="group bg-gradient-to-br from-white via-amber-50 to-orange-50 backdrop-blur-sm border border-amber-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-500 relative overflow-hidden"
                      onMouseEnter={handleCardHover}
                      onMouseLeave={handleCardLeave}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                      <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-30 transition-opacity duration-300">
                        <FaQuoteLeft className="text-4xl text-gray-400" />
                      </div>

                      <div className="flex items-center mb-6">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-700 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 shadow-lg">
                            {review.avatar}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-700 text-lg">
                            {review.name}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {review.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => {
                          const starValue = i + 1;
                          if (review.rating >= starValue) {
                            return (
                              <FaStar
                                key={i}
                                className="text-amber-500 text-lg mr-1 drop-shadow-sm"
                              />
                            );
                          } else if (
                            review.rating > i &&
                            review.rating < starValue
                          ) {
                            return (
                              <FaStarHalfAlt
                                key={i}
                                className="text-amber-500 text-lg mr-1 drop-shadow-sm"
                              />
                            );
                          } else {
                            return (
                              <FaStar
                                key={i}
                                className="text-amber-200 text-lg mr-1"
                              />
                            );
                          }
                        })}
                      </div>

                      <p className="text-gray-600 italic text-base leading-relaxed min-h-[100px]">
                        "{review.comment}"
                      </p>

                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full border border-orange-200">
                          {review.badge}
                        </div>
                        <div className="flex gap-2">
                          <FaThumbsUp className="text-green-600 text-sm cursor-pointer hover:scale-110 transition-transform" />
                          <span className="text-xs text-gray-600">Helpful</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {reviews.length > 3 && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {showAllReviews ? "Show Less Reviews" : "See More Reviews"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="inline-block p-6 bg-white/90 rounded-xl shadow-md border border-amber-200">
                <p className="text-lg text-gray-600">
                  No reviews available yet
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Be the first to share your experience!
                </p>
              </div>
            </div>
          )}
        </div>
        <FeedbackForm user={user} onSignOut={handleSignOut} setIsOpen={setIsOpen} isOpen={isOpen} />
      </div>
    </div>
  );
};

import Homepage from "./Homepage";
import Swal from "sweetalert2";

const GetApp = () => {

  const [isOpen, setIsOpen] = useState(false);

  // Helper function to handle error close or retry


  return (
    <>
      <div>
        <Homepage />
        <AnimatedRatingPage
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
        {/* {error && (
          <div
            onClick={error.isRetry ? handleErrorAction : undefined}
            style={{
              position: "fixed",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: error.isRetry ? "#e3f2fd" : "#ffebee",
              color: error.isRetry ? "#0d47a1" : "#c62828",
              padding: "15px 25px",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              zIndex: 1000,
              maxWidth: "90%",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: error.isRetry ? "pointer" : "default",
              border: `1px solid ${error.isRetry ? "#90caf9" : "#ef9a9a"}`,
            }}
          >
            <span>{error.message}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
               
              }}
              style={{
                background: "none",
                border: "none",
                color: error.isRetry ? "#0d47a1" : "#c62828",
                cursor: "pointer",
                fontSize: "18px",
                padding: "0 5px",
                marginLeft: "10px",
              }}
            >
              {error.isRetry ? "↻" : "×"}
            </button>
          </div>
        )} */}
      </div>
      <Footer />
    </>
  );
};

export default GetApp;
