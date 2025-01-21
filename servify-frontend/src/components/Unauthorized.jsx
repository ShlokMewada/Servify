import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Unauthorized = () => {
  const user = useSelector((store) => store.user.user);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-200 p-8 rounded-lg shadow-2xl max-w-md w-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Unauthorized Access
          </h1>
          <div className="w-16 h-1 bg-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600 mb-8">
            {"Oops! It seems you don't have permission to view this page."}
          </p>
          <Link
            to={user ? "/employee/dashboard" : "/"}
            className="inline-block bg-black hover:bg-opacity-80 transition-all duration-200 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg"
          >
            {user ? "Return to Dashboard" : "Return to Home"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
