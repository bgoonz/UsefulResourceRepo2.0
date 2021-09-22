import axiosService from "services/AxiosService";
import { extractApiErrors, deleteResource } from "./index";
const { bwmAxios } = axiosService;

export const createBooking = (booking) => {
  return bwmAxios
    .post("/bookings", booking)
    .then((res) => res.data)
    .catch((err) => Promise.reject(extractApiErrors(err.response || {})));
};

export const getBookings = (rentalId) => {
  return bwmAxios.get(`/bookings?rental=${rentalId}`).then((res) => res.data);
};

export const fetchUserBookings = () => (dispatch) => {
  dispatch({ type: "REQUEST_DATA", resource: "manage-bookings" });
  return bwmAxios
    .get("/bookings/me")
    .then((res) => res.data)
    .then((bookings) => {
      dispatch({
        type: "REQUEST_DATA_COMPLETE",
        data: bookings,
        resource: "manage-bookings",
      });
    });
};

export const fetchReceivedBookings = () => (dispatch) => {
  dispatch({ type: "REQUEST_DATA", resource: "received-bookings" });
  return bwmAxios
    .get("/bookings/received")
    .then((res) => res.data)
    .then((bookings) => {
      dispatch({
        type: "REQUEST_DATA_COMPLETE",
        data: bookings,
        resource: "received-bookings",
      });
    });
};

export const deleteBooking = (bookingId) => (dispatch) => {
  return dispatch(
    deleteResource({
      url: `/bookings/${bookingId}`,
      resource: "manage-bookings",
    })
  );
};
