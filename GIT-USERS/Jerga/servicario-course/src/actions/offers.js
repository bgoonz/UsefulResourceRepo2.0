import {
  FETCH_OFFERS_SUCCESS,
  CHANGE_OFFER_STATUS,
  REQUEST_RESOURCE,
  FETCH_RESOURCE_SUCCESS,
} from "types";

import * as api from "api";

export const createOffer = (offer) => api.createOffer(offer);

const extractDataFromOffer = async (offer, userType) => {
  const service = await offer.service.get();
  const user = await offer[userType].get();

  offer.service = service.data();
  offer.service.id = service.id;
  offer[userType] = user.data();

  return offer;
};

export const fetchSentOffers = (userId) => (dispatch) => {
  dispatch({ type: REQUEST_RESOURCE, resource: "offers" });
  return api.fetchSentOffers(userId).then(async (offers) => {
    const mappedOffers = await Promise.all(
      offers.map((offer) => extractDataFromOffer(offer, "toUser"))
    );

    dispatch({ type: FETCH_RESOURCE_SUCCESS, resource: "offers" });
    dispatch({
      type: FETCH_OFFERS_SUCCESS,
      offers: mappedOffers,
      offersType: "sent",
    });
    return mappedOffers;
  });
};

export const fetchReceivedOffers = (userId) => (dispatch) => {
  dispatch({ type: REQUEST_RESOURCE, resource: "offers" });
  return api.fetchReceivedOffers(userId).then(async (offers) => {
    const mappedOffers = await Promise.all(
      offers.map((offer) => extractDataFromOffer(offer, "fromUser"))
    );

    dispatch({ type: FETCH_RESOURCE_SUCCESS, resource: "offers" });
    dispatch({
      type: FETCH_OFFERS_SUCCESS,
      offers: mappedOffers,
      offersType: "received",
    });
    return mappedOffers;
  });
};

export const acceptOffer = (offerId) => (dispatch) =>
  api
    .changeOfferStatus(offerId, "accepted")
    .then((_) =>
      dispatch({
        type: CHANGE_OFFER_STATUS,
        status: "accepted",
        offerId,
        offersType: "received",
      })
    );

export const declineOffer = (offerId) => (dispatch) =>
  api
    .changeOfferStatus(offerId, "declined")
    .then((_) =>
      dispatch({
        type: CHANGE_OFFER_STATUS,
        offerId,
        status: "declined",
        offersType: "received",
      })
    );

export const changeOfferStatus = (offerId, status) => (dispatch) =>
  api
    .changeOfferStatus(offerId, status)
    .then((_) =>
      dispatch({
        type: CHANGE_OFFER_STATUS,
        offerId,
        status,
        offersType: "received",
      })
    );
