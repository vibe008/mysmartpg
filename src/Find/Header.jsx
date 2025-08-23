import React from "react";
import Footer from "../Home/Footer";
import RoomBookingApp from "./Room";
import Hostel from "./Hostel";
const backgroundGif = "../assets/search-bg-6.gif";

const Findpage = () => {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="relative overflow-hidden">
          <img
            src={backgroundGif}
            alt="background"
            style={{
              height: "1024px",
              width: "1600px",
              objectFit: "cover",
              objectPosition: "left",
              marginTop: "-23rem",
            }}
          />
        </div>

        <div className="absolute z-10 text-center top-[10rem]">
          <h1 className="text-4xl lg:text-5xl">Find Your Hostels and PGs</h1>
          <h3 className="text-lg lg:text-xl p-5 font-semibold">
            Wherever you prefer. Whenever you need
          </h3>

          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <form className="w-full max-w-md mx-auto">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-14 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search Hostels & PGs..."
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-1/2 translate-y-1/2 bg-[#ED7C24] hover:bg-[#ee7111] font-medium rounded-lg text-sm px-4 py-2"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <RoomBookingApp />
        <div className="mt-12">
          <Hostel />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Findpage;
