import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function () {
  this.route("login");
  this.route("signup");
  this.route("about");
  this.route("contact");
  this.route("rentals", function () {
    this.route("show", { path: "/:rental_id" });
    this.route("new");
  });
  this.route("home");
  this.route("my-bookings");
  this.route("my-rentals");
});

export default Router;
