import axios from "axios";
import jwt from "jsonwebtoken";

function checkTokenValidity(token) {
  if (token) {
    const decodedToken = jwt.decode(token);
    return decodedToken && decodedToken.exp * 1000 > new Date().getTime();
  }
  return false;
}
export default {
  namespaced: true,
  state: {
    user: null,
    isAuthResolved: false,
  },
  getters: {
    authUser(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return !!state.user;
    },
  },
  actions: {
    loginWithCredentials({ commit }, userDate) {
      return axios.post("/api/v1/users/login", userDate).then((res) => {
        const user = res.data;
        console.log(user.email);
        localStorage.setItem("jwt-token", user.token);
        commit("setAuthUser", user);
      });
    },
    registerConsumer(contex, consumerData) {
      axios.post("/api/v1/users/consumer", consumerData);
    },
    logout({ commit }) {
      /* axios.post('/api/v1/users/logout')
                .then(() => {
                    commit('setAuthUser', null)
                    return true
                })
                .catch(err => console.log(err)) */
      return new Promise((resolve, reject) => {
        localStorage.removeItem("jwt-token");
        commit("setAuthUser", null);
        resolved(true);
      });
    },

    getAuthUser({ commit, getters }) {
      const authUser = getters["authUser"];
      const token = localStorage.getItem("jwt-token");
      const isTokenValid = checkTokenValidity(token);
      if (authUser && isTokenValid) {
        return Promise.resolve(authUser);
      }

      const config = {
        headers: {
          "cache-control": "no-cache",
          Authorization: token,
        },
      };
      return axios("/api/v1/users/me", config)
        .then((res) => {
          debugger;
          const user = res.data;
          localStorage.setItem("jwt-token", user.token);
          commit("setAuthUser", user);
          commit("setAuthState", true);
          return user;
        })
        .catch((err) => {
          commit("setAuthUser", null);
          return undefined;
        });
    },
  },
  mutations: {
    setAuthUser(state, user) {
      return (state.user = user);
    },
    setAuthState(state, authState) {
      return (state.isAuthResolved = authState);
    },
  },
};
