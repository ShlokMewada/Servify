import { Link } from "react-router-dom";
import logo from "../assets/Servify_Black_Logo.png";
import { useDispatch } from "react-redux";
import { removeUser, removeUserProfile } from "../utils/userSlice";
import toast from "react-hot-toast";

const EmployeeHeader = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(removeUser());
    dispatch(removeUserProfile());
    toast.success("Successfully Logged Out!");
  };

  return (
    <div className="w-full fixed z-10 bg-[#F5F5F5] border-2">
      <div className="w-10/12 mx-auto flex justify-between items-center p-7 md:gap-x-6">
        <Link to="/employee/dashboard">
          <img src={logo} alt="logo" className="w-32" />
        </Link>

        <div className="font-semibold text-xl cursor-pointer">
          <Link to="/employee/dashboard">Dashboard</Link>
        </div>

        <div className="flex gap-x-5 items-center">
          <div className="font-semibold text-xl cursor-pointer border-2 flex items-center justify-center w-9 h-9 rounded-full">
            <Link to="/employee/profile">
              <i className="fa-solid fa-user"></i>
            </Link>
          </div>
          <button
            className="cursor-pointer justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHeader;
