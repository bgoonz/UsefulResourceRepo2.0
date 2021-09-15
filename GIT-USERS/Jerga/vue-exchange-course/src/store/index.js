import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations } from "vuexfire";

import exchange from "./modules/exchange";
import auth from "./modules/auth";
import opportunity from "./modules/opportunity";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    exchange,
    auth,
    opportunity,
  },
  actions: {
    test() {
      alert("Hello Vuex");
    },
  },
  mutations: {
    ...vuexfireMutations,
  },
});
