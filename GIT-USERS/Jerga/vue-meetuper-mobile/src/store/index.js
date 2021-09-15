import Vuex from "vuex";
import Vue from "vue-native-core";
import axios from "axios";

import meetups from "./modules/meetups";
import threads from "./modules/threads";
import auth from "./modules/auth";
import categories from "./modules/categories";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    meetups,
    threads,
    auth,
    categories,
  },
  // Like data in component. We are keeping our data in the state
  state: {},
  // Like computed properties in componen.
  // You can use getters to access state in the store
  getters: {},
  // Like methods in component.
  // To perform actions that usualy results in data
  actions: {
    // 2. We are getting here from dispatch of action in homeScreen
  },
  // Like methods in component. To save data to the state.
  mutations: {
    setItems(state, { items, resource }) {
      Vue.set(state[resource], "items", items);
    },
  },
});
