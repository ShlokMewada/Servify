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
      .post("https://servify-backend-bvwf.onrender.com/reviews/", {
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
    <div className="py-32">
      <div className="top-0 left-0 right-0 -mt-32">
        <Header />
      </div>
      <div className="mx-auto w-10/12 mt-36">
        <h1 className="text-2xl font-bold mb-4">Order History</h1>
        {orderHistory &&
          orderHistory.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-lg mb-4 p-4"
            >
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">{order.service_name}</h2>
                <div className="flex items-center justify-center">
                  {/* Button to open the popup */}
                  <button
                    onClick={togglePopup}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Claim Warranty
                  </button>

                  {/* Conditionally render the popup */}
                  {isPopupOpen && <Popup togglePopup={togglePopup} />}
                </div>
              </div>
              <p className="text-gray-600">
                Date: {new Date(order.date).toLocaleString()}
              </p>
              <p className="text-gray-600">Amount: ₹{order.total_amount}</p>
              {order.review ? (
                <div className="mt-2">
                  <p>Rating: {order.review.rating}/5</p>
                  <p>Review: {order.review.comment}</p>
                </div>
              ) : activeReview === order.id ? (
                <div className="mt-2">
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`cursor-pointer ${
                          star <= rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                  <textarea
                    placeholder="Write your review here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <button
                    onClick={() =>
                      handleSubmitReview(order.service, order.user)
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setActiveReview(order.id);
                  }}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Add Review
                </button>
              )}
            </div>
          ))}
      </div>
      <div className="bottom-0 left-0 right-0 -mb-32">
        <Footer />
      </div>
    </div>
  );
};

export default OrderHistory;
