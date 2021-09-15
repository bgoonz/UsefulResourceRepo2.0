import axios from "axios";
import authService from "services/authService";
import axiosService from "services/axiosService";

export const RELOAD_MAP = "RELOAD_MAP";
export const RELOAD_MAP_FINISH = "RELOAD_MAP_FINISH";

const axiosInstance = axiosService.getInstance();

export const verifyRentalOwner = (rentalId) => {
  return axiosInstance.get(`/rentals/${rentalId}/verify-user`);
};

export const reloadMap = () => {
  return {
    type: RELOAD_MAP,
  };
};

export const reloadMapFinish = () => {
  return {
    type: RELOAD_MAP_FINISH,
  };
};
