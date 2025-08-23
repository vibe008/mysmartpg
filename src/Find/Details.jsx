import React from "react";
import { Wifi, Snowflake, Utensils, Video, Info, Bed } from "lucide-react";
import roomImage from "../../Public/assets/now.png"; // Import the image

const Details = () => {
  return (
    <div className="bg-gray-100 max-w-lg mx-auto">
      <div className="bg-white rounded-2xl p-7 shadow-sm mb-15">
        {/* Image Section */}
        <div className="mb-4">
          <img
            src={roomImage}
            alt="Room"
            className="w-full h-60 object-cover rounded-xl"
          />
        </div>

        {/* Header */}
        <div className="flex justify-between items-start mb-1">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Room #101</h1>
            <p className="text-gray-700 text-lg">Type: Attached</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-orange-100 p-3 rounded-xl flex items-center justify-center">
              <Wifi className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="bg-orange-100 p-3 rounded-xl flex items-center justify-center">
              <Snowflake className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="bg-orange-100 p-3 rounded-xl flex items-center justify-center">
              <Utensils className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="bg-orange-100 p-3 rounded-xl flex items-center justify-center">
              <Video className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Bed Icons and Info */}
        <div className="flex items-center gap-1 mb-1 -mt-14">
          <div className="bg-gray-100 p-2 rounded-full">
            <Info className="w-5 h-5 text-gray-400" />
          </div>
          <div className="bg-orange-100 p-2 rounded-lg">
            <Bed className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="bg-orange-100 p-2 rounded-lg">
            <Bed className="w-6 h-6 text-white" />
          </div>
          <div className="bg-orange-100 p-2 rounded-lg">
            <Bed className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-yellow-500">
              Rent: ₹ 5000
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
