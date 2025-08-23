import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Logo1 = "../../Public/assets/Logo1.png";
const ShreeLogo = "../public/assets/shree.jpg";
const GooglePlay = "../public/assets/googlePlay.png";
const AppStore = "/assets/appStore.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }, [])

  return (
    <nav className="relative">
      {/* Left Logo (Large Screens) */}
      <div className="hidden lg:block fixed top-0 left-0 z-999 w-40 ml-3 h-20">
        <img
          src={Logo1}
          alt="S-Mart Logo - PG and Hostel Management Solution"
          className="object-contain w-full h-full"
        />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-2 bg-white shadow-md">
        <a href="/">
          <img
            src={Logo1}
            alt="company logo"
            width={140}
            height={60}
            style={{ height: "auto" }}
          />
        </a>
        {/* Toggleable hamburger icon */}
        <button
          aria-label="Toggle navigation menu"
          className="p-2 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-md"
          onClick={toggleMenu}
          title="Toggle menu"
          type="button"
        >
          {menuOpen ? (
            // Close icon when menu is open
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger icon when menu is closed
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Top Bar (Large Screens) */}
      <div className="hidden lg:flex flex-col items-center justify-between">
        <div className="bg-white h-12 w-full font-semibold">
          <div className="flex justify-between ml-[13rem] mr-[3rem] items-center h-full">
            <div className="flex items-center gap-2">
              <div className="relative w-[30px] h-[30px]">
                <img
                  src={ShreeLogo}
                  alt="Shree Group Logo"
                  className="object-contain w-full h-full"
                />
              </div>
              <h3 className="uppercase text-[#ED7C25] text-lg">
                Shivom <span className="text-black">Group</span>
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <h3 className="text-sm">Available On</h3>
              <div className="flex gap-3 items-center pt-1">
                <a href="/getapp" className="block">
                  <img
                    src={GooglePlay}
                    alt="Get on Google Play"
                    className="object-contain rounded-md w-[100px] h-[30px]"
                  />
                </a>
                <Link to="/getapp" className="block">
                  <img
                    src={AppStore}
                    alt="Download on the App Store"
                    className="object-contain rounded-md w-[100px] h-[30px]"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navbar (Large Screens) */}
      <div className="hidden lg:block z-40 ">
        <div className={`bg-black ${!scrolled ? "h-12" : "h-16"} w-full flex items-center  ${scrolled ? "fixed top-0 z-50 px-[10rem]" : "px-[15rem]"}`}>
          {/* Left - Nav Links */}
          {scrolled && (
            <div className="w-[100px] h-[100px] mr-[10rem]">
              <img
                src={Logo1}
                alt="S-Mart Logo - PG and Hostel Management Solution"
                className="object-contain w-full h-full"
              />
            </div>
          )}
          <ul className="flex gap-10 text-white uppercase font-semibold align-center mb-0 h-[100%] items-center">
            <li>
              <Link
                to="/"
                className="block w-full text-white hover:text-orange-400 no-underline transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/find"
                className="block w-full text-white hover:text-orange-400 no-underline transition-colors duration-200"
              >
                Find PGs & Hostel
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className="block w-full text-white hover:text-orange-400 no-underline transition-colors duration-200"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block w-full text-white hover:text-orange-400 no-underline transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block w-full text-white hover:text-orange-400 no-underline transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Right - GET APP at corner */}
          <div className="absolute right-0 pr-[5rem]">
            <Link
              to="/getapp"
              className="text-white hover:text-orange-400 no-underline font-semibold"
            >
              <button className="px-4 py-1 border border-orange-400 rounded-lg text-orange-400 hover:bg-orange-400 hover:text-white transition-all font-semibold">
                GET APP
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu - toggled visibility */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md z-50 w-full absolute top-[68px] left-0 px-4 py-4">
          <ul className="flex flex-col gap-2 uppercase font-semibold">
            <li>
              <Link
                to="/"
                className="block text-black hover:text-orange-700 no-underline p-2 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/find"
                className="block text-black hover:text-orange-700 no-underline p-2 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                FIND PGS & HOSTEL
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className="block text-black hover:text-orange-700 no-underline p-2 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                FEATURES
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block text-black hover:text-orange-700 no-underline p-2 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                ABOUT
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block text-black hover:text-orange-700 no-underline p-2 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                CONTACT
              </Link>
            </li>
          </ul>

          {/* Mobile Available On Section */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-2 px-2">
              AVAILABLE ON
            </h3>
            <div className="flex gap-3 px-2">
              <a href="/getapp" className="block w-[100px] h-[30px]">
                <img
                  src={GooglePlay}
                  alt="Get on Google Play"
                  className="object-contain rounded-md w-full h-full"
                />
              </a>
              <a href="/getapp" className="block w-[100px] h-[30px]">
                <img
                  src={AppStore}
                  alt="Download on the App Store"
                  className="object-contain rounded-md w-full h-full"
                />
              </a>
            </div>
            <div className="mt-3">
              <a
                href="/getapp"
                className="block w-full text-center py-2 bg-orange-400 text-white font-semibold rounded-lg hover:bg-orange-500 transition-colors"
              >
                GET THE APP
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
