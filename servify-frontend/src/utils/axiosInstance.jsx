import axios from "axios";

export const axiosUnauthenticatedInstance = axios.create({
  // Base URL or other configurations
});

// Create an Axios instance
const axiosInstance = axios.create({
  // Allows cookies to be sent with requests
});

// Request interceptor to add the token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
