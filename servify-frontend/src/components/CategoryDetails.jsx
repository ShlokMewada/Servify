import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import Header from "./Header";
import Footer from "./Footer";
import { FaHandsHelping, FaStar, FaThumbsUp, FaTools } from "react-icons/fa";

const CategoryDetails = () => {
  const category = useSelector((store) => store.service.viewServiceCategory);

  const { image_url, name, description, services } = category;

  const navigate = useNavigate();

  const highlights = [
    { icon: FaThumbsUp, text: "Trusted by Thousands" },
    { icon: FaTools, text: "Expert Solutions" },
    { icon: FaHandsHelping, text: "Customer Support" },
    { icon: FaStar, text: "Top-Rated Service" },
  ];

  return (
    <div>
      <Header />
      <div className="w-10/12 mx-auto min-h-screen py-8 pt-44">
        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-8 lg:space-y-0">
          {/* Column 1: Category Image */}
          <div className="flex flex-col space-y-6 lg:w-1/4 border-2 border-gray-300 p-3 rounded-lg">
            <img
              src={image_url}
              alt={name}
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            <div className="mt-4 border-2 p-4 rounded-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                What We Offer
              </h2>
              <ul className="space-y-2">
                {highlights.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <item.icon className="text-blue-500" />
                    <span className="text-sm text-gray-700">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Service List */}
          <div className="flex flex-col space-y-4 w-9/12 border-2 border-gray-300 p-3 rounded-lg overflow-y-auto max-h-[500px] pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
              {name}
            </h1>
            <div className="flex flex-wrap gap-4">
              {services.map((serviceItems) => (
                <ServiceCard
                  key={serviceItems.id}
                  serviceData={serviceItems}
                  itemState={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryDetails;
