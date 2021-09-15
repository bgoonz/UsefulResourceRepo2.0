import AuthenticatedRoute from "./authenticated";

export default AuthenticatedRoute.extend({
  model() {
    return this.get("store").query("booking", { include: "rentals" });
  },
});
