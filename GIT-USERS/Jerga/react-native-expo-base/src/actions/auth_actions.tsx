import axios from "axios";
import environment from "../../environment/env";
import User from "../models/user.model";
import { AsyncStorage } from "react-native";

import { LOGIN_FACEBOOK_SUCCESS, LOGIN_FACEBOOK_FAIL } from "./types";

import { Facebook } from "expo";

export const facebookLogin = (navigateToMainCallback) => async (dispatch) => {
  try {
    const res = await Facebook.logInWithReadPermissionsAsync(
      "137019567015638",
      {
        permissions: [
          "public_profile",
          "email",
          "user_location",
          "user_friends",
        ],
      }
    );

    if (res.type === "success") {
      const { data } = await axios.get(
        `https://graph.facebook.com/me?access_token=${res.token}&fields=id,name,picture,email`
      );
      const authRes = await axios.post(`${environment.API_URL}auth`, data);
      const { jwtToken, user } = authRes.data;

      AsyncStorage.setItem("token", jwtToken);

      dispatch({
        type: LOGIN_FACEBOOK_SUCCESS,
        payload: user,
      });
    }
    navigateToMainCallback();
  } catch (err) {
    dispatch({
      type: LOGIN_FACEBOOK_FAIL,
    });
    console.error(err);
  }
};

async function saveUser({ id, name, email }) {
  const res = await axios.post(`${environment.API_URL}auth`, {
    id,
    name,
    email,
  });
  debugger;
  return res.data;
}
