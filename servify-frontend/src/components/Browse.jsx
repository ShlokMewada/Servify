import { useDispatch, useSelector } from "react-redux";
import servicePic from "../assets/vo5tj29l.png";
import {
  GRID_IMG1,
  GRID_IMG2,
  GRID_IMG3,
  GRID_IMG4,
  GRID_IMG5,
  HOME_IMG1,
  HOME_IMG2,
} from "../utils/constants";
import { viewServiceCategory } from "../utils/serviceSlice";
import { useNavigate } from "react-router-dom";
import useGetNecessaryServiceDetails from "../hooks/useGetNecessaryServiceDetails";

const Browse = () => {
  const services = useSelector((store) => store.service.services);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToCategoryDetails = (id) => {
    const category = services.filter((category) => category.id === id);
    dispatch(viewServiceCategory(category[0]));
    navigate("/categorydetails");
  };

  const onlyServiceDetails = useSelector((store) => store.service.onlyServices);

  console.log(
    JSON.stringify(useGetNecessaryServiceDetails(onlyServiceDetails), null, 2),
  );

  return (
    <div className="w-full pt-24 md:pt-36 lg:pt-44 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between relative">
          {/* Main Headline: Always visible, centered on mobile, left-aligned on desktop */}
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Home services at your
              <br className="hidden sm:block" /> doorstep
            </h1>
          </div>

          {/* Desktop Images: Hidden on mobile (max-width 1024px) to prevent overlap issues */}
          <div className="hidden lg:flex w-1/2 justify-end items-center gap-4">
            <div className="flex flex-col gap-4">
              <img
                src={HOME_IMG1}
                alt=""
                className="rounded-tl-2xl w-32 xl:w-40 shadow-md object-cover"
              />
              <img
                src={HOME_IMG2}
                alt=""
                className="rounded-bl-2xl w-32 xl:w-40 shadow-md object-cover"
              />
            </div>
            <img
              src={servicePic}
              alt=""
              className="w-[200px] xl:w-[260px] object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Category Grid Card: Now flows naturally on mobile and "lifts" on desktop */}
        <div className="mt-10 lg:-mt-32 relative z-20 pb-12">
          <div className="bg-white border border-gray-200 p-6 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full lg:max-w-[600px] mx-auto lg:mx-0">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-8 text-center lg:text-left">
              What are you looking for?
            </h2>

            {/* Grid for Categories */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-8">
              {[
                { id: 9, img: GRID_IMG1, label: "Women's Salon & Spa" },
                { id: 11, img: GRID_IMG2, label: "Men's Salon & Massage" },
                { id: 1, img: GRID_IMG3, label: "AC & Repair" },
                { id: 7, img: GRID_IMG4, label: "Sofa & Carpet Cleaning" },
                { id: 12, img: GRID_IMG5, label: "Electrician" },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center group cursor-pointer"
                  onClick={() => goToCategoryDetails(item.id)}
                >
                  <div className="bg-[#F5F5F5] w-full aspect-square flex justify-center items-center rounded-2xl group-hover:bg-gray-100 transition-all">
                    <img
                      src={item.img}
                      alt={item.label}
                      className="w-12 h-12 md:w-16 md:h-16 object-contain group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <p className="mt-3 text-xs md:text-sm font-medium text-gray-600 text-center leading-tight h-8 flex items-center">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
