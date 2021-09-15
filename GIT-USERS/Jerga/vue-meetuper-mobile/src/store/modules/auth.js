import Vue from "vue-native-core";
import axiosInstance from "@/services/axios";
import { Platform } from "react-native";
import { AsyncStorage } from "react-native";
import jwtDecode from "jwt-decode";

const isTokenValid = (token) => {
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken && decodedToken.exp * 1000 > new Date().getTime();
  }

  return false;
};

export default {
  namespaced: true,

  state: {
    user: null,
    isAuthResolved: false,
  },
  getters: {
    isAuth(state) {
      return !!state.user;
    },
  },
  actions: {
    login({ commit, state }, userData) {
      return axiosInstance.post(`/users/login`, userData).then((res) => {
        const user = res.data;
        AsyncStorage.setItem("meetuper-jwt", user.token);
        commit("setAuthUser", user);
        return state.user;
      });
    },
    register(context, userData) {
      return axiosInstance.post(`/users/register`, userData);
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        AsyncStorage.removeItem("meetuper-jwt");
        commit("setAuthUser", null);
        resolve();
      });
    },
    fetchCurrentUser({ commit, state }) {
      return axiosInstance
        .get(`/users/me`)
        .then((res) => {
          const user = res.data;
          AsyncStorage.setItem("meetuper-jwt", user.token);
          commit("setAuthUser", user);
          return state.user;
        })
        .catch(() => undefined);
    },
    async verifyUser({ dispatch, commit }) {
      const jwt = await AsyncStorage.getItem("meetuper-jwt");

      if (jwt && isTokenValid(jwt)) {
        const user = await dispatch("fetchCurrentUser");
        commit("resolveAuth");

        return user
          ? Promise.resolve(jwt)
          : Promise.reject("Cannot fetch user");
      } else {
        commit("resolveAuth");
        return Promise.reject("Token is not valid");
      }
    },
  },
  mutations: {
    setAuthUser(state, user) {
      return (state.user = user);
    },
    resolveAuth(state) {
      state.isAuthResolved = true;
    },
  },
};
