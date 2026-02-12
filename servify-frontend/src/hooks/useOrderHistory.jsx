import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { addServiceRequests } from "../utils/employeeSlice";
import { addOrderHistory } from "../utils/userSlice";

const useOrderHistory = () => {
  const dispatch = useDispatch();

  const orderHistory = useSelector((store) => store.user.orderHistory);

  const getOrderHistory = async () => {
    await axiosInstance
      .get("https://servify-backend-bvwf.onrender.com/order-history/")
      .then((response) => {
        dispatch(addOrderHistory(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  useEffect(() => {
    getOrderHistory();
    const intervalId = setInterval(getOrderHistory, 30000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Return the function so it can be used externally
  return { getOrderHistory, orderHistory };
};

export default useOrderHistory;
