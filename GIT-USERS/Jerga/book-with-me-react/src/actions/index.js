import { Axios } from "../services/axios";
import {
  RECIEVE_RENTALS,
  RECIEVE_SELECTED_RENTAL,
  REQUEST_SELECTED_RENTAL,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER,
  FETCH_RENTALS_FAILURE,
  REQUEST_RENTALS_SEARCH,
  CREATE_BOOKING,
  REQUEST_RENTALS,
  REQUEST_BOOKING,
  BOOKING_SUCCESS,
  BOOKING_FAILURE,
  INIT_USER,
  CREATE_RENTAL_SUCCESS,
  CREATE_RENTAL_FAIL,
  REQUEST_BOOKINGS,
  RECIEVE_BOOKINGS,
  RECIEVE_BOOKINGS_FAIL,
} from "./types";

const axiosService = Axios.init();

// BOOKINGS

const bookingFailure = (errors) => {
  return {
    type: BOOKING_FAILURE,
    errors,
  };
};

const bookingSuccess = (booking) => {
  return {
    type: BOOKING_SUCCESS,
    booking,
  };
};

const requestBooking = () => {
  return {
    type: REQUEST_BOOKING,
  };
};

export const createBooking = (booking) => {
  return {
    type: CREATE_BOOKING,
    booking,
  };
};

export const bookPlace = (booking) => {
  return (dispatch) => {
    dispatch(requestBooking);
    return axiosService
      .post("/bookings", booking)
      .then((res) => res.data)
      .then((booking) => dispatch(bookingSuccess(booking)))
      .catch(({ response }) => dispatch(bookingFailure(response.data.errors)));
  };
};

const requestBookings = () => {
  return {
    type: REQUEST_BOOKINGS,
  };
};

const recieveBookings = (bookings) => {
  return {
    type: RECIEVE_BOOKINGS,
    bookings,
  };
};

const recieveBookingsFail = (errors) => {
  return {
    type: RECIEVE_BOOKINGS_FAIL,
    errors,
  };
};

export const fetchBookings = () => {
  return (dispatch) => {
    dispatch(requestBookings());
    axiosService
      .get("/bookings/manage")
      .then((res) => res.data)
      .then((bookings) => dispatch(recieveBookings(bookings)))
      .catch(({ response }) =>
        dispatch(recieveBookingsFail(response.data.errors))
      );
  };
};

// RENTALS ACTIONS

const rentalCreateSuccess = (rental) => {
  return {
    type: CREATE_RENTAL_SUCCESS,
    rental,
  };
};

const rentalCreateFail = (errors) => {
  return {
    type: CREATE_RENTAL_FAIL,
    errors,
  };
};

export const createRental = (rentalData) => {
  return (dispatch) => {
    return axiosService
      .post("/rentals", rentalData)
      .then((res) => res.data)
      .then((rental) => rentalCreateSuccess(rental))
      .catch(({ response }) =>
        dispatch(rentalCreateFail(response.data.errors))
      );
  };
};

const recieveRentals = (rentals) => {
  return {
    type: RECIEVE_RENTALS,
    rentals: rentals,
  };
};

const recieveSelectedRental = (rental) => {
  return {
    type: RECIEVE_SELECTED_RENTAL,
    selectedRental: rental,
  };
};

const requestRentalById = () => {
  return {
    type: REQUEST_SELECTED_RENTAL,
  };
};

const fetchRentalsFailure = (errors) => {
  return {
    type: FETCH_RENTALS_FAILURE,
    errors,
  };
};

const requestRentalsWithSearch = (city) => {
  return {
    type: REQUEST_RENTALS_SEARCH,
    city: city,
  };
};

const requestRentals = () => {
  return {
    type: REQUEST_RENTALS,
  };
};

export const fetchRentalsByUser = () => {
  return (dispatch) => {
    dispatch(requestRentals());
    return axiosService
      .get(`/rentals/manage`)
      .then((res) => res.data)
      .then((rentals) => dispatch(recieveRentals(rentals)))
      .catch(({ response }) => dispatch(registerFailure(response.data.errors)));
  };
};

export const fetchRentalByid = (rentalId) => {
  return (dispatch) => {
    dispatch(requestRentalById());
    return axiosService
      .get(`/rentals/${rentalId}`)
      .then((res) => res.data)
      .then((rental) => dispatch(recieveSelectedRental(rental)));
  };
};

export const fetchRentalsByCity = (city) => {
  const url = `/rentals?city=${city.toLowerCase()}`;

  return (dispatch) => {
    dispatch(requestRentalsWithSearch(city));
    getRentals(url, dispatch);
  };
};

export const fetchRentals = (city) => {
  const url = "/rentals";

  return (dispatch) => {
    dispatch(requestRentals());
    getRentals(url, dispatch);
  };
};

// AUTH ACTIONS - REGISTER

const registerSuccess = (data) => {
  return {
    type: REGISTER_SUCCESS,
    registered: true,
  };
};

const registerFailure = (errors) => {
  return {
    type: REGISTER_FAILURE,
    errors,
  };
};

export const register = (userData) => {
  return (dispatch) => {
    return axiosService
      .post("/users", { ...userData })
      .then((res) => dispatch(registerSuccess(res.data)))
      .catch(({ response }) => dispatch(registerFailure(response.data.errors)));
  };
};

// AUTH ACTIONS - LOGIN

const loginFailure = (errors) => {
  return {
    type: LOGIN_FAILURE,
    errors,
  };
};

export const loginSuccess = (token) => {
  Axios.setAuth();

  return {
    type: LOGIN_SUCCESS,
    token: token,
  };
};

export const logout = () => {
  localStorage.removeItem("auth_token");
  Axios.removeAuth();

  return {
    type: LOGOUT_USER,
  };
};

export const initUser = (token) => {
  const username = parseJwt(token).username;

  return {
    type: INIT_USER,
    username,
  };
};

const parseJwt = (token) => {
  if (token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");

    return JSON.parse(window.atob(base64));
  }

  return {};
};

export const login = (userData) => {
  return (dispatch) => {
    return axiosService
      .post("/auth", { ...userData })
      .then((res) => res.data.token)
      .then((token) => {
        localStorage.setItem("auth_token", token);
        dispatch(loginSuccess(token));
        dispatch(initUser(token));
      })
      .catch(({ response }) => dispatch(loginFailure(response.data.errors)));
  };
};

function getRentals(url, dispatch) {
  return axiosService
    .get(url)
    .then((res) => res.data)
    .then((rentals) => dispatch(recieveRentals(rentals)))
    .catch(({ response }) =>
      dispatch(fetchRentalsFailure(response.data.errors))
    );
}
