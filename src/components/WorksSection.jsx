import { useState, useEffect } from "react";

const HowItWorks = () => {

  return (
    <div className="container mx-auto md:px-4 mt-8">
        <section className="bg-white py-12 rounded-2xl my-2 md:px-4 shadow-xl">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">How Does It Work?</h2>
        <p className="text-lg mb-8">
          Donating blood is simple and life-saving. Follow these three easy steps to make a difference.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500 text-lg font-bold">
            1
          </div>
          <h3 className="text-xl font-semibold mt-4">Register & Check Eligibility</h3>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Sign up and verify if you meet the donation criteria.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500 text-lg font-bold">
            2
          </div>
          <h3 className="text-xl font-semibold mt-4">Find a Donation Camp</h3>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Locate nearby blood donation centers and events.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500 text-lg font-bold">
            3
          </div>
          <h3 className="text-xl font-semibold mt-4">Donate & Save Lives</h3>
          <p className="text-center text-gray-600 dark:text-gray-300">
            Visit the center, donate blood, and be a hero.
          </p>
        </div>
      </div>
    </section>
    </div>
  );
};

export default HowItWorks;
