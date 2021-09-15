import axios from "axios";
import authService from "services/authService";
import axiosService from "services/axiosService";

export const UPLOAD_IMAGE = "UPLOAD_IMAGE";

const axiosInstance = axiosService.getInstance();

export const verifyRentalOwner = (rentalId) => {
  return axiosInstance.get(`/rentals/${rentalId}/verify-user`);
};

export const uploadImage = (image) => {
  const formData = new FormData();
  formData.append("image", image);

  return axiosInstance
    .post("/image-upload", formData)
    .then((json) => {
      return json.data.imageUrl;
    })
    .catch(({ response }) => Promise.reject(response.data.errors[0]));
};
