// import axiosInstance from "../utils/axiosInstance";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addServiceRequests } from "../utils/employeeSlice";

// const useServiceRequests = () => {
//   const dispatch = useDispatch();

//   const serviceRequests = useSelector(
//     (store) => store.employee.serviceRequests
//   );

//   const getServiceRequests = async () => {
//     await axiosInstance
//       .get("http://localhost:8000/employee/dashboard/")
//       .then((response) => {
//         dispatch(addServiceRequests(response.data));
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the data!", error);
//       });
//   };
//   useEffect(() => {
//     getServiceRequests();
//     const intervalId = setInterval(getServiceRequests, 30000);

//     // Clean up the interval when the component unmounts
//     return () => clearInterval(intervalId);
//   }, []);
// };

// export default useServiceRequests;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { addServiceRequests } from "../utils/employeeSlice";

const useServiceRequests = () => {
  const dispatch = useDispatch();

  const serviceRequests = useSelector(
    (store) => store.employee.serviceRequests
  );

  const getServiceRequests = async () => {
    await axiosInstance
      .get("http://localhost:8000/employee/dashboard/")
      .then((response) => {
        dispatch(addServiceRequests(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  useEffect(() => {
    getServiceRequests();
    const intervalId = setInterval(getServiceRequests, 30000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Return the function so it can be used externally
  return { getServiceRequests, serviceRequests };
};

export default useServiceRequests;
