import { useDispatch } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { addUserProfile } from "../utils/userSlice";
import { useEffect } from "react";

const useUserInfo = () => {
  const dispatch = useDispatch();
  const user_id = localStorage.getItem("user_id");
    console.log(user_id && JSON.parse(user_id))
  const getUserInfo = async () => {
    await axiosInstance
      .get(`http://localhost:8000/users/${user_id && JSON.parse(user_id)}/`)
      .then((response) => {
        dispatch(addUserProfile(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };
  useEffect(() => {
    getUserInfo();
  }, []);
};

export default useUserInfo;
