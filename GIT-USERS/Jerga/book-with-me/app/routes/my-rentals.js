import AuthenticatedRoute from "./authenticated";

export default AuthenticatedRoute.extend({
  model() {
    return this.get("store")
      .query("rental", { include: "bookings", customLookup: true })
      .then((data) => data)
      .catch((err) => {
        err;
      });
  },
});
