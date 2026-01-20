import { useState, useEffect } from "react";
import logo from "../assets/Servify_Black_logo.png";

const LoadingScreen = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 to-teal-100 z-50">
      <div className="flex flex-col items-center gap-y-8">
        <img src={logo} alt="Servify Logo" className="w-64 animate-pulse" />
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-full h-full bg-blue-500 rounded-full animate-loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
