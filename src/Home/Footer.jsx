"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "./Modal";
import logoImage from "../../Public/assets/Logo2.png";

const data = {
  contacts: [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="currentColor"
          className="w-[4rem]"
        >
          <path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z" />
        </svg>
      ),
      text: "D-3, Vidya Vihar, In Front of BU, Narmadapuram Road, Bhopal MP-462026",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="currentColor"
          className="w-[1.5rem]"
        >
          <path d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821Z" />
        </svg>
      ),
      text: "0755-493-7957,  +91 7879868904",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="currentColor"
          className="w-[1.5rem]"
        >
          <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z" />
        </svg>
      ),
      text: "contact@shivomsecuranation.com",
    },
  ],
  companyLinks: [
    { text: "About Us", href: "/About" },
    { text: "Contact Us", href: "/Contact" },
    { text: "Privacy Policy", href: "/" },
    { text: "Terms & Condition", href: "/" },
    { text: "Support", href: "/" },
  ],
  highlightsLinks: [
    { text: "Room Seat Management", href: "" },
    { text: "Admissions & Registrations", href: "" },
    { text: "S-mart Digital Account", href: "" },
    { text: "Multiple User", href: "" },
    { text: "One Dashboard for Multiple Business", href: "" },
    { text: "Online Business Problem", href: "" },
    { text: "Special S-mart Features", href: "" },
    { text: "Different From Others", href: "" },
    { text: "S-mart Tenant App", href: "" },
  ],
};

const Footer = () => {
  return (
    <>
      <div className="relative">
        <Modal />

        <div
          className="container-fluid bg-dark text-white footer wow fadeIn"
          data-wow-delay="0.1s"
        >
          <div className="container pb-3">
            <div className="row g-5 pt-4">
              <div className="col-md-3 col-lg-4 flex flex-col items-center">
                <div className="w-[190px] h-[100px] flex items-center justify-center">
                  <img
                    src={logoImage}
                    alt="logo"
                    style={{ height: "220px", width: "220px" }}
                    className="object-contain"
                  />
                </div>

                <div className="mt-4">
                  <div className="bg-gray-300 relative flex flex-col items-center rounded p-4 uppercase text-black">
                    <div className="absolute -top-6 left-3">
                      <button
                        type="button"
                        className="focus:outline-none text-white bg-gray-600 border-2 border-gray-900 font-bold rounded-lg text-3xl px-2 py-1 me-2 mb-2"
                      >
                        Now
                      </button>
                    </div>
                    <h1 className="font-bold text-2xl mt-2">
                      No worry for hustle
                    </h1>
                    <h3 className="text-sm">
                      to give your Hostel / PG on rent
                    </h3>
                  </div>
                </div>

                <div className="max-w-sm flex items-center justify-center space-y-3">
                  <div className="mt-3">
                    <label
                      htmlFor="hs-trailing-button-add-on"
                      className="sr-only"
                    >
                      Label
                    </label>
                    <div className="flex rounded-lg shadow-sm h-[3rem]">
                      <div className="py-0 bg-white text-gray-600  px-3 flex w-full border-gray-200 shadow-sm rounded-s-lg focus:z-10 disabled:opacity-50 disabled:pointer-events-none  items-center">
                        <p className="text-black text-sm p-0 m-0">Start your journey</p>
                      </div>
                      <a href="/GetApp" className="no-underline">
                        <button
                          type="button"
                          className="py-[0.85rem] px-2 w-[10rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-[#D1D5DB] text-black hover:text-white hover:bg-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                        >
                          Get App
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            fill="currentColor"
                          >
                            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                          </svg>
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* CONTACT */}
              <div className="col-md-6 col-lg-3 flex flex-col items-start">
                <h6 className="section-title text-start text-[#FEA116] text-uppercase mb-4">
                  Contact
                </h6>
                {data.contacts.map((item, index) => (
                  <div
                    key={index}
                    className="mb-3 flex flex-row gap-2 items-start"
                  >
                    {item.icon}
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>

              {/* COMPANY + HIGHLIGHTS */}
              <div className="col-lg-5 col-md-12">
                <div className="row gy-5 g-4">
                  <div className="col-md-6 flex flex-col items-start">
                    <h6 className="section-title text-start text-[#FEA116] text-uppercase mb-4">
                      Company
                    </h6>
                    {data.companyLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="text-white text-sm flex flex-row no-underline items-center gap-1 hover:animate-pulse"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="currentColor"
                        >
                          <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
                        </svg>
                        <h6 className="mt-2">{link.text}</h6>
                      </a>
                    ))}
                  </div>

                  <div className="col-md-6 flex flex-col items-start">
                    <h6 className="section-title text-[#FEA116] text-start text-uppercase mb-4">
                      Highlights
                    </h6>
                    {data.highlightsLinks.map((highlight, index) => (
                      <a
                        key={index}
                        href="#"
                        className="no-underline flex-row text-white text-sm flex items-center gap-1 hover:animate-pulse"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="18"
                          height="18"
                          fill="currentColor"
                        >
                          <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" />
                        </svg>
                        <h6 className="text-start mt-2">{highlight.text}</h6>
                      </a>
                    ))}
                    {/* ... social links untouched ... */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COPYRIGHT SECTION */}
          <div className="container">
            <div className="copyright">
              <hr />
              <div className="row py-4">
                <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                  &copy;
                  <a className="border-bottom no-underline text-white" href="#">
                    Shivom Technologies Pvt. Ltd
                  </a>
                  , All Right Reserved.
                </div>
                <div className="col-md-6 text-center text-md-end">
                  <div className="footer-menu flex items-center justify-end">
                    <a
                      href="#"
                      className="px-3 border-r no-underline text-white"
                    >
                      Home
                    </a>
                    <a
                      href="#"
                      className="px-3 border-r no-underline text-white"
                    >
                      Cookies
                    </a>
                    <a
                      href="#"
                      className="px-3 border-r no-underline text-white"
                    >
                      Help
                    </a>
                    <a href="#" className="px-3 no-underline text-white">
                      FQAs
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
