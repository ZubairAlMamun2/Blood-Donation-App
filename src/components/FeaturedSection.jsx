import React from "react";

const FeaturedSection = () => {
  return (
    <div className=" lg:container mx-auto lg:p-4">
      <div className="mb-4 p-4 md:p-8 bg-white shadow-xl rounded-2xl">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
        Photo Gallary
      </h2>

      {/* Grid Layout for Images */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Featured Images */}
        {[
          "https://i.ibb.co.com/DfhR52ZD/pexels-cais-4680228.jpg",
          "https://i.ibb.co.com/bZxjhT8/pexels-rsapmech-12820058.jpg",
          "https://i.ibb.co.com/mV1tg8F1/pexels-franco30-12193105.jpg",
          "https://i.ibb.co.com/8LnzWZ7h/pexels-cais-4680222.jpg",
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
