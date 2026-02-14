import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../utils/cartSlice";
import { viewService } from "../utils/serviceSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ServiceCard = ({ serviceData, itemState }) => {
  const cartItems = useSelector((store) => store.cart.cart);
  const currentItem = cartItems.find((item) => item.name === serviceData.name);
  const cartQuantity = currentItem ? currentItem.quantity : 0;
  const { image_url, name, description, price } = serviceData;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const goToServiceDetails = () => {
    dispatch(viewService(serviceData));
    navigate("/servicedetails");
  };

  const handleAddToCart = () => {
    dispatch(addToCart(serviceData));
    toast.success(`${name} added to Cart`);
  };

  const handleAddMinus = (operation) => {
    if (operation) {
      dispatch(addToCart(serviceData));
      toast.success(`${name} added to Cart`);
    } else {
      dispatch(removeFromCart(name));
      toast.success(`${name} removed from Cart`);
    }
  };

  return (
    <div
      id="slider-boxes"
      className="w-full sm:w-[280px] min-h-[420px] flex flex-col justify-between border-2 border-gray-200 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white overflow-hidden"
    >
      {/* Image Container - Fixed Aspect Ratio */}
      <div className="w-full h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={image_url}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-4">
        <h1 className="text-lg font-bold text-gray-800 leading-snug min-h-[56px] flex items-start">
          {name}
        </h1>

        <div className="flex-grow">
          {description.length > 70 ? (
            <p className="text-sm text-gray-600 line-clamp-3">
              {description.substring(0, 70)}...
            </p>
          ) : (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>

        <p className="text-xl font-extrabold text-indigo-600 mt-3">₹{price}</p>

        {/* Action Buttons Container */}
        <div className="flex flex-wrap gap-2 mt-4">
          {itemState ? (
            cartQuantity === 0 ? (
              <button
                onClick={handleAddToCart}
                className="flex-1 min-w-[80px] bg-green-500 hover:bg-green-600 text-white rounded-lg py-2.5 transition-all duration-200 flex items-center justify-center gap-x-2 text-sm font-semibold"
              >
                Add <i className="fa-solid fa-plus text-xs"></i>
              </button>
            ) : (
              <div className="flex items-center justify-between bg-gray-100 rounded-lg px-2 py-1 gap-x-3">
                <button
                  onClick={() => handleAddMinus(false)}
                  className="bg-white hover:bg-gray-200 text-gray-800 shadow-sm rounded-md w-8 h-8 flex items-center justify-center transition-all duration-200"
                >
                  <i className="fa-solid fa-minus text-xs"></i>
                </button>
                <span className="text-md font-bold text-gray-700 w-4 text-center">
                  {cartQuantity}
                </span>
                <button
                  onClick={() => handleAddMinus(true)}
                  className="bg-white hover:bg-gray-200 text-gray-800 shadow-sm rounded-md w-8 h-8 flex items-center justify-center transition-all duration-200"
                >
                  <i className="fa-solid fa-plus text-xs"></i>
                </button>
              </div>
            )
          ) : (
            <div className="flex items-center justify-between bg-gray-100 rounded-lg px-2 py-1 gap-x-3 w-full">
              <button
                onClick={() => handleAddMinus(false)}
                className="bg-white hover:bg-gray-200 text-gray-800 shadow-sm rounded-md w-8 h-8 flex items-center justify-center transition-all duration-200"
              >
                <i className="fa-solid fa-minus text-xs"></i>
              </button>
              <span className="text-md font-bold text-gray-700">
                {cartQuantity}
              </span>
              <button
                onClick={() => handleAddMinus(true)}
                className="bg-white hover:bg-gray-200 text-gray-800 shadow-sm rounded-md w-8 h-8 flex items-center justify-center transition-all duration-200"
              >
                <i className="fa-solid fa-plus text-xs"></i>
              </button>
            </div>
          )}

          {itemState && (
            <button
              onClick={goToServiceDetails}
              className="flex-1 min-w-[80px] bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2.5 transition-all duration-200 flex items-center justify-center gap-x-2 text-sm font-semibold"
            >
              Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
