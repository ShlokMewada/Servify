import { useDispatch, useSelector } from "react-redux";
import ServiceCard from "./ServiceCard";
import { clearCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useState } from "react";

const Cart = () => {
  const cart = useSelector((store) => store.cart.cart);

  const orderPlaceServices = cart.map(({ id, quantity }) => ({ id, quantity }));

  const [couponCode, setCouponCode] = useState();

  const [paymentStatus, setPaymentStatus] = useState("Pending");

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  let totalInPaise = 0;

  cart.forEach((service) => {
    totalInPaise += Math.round(service.price * 100) * service.quantity;
  });

  // For display
  const formattedTotalPrice = (totalInPaise / 100).toFixed(2);

  const totalPriceWithGST = (formattedTotalPrice * 1.18).toFixed(2);

  const handlePayment = async () => {
    try {
      // Step 1: Create Razorpay order by calling the backend
      const response = await axiosInstance.post(
        "http://localhost:8000/payment/",
        {
          totalPriceWithGST,
        },
      );

      const { order_id, status } = response.data;
      setPaymentStatus(status); // Set payment status in state

      if (!order_id) {
        throw new Error("Order ID not received from backend.");
      }

      // Step 2: Initialize Razorpay checkout with options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY, // Razorpay Key ID
        amount: totalPriceWithGST, // Convert rupees to paise (Razorpay needs amount in paise)
        currency: "INR",
        name: "Servify",
        description: "Transaction",
        order_id: order_id,
        handler: async function (response) {
          // Razorpay checkout completed, now verify the payment
          await verifyPayment(
            response.razorpay_payment_id,
            response.razorpay_order_id,
            response.razorpay_signature,
          );
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  // Step 3: Verify payment function to call the backend
  const verifyPayment = async (
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  ) => {
    try {
      // Call your backend to verify the payment
      const response = await axiosInstance.post(
        "http://localhost:8000/verifypayment/",
        {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        },
      );

      const { status } = response.data; // Backend will return the updated status

      if (status === "Paid") {
        // Step 4: Payment verified, proceed to place the order
        await placeOrder();
      } else {
        toast.error("Payment verification failed.");
      }
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  // Step 5: Place the order after payment verification
  const placeOrder = async () => {
    try {
      await axiosInstance.post("http://localhost:8000/place-order/", {
        services: orderPlaceServices,
      });
      setPaymentStatus("Paid");
      dispatch(clearCart()); // Clear the cart after order is placed
      toast.success("Order Placed !");
    } catch (error) {
      toast.error("There was an error while placing the order!");
      console.error("Order placement failed:", error);
    }
  };

  const applyCouponCode = async () => {
    try {
      await axiosInstance.post("http://localhost:8000/couponcode/", {
        couponCode: couponCode,
      });
      toast.success("Coupon code applied !");
    } catch (error) {
      toast.error(`${error.message}!`);
      console.error("Coupon code is either invalid or expired! :", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      <h1 className="text-3xl md:text-5xl text-center font-extrabold text-gray-800 mt-20 md:mt-28 px-4 pt-14">
        Your Cart
      </h1>

      {cart.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Cart Items Grid */}
          <div className="flex flex-wrap gap-6 justify-center mt-8 md:mt-12 w-full lg:w-11/12 bg-gray-50 p-4 md:p-8 shadow-lg mx-auto rounded-lg border border-gray-100">
            {cart.map((service) => (
              <ServiceCard
                key={service.id}
                serviceData={service}
                itemState={false}
              />
            ))}
          </div>

          {/* Order Summary Card */}
          <div className="flex flex-col w-full lg:w-11/12 mx-auto p-4 md:p-8 bg-white shadow-lg rounded-lg mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              {cart.map((service) => (
                <div
                  key={service.id}
                  className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-3 gap-2"
                >
                  <span className="text-lg font-medium text-gray-700">
                    {service.name}{" "}
                    <span className="text-sm text-gray-500 mx-1">
                      <i className="fa-solid fa-xmark"></i>
                    </span>
                    <span className="text-md text-gray-500">
                      {service.quantity}
                    </span>
                  </span>
                  <span className="text-lg font-semibold text-indigo-600">
                    ₹{(service.price * service.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="flex flex-col mt-4">
                <div className="w-full flex justify-between md:justify-end md:gap-x-10 items-center border-b pb-2">
                  <span className="text-lg font-medium text-gray-700">
                    Total Price:
                  </span>
                  <span className="text-lg font-semibold text-indigo-600">
                    ₹{formattedTotalPrice}
                  </span>
                </div>
                <div className="w-full flex justify-between md:justify-end border-b pt-2 pb-2">
                  <span className="text-sm md:text-md font-medium text-gray-500">
                    18% GST will be applied
                  </span>
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4">
                <label className="text-lg font-medium text-gray-700 whitespace-nowrap">
                  Coupon Code :
                </label>
                <div className="flex flex-col sm:flex-row gap-y-2 w-full sm:w-auto gap-x-2">
                  <input
                    type="text"
                    placeholder={
                      formattedTotalPrice < 100
                        ? "Min. ₹100 required"
                        : "Enter code"
                    }
                    className={`p-2 flex-grow sm:w-64 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm ${
                      formattedTotalPrice < 100 &&
                      "cursor-not-allowed placeholder-red-400 bg-gray-50"
                    }`}
                    disabled={formattedTotalPrice < 100.0}
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                    disabled={formattedTotalPrice < 100.0}
                    className={`py-2 px-6 font-semibold bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors ${
                      formattedTotalPrice < 100
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={applyCouponCode}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Final Total and Payments */}
            <div className="flex flex-col lg:flex-row justify-between lg:items-center mt-8 pt-6 border-t gap-6">
              <div className="flex justify-between items-center lg:block">
                <span className="text-xl font-bold text-gray-800 lg:mr-4">
                  Grand Total:
                </span>
                <span className="text-2xl font-extrabold text-green-600">
                  ₹{totalPriceWithGST}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  id="rzp-button1"
                  onClick={handlePayment}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-md flex-1 text-center"
                >
                  Razorpay
                </button>
                <button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-md flex-1 text-center"
                  onClick={placeOrder}
                >
                  COD
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12 mb-8">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-8 rounded-lg shadow-md transition-all duration-200"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-y-6 px-4">
          <p className="text-xl text-gray-500 mt-10 text-center">
            Your cart is empty.
          </p>
          {paymentStatus === "Paid" && (
            <div className="flex items-center bg-green-50 border-l-4 border-green-500 text-green-700 p-6 max-w-md rounded-md shadow-sm my-5">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">Order Confirmed!</p>
                  <p className="text-sm mt-1">
                    Congratulations! Your order has been successfully placed.
                  </p>
                </div>
              </div>
            </div>
          )}
          <Link
            to="/"
            className="bg-black rounded-lg text-white hover:bg-gray-800 px-10 py-3 font-medium transition-colors"
          >
            Go Home
          </Link>
        </div>
      )}

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
