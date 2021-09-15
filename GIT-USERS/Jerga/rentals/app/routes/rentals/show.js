import AuthenticatedRoute from "../authenticated";

export default AuthenticatedRoute.extend({
  model(params) {
    return this.get("store").findRecord("rental", params.rental_id, {
      include: "user,bookings",
    });
  },
});
