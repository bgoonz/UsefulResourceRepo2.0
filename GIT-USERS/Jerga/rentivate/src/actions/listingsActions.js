import axios from "axios";
import authService from "services/authService";
import axiosService from "services/axiosService";

export const FETCH_RENTALS = "FETCH_RENTALS";
export const FETCH_RENTAL_BY_ID_SUCCESS = "FETCH_RENTAL_BY_ID_SUCCESS";
export const FETCH_RENTAL_BY_ID_INIT = "FETCH_RENTAL_BY_ID_INIT";
export const FETCH_RENTALS_SUCCESS = "FETCH_RENTALS_SUCCESS";

export const FETCH_RENTALS_INIT = "FETCH_RENTALS_INIT";
export const FETCH_RENTALS_FAIL = "FETCH_RENTALS_FAIL";

export const UPDATE_RENTAL_SUCCESS = "UPDATE_RENTAL_SUCCESS";
export const UPDATE_RENTAL_FAIL = "UPDATE_RENTAL_FAIL";
export const RESET_RENTAL_ERRORS = "RESET_RENTAL_ERRORS";

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

//ACTION TYPES

const fetchRentalByIdInit = () => {
  return {
    type: FETCH_RENTAL_BY_ID_INIT,
  };
};

const fetchRentalByIdSuccess = (rental) => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    rental,
  };
};

const fetchRentalsSuccess = (rentals) => {
  return {
    type: FETCH_RENTALS_SUCCESS,
    rentals,
  };
};

const fetchRentalsInit = () => {
  return {
    type: FETCH_RENTALS_INIT,
  };
};

const fetchRentalsFail = (errors) => {
  return {
    type: FETCH_RENTALS_FAIL,
    errors,
  };
};

export const fetchRentals = (state) => {
  const url = state ? `/rentals?state=${state}` : "/rentals";

  return (dispatch) => {
    dispatch(fetchRentalsInit());

    axiosInstance
      .get(url)
      .then((res) => res.data)
      .then((rentals) => dispatch(fetchRentalsSuccess(rentals)))
      .catch(({ response }) =>
        dispatch(fetchRentalsFail(response.data.errors))
      );
  };
};

export const fetchRentalById = (rentalId) => {
  return function (dispatch) {
    dispatch(fetchRentalByIdInit());

    axios
      .get(`/api/v1/rentals/${rentalId}`)
      .then((res) => res.data)
      .then((rental) => dispatch(fetchRentalByIdSuccess(rental)));
  };
};

export const createRental = (rentalData) => {
  return axiosInstance.post("/rentals", rentalData).then(
    (res) => res.data,
    (err) => Promise.reject(err.response.data.errors)
  );
};

export const resetRentalErrors = () => {
  return {
    type: RESET_RENTAL_ERRORS,
  };
};

const updateRentalSuccess = (updatedRental) => {
  return {
    type: UPDATE_RENTAL_SUCCESS,
    rental: updatedRental,
  };
};

const updateRentalFail = (errors) => {
  return {
    type: UPDATE_RENTAL_FAIL,
    errors,
  };
};

export const updateRental = (id, rentalData) => (dispatch) => {
  return axiosInstance
    .patch(`/rentals/${id}`, rentalData)
    .then((res) => res.data)
    .then((updatedRental) => {
      dispatch(updateRentalSuccess(updatedRental));

      if (rentalData.state || rentalData.street) {
        dispatch(reloadMap());
      }
    })
    .catch(({ response }) => dispatch(updateRentalFail(response.data.errors)));
};

export const getUserRentals = () => {
  return axiosInstance.get("/rentals/manage").then(
    (res) => res.data,
    (err) => Promise.reject(err.response.data.errors)
  );
};

export const deleteRental = (rentalId) => {
  return axiosInstance.delete(`/rentals/${rentalId}`).then(
    (res) => res.data,
    (err) => Promise.reject(err.response.data.errors)
  );
};

// export const fetchListings = () => {
//   return dispatch =>  {
//     fetch('http://localhost:8000/listings')
//       .then(res => res.json())
//       .then(listings => {
//         dispatch({
//         type: FETCH_LISTINGS,
//         payload: listings
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
