import Route from "@ember/routing/route";
import AuthenticatedRoute from "./authenticated";

export default AuthenticatedRoute.extend({
  model() {
    return this.get("store").query("rental", { filter: { user: true } });
  },
});
