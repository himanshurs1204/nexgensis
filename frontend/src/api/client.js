import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("nexgensis_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      new Error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      ),
    ),
);

export default apiClient;
