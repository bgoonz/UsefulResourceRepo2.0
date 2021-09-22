import Service from "@ember/service";
import { inject as service } from "@ember/service";

export default Service.extend({
  store: service(),
  session: service("session"),
  currentUser: null,

  initUser() {
    const currentUser = this.get("currentUser");

    if (!currentUser) {
      this.get("session.store")
        .restore()
        .then(({ authenticated }) => {
          const parsedToken = this.parseJwt(authenticated.token);

          return this.createUser(parsedToken);
        });
    }
  },

  createUser(token) {
    let user = {};

    if (token.username && token.email) {
      user = this.get("store").peekRecord("user", token.userId);

      if (!user) {
        user = this.get("store").createRecord("user", {
          id: token.userId,
          username: token.username,
          email: token.email,
        });
      }

      this.set("currentUser", user);
    }

    return user;
  },

  getUser() {
    return this.get("currentUser");
  },

  parseJwt(token) {
    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");

      return JSON.parse(window.atob(base64));
    }

    return {};
  },
});
