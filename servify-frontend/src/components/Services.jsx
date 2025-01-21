import ServiceCard from "./ServiceCard";
import CategoryCard from "./CategoryCard";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Services = () => {
  const services = useSelector((store) => store.service.services);

  if (!services) return

  const sliderSettings = (itemCount) => ({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(3, itemCount), // Show up to 3 items, or fewer if less are available
    slidesToScroll: Math.min(2, itemCount - 1), // Scroll one less than the total items if possible
    initialSlide: 0,
    centerMode: false, // This will ensure slides align to the left instead of center
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, itemCount), // Prevent overshooting
          slidesToScroll: Math.min(2, itemCount - 1), // Adjust scroll to prevent empty scroll
          infinite: false,
          dots: false,
          centerMode: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, itemCount),
          slidesToScroll: Math.min(2, itemCount - 1),
          infinite: false,
          centerMode: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(1, itemCount),
          slidesToScroll: Math.min(1, itemCount - 1),
          infinite: false,
          centerMode: false,
        },
      },
    ],
  });

  return (
    <div className="w-10/12 mx-auto">
      <h1 className="text-5xl text-center font-extrabold text-gray-800 mt-12">
        Our Services
      </h1>
      <div className="w-full h-fit flex flex-col gap-y-6 mt-8 px-4 py-10">
        <h2 className="text-4xl font-bold text-gray-800">Categories</h2>
        <div className="w-full h-fit p-8">
          <Slider {...sliderSettings(services.length)}>
            {services?.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </Slider>
        </div>
        {services?.map((service) => (
          <div className="mt-8" key={service.id}>
            <h2 className="text-4xl font-bold text-gray-800">{service.name}</h2>
            <div className="w-full h-fit p-8">
              <Slider {...sliderSettings(service.services.length)}>
                {service.services.map((serviceItems) => (
                  <ServiceCard
                    key={serviceItems.id}
                    serviceData={serviceItems}
                    itemState={true}
                  />
                ))}
              </Slider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
