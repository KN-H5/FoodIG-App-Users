import axios from "axios";
import queryString from "query-string";

//const baseURL = "https://ig-food-menus.herokuapp.com/";
const baseURL = "http://localhost:3000/";


const axiosClient = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: baseURL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    console.log( response.data)
    return response.data;
  },
  (error) => {
    // Handle errors
    console.log(error.message);
    throw error;
  }
);

export default axiosClient;
