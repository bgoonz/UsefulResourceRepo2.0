import { db, storage } from "@/db";
import { firestoreAction } from "vuexfire";

export default {
  namespaced: true,
  state() {
    return {
      items: [],
      item: {},
      pagination: {
        itemCount: 5,
        lastItem: null,
        previousFirstItems: [],
        isFetchingData: false,
      },
    };
  },
  getters: {
    currentPage(state) {
      if (
        !state.pagination.previousFirstItems ||
        state.pagination.previousFirstItems.length === 0
      ) {
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
          (item.brand &&
            item.brand.toLowerCase().includes(searchedTitle.toLowerCase())) ||
          (item.description &&
            item.description
              .toLowerCase()
              .includes(searchedTitle.toLowerCase())) ||
          (item.category &&
            item.category
              .toLowerCase()
              .includes(searchedTitle.toLowerCase())) ||
          (item.size &&
            item.size.toLowerCase().includes(searchedTitle.toLowerCase())) ||
          (item.district &&
            item.district.toLowerCase().includes(searchedTitle.toLowerCase()))
        );
      });

      return filteredExchanges;
    },
  },
  actions: {
    getExchanges({ commit, state }, { searched } = { searched: "" }) {
      commit("resetPagination");
      // Here you want to make a call to firebase and ask for data
      return db
        .collection("exchanges")
        .where("brand", ">=", searched)
        .where("brand", "<=", searched + "\uf8ff")
        .limit(state.pagination.itemCount)
        .get()
        .then((snapshots) => {
          if (snapshots.docs.length === 0) {
            commit("setExchanges", []);
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

      // commit('setExchanges', exchanges)
    },
    getMoreExchanges({ commit, state }, { page, searched }) {
      if (state.pagination.isFetchingData) {
        return;
      }
      let query;
      commit("setIsFetchingData", true);

      if (page === "next") {
        query = db
          .collection("exchanges")
          .where("brand", ">=", searched)
          .where("brand", "<=", searched + "\uf8ff")
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
          .where("brand", ">=", searched)
          .where("brand", "<=", searched + "\uf8ff")
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

          commit("setExchange", exchange);
          return exchange;
        });
    },
    createExchange({ rootState, commit }, exchangeData) {
      const { exchange, images } = exchangeData;
      exchange.status = "active";
      exchange.price = parseInt(exchange.price, 10);

      const userRef = db.collection("profiles").doc(rootState.auth.user.uid);
      exchange.user = userRef;

      const uploadImageToStorage = (docRefId, imagesToUpload) => {
        let uploadTasks = [];
        for (const img of imagesToUpload) {
          const storageRef = storage.ref(
            "exchange/" + docRefId + "/" + img.name
          );
          let task = storageRef.put(images[0]).then(function (snapshot) {
            console.log("uploaded image!");
          });
          uploadTasks.push(task);
        }
        return uploadTasks;
      };

      // TODO: After exchange is created then add exchange to user profile on Firestore and also localy in Vue Store
      return db
        .collection("exchanges")
        .add(exchange)
        .then((docRef) => {
          exchange.id = docRef.id;
          if (images.length > 0) {
            Promise.all(uploadImageToStorage(docRef.id, images)).then((val) => {
              const storageRef = storage.ref(
                "exchange/" + docRef.id + "/" + images[0].name
              );
              storageRef.getDownloadURL().then(function (downloadURL) {
                db.collection("exchanges").doc(docRef.id).update({
                  image: downloadURL,
                });
              });
            });
            // const storageRef = storage.ref('exchange/' + docRef.id + '/' + images[0].name)
            // storageRef.put(images[0]).then(function(snapshot) {
            //   console.log('uploaded image!');
            //   console.log(snapshot)
            // });
          }
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
    setIsFetchingData(state, isFetching) {
      state.pagination.isFetchingData = isFetching;
    },
    resetPagination(state) {
      state.pagination.previousFirstItems = [];
      state.pagination.lastItem = null;
    },
  },
};
