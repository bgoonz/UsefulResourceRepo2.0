import { createRouter, createWebHistory } from "vue-router";
import SomePage1 from "./pages/SomePage1";
import SomePage2 from "./pages/SomePage2";

const routes = [
  { path: "/", redirect: { name: "HomePage" } },
  { path: "/path", name: "HomePage", component: SomePage1 },
  { path: "/some/path", component: SomePage2 },
];

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "active",
  routes,
});

export default router;
