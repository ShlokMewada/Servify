import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import {
  FaCheckCircle,
  FaClock,
  FaShieldAlt,
  FaStar,
  FaUserTie,
} from "react-icons/fa";
import ServiceCard from "./ServiceCard";

const ServiceDetails = () => {
  const viewService = useSelector((store) => store.service.viewService);
  const navigate = useNavigate();
  const { image_url, name, description, price, reviews } = viewService;

  const descriptionParts = description
    .split(/\d\./)
    .map((part) => part.trim())
    .filter(Boolean);

  const goToCart = () => {
    navigate("/cart");
  };

  const highlights = [
    { icon: FaCheckCircle, text: "Quality Guaranteed" },
    { icon: FaClock, text: "On-Time Service" },
    { icon: FaUserTie, text: "Professional Staff" },
    { icon: FaShieldAlt, text: "Insured Service" },
  ];

  return (
    <div>
      <Header />
      <div className="w-10/12 mx-auto min-h-screen py-8 pt-44">
        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-8 lg:space-y-0">
          {/* Column 1: Service Image */}
          <div className="flex flex-col space-y-6 lg:w-1/4 border-2 border-gray-300 p-3 rounded-lg">
            <img
              src={image_url}
              alt={name}
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            {/* Service Overview */}
            <div className="mt-4 border-2 p-4 rounded-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Service Overview
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <item.icon className="text-blue-500 mr-2" />
                    <span className="text-sm text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2">
                  How it works:
                </h3>
                <ol className="text-sm text-gray-600 list-decimal list-inside">
                  <li>Book your preferred time slot</li>
                  <li>Receive confirmation</li>
                  <li>Professional arrives and completes service</li>
                  <li>Provide feedback</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Column 2: Service Title and Description */}
          <div className="flex flex-col space-y-4 lg:w-2/5 border-2 border-gray-300 p-3 rounded-lg">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
              {name}
            </h1>
            <div className="overflow-y-auto max-h-[350px] pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              {descriptionParts.map((part, index) => (
                <p
                  className="text-gray-600 text-base leading-relaxed mb-3"
                  key={index}
                >
                  {index + 1}. {part}
                </p>
              ))}
            </div>
          </div>

          {/* Column 3: Reviews Section */}
          <div className="flex flex-col space-y-4 lg:w-1/3 border-2 border-gray-300 p-3 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <div className="overflow-y-auto max-h-[350px] pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white p-4 rounded-lg shadow-md w-full mb-4 last:mb-0"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-base font-semibold text-gray-800">
                      {review.user.first_name + " " + review.user.last_name}
                    </h3>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.floor(review.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                          size={16}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {review.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {review.created_at}
                  </p>
                  <p className="text-sm text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-2 border-gray-300 p-3 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cart</h2>
          <div className="w-full h-[1px] bg-gray-400 mb-4"></div>
          {/* Empty section for cart card */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <ServiceCard serviceData={viewService} itemState={false} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetails;
