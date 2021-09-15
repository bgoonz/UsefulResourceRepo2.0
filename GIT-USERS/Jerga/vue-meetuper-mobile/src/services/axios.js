import axios from "axios";
import { AsyncStorage } from "react-native";
import { Platform } from "react-native";

const BASE_URL = __DEV__
  ? Platform.OS === "ios"
    ? "http://localhost:3001/api/v1"
    : "http://10.0.2.2:3001/api/v1"
  : "https://vue-meetuper-server.herokuapp.com/api/v1";

// let BASE_URL

// if (__DEV__) {
//   BASE_URL = Platform.OS === 'ios' ? 'http://localhost:3001/api/v1'
//                                    : 'http://10.0.2.2:3001/api/v1'
// } else {
//   BASE_URL = 'https://vue-meetuper-server.herokuapp.com/api/v1'
// }

const axiosInstance = axios.create({
  timeout: 3000,
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem("meetuper-jwt");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default axiosInstance;
