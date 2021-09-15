import Cookies from "js-cookie";
import { history, redirect } from "redux-first-router";

import * as api from "api";

import { toHome, toLogin, toRegister } from "store/routerActions";
import { fetchCurrentUser } from "store/currentUser/actions";
import { fetchProducts } from "store/products/actions";

import { openModal } from "Modals/bus";

const maybeFetchCurrentUser = (dispatch, state) => {
  if (Cookies.get("authExpiresAt") && !state.currentUser.email)
    return dispatch(fetchCurrentUser()).catch(console.error);
};

const routesMap = {
  ADMIN: {
    path: "/admin",
    thunk: async (dispatch, getState) => {
      const currentUser = await maybeFetchCurrentUser(dispatch, getState());
      if (!(currentUser && currentUser.isAdmin)) return dispatch(toLogin());
      dispatch(fetchProducts());
    },
  },

  HOME: {
    path: "/",
    thunk: (dispatch, getState) => {
      if (window.location.toString().includes("#_=_")) history().push("/"); // cleanup url after FB login
      maybeFetchCurrentUser(dispatch, getState());
      dispatch(fetchProducts());
    },
  },

  LOGIN: {
    path: "/login",
  },

  PRODUCT: {
    path: "/products/:productId",
    thunk: (dispatch, getState) => {
      maybeFetchCurrentUser(dispatch, getState());
      dispatch(fetchProducts());
    },
  },

  PROFILE: {
    path: "/profile",
    thunk: async (dispatch, getState) => {
      const currentUser = await maybeFetchCurrentUser(dispatch, getState());
      if (!currentUser) dispatch(toLogin());
    },
  },

  REGISTER: {
    path: "/register",
  },

  REGISTER_CONFIRM: {
    path: "/register/confirm/:token",
    thunk: async (dispatch, getState) => {
      try {
        const { token } = getState().location.payload;
        await api.postRegisterConfirmationtoken(token);
        openModal("REGISTRATION_CONFIRMED");
        dispatch(redirect(toLogin()));
      } catch (e) {
        openModal("ERROR", e);
        dispatch(redirect(toRegister()));
      }
    },
  },

  CATCH_ALL_REDIRECT: {
    path: "*",
    thunk: (dispatch) => dispatch(redirect(toHome())),
  },
};

export default routesMap;
