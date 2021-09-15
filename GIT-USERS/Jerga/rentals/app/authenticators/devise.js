import Devise from "ember-simple-auth/authenticators/devise";
import config from "../config/environment";

export default Devise.extend({
  serverTokenEndpoint: config.RENTAL_API + "/api/v1/auth",
});
