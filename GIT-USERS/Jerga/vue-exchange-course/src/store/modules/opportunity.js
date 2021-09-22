import { db, Timestamp } from "@/db";
import Vue from "vue";

const extractDataFromOpportunity = async ({ id, opportunity }) => {
  if (opportunity.fromExchange) {
    const fromExchange = await opportunity.fromExchange.get();
    opportunity.fromExchange = fromExchange.data();
  }

  const toExchange = await opportunity.toExchange.get();
  opportunity.toExchange = toExchange.data();
  opportunity.id = id;
  return opportunity;
};

export default {
  namespaced: true,
  state: {
    sendOpportunities: [],
    opportunities: [],
  },
  actions: {
    createOpportunity({ commit }, opportunity) {
      opportunity.status = "pending";
      opportunity.createdAt = Timestamp.fromDate(new Date());

      return db
        .collection("opportunities")
        .add(opportunity)
        .then((docRef) => {
          opportunity.id = docRef.id;
          commit("auth/addOpportunityToUser", opportunity, { root: true });
          return true;
        });
    },
    getOpportunities({ rootState, commit }) {
      // TODO: consider to reset data
      const { uid } = rootState.auth.user;
      if (!uid) return Promise.reject("User is not logged in!");

      const userRef = db.collection("profiles").doc(uid);

      return db
        .collection("opportunities")
        .where("toUser", "==", userRef)
        .get()
        .then(async (snapshot) => {
          const opportunities = await Promise.all(
            snapshot.docs.map((doc) =>
              extractDataFromOpportunity({
                id: doc.id,
                opportunity: doc.data(),
              })
            )
          );

          commit("setOpportunities", {
            resource: "opportunities",
            opportunities,
          });
          return opportunities;
        });
    },
    getSendOpportunities({ rootState, commit }) {
      const { uid } = rootState.auth.user;
      if (!uid) return Promise.reject("User is not logged in!");

      return db
        .collection("opportunities")
        .where("fromUser.id", "==", uid)
        .get()
        .then(async (snapshot) => {
          const opportunities = await Promise.all(
            snapshot.docs.map((doc) =>
              extractDataFromOpportunity({
                id: doc.id,
                opportunity: doc.data(),
              })
            )
          );

          commit("setOpportunities", {
            resource: "sendOpportunities",
            opportunities,
          });
          return opportunities;
        });
    },
    acceptOpportunity({ commit }, opportunity) {
      return db
        .collection("opportunities")
        .doc(opportunity.id)
        .update({
          status: "accepted",
        })
        .then((_) => {
          commit("changeOpportunityStatus", {
            id: opportunity.id,
            status: "accepted",
          });
          commit(
            "auth/changeOpportunityStatus",
            { id: opportunity.id, status: "accepted" },
            { root: true }
          );

          if (opportunity.fromExchangeCash) {
            commit("auth/incrementUserCredit", opportunity.fromExchangeCash, {
              root: true,
            });
          }
          return true;
        });
    },
    declineOpportunity({ commit }, opportunity) {
      return db
        .collection("opportunities")
        .doc(opportunity.id)
        .update({
          status: "declined",
        })
        .then((_) => {
          commit("changeOpportunityStatus", {
            id: opportunity.id,
            status: "declined",
          });
          commit(
            "auth/changeOpportunityStatus",
            { id: opportunity.id, status: "declined" },
            { root: true }
          );
          return true;
        });
    },
  },
  mutations: {
    setOpportunities(state, { resource, opportunities }) {
      state[resource] = opportunities;
    },
    changeOpportunityStatus(state, { id, status }) {
      const index = state.opportunities.findIndex((o) => o.id === id);
      Vue.set(state.opportunities[index], "status", status);
    },
  },
};
