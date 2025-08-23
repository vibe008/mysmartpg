import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MapPin,
  Phone,
  Wifi,
  Snowflake,
  Utensils,
  Video,
  Shield,
  Zap,
  Droplets,
  Sparkles,
  Star,
  Users,
  Calendar,
  ArrowRight,
  Car,
  Coffee,
  BookOpen,
  Gamepad2,
  Dumbbell,
} from "lucide-react";

const RoomCard = ({
  name,
  address,
  contact,
  rating = 5,
  occupied = 10,
  totalRooms = 25,
  isLiked: initialLiked = false,
  bgGradient = "from-yellow-400 to-orange-400",
  category = "Premium Hostel",
  price = "₹8,000",
}) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [currentImage, setCurrentImage] = useState(0);

  const occupancyPercentage = (occupied / totalRooms) * 100;

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl justify-between w-full max-w-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col">
      {/* Header with image and rating - TOP */}
      <div className="relative overflow-hidden w-full">
        <div
          className={`h-32 bg-gradient-to-br ${bgGradient} flex items-center justify-center`}
        >
          {/* Animated background pattern */}
          <div
            className={`absolute inset-0 bg-gradient-to-b ${bgGradient} opacity-90`}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          {/* Rating badge */}
          <div className="absolute top-2 left-2 bg-black bg-opacity-70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
            <Star className="w-2 h-2 mr-1 fill-yellow-400 text-yellow-400" />
            {rating}.0
          </div>

          {/* Heart button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-2 right-2 bg-white bg-opacity-90 backdrop-blur-sm hover:bg-opacity-100 rounded-full p-1.5 transition-all duration-300 hover:scale-110"
          >
            <Heart
              className={`w-3 h-3 transition-colors duration-300 ${
                isLiked ? "text-red-500 fill-red-500" : "text-gray-600"
              }`}
            />
          </button>

          {/* Price badge */}
          <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs font-bold">
            {price}/month
          </div>

          {/* Enhanced room representation */}
          <div className="w-16 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-lg relative shadow-lg transform group-hover:scale-105 transition-transform duration-300">
            {/* Room details */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-gradient-to-br from-teal-500 to-teal-600 rounded-sm shadow-sm"></div>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-5 h-2 bg-gradient-to-br from-purple-600 to-purple-700 rounded-sm shadow-sm"></div>
            <div className="absolute top-1 right-1 w-1 h-3 bg-gradient-to-b from-amber-800 to-amber-900 rounded shadow-sm"></div>
            <div className="absolute top-1 left-1 w-1 h-2 bg-gradient-to-b from-green-500 to-green-600 rounded-full shadow-sm"></div>

            {/* Window light effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-transparent to-transparent opacity-30 rounded-lg"></div>
          </div>
        </div>

        {/* Enhanced carousel dots */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentImage
                  ? "bg-white scale-125"
                  : "bg-white bg-opacity-60 hover:bg-opacity-80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content - BOTTOM */}
      <div className="p-3 flex flex-col justify-between flex-grow">
        {/* Title and category */}
        <div className="mb-2">
          <div className="flex justify-between items-start mb-1">
            <div className="flex-grow">
              <h2 className="text-sm font-bold text-gray-900 mb-1 truncate">
                {name}
              </h2>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold inline-block">
                ⭐ {category}
              </div>
            </div>
          </div>

          {/* Address and Contact */}
          <div className="space-y-1 mb-2 mt-2">
            <div className="flex items-center text-gray-600 text-xs">
              <MapPin className="w-3 h-3 text-orange-500 mr-1" />
              <span className="font-medium truncate">{address}</span>
            </div>
            <div className="flex items-center text-gray-600 text-xs">
              <Phone className="w-3 h-3 text-orange-500 mr-1" />
              <span className="font-medium">+91 {contact}</span>
            </div>
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-4 gap-1 mb-2">
          {[
            { icon: Wifi, color: "blue-500" },
            { icon: Snowflake, color: "cyan-500" },
            { icon: Utensils, color: "green-500" },
            { icon: Shield, color: "red-500" },
          ].map(({ icon: Icon, color }, index) => (
            <div
              key={index}
              className="flex items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-md p-1.5 transition-all duration-300 hover:scale-105"
            >
              <Icon className={`w-3 h-3 text-${color}`} />
            </div>
          ))}
        </div>

        {/* Room Stats */}
        <div className="grid grid-cols-2 gap-1 mb-3">
          <div className="text-center p-1.5 bg-orange-50 rounded-lg">
            <p className="text-gray-600 text-xs font-medium">Total</p>
            <p className="text-sm font-bold text-gray-900">{totalRooms}</p>
          </div>
          <div className="text-center p-1.5 bg-green-50 rounded-lg">
            <p className="text-gray-600 text-xs font-medium">Occupied</p>
            <p className="text-sm font-bold text-gray-900">{occupied}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-1">
          <Link
            to="/room/details"
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-1.5 px-2 rounded-lg transition-all duration-300 flex items-center justify-center text-xs"
          >
            <span className="mr-1">🏠</span>
            Details
          </Link>
          <button className="flex-1 border border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white font-bold py-1.5 px-2 rounded-lg transition-all duration-300 flex items-center justify-center text-xs">
            <span className="mr-1">📞</span>
            Call
          </button>
        </div>
      </div>
    </div>
  );
};

// Room variations
const Room1 = () => (
  <RoomCard
    name="Aman Residency"
    address="Model Town, Sector 15"
    contact="9876543210"
    rating={5}
    occupied={18}
    totalRooms={25}
    isLiked={true}
    bgGradient="from-yellow-400 to-orange-400"
    category="Premium Hostel"
    price="₹8,000"
  />
);

const Room2 = () => (
  <RoomCard
    name="Comfort Inn PG"
    address="Civil Lines, Near Mall"
    contact="9845123765"
    rating={4}
    occupied={22}
    totalRooms={30}
    isLiked={false}
    bgGradient="from-blue-400 to-blue-600"
    category="Deluxe PG"
    price="₹6,500"
  />
);

const Room3 = () => (
  <RoomCard
    name="Elite Boys Hostel"
    address="University Road, Phase 2"
    contact="9123456789"
    rating={5}
    occupied={28}
    totalRooms={35}
    isLiked={true}
    bgGradient="from-purple-500 to-pink-500"
    category="Elite Hostel"
    price="₹9,200"
  />
);

const Room4 = () => (
  <RoomCard
    name="Green Valley PG"
    address="Sector 11, Garden View"
    contact="9567890123"
    rating={4}
    occupied={15}
    totalRooms={20}
    isLiked={false}
    bgGradient="from-green-400 to-emerald-500"
    category="Eco-Friendly PG"
    price="₹7,200"
  />
);

const Room5 = () => (
  <RoomCard
    name="Royal Stay Hostel"
    address="Downtown, Business District"
    contact="9890123456"
    rating={5}
    occupied={32}
    totalRooms={40}
    isLiked={true}
    bgGradient="from-red-500 to-pink-600"
    category="Luxury Hostel"
    price="₹10,500"
  />
);

// Main component with grid layout
const HostelRooms = () => {
  const [fadeInStyle] = useState({
    animation: "fadeIn 0.6s ease-out forwards",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-6">
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Header Section */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-3">
            Premium Hostel Collection
          </h1>
          <p className="text-gray-600 text-sm max-w-xl mx-auto">
            Discover comfortable and affordable accommodation options
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-7xl mx-auto">
          <div style={{ ...fadeInStyle, animationDelay: "0s" }}>
            <Room1 />
          </div>
          <div style={{ ...fadeInStyle, animationDelay: "0.1s" }}>
            <Room2 />
          </div>
          <div style={{ ...fadeInStyle, animationDelay: "0.2s" }}>
            <Room3 />
          </div>
          <div style={{ ...fadeInStyle, animationDelay: "0.3s" }}>
            <Room4 />
          </div>
          <div style={{ ...fadeInStyle, animationDelay: "0.4s" }}>
            <Room5 />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
          <div className="text-center bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-orange-500">150+</div>
            <div className="text-xs text-gray-600">Properties</div>
          </div>
          <div className="text-center bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-500">10K+</div>
            <div className="text-xs text-gray-600">Happy Students</div>
          </div>
          <div className="text-center bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-500">24/7</div>
            <div className="text-xs text-gray-600">Support</div>
          </div>
          <div className="text-center bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-purple-500">4.8★</div>
            <div className="text-xs text-gray-600">Average Rating</div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg border border-gray-100">
            <span className="text-gray-600 mr-2">🏆</span>
            <span className="text-gray-700 font-medium text-sm">
              Trusted by Students Across India
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelRooms;
