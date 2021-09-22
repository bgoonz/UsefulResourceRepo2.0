import Vue from "vue/dist/vue.esm";
import App from "../app.vue";
import Vuex from "vuex";

Vue.use(Vuex);

window.store = new Vuex.Store({
  state: {
    lists: [],
  },
  mutations: {
    addList(state, data) {
      state.lists.push(data);
    },
    addCard(state, data) {
      const index = state.lists.findIndex((item) => item.id == data.list_id);
      state.lists[index].cards.push(data);
    },
    editCard(state, data) {
      const list_index = state.lists.findIndex((item) => {
        return item.id === data.list_id;
      });
      const card_index = state.lists[list_index].cards.findIndex(
        (item) => item.id === data.id
      );
      state.lists[list_index].cards.splice(card_index, 1, data);
    },
  },
});

document.addEventListener("turbolinks:load", function () {
  var element = document.querySelector("#boards");
  if (element != undefined) {
    window.store.state.lists = JSON.parse(element.dataset.lists);

    const app = new Vue({
      el: element,
      store: window.store,
      template: "<App/>",
      components: { App },
    });
  }
});
