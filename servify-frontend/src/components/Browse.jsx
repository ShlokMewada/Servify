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

const Browse = () => {
  const services = useSelector((store) => store.service.services);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const goToCategoryDetails = (id) => {
    const category = services.filter((category) => category.id === id);
    dispatch(viewServiceCategory(category[0]));
    navigate("/categorydetails");
  };
  return (
    <div className="w-full pt-36">
      <div className="w-10/12 mx-auto p-10 flex justify-between relative">
        <h1 className="text-4xl font-semibold">
          Home services at your
          <br /> doorstep
        </h1>
        <div className="flex gap-x-2">
          <div className="flex flex-col gap-y-2">
            <img src={HOME_IMG1} alt="" className="rounded-tl-lg" />
            <img src={HOME_IMG2} alt="" className="rounded-bl-lg" />
          </div>
          <img src={servicePic} alt="" className="w-[230px]" />
        </div>
        <div className="flex flex-col absolute top-[10rem] border-2 p-3 rounded-lg items-center">
          <h1 className="text-2xl font-semibold text-gray-500">
            What are you looking for?
          </h1>
          <div className="flex flex-col mt-6 gap-y-7 p-2">
            <div className="flex gap-x-4">
              <div
                className="flex flex-col w-[130px] items-center justify-center gap-y-2 group hover:opactiy-80 cursor-pointer"
                onClick={() => {
                  goToCategoryDetails(9);
                }}
              >
                <div className="bg-[#F5F5F5] w-full flex justify-center items-center py-3 px-7 rounded-lg group-hover:opacity-80">
                  <img src={GRID_IMG1} alt="" />
                </div>
                <div className="h-10 flex items-start">
                  <p className="text-xs group-hover:opacity-80 text-center">
                    {"Women's Salon & Spa"}
                  </p>
                </div>
              </div>
              <div
                className="flex flex-col w-[130px] items-center justify-center gap-y-2 group hover:opactiy-80 cursor-pointer"
                onClick={() => {
                  goToCategoryDetails(11);
                }}
              >
                <div className="bg-[#F5F5F5] w-full flex justify-center items-center py-3 px-7 rounded-lg group-hover:opacity-80">
                  <img src={GRID_IMG2} alt="" />
                </div>
                <div className="h-10 flex items-start">
                  <p className="text-xs group-hover:opacity-80 text-center">
                    {"Men's Salon & Massage"}
                  </p>
                </div>
              </div>
              <div
                className="flex flex-col w-[130px] items-center justify-center gap-y-2 group hover:opactiy-80 cursor-pointer"
                onClick={() => {
                  goToCategoryDetails(1);
                }}
              >
                <div className="bg-[#F5F5F5] w-full flex justify-center items-center py-3 px-7 rounded-lg group-hover:opacity-80">
                  <img src={GRID_IMG3} alt="" />
                </div>
                <div className="h-10 flex items-start">
                  <p className="text-xs group-hover:opacity-80 text-center">
                    {"AC & Repair"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-x-4">
              <div
                className="flex flex-col w-[130px] items-center justify-center gap-y-2 group hover:opactiy-80 cursor-pointer"
                onClick={() => {
                  goToCategoryDetails(7);
                }}
              >
                <div className="bg-[#F5F5F5] w-full flex justify-center items-center py-3 px-7 rounded-lg group-hover:opacity-80">
                  <img src={GRID_IMG4} alt="" />
                </div>
                <div className="h-10 flex items-start">
                  <p className="text-xs group-hover:opacity-80 text-center">
                    {"Sofa And Carpet Cleaning"}
                  </p>
                </div>
              </div>
              <div
                className="flex flex-col w-[130px] items-center justify-center gap-y-2 group hover:opactiy-80 cursor-pointer"
                onClick={() => {
                  goToCategoryDetails(12);
                }}
              >
                <div className="bg-[#F5F5F5] w-full flex justify-center items-center py-3 px-7 rounded-lg group-hover:opacity-80">
                  <img src={GRID_IMG5} alt="" />
                </div>
                <div className="h-10 flex items-start">
                  <p className="text-xs group-hover:opacity-80 text-center">
                    {"Electrician"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
