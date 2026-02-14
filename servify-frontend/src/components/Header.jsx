import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Servify_Black_logo.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewService } from "../utils/serviceSlice";
import { removeUser, removeUserProfile } from "../utils/userSlice";
import toast from "react-hot-toast";

const Header = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onlyServices = useSelector((store) => store.service.onlyServices);
  const cart = useSelector((store) => store.cart.cart);
  const user = useSelector((store) => store.user.user);

  const sortedOnlyServices =
    onlyServices &&
    Array.from(onlyServices)?.sort((a, b) => a.name.localeCompare(b.name));

  const searchService = (e) => {
    const query = e.target.value;
    setSearch(query);

    if (!sortedOnlyServices || query.trim() === "") {
      setSearchResult([]);
      return;
    }

    const q = query.trim().toLowerCase();
    setSearchResult(
      sortedOnlyServices.filter(
        (service) =>
          service.name && service.name.trim().toLowerCase().includes(q),
      ),
    );
  };

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(removeUser());
    dispatch(removeUserProfile());
    toast.success("Successfully Logged Out!");
  };

  const goToServiceDetails = (resultService) => {
    dispatch(viewService(resultService));
    setSearch("");
    setSearchResult([]);
    navigate("/servicedetails");
  };

  return (
    <div className="w-full fixed z-50 bg-[#F5F5F5] border-b shadow-sm">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-between items-center p-4 lg:p-6 gap-y-4 lg:gap-x-6">
        {/* Logo and Mobile Controls */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link to="/">
            <img src={logo} alt="logo" className="w-24 md:w-32" />
          </Link>

          {/* Mobile User Icon (Only visible on small screens to save space) */}
          <div className="flex lg:hidden gap-x-4 items-center">
            <Link to="/cart" className="relative">
              <i className="fa-solid fa-cart-shopping text-xl"></i>
              <div className="text-white absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-[10px] font-bold">
                {cart.length}
              </div>
            </Link>
            <Link
              to="/userprofile"
              className="w-8 h-8 border-2 flex items-center justify-center rounded-full"
            >
              <i className="fa-solid fa-user text-sm"></i>
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full lg:max-w-[500px] xl:max-w-[600px] relative">
          <input
            type="text"
            placeholder="Search services..."
            className="p-2 md:p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
            value={search}
            onChange={searchService}
          />
          {search !== "" && searchResult.length !== 0 ? (
            <div className="flex flex-col bg-white absolute z-50 border border-gray-300 rounded-md w-full mt-1 min-h-20 max-h-64 overflow-auto shadow-xl">
              {searchResult.map((result) => (
                <div
                  key={result.id}
                  className="flex p-3 justify-start items-center gap-x-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => goToServiceDetails(result)}
                >
                  <img
                    src={result.image_url}
                    alt=""
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <p className="text-gray-900 font-medium">{result.name}</p>
                </div>
              ))}
            </div>
          ) : (
            search !== "" && (
              <p className="absolute z-50 bg-white border border-gray-300 rounded-md w-full mt-1 h-20 flex justify-center items-center shadow-xl">
                No Results Found
              </p>
            )
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6">
          <ul className="hidden lg:flex gap-x-5 items-center">
            <li className="font-semibold text-lg cursor-pointer border-2 flex items-center justify-center w-9 h-9 rounded-full hover:bg-white transition-all">
              <Link to="/userprofile">
                <i className="fa-solid fa-user"></i>
              </Link>
            </li>
            <li className="font-semibold text-lg cursor-pointer hover:text-green-600 transition-colors">
              <Link to="/">Home</Link>
            </li>
            <li className="font-semibold text-lg cursor-pointer relative">
              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping text-2xl"></i>
                <div className="text-white absolute -top-3 -right-3 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold">
                  {cart.length}
                </div>
              </Link>
            </li>
          </ul>

          {/* Action Buttons */}
          <div className="flex items-center gap-x-3">
            {user === false && (
              <Link to="/orderhistory">
                <button className="cursor-pointer py-2 px-3 md:px-4 border border-transparent rounded-md shadow-sm text-sm md:text-md font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none">
                  Orders
                </button>
              </Link>
            )}

            {user === null ? (
              <div className="flex gap-x-2 md:gap-x-3">
                <Link to="/login">
                  <button className="py-2 px-3 md:px-4 border border-transparent rounded-md shadow-sm text-sm md:text-md font-medium text-white bg-gray-800 hover:bg-gray-700">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="py-2 px-3 md:px-4 border border-transparent rounded-md shadow-sm text-sm md:text-md font-medium text-white bg-gray-800 hover:bg-gray-700">
                    Signup
                  </button>
                </Link>
              </div>
            ) : (
              <button
                className="py-2 px-3 md:px-4 border border-transparent rounded-md shadow-sm text-sm md:text-md font-medium text-white bg-gray-800 hover:bg-gray-700"
                onClick={handleLogOut}
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
