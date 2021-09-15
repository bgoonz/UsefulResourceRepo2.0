import Route from "@ember/routing/route";
import AuthenticatedRoute from "./authenticated";

export default AuthenticatedRoute.extend({
  model(params) {
    return this.get("store").query("booking", { include: "rental" });
  },
});
