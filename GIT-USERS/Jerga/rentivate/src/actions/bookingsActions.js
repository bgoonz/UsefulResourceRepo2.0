import axios from "axios";
import authService from "services/authService";
import axiosService from "services/axiosService";

export const FETCH_USER_BOOKINGS_SUCCESS = "FETCH_USER_BOOKINGS_SUCCESS";
export const FETCH_USER_BOOKINGS_FAIL = "FETCH_USER_BOOKINGS_FAIL";
export const FETCH_USER_BOOKINGS_INIT = "FETCH_USER_BOOKINGS_INIT";

export const RELOAD_MAP = "RELOAD_MAP";
export const RELOAD_MAP_FINISH = "RELOAD_MAP_FINISH";
export const FETCH_BOOKINGS = "FETCH_BOOKINGS";
export const ADD_LISTING = "ADD_LISTING";
export const UPDATE_LISTING = "UPDATE_LISTING";
export const REMOVE_LISTING = "REMOVE_LISTING";

const axiosInstance = axiosService.getInstance();

export const verifyRentalOwner = (rentalId) => {
  return axiosInstance.get(`/rentals/${rentalId}/verify-user`);
};

const fetchUserBookingsInit = () => {
  return {
    type: FETCH_USER_BOOKINGS_INIT,
  };
};

const fetchUserBookingsSuccess = (userBookings) => {
  return {
    type: FETCH_USER_BOOKINGS_SUCCESS,
    userBookings,
  };
};

const fetchUserBookingsFail = (errors) => {
  return {
    type: FETCH_USER_BOOKINGS_FAIL,
    errors,
  };
};

export const fetchUserBookings = () => {
  return (dispatch) => {
    dispatch(fetchUserBookingsInit());

    axiosInstance
      .get("/bookings/manage")
      .then((res) => res.data)
      .then((userBookings) => dispatch(fetchUserBookingsSuccess(userBookings)))
      .catch(({ response }) =>
        dispatch(fetchUserBookingsFail(response.data.errors))
      );
  };
};

// export const fetchBookings = () => {
//   return dispatch =>  {
//     fetch('http://localhost:8000/bookings')
//       .then(res => res.json())
//       .then(bookings => {
//         dispatch({
//         type: FETCH_BOOKINGS,
//         payload: bookings
//       })
//     })
//   }
// }
//
// export const addListing = (newListing) => {
//   console.log(newListing)
//   return async (dispatch) => {
//     let listing = await axios.post(`http://localhost:8000/addbucket/${newListing.id}`, newListing)
//     console.log(listing);
//     dispatch({
//       type: ADD_LISTING,
//       payload: listing.data[0]
//     })
//   }
// }
//
// export const removeListing = (listing) => {
//   console.log('reducer listing', listing)
//   return async (dispatch) => {
//     let thelisting = await axios.delete(`http://localhost:8000/removebucket/${listing.id}`, listing)
//     dispatch({
//       type: REMOVE_LISTING,
//       payload: listing
//     })
//   }
// }
//
// export const updateListing = (listing) => {
//   return async (dispatch) => {
//     let theListing = await axios.put(`http://localhost:8000/updateListing/${listing.id}`, listing)
//     dispatch({
//       type: UPDATE_LISTING,
//       payload: theListing.data
//     })
//   }
// }
