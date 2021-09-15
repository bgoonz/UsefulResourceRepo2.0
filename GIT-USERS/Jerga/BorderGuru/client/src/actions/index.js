import axios from "axios";
import { types } from "./types";

export const setActiveOffer = (offer) => {
  return {
    type: types.SET_ACTIVE_OFFER,
    offer,
  };
};

export const setSearchText = (searchText) => {
  return {
    type: types.SET_SEARCH_TEXT,
    searchText,
  };
};

export const setFilterType = (filterType) => {
  return {
    type: types.SET_FILTER_TYPE,
    filterType,
  };
};

export const fetchOffersSuccess = (offers) => {
  return {
    type: types.FETCH_OFFERS,
    offers,
  };
};

export const addOfferSuccess = (offer) => {
  return {
    type: types.ADD_OFFER,
    offer,
  };
};

export const addOffer = (offer) => {
  return (dispatch) => {
    axios.post(`/add`, offer).then((resp) => {
      return dispatch(addOfferSuccess(offer));
    });
  };
};

export const fetchOffers = () => {
  return (dispatch) => {
    axios.get(`/offers`).then((resp) => {
      return dispatch(fetchOffersSuccess(resp));
    });
  };
};

export const deleteOffers = (id) => {
  return (dispatch) => {
    axios.delete(`/${id}`).then((resp) => {
      return dispatch(fetchOffersSuccess(resp));
    });
  };
};
