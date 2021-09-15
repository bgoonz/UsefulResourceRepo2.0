import { createRouter, createWebHistory } from "vue-router";
import ResourcePage from "@/ResourceApp";
import ResourceNewPage from "@/ResourceNew";

const routes = [
  { path: "/", redirect: "/resources" },
  { path: "/resources", name: "HomePage", component: ResourcePage },
  { path: "/resources/new", component: ResourceNewPage },
];

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "active",
  routes,
});

export default router;
