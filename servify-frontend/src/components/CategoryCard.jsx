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
      className="flex flex-col items-center w-52"
      onClick={goToCategoryDetails}
    >
      <div className="transition-all duration-300 transform hover:scale-105">
        <img
          src={category.image_url}
          alt="Category"
          className="w-40 h-40 object-cover rounded-md transition-transform duration-300"
        />
      </div>
      <h3 className="mt-2 text-center text-lg font-semibold text-gray-700">
        {category.name}
      </h3>
    </div>
  );
};

export default CategoryCard;
