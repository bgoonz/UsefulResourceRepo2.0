import { db, fb } from "@/db";
import { firestoreAction } from "vuexfire";

export default {
  namespaced: true,
  state() {
    return {
      items: [],
      item: {},
      pagination: {
        itemCount: 3,
        lastItem: null,
        previousFirstItems: [],
        isFetchingData: false,
      },
    };
  },
  getters: {
    currentPage(state) {
      if (!state.pagination.previousFirstItems) {
        return 1;
      }
      return state.pagination.previousFirstItems.length;
    },
    filteredExchanges: (state) => (searchedTitle) => {
      const { items } = state;

      if (!searchedTitle) {
        return items;
      }

      const filteredExchanges = items.filter((item) => {
        return (
          item.title &&
          item.title.toLowerCase().includes(searchedTitle.toLowerCase())
        );
      });

      return filteredExchanges;
    },
  },
  actions: {
    uploadImage(ctx, image) {
      return new Promise((res, rej) => {
        const storage = fb.storage();
        const storageRef = storage.ref();
        const uploadTask = storageRef.child("images/" + image.name).put(image);
        uploadTask.on(
          "state_changed",
          // Handle progress here -> https://firebase.google.com/docs/storage/web/upload-files
          () => {},
          // Handle Error here
          () => {},
          // Handle Success
          () => {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                res(downloadURL);
              });
          }
        );
      });
    },
    getExchanges({ commit, state }) {
      commit("resetItems");
      return db
        .collection("exchanges")
        .limit(state.pagination.itemCount)
        .get()
        .then((snapshots) => {
          if (snapshots.docs.length === 0) {
            return [];
          }
          const exchanges = snapshots.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          commit("setExchanges", exchanges);
          commit("setLastItem", snapshots.docs[snapshots.docs.length - 1]);
          commit("setPreviousFirstItem", snapshots.docs[0]);
          return exchanges;
        });
    },
    getMoreExchanges({ commit, state }, { page }) {
      if (state.pagination.isFetchingData) {
        return;
      }
      let query;
      commit("setIsFetchingData", true);

      if (page === "next") {
        query = db
          .collection("exchanges")
          .startAfter(state.pagination.lastItem)
          .limit(state.pagination.itemCount);
      } else {
        const lastItemIndex = state.pagination.previousFirstItems.length - 1;
        const previousItem =
          state.pagination.previousFirstItems[lastItemIndex - 1];

        if (!previousItem) {
          commit("setIsFetchingData", false);
          return;
        }

        // WARNING! Write mutation for this!
        state.pagination.previousFirstItems.splice(lastItemIndex, 1);
        query = db
          .collection("exchanges")
          .startAt(previousItem)
          .limit(state.pagination.itemCount);
      }

      return query.get().then((snapshots) => {
        commit("setIsFetchingData", false);
        if (snapshots.docs.length === 0) {
          return [];
        }

        const exchanges = snapshots.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        commit("setExchanges", exchanges);
        commit("setLastItem", snapshots.docs[snapshots.docs.length - 1]);

        if (page === "next") {
          commit("setPreviousFirstItem", snapshots.docs[0]);
        }

        return exchanges;
      });
    },
    bindExchanges: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("items", db.collection("exchanges"));
    }),
    getExchangeById({ commit }, exchangeId) {
      // Here you want to make a call to firebase and ask for data
      commit("setExchange", {});
      return db
        .collection("exchanges")
        .doc(exchangeId)
        .get()
        .then(async (snapshot) => {
          const exchange = snapshot.data();
          exchange.id = snapshot.id;
          const userSnapshot = await exchange.user.get();
          exchange.user = userSnapshot.data();
          exchange.user.id = userSnapshot.id;
          commit("setExchange", exchange);
          return exchange;
        });
    },
    createExchange({ rootState, commit }, exchange) {
      exchange.status = "active";
      exchange.price = parseInt(exchange.price, 10);

      const userRef = db.collection("profiles").doc(rootState.auth.user.uid);
      exchange.user = userRef;

      // TODO: After exchange is created then add exchange to user profile on Firestore and also localy in Vue Store
      return db
        .collection("exchanges")
        .add(exchange)
        .then((docRef) => {
          exchange.id = docRef.id;
          commit("auth/addExchangeToUser", exchange, { root: true });
          return true;
        });
    },
  },
  mutations: {
    setExchanges(state, exchanges) {
      state.items = exchanges;
    },
    setExchange(state, exchange) {
      state.item = exchange;
    },
    setLastItem(state, item) {
      state.pagination.lastItem = item;
    },
    setPreviousFirstItem(state, item) {
      state.pagination.previousFirstItems.push(item);
    },
    resetItems(state, item) {
      state.pagination.previousFirstItems = [];
    },
    setIsFetchingData(state, isFetching) {
      state.pagination.isFetchingData = isFetching;
    },
  },
};
