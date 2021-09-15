import Vue from "vue-native-core";
import axiosInstance from "@/services/axios";
import { Platform } from "react-native";

export default {
  namespaced: true,

  state: {
    items: [],
  },
  actions: {
    fetchCategories({ commit, state }) {
      return axiosInstance.get(`/categories`).then((res) => {
        const categories = res.data;
        commit(
          "setItems",
          { items: categories, resource: "categories" },
          { root: true }
        );
        return state.items;
      });
    },
  },
};
