import { useDispatch, useSelector } from "react-redux";
import ServiceCard from "./ServiceCard";
import { clearCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

const Cart = () => {
  const cart = useSelector((store) => store.cart.cart);
  const orderPlaceServices = cart.map(({ id, quantity }) => ({ id, quantity }));
  const dispatch = useDispatch();

  // State Management
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  
  // Stores Coupon
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  // Calculate Base Totals
  let totalPrice = 0;
  cart.forEach((service) => {
    totalPrice += service.price * service.quantity;
  });
  const formattedTotalPrice = totalPrice.toFixed(2);
  const originalPriceWithGST = (formattedTotalPrice * 1.18).toFixed(2);

  // Final Payable Amount
  // If a discount is applied,It will show discounted price
  const finalPayableAmount = appliedDiscount 
    ? appliedDiscount.new_total_price 
    : originalPriceWithGST;

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axiosInstance.get("https://servify-backend-bvwf.onrender.com/coupons/");
        setAvailableCoupons(res.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };
    fetchCoupons();
  }, []);

  const handleClearCart = () => {
    dispatch(clearCart());
    setAppliedDiscount(null);
    setCouponCode("");
  };

  const applyCouponCode = async (codeToApply) => {
    const code = codeToApply || couponCode;

    if (!code) {
      toast.error("Please enter a coupon code");
      return;
    }

    try {
      const response = await axiosInstance.post("https://servify-backend-bvwf.onrender.com/apply-coupon/", {
        code: code,
        totalPriceWithGST: originalPriceWithGST, 
      });

   
      setAppliedDiscount(response.data);
      setCouponCode(code); 
      toast.success(`Coupon ${code} Applied! You saved ₹${response.data.discount_amount}`);
    
    } catch (error) {
      setAppliedDiscount(null);
      const msg = error.response?.data?.error || "Coupon could not be applied";
      toast.error(msg);
    }
  };

  //Removing coupon if user cancels
  const removeCoupon = () => {
    setAppliedDiscount(null);
    setCouponCode("");
    toast.success("Coupon removed");
  };

  // Payment Logic
  const handlePayment = async () => {
    try {
      const response = await axiosInstance.post(
        "https://servify-backend-bvwf.onrender.com/payment/",
        {
          totalPriceWithGST: finalPayableAmount,
        }
      );

      const { order_id, status } = response.data;
      setPaymentStatus(status);

      if (!order_id) {
        throw new Error("Order ID not received from backend.");
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: finalPayableAmount * 100, 
        currency: "INR",
        name: "Servify",
        description: appliedDiscount ? `Order with ${appliedDiscount.code}` : "Transaction",
        order_id: order_id,
        handler: async function (response) {
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
      toast.error("Payment initialization failed");
    }
  };

  const verifyPayment = async (razorpay_payment_id, razorpay_order_id, razorpay_signature) => {
    try {
      const response = await axiosInstance.post(
        "https://servify-backend-bvwf.onrender.com/verifypayment/",
        {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        }
      );

      if (response.data.status === "Paid") {
        await placeOrder();
      } else {
        toast.error("Payment verification failed.");
      }
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  const placeOrder = async () => {
    try {
      await axiosInstance.post("https://servify-backend-bvwf.onrender.com/place-order/", {
        services: orderPlaceServices,
      });
      setPaymentStatus("Paid");
      dispatch(clearCart());
      setAppliedDiscount(null);
      toast.success("Order Placed Successfully!");
    } catch (error) {
      toast.error("Error while placing the order!");
      console.error("Order placement failed:", error);
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
              <ServiceCard key={service.id} serviceData={service} itemState={false} />
            ))}
          </div>

          <div className="flex flex-col flex-grow w-10/12 mx-auto p-6 bg-white shadow-lg rounded-lg mt-7">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Order Summary
            </h2>
            
            {/* --- Available Coupons Section --- */}
            {availableCoupons.length > 0 && !appliedDiscount && (
               <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Available Coupons:</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableCoupons.map((coupon) => (
                      <button 
                        key={coupon.id}
                        onClick={() => applyCouponCode(coupon.code)}
                        className="px-3 py-1 bg-white border border-blue-300 text-blue-600 rounded-full hover:bg-blue-100 text-sm transition"
                      >
                        {coupon.code} ({parseInt(coupon.discount)}% OFF)
                      </button>
                    ))}
                  </div>
               </div>
            )}

            <div className="space-y-3">
              {cart.map((service) => (
                <div key={service.id} className="flex justify-between items-center border-b pb-2">
                  <span className="text-lg font-medium text-gray-700">
                    {service.name}{" "}
                    <span className="text-md text-gray-500">x {service.quantity}</span>
                  </span>
                  <span className="text-lg font-semibold text-indigo-600">
                    ₹{(service.price * service.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              
             
              <div className="flex flex-col border-b pb-2">
          
                <div className="w-full flex justify-end gap-x-10 items-center">
                  <span className="text-lg text-gray-600">Subtotal:</span>
                  <span className="text-lg font-semibold text-gray-800">₹{formattedTotalPrice}</span>
                </div>
                
             
                <div className="w-full flex justify-end gap-x-10 items-center">
                  <span className="text-md text-gray-500">GST (18%):</span>
                  <span className="text-md font-semibold text-gray-500">
                     ₹{(formattedTotalPrice * 0.18).toFixed(2)}
                  </span>
                </div>

                {appliedDiscount && (
                  <div className="w-full flex justify-end gap-x-10 items-center text-green-600 mt-1">
                    <span className="text-lg font-medium">
                      Coupon ({appliedDiscount.code}):
                    </span>
                    <span className="text-lg font-bold">
                      - ₹{appliedDiscount.discount_amount}
                    </span>
                  </div>
                )}
              </div>

            
              <div className="flex items-center gap-x-3 pt-2">
                <span className="text-lg font-medium text-gray-700">Coupon Code:</span>
                
                {appliedDiscount ? (
                  <div className="flex items-center gap-4 w-full">
                    <span className="px-4 py-2 bg-green-100 text-green-700 font-bold rounded border border-green-300">
                      {appliedDiscount.code} Applied ✓
                    </span>
                    <button 
                      onClick={removeCoupon}
                      className="text-red-500 hover:text-red-700 font-semibold underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      placeholder={totalPrice < 100 ? "Min order ₹100" : "Enter Code"}
                      className={`p-2 w-1/4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        totalPrice < 100 ? "cursor-not-allowed bg-gray-100" : ""
                      }`}
                      disabled={totalPrice < 100}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    />
                    <button
                      disabled={totalPrice < 100 || !couponCode}
                      className={`py-2 px-6 font-semibold rounded-lg transition-colors ${
                        totalPrice < 100 || !couponCode
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                      onClick={() => applyCouponCode()}
                    >
                      Apply
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <span className="text-xl font-bold text-gray-800">
                Total Payable:
              </span>
              <div>
                <div className="text-right">
                    {appliedDiscount && (
                        <span className="text-sm text-gray-400 line-through mr-2">
                            ₹{originalPriceWithGST}
                        </span>
                    )}
                    <span className="text-xl font-extrabold text-green-600">
                    ₹{finalPayableAmount}
                    </span>
                </div>

                <div className="mt-2">
                    <button
                    onClick={handlePayment}
                    className="ml-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
                    >
                    Pay ₹{finalPayableAmount}
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
                  <svg className="h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">Order Confirmed!</p>
                  <p className="text-sm">
                    Congratulations! Your order has been placed.
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