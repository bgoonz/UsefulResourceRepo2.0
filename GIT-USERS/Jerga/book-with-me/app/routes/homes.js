import Route from "@ember/routing/route";

export default Route.extend({
  model(params) {
    this.updateController("errors", "");
    return this.get("store")
      .query("rental", { filter: { city: params.city } })
      .then((data) => {
        return data;
      })
      .catch((reason) => {
        this.updateController("errors", reason.errors);
        return [];
      });
  },

  updateController(field, value) {
    const obj = {};
    obj[field] = value;
    this.controllerFor("homes").setProperties(obj);
  },
});
