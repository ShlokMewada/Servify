import axiosInstance from "../utils/axiosInstance";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOnlyServices } from "../utils/serviceSlice";

const useService = () => {
  const dispatch = useDispatch();

  const onlyServices = useSelector((store) => store.service.onlyServices);

  const getService = async () => {
    await axiosInstance
      .get("https://servify-backend-bvwf.onrender.com/services/")
      .then((response) => {
        dispatch(addOnlyServices(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };
  useEffect(() => {
    getService();
    const intervalId = setInterval(getService, 15000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
};

export default useService;
