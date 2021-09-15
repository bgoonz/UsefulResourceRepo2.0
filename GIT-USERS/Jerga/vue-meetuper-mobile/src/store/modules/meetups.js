import Vue from "vue-native-core";
import axiosInstance from "@/services/axios";
import { Platform } from "react-native";
import { AsyncStorage } from "react-native";

export default {
  namespaced: true,

  state: {
    items: [],
    item: {},
  },
  getters: {},
  actions: {
    async fetchSecret() {
      return axiosInstance
        .get(`/meetups/secret`)
        .then((res) => {
          const data = res.data;
          alert(JSON.stringify(data));
        })
        .catch(() => alert("Not Authorized"));
    },
    fetchMeetups({ commit, state }) {
      return axiosInstance.get(`/meetups`).then((res) => {
        const meetups = res.data;
        commit(
          "setItems",
          { items: meetups, resource: "meetups" },
          { root: true }
        );
        return state.items;
      });
    },
    fetchMeetupById({ commit, state }, meetupId) {
      commit("setMeetup", {});
      return axiosInstance.get(`/meetups/${meetupId}`).then((res) => {
        const meetup = res.data;
        commit("setMeetup", meetup);
        return state.item;
      });
    },
    createMeetup({ rootState, commit }, meetupData) {
      meetupData.processedLocation = meetupData.location
        .toLowerCase()
        .replace(/[\s,]+/g, "")
        .trim();
      meetupData.meetupCreator = rootState.auth.user;

      return axiosInstance.post(`/meetups`, meetupData).then((res) => {
        const meetup = res.data;
        commit("addMeetup", meetup);
        return meetup;
      });
    },
  },
  mutations: {
    setMeetup(state, meetup) {
      Vue.set(state, "item", meetup);
    },
    addMeetup(state, meetup) {
      state.items.unshift(meetup);
    },
  },
};
