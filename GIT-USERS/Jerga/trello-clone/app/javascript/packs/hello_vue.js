import Vue from "vue";
import App from "../app.vue";

document.addEventListener("DOMContentLoaded", () => {
  document.body.appendChild(document.createElement("hello"));
  const app = new Vue({
    render: (h) => h(App),
  }).$mount("hello");

  console.log(app);
});
