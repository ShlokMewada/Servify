import React, { useState } from "react";
import { Star } from "lucide-react";
import useOrderHistory from "../hooks/useOrderHistory";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";
import Popup from "./Popup";

const OrderHistory = () => {
  const { getOrderHistory, orderHistory } = useOrderHistory();

  const [activeReview, setActiveReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleSubmitReview = async (service, user) => {
    await axiosInstance
      .post("http://localhost:8000/reviews/", {
        service: service,
        user: user,
        comment: comment,
        rating: rating,
      })
      .then((response) => {
        toast.success("Review Added!");
        console.log(response);
      })
      .catch((error) => {
        toast.error("Something went wrong!");
        console.error(error);
      });
    setActiveReview(null);
    setRating(0);
    setComment("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <Header />

      {/* Main Content Area */}
      <div className="flex-grow pt-32 md:pt-40 pb-12 px-4">
        <div className="mx-auto w-full md:w-10/12 max-w-6xl">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6">
            Order History
          </h1>

          {orderHistory && orderHistory.length > 0 ? (
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div
                  key={order.id}
                  className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 md:p-6 transition-all hover:shadow-md"
                >
                  {/* Order Header: Stacks on mobile */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <h2 className="text-lg md:text-xl font-bold text-gray-900">
                      {order.service_name}
                    </h2>
                    <div className="w-full sm:w-auto">
                      <button
                        onClick={togglePopup}
                        className="w-full sm:w-auto px-5 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition shadow-sm"
                      >
                        Claim Warranty
                      </button>
                      {isPopupOpen && <Popup togglePopup={togglePopup} />}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    <p className="text-sm md:text-base text-gray-600 flex items-center gap-2">
                      <span className="font-medium">Date:</span>
                      {new Date(order.date).toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                    <p className="text-sm md:text-base text-gray-600 flex items-center gap-2">
                      <span className="font-medium">Amount:</span>
                      <span className="text-indigo-600 font-bold">
                        ₹{order.total_amount}
                      </span>
                    </p>
                  </div>

                  {/* Review Section */}
                  <div className="border-t pt-4">
                    {order.review ? (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-sm font-bold text-gray-700">
                            Rating:
                          </span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={
                                  i < order.review.rating
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 italic">
                          "{order.review.comment}"
                        </p>
                      </div>
                    ) : activeReview === order.id ? (
                      <div className="mt-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-600">
                            Your Rating:
                          </span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={24}
                                className={`cursor-pointer transition-transform active:scale-90 ${
                                  star <= rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                                onClick={() => setRating(star)}
                              />
                            ))}
                          </div>
                        </div>
                        <textarea
                          placeholder="How was your experience?"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
                          rows="3"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleSubmitReview(order.service, order.user)
                            }
                            className="bg-green-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors shadow-sm"
                          >
                            Submit
                          </button>
                          <button
                            onClick={() => setActiveReview(null)}
                            className="bg-gray-100 text-gray-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveReview(order.id)}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                      >
                        <i className="fa-regular fa-comment-dots"></i> Add a
                        Review
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">
                No orders found in your history.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderHistory;
