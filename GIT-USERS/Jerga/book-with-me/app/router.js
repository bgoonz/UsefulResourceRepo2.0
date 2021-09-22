import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {
  this.route("rentals", function () {
    this.route("show", { path: "/:rental_id" });
    this.route("new");
  });
  this.route("homes", { path: "rentals/:city/homes" });
  this.route("my-rentals", { path: "manage/rentals" });
  this.route("my-bookings", { path: "manage/bookings" });
  this.route("register");
  this.route("login");
});

export default Router;
