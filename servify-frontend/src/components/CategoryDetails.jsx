import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import Header from "./Header";
import Footer from "./Footer";
import { FaHandsHelping, FaStar, FaThumbsUp, FaTools } from "react-icons/fa";

const CategoryDetails = () => {
  const navigate = useNavigate();
  const category = useSelector((store) => store.service.viewServiceCategory);

  // Guard clause to prevent errors if category data isn't loaded yet
  if (!category) return null;

  const { image_url, name, description, services } = category;

  const highlights = [
    { icon: FaThumbsUp, text: "Trusted by Thousands" },
    { icon: FaTools, text: "Expert Solutions" },
    { icon: FaHandsHelping, text: "Customer Support" },
    { icon: FaStar, text: "Top-Rated Service" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* - Changed w-10/12 to responsive widths: 95% on mobile, 10/12 on desktop.
          - Adjusted pt-44 (desktop) to pt-32 (mobile) to clear the header properly.
      */}
      <div className="w-[95%] md:w-11/12 lg:w-10/12 mx-auto flex-grow py-8 pt-32 md:pt-40 lg:pt-44">
        <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-8 lg:space-y-0">
          {/* Column 1: Category Image & Highlights */}
          <div className="flex flex-col space-y-6 w-full lg:w-1/4 border-2 border-gray-100 p-4 rounded-xl shadow-sm bg-gray-50/50 h-fit">
            <img
              src={image_url}
              alt={name}
              className="w-full h-48 md:h-64 lg:h-48 object-cover rounded-lg shadow-md"
            />
            <div className="border-t lg:border-2 lg:border-gray-200 pt-4 lg:p-4 rounded-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                What We Offer
              </h2>
              <ul className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                {highlights.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <item.icon className="text-blue-500 shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Service List */}
          <div className="flex flex-col w-full lg:w-3/4 border-2 border-gray-100 p-4 md:p-6 rounded-xl shadow-sm bg-white">
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 mb-6 text-center lg:text-left">
              {name}
            </h1>

            {/* - overflow-y-auto and max-h are restricted to large screens (lg:)
                - On mobile, the list expands naturally to avoid "scroll-within-scroll" issues.
            */}
            <div className="lg:overflow-y-auto lg:max-h-[600px] lg:pr-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6">
                {services && services.length > 0 ? (
                  services.map((serviceItems) => (
                    <ServiceCard
                      key={serviceItems.id}
                      serviceData={serviceItems}
                      itemState={true}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 italic py-10">
                    No services available in this category.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryDetails;
