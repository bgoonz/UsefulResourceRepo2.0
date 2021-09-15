import Vue from "vue-native-core";
import axiosInstance from "@/services/axios";
import { Platform } from "react-native";

export default {
  namespaced: true,

  state: {
    items: [],
  },
  actions: {
    fetchThreads({ commit, state }, meetupId) {
      return axiosInstance.get(`/threads?meetupId=${meetupId}`).then((res) => {
        const threads = res.data.threads;
        commit(
          "setItems",
          { items: threads, resource: "threads" },
          { root: true }
        );
        return state.items;
      });
    },
  },
};
