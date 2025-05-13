import { div } from "framer-motion/client";
import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="container mx-auto md:px-4  mt-2 pb-4">
      <div
      className="relative min-h-[60vh] md:p-4 rounded-2xl mt-4 flex items-center justify-center"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/5340269/pexels-photo-5340269.jpeg?auto=compress&cs=tinysrgb&w=600)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay Covering Full Background */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Section */}
      <div className="relative flex flex-col md:flex-row gap-16 md:container mx-auto p-4  w-full justify-center items-center">
        {/* Join as a Donor */}
        <div className="bg-white text-black p-10 rounded-xl shadow-lg text-center w-full z-10">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Join as a Donor</h1>
          <p className="text-gray-600 mb-6">
            Become a life-saving donor today. Join us to make a difference!
          </p>
          <Link
            className="px-5 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition duration-300"
            to="/auth/register"
          >
            Join Now
          </Link>
        </div>

        {/* Search Donors */}
        <div className="bg-white text-black p-10 rounded-xl shadow-lg text-center w-full z-10">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Search Donors</h1>
          <p className="text-gray-600 mb-6">
            Need blood? Find a donor in your area quickly and easily.
          </p>
          <Link
            className="px-5 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition duration-300"
            to="/searchdonor"
          >
            Search Now
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Banner;
