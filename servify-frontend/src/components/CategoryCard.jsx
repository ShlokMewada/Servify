import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { viewServiceCategory } from "../utils/serviceSlice";

const CategoryCard = ({ category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToCategoryDetails = () => {
    dispatch(viewServiceCategory(category));
    navigate("/categorydetails");
  };

  return (
    <div
      id="slider-boxes"
      className="flex flex-col items-center w-full max-w-[13rem] sm:max-w-[15rem] p-2 cursor-pointer group"
      onClick={goToCategoryDetails}
    >
      {/* Container for Image with Responsive Sizing */}
      <div className="relative overflow-hidden w-full aspect-square rounded-xl shadow-sm transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-md">
        <img
          src={category.image_url}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-300"
        />
      </div>

      {/* Responsive Text Styling */}
      <h3 className="mt-3 text-center text-sm sm:text-base md:text-lg font-semibold text-gray-700 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
        {category.name}
      </h3>
    </div>
  );
};

export default CategoryCard;
