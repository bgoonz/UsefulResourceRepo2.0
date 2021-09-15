import Route from "@ember/routing/route";
import RouteMixin from "ember-cli-pagination/remote/route-mixin";

export default Route.extend(RouteMixin, {
  perPage: 6,

  queryParams: {
    page: {
      refreshModel: true,
    },
    city: {
      refreshModel: true,
    },
  },

  model(params) {
    return this.findPaged("rental", params, { include: "users" });
  },
});
