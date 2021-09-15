import Service from "@ember/service";
const { service } = Ember.inject;

export default Service.extend({
  user: null,
  session: service("session"),
  jwt: service("jwt"),
  storage: service("storage"),
  store: service(),

  init() {
    this.get("session.store")
      .restore()
      .then(({ authenticated }) => {
        const parsedToken = this.get("jwt").parseJwt(authenticated.token);
        const newUser = this.createUser(parsedToken);

        this.set("user", newUser);
      });
  },

  createUser(token) {
    if (token.name && token.email) {
      return this.get("store").createRecord("user", {
        name: token.name,
        email: token.email,
      });
    }

    return {};
  },

  isAuthenticatedUser(rentalUser) {
    return user.email === rentalUser.email;
  },
});
