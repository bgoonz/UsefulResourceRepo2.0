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
        next({ name: "Welcome" });
      } else {
        next();
      }
    } else {
      next();
    }
  });
});
