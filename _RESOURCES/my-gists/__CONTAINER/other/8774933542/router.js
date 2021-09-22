import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,

  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("./views/PageLogin.vue"),
      meta: { onlyGuestUser: true },
    },
    {
      path: "/consumer",
      name: "consumer",
      component: () => import("./views/ConsumerRegister.vue"),
      meta: { onlyGuestUser: true },
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("./views/PageLogin.vue"),
    },
    {
      path: "/401",
      name: "PageNotAuthenticated",
      component: () => import("./views/PageNotAuthenticated"),
    },
    {
      path: "/welcome",
      name: "welcome",
      meta: { onlyAuthUser: true },

      component: () => import("./views/Welcome.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  store.dispatch("auth/getAuthUser").then((authUser) => {
    const isAuthenticated = store.getters["auth/isAuthenticated"];
    if (to.meta.onlyAuthUser) {
      if (isAuthenticated) {
        next();
      } else {
        next({ name: "PageNotAuthenticated" });
      }
    } else if (to.meta.onlyGuestUser) {
      if (isAuthenticated) {
        next({ name: "welcome" });
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

export default router;
