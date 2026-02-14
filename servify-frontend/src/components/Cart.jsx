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

  let totalPrice = 0;

  // Calculate the total price
  cart.forEach((service) => {
    totalPrice += service.price * service.quantity;
  });

  // Format the total price for display
  const formattedTotalPrice = totalPrice.toFixed(2);

  const totalPriceWithGST = (formattedTotalPrice * 1.18).toFixed(2);

  const handlePayment = async () => {
    try {
      // Step 1: Create Razorpay order by calling the backend
      const response = await axiosInstance.post(
        "http://localhost:8000/payment/",
        {
          totalPriceWithGST,
        }
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
            response.razorpay_signature
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
    razorpay_signature
  ) => {
    try {
      // Call your backend to verify the payment
      const response = await axiosInstance.post(
        "http://localhost:8000/verifypayment/",
        {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        }
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
        totalPrice: totalPriceWithGST,
      });
      toast.success("Coupon code applied !");
    } catch (error) {
      toast.error(`${error.message}!`);
      console.error("Coupon code can not be applied :", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
      </div>
      <h1 className="text-5xl text-center font-extrabold text-gray-800 mt-28">
        Your Cart
      </h1>
      {cart.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-6 justify-center mt-12 w-10/12 bg-gray-50 p-8 shadow-lg mx-auto rounded-lg">
            {cart.map((service) => (
              <ServiceCard
                key={service.id}
                serviceData={service}
                itemState={false}
              />
            ))}
          </div>

          <div className="flex flex-col flex-grow w-10/12 mx-auto p-6 bg-white shadow-lg rounded-lg mt-7">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3">
              {cart.map((service) => (
                <div
                  key={service.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span className="text-lg font-medium text-gray-700">
                    {service.name}{" "}
                    <span className="text-sm text-gray-500">
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
              <div className="flex flex-col">
                <div className="w-full flex justify-end gap-x-10 items-center border-b pb-2">
                  <span className="text-lg font-medium text-gray-700">
                    Total Price:
                  </span>
                  <span className="text-lg font-semibold text-indigo-600">
                    ₹{formattedTotalPrice}
                  </span>
                </div>
                <div className="w-full flex justify-end border-b pt-2 pb-2">
                  <span className="text-lg font-medium text-gray-700">
                    18% GST will be applied
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-x-3 pt-2">
                <span className="text-lg font-medium text-gray-700">
                  Coupon Code :{" "}
                </span>
                <input
                  type="text"
                  placeholder={
                    formattedTotalPrice < 100
                      ? "Total Price should be more than ₹100"
                      : "Enter Coupon code"
                  }
                  className={`p-2 w-1/4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-md ${
                    formattedTotalPrice < 100 &&
                    "cursor-not-allowed placeholder-red-500"
                  }`}
                  disabled={formattedTotalPrice < 100.0}
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value);
                  }}
                />
                <button
                  disabled={formattedTotalPrice < 100.0}
                  className={`py-2 px-6 font-semibold bg-green-500 hover:bg-green-600 border border-green-500 hover:border-green-600 text-white rounded-lg ${
                    formattedTotalPrice < 100 && "cursor-not-allowed"
                  }`}
                  onClick={applyCouponCode}
                >
                  Apply
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <span className="text-xl font-bold text-gray-800">
                Total Price With GST:
              </span>
              <div>
                <span className="text-xl font-extrabold text-green-600">
                  ₹{totalPriceWithGST}
                </span>

                <button
                  id="rzp-button1"
                  onClick={handlePayment}
                  className="ml-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
                >
                  Pay with Razorpay
                </button>
                <button
                  className="ml-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
                  onClick={placeOrder}
                >
                  Cash On Delivery
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-y-2">
          <p className="text-xl text-gray-500 mt-10 text-center">
            Your cart is empty.
          </p>
          {paymentStatus === "Paid" && (
            <div className="flex items-center bg-green-100 border-l-4 border-green-500 text-green-700 p-4 max-w-md h-[150px] rounded-md my-5">
              <div className="flex">
                <div className="py-1">
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
                  <p className="text-sm">
                    Congratulations! Your order has been successfully placed.
                  </p>
                </div>
              </div>
            </div>
          )}
          <button className="bg-black rounded-lg text-white hover:bg-opacity-80 px-8 py-2">
            <Link to="/">Home</Link>
          </button>
        </div>
      )}
      <div className="bottom-0 left-0 right-0 -mb-12">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
