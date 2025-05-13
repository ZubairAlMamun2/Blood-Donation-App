import React from "react";

const FeaturedSection = () => {
  return (
    <div className=" lg:container mx-auto mt-4 md:p-4">
      <div className="mb-4 p-4 md:p-8 bg-white shadow-xl rounded-2xl">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
        Photo Gallary
      </h2>

      {/* Grid Layout for Images */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Featured Images */}
        {[
          "https://images.pexels.com/photos/12193105/pexels-photo-12193105.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/12820060/pexels-photo-12820060.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/12820058/pexels-photo-12820058.jpeg?auto=compress&cs=tinysrgb&w=600",
          "https://images.pexels.com/photos/4680222/pexels-photo-4680222.jpeg?auto=compress&cs=tinysrgb&w=600",
        ].map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl shadow-lg border border-white/20 hover:border-red-500 transition duration-300"
          >
            <img
              className="w-full h-[50vh] object-cover transform hover:scale-105 transition duration-500 ease-in-out"
              src={image}
              alt={`Featured ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default FeaturedSection;
