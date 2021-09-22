import Vue from "vue";
import Router from "vue-router";

import HomePage from "@/pages/Home";
import AboutPage from "@/pages/About";
import FaqPage from "@/pages/Faq";
import LoginPage from "@/pages/Login";
import LogoutPage from "@/pages/Logout";
import RegisterPage from "@/pages/Register";
import ProfilePage from "@/pages/Profile";
import ExchangeCreatePage from "@/pages/ExchangeCreate";
import ExchangeDetailPage from "@/pages/ExchangeDetail";

import firebase from "firebase/app";
import "firebase/auth";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage,
    },
    {
      path: "/about",
      name: "AboutPage",
      component: AboutPage,
    },
    {
      path: "/faq",
      name: "FaqPage",
      component: FaqPage,
    },
    {
      path: "/login",
      name: "LoginPage",
      component: LoginPage,
      meta: { onlyGuestUser: true },
    },
    {
      path: "/logout",
      name: "LogoutPage",
      component: LogoutPage,
    },
    {
      path: "/register",
      name: "RegisterPage",
      component: RegisterPage,
      meta: { onlyGuestUser: true },
    },
    {
      path: "/users/me",
      name: "ProfilePage",
      component: ProfilePage,
      meta: { onlyAuthUser: true },
    },
    {
      path: "/exchanges/new",
      name: "ExchangeCreatePage",
      component: ExchangeCreatePage,
      meta: { onlyAuthUser: true },
    },
    {
      path: "/exchanges/:id",
      name: "ExchangeDetailPage",
      component: ExchangeDetailPage,
    },
  ],
  mode: "history",
});

router.beforeEach((to, from, next) => {
  const authenticatedUser = firebase.auth().currentUser;

  if (to.meta.onlyAuthUser) {
    if (authenticatedUser) {
      next();
    } else {
      // TODO: Navigate to page for non authenticated users
      next({ name: "LoginPage" });
    }
  } else if (to.meta.onlyGuestUser) {
    if (authenticatedUser) {
      next({ name: "HomePage" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
