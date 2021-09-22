import axios from "axios";

export class Axios {
  static axiosInstance;

  static init() {
    return this.axiosInstance ? this.axiosInstance : this.createInstance();
  }

  static setAuth() {
    this.axiosInstance.defaults.headers.common["Authorization"] = authToken();
  }

  static removeAuth() {
    this.axiosInstance.defaults.headers.common["Authorization"] = "";
  }

  static createInstance() {
    this.axiosInstance = axios.create({
      baseURL: "/api/v1",
      timeout: 1000,
    });

    return this.axiosInstance;
  }
}

function authToken() {
  let token = localStorage.getItem("auth_token");

  return token ? `Bearer ${token}` : "";
}
