import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Servify_Black_Logo.png";
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

  // if (!onlyServices) return;

  const sortedOnlyServices =
    onlyServices &&
    Array.from(onlyServices)?.sort((a, b) => a.name.localeCompare(b.name)); // to sort the service data for efficient searching.

  const searchService = (e) => {
    setSearch(e.target.value);
    setSearchResult(
      sortedOnlyServices.filter((service) =>
        service.name.trim().toLowerCase().includes(search.trim().toLowerCase())
      )
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
    navigate("/servicedetails");
  };

  return (
    <div className="w-full fixed z-10 bg-[#F5F5F5] border-2">
      <div className="w-10/12 mx-auto flex justify-between items-center p-7 md:gap-x-6">
        <Link to="/">
          <img src={logo} alt="logo" className="w-32" />
        </Link>
        <div className="w-[600px] relative">
          <input
            type="text"
            placeholder="Search"
            className="p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-md"
            value={search}
            onChange={searchService}
          />
          {search !== "" && searchResult.length !== 0 ? (
            <div className="flex flex-col bg-white absolute border border-gray-300 rounded-md w-full mt-3 min-h-20 max-h-64 overflow-auto scrollbar-thin scrollbar-webkit">
              {searchResult.map((result) => (
                <div
                  key={result.id}
                  className="flex p-3 justify-start items-center gap-x-3 cursor-pointer"
                  onClick={() => goToServiceDetails(result)}
                >
                  <img
                    src={result.image_url}
                    alt=""
                    className="w-20 rounded-lg"
                  />
                  <p className="text-gray-900">{result.name}</p>
                </div>
              ))}
            </div>
          ) : (
            search !== "" && (
              <p className="absolute bg-white border border-gray-300 rounded-md w-full mt-3 h-20 flex justify-center items-center">
                No Results Found
              </p>
            )
          )}
        </div>
        <ul className="flex gap-x-5 items-center">
          <li className="font-semibold text-xl cursor-pointer border-2 flex items-center justify-center w-9 h-9 rounded-full">
            <Link to="/userprofile">
              <i className="fa-solid fa-user"></i>
            </Link>
          </li>
          <li className="font-semibold text-xl cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="font-semibold text-xl cursor-pointer relative">
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping text-2xl"></i>
              <div className="text-white absolute -top-3 -right-3 w-6 h-6 rounded-full bg-red-500  flex items-center justify-center text-xs font-bold">
                {cart.length}
              </div>
            </Link>
          </li>
        </ul>
        {user === false && (
          <div>
            <button className="cursor-pointer py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400">
              <Link to="/orderhistory">Order History</Link>
            </button>
          </div>
        )}
        {user === null ? (
          <div className="flex gap-x-3">
            <div className="font-semibold cursor-pointer">
              <Link to="/login">
                <button className="py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  Login
                </button>
              </Link>
            </div>
            <div className="font-semibold cursor-pointer">
              <Link to="/signup">
                <button className="py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  Signup
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="font-semibold cursor-pointer">
            <button
              className="justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={handleLogOut}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
