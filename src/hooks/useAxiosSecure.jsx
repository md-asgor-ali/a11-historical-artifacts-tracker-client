import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("firebase-token");

    // Request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          logOut().then(() => {
            console.warn("Unauthorized or Forbidden. Logged out.");
          });
        }
        return Promise.reject(err);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut]);

  return axiosSecure;
};

export default useAxiosSecure;
