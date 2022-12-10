
import axios from "axios";
import Cookies from "js-cookie";

// axios.defaults.insecureHTTPParser = true; // necesario??
axios.defaults.withCredentials = true;
const userCookie = Cookies.get("access_token");

export const customAxios = axios.create({
  baseURL: "http://localhost:8800/api",
});

export const customAxiosWithToken = axios.create({
  baseURL: "http://localhost:8800/api",
  headers: {
    Authorization: "Bearer " + userCookie,
  },
});
