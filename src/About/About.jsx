"use client";
import { useEffect } from "react";
import Footer from "../Home/Footer";
// Import images from assets
const aboutBg = "../public/assets/about-bg.jpg";
const heartImg = "../public/assets/heart.png";
const conscientiousIcon = "../public/assets/conscientiousIcon.png";
const relationshipIcon = "../public/assets/relationshipicon.png";
const solutionsIcon = "../public/assets/Solutionsicon.png";
const innovativeIcon = "../public/assets/Innovativeicon.png";
const artisticIcon = "../public/assets/Articticicon.png";
const trustworthyIcon = "../public/assets/Trustworthyicon.png";

const AboutUs = () => {
  const handleVisitClick = () => {
    window.open("https://mystrax.com/ankit/shivom/index.php", "_blank");
  };

  useEffect(() => {
    const container = document.querySelector(".animation-container-left");
    container.classList.add("animate-slide-in-left");
  }, []);
  useEffect(() => {
    const container = document.querySelector(".animation-container-right");
    container.classList.add("animate-slide-in-right");
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-[600px] sm:h-[700px] md:h-[750px] lg:h-[800px]">
        <div
          className="relative w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${aboutBg})` }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4 text-center">
            <div className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 animation-container-left">
              One Step Towards
            </div>
            <div className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold animation-container-right">
              Securing Generation
            </div>
          </div>
          <div className="absolute bottom-4 right-4">
            <button
              type="button"
              onClick={handleVisitClick}
              className="py-2 px-4 sm:py-2.5 sm:px-5 flex items-center gap-2 text-sm sm:text-base font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Visit Us
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center text-orange-600 font-bold mb-6 sm:mb-8">
            A Short Glimpse About Us
          </h2>
          <div className="flex justify-center mb-6">
            <img
              src={heartImg}
              alt="Heart Logo"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
          </div>
          <div className="border-2 border-gray-400 p-4 sm:p-6 md:p-8 w-full sm:w-5/6 md:w-3/4 lg:w-2/3 mx-auto text-gray-600 text-base sm:text-lg md:text-xl rounded-lg">
            <p>
              Shivom Group envisions a world, where people have a meaningful
              experience with the smart and advanced technologies and solutions
              be it a digital security or digital management. We are the one
              where every digital interaction counts, be it through a web app,
              Android/Ios App, or through some other means like emails or text
              messages.
            </p>
          </div>
        </div>
      </div>

      {/* Our History */}
      <div className="bg-black">
        <div className="container mx-auto px-4 py-12 text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-6 sm:mb-8">
            Our History
          </h2>
          <div className="w-full sm:w-5/6 md:w-3/4 lg:w-2/3 mx-auto text-lg sm:text-xl text-lemonchiffon">
            <p className="text-justify leading-relaxed">
              With the years of analysis of various sectors and societies, The
              Shivom Group established in providing the ultimate security
              solutions to the schools and the other various organizations, in
              order to ensure their safety and to transform them typical and
              tedious workflow into easily accessible digital services. For more
              than 3 years of survey and analysis, Shivom Group has helped the
              schools and various other organizations to manage their
              Record/Data in an ultimate fashion and helping parents to get rid
              of the scare about their school going children. Our world-class
              products are designed with various advanced technologies by our
              creative team and expert advisors. Our products are designed to
              ensure the full proof safety of kid and women of our country and
              to provide actionable insights for them. Today, the products and
              the security and management solutions of Shivom Group are helping
              number of prestigious organizations of various sectors to reduce
              the crime against women and kids globally.
            </p>
          </div>
        </div>
      </div>

      {/* Our Mission */}
      <div
        className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-cover bg-center mt-6"
        style={{ backgroundImage: "url('../public/assets/OurMission.jpg')" }}
      >
        <div className="container mx-auto px-4 py-12 text-black flex flex-col justify-center h-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-4 sm:mb-6">
            Our Mission
          </h2>
          <div className="w-full sm:w-5/6 md:w-3/4 lg:w-2/3 mx-auto text-base sm:text-lg md:text-xl">
            <p className="text-justify leading-relaxed">
              We are determined to be an organization, who is solely dedicated
              to building a nation free of fears, scares, and crime. We follow a
              simple but powerful rule, 'Always give more to the people than
              they expect'. That's why we put extra efforts in designing and
              manufacturing innovative solutions using advanced technologies. We
              are constrained to provide a safe and scare-free future for the
              next generation. That's why we are developing advanced security
              and management solutions for the society so that they can tackle
              these serious consequences. This is what we are and this is how we
              work.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="flex flex-col items-center py-12 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
          Our Values
        </h2>

        {/* First Row */}
        <div className="bg-black text-white max-w-full sm:max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center flex flex-col items-center p-4 border-b sm:border-b-0 sm:border-r">
            <img
              src={conscientiousIcon}
              alt="Conscientious Icon"
              className="w-12 h-12 sm:w-16 sm:h-16"
            />
            <p className="text-xl font-bold mt-4">Conscientious</p>
            <p className="text-base sm:text-lg mt-2">
              Hardwork is the Identification of Honest Thinking.
            </p>
          </div>
          <div className="text-center flex flex-col items-center p-4 border-b sm:border-b-0 sm:border-r">
            <img
              src={relationshipIcon}
              alt="Relationship Icon"
              className="w-12 h-12 sm:w-16 sm:h-16"
            />
            <p className="text-xl font-bold mt-4">Relationship</p>
            <p className="text-base sm:text-lg mt-2">
              Your Belief Relation Around Life
            </p>
          </div>
          <div className="text-center flex flex-col items-center p-4">
            <img
              src={solutionsIcon}
              alt="Solutions Icon"
              className="w-12 h-12 sm:w-16 sm:h-16"
            />
            <p className="text-xl font-bold mt-4">Solutions</p>
            <p className="text-base sm:text-lg mt-2">
              Security, Solutions to End Social Problems.
            </p>
          </div>
        </div>

        {/* Second Row */}
        <div className="bg-black text-white max-w-full sm:max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
          <div className="text-center flex flex-col items-center p-4 border-b sm:border-b-0 sm:border-r">
            <img
              src={innovativeIcon}
              alt="Innovative Icon"
              className="w-12 h-12 sm:w-16 sm:h-16"
            />
            <p className="text-xl font-bold mt-4">Innovative</p>
            <p className="text-base sm:text-lg mt-2">
              Combine Hardwork, With Research and technology
            </p>
          </div>
          <div className="text-center flex flex-col items-center p-4 border-b sm:border-b-0 sm:border-r">
            <img
              src={artisticIcon}
              alt="Artistic Icon"
              className="w-12 h-12 sm:w-16 sm:h-16"
            />
            <p className="text-xl font-bold mt-4">Artistry</p>
            <p className="text-base sm:text-lg mt-2">
              Artistic Thinking, New Inventions will Born.
            </p>
          </div>
          <div className="text-center flex flex-col items-center p-4">
            <img
              src={trustworthyIcon}
              alt="Trustworthy Icon"
              className="w-12 h-12 sm:w-16 sm:h-16"
            />
            <p className="text-xl font-bold mt-4">Trustworthy</p>
            <p className="text-base sm:text-lg mt-2">Your Trust, Our Motive</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
