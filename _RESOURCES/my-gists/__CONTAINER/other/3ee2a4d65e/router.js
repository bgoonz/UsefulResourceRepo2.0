import Vue from "vue";
import VueRouter from "vue-router";

import SomePage1 from "./pages/SomePage1";
import SomePage2 from "./pages/SomePage2";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/path" },
  { path: "/path", name: "HomePage", component: SomePage1 },
  { path: "/some/path", component: SomePage2 },
];

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "active",
  routes,
});

export default router;
