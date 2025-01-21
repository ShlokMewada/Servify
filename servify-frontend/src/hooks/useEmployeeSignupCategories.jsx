import axiosInstance from "../utils/axiosInstance";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployeeSignupCategories } from "../utils/serviceSlice";

const useEmployeeSignupCategories = () => {
  const dispatch = useDispatch();

  const employeeSignupCategories = useSelector(
    (store) => store.service.employeeSignupCategories
  );

  const getEmployeeSignupCategories = async () => {
    await axiosInstance
      .get("http://localhost:8000/list-service-categories/")
      .then((response) => {
        dispatch(addEmployeeSignupCategories(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };
  useEffect(() => {
    getEmployeeSignupCategories();
  }, []);
};

export default useEmployeeSignupCategories;
