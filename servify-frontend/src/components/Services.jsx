import ServiceCard from "./ServiceCard";
import CategoryCard from "./CategoryCard";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 1. Custom Next Arrow Component
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-40 w-10 h-10 bg-gray-800 hover:bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg transition-all"
    aria-label="Next"
  >
    <i className="fa-solid fa-chevron-right text-sm md:text-base"></i>
  </button>
);

// 2. Custom Prev Arrow Component
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-40 w-10 h-10 bg-gray-800 hover:bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg transition-all"
    aria-label="Previous"
  >
    <i className="fa-solid fa-chevron-left text-sm md:text-base"></i>
  </button>
);

const Services = () => {
  const services = useSelector((store) => store.service.services);

  if (!services) return null;

  const sliderSettings = (itemCount) => ({
    dots: false,
    infinite: itemCount > 1,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />, // Using our custom component
    prevArrow: <PrevArrow />, // Using our custom component
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.2,
          arrows: true, // Specifically forced for mobile
        },
      },
    ],
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mb-20 overflow-x-hidden">
      <h1 className="text-3xl md:text-5xl text-center font-extrabold text-gray-800 mt-12 md:mt-20">
        Our Services
      </h1>

      <div className="w-full flex flex-col gap-y-12 mt-8 md:mt-16">
        {/* Categories Section */}
        <section className="relative px-6 md:px-10">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
            Categories
          </h2>
          {/* Wrapper that allows overflow for arrows but stays centered */}
          <div className="relative">
            <Slider {...sliderSettings(services.length)}>
              {services?.map((category) => (
                <div key={category.id} className="px-2">
                  <CategoryCard category={category} />
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* Individual Service Sections */}
        {services?.map((service) => (
          <section className="relative px-6 md:px-10" key={service.id}>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 border-l-4 border-green-500 pl-4 mb-6">
              {service.name}
            </h2>
            <div className="relative">
              <Slider {...sliderSettings(service.services.length)}>
                {service.services.map((serviceItems) => (
                  <div key={serviceItems.id} className="px-2 pb-6">
                    <ServiceCard serviceData={serviceItems} itemState={true} />
                  </div>
                ))}
              </Slider>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Services;
