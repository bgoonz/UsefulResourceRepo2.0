import Devise from "ember-simple-auth/authenticators/devise";

export default Devise.extend({
  serverTokenEndpoint: "/api/v1/auth",
});
