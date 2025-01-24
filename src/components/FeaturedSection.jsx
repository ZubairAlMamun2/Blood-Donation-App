import React from "react";

const FeaturedSection = () => {
  return (
    <div className="my-5 border rounded-lg p-2">
      <h2 className="text-2xl font-semibold text-center mb-2">
        FeaturedSection
      </h2>
      <div className='grid gap-5 grid-cols-4'>
                <img className='w-full md:h-[50vh] border rounded-lg shadow-lg col-span-4 md:col-span-2' src="https://i.ibb.co.com/vcWY0LT/images-1.jpg" alt="" />
                <img className='w-full md:h-[50vh] border rounded-lg shadow-lg col-span-4 md:col-span-2 ' src="https://i.ibb.co.com/QDN1mD7/download-2.jpg" alt="" />
                <img className='w-full md:h-[50vh] border rounded-lg shadow-lg col-span-4 md:col-span-2' src="https://i.ibb.co.com/x6wcgP7/download-1.jpg" alt="" />
                <img className='w-full md:h-[50vh] border rounded-lg shadow-lg col-span-4 md:col-span-2' src="https://i.ibb.co.com/4FZ30r7/download.jpg" alt="" />
            </div>
    </div>
  );
};

export default FeaturedSection;
