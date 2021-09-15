import axiosService from "services/AxiosService";
const { bwmAxios } = axiosService;

export const uploadImage = (image) => {
  const formData = new FormData();
  formData.append("image", image);

  return bwmAxios.post("/image-upload", formData).then((res) => res.data);
};

export const extractApiErrors = (resError) => {
  let errors = [{ title: "Error!", detail: "Ooops, something went wrong!" }];

  if (resError && resError.data && resError.data.errors) {
    errors = resError.data.errors;
  }

  return errors;
};

export const deleteResource =
  ({ url, resource }) =>
  (dispatch) => {
    return bwmAxios
      .delete(url)
      .then((res) => res.data)
      .then(({ id }) => {
        dispatch({
          type: "DELETE_RESOURCE",
          id,
          resource,
        });
      })
      .catch((error) => {
        dispatch({
          type: "REQUEST_ERROR",
          errors: extractApiErrors(error.response || []),
          resource,
        });
      });
  };

export * from "./auth";
export * from "./rentals";
export * from "./bookings";

// AUTH ACTIONS
