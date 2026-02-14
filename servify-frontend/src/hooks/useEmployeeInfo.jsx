import { useDispatch } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { useEffect } from "react";
import { addEmployeeProfile } from "../utils/employeeSlice";

const useEmployeeInfo = () => {
  const dispatch = useDispatch();
  const employee_id = localStorage.getItem("employee_id");
  console.log(employee_id && JSON.parse(employee_id));
  const getEmployeeInfo = async () => {
    await axiosInstance
      .get(
        `https://servify-backend-bvwf.onrender.com/employees/${employee_id && JSON.parse(employee_id)}/`
      )
      .then((response) => {
        dispatch(addEmployeeProfile(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };
  useEffect(() => {
    getEmployeeInfo();
  }, []);
};

export default useEmployeeInfo;
