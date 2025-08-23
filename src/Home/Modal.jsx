import React, { useState } from "react";

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
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
        setShowModal(false);
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Button to open modal */}
      <div
        className="container newsletter mt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="row justify-content-center">
          <div className="col-lg-11 border rounded p-1">
            <div className="border rounded text-center p-1">
              <div className="bg-white flex flex-col lg:flex-row pt-5 items-center justify-around rounded text-center p-2">
                <div className="mb-4 font-bold text-sm">
                  <p>
                    IT'S TIME TO UPGRADE YOUR HOSTEL/PGs INTO SMART HOSTEL PGs
                  </p>
                  <h6 className="text-sm mb-4">
                    Automate your operations, manage your Hostel/PGs business
                    efficiently, and boost profits
                  </h6>
                </div>

                <div className="max-w-sm flex items-center justify-center space-y-3">
                  <div className="-mt-10">
                    <div className="flex rounded-lg shadow-sm h-[3rem]">
                      <div className="py-2 px-4 w-full border-gray-200 shadow-sm rounded-s-lg bg-white text-orange-500 text-lg flex items-center">
                        Schedule a demo
                      </div>
                      <button
                        onClick={() => setShowModal(true)}
                        type="button"
                        className="py-3 px-4 w-[13rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-orange-500 text-white hover:bg-orange-600"
                      >
                        Get Started
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
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
              <div className="bg-white w-full sm:w-[600px] lg:w-[600px] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Schedule a Demo
                  </h3>
                  <button
                    onClick={() => !isLoading && setShowModal(false)}
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
                    Demo request submitted successfully! The modal will close
                    shortly.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Enter your location"
                      />
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
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
    </>
  );
}
