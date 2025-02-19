import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const slidesData = [
  {
    image: "https://i.ibb.co.com/mV1tg8F1/pexels-franco30-12193105.jpg",
    title: "Donate Blood, Save Lives",
    description:
      "Every drop counts! Your donation can make the difference between life and death for someone in need.",
    buttonText: "Become a Donor",
    buttonLink: "/auth/register",
  },
  {
    image: "https://i.ibb.co.com/DfhR52ZD/pexels-cais-4680228.jpg",
    title: "Find a Donor Near You",
    description:
      "Need blood urgently? Use our platform to quickly connect with verified blood donors in your area.",
    buttonText: "Search Now",
    buttonLink: "/searchdonor",
  },
  {
    image: "https://i.ibb.co.com/bZxjhT8/pexels-rsapmech-12820058.jpg",
    title: "Join the Life-Saving Community",
    description:
      "Be a part of a compassionate network that stands together to save lives through blood donation.",
    buttonText: "Learn More",
    buttonLink: "/about",
  },
];

const Carosel = () => {
  return (
    <div className="container mx-auto p-4 mt-20">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 4000 }}
        loop={true}
        className="relative rounded-lg"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              {/* Slide Image */}
              <img
                src={slide.image}
                alt={`banner-${index + 1}`}
                className="max-h-[80vh] w-full object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#000000cc] to-[#00000055] flex flex-col justify-center items-center text-center px-4 sm:px-10 md:px-16 lg:px-32 text-white gap-4 md:gap-6">
                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight lg:w-[70%] xl:w-[50%]"
                >
                  {slide.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl lg:w-[70%] xl:w-[50%]"
                >
                  {slide.description}
                </motion.p>

                {/* Call-to-Action Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <Link
                    to={slide.buttonLink}
                    className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition"
                  >
                    {slide.buttonText}
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carosel;
