import Service from "@ember/service";

export default Service.extend({
  saveItem(key, value) {
    localStorage.setItem(key, value);
  },

  getItem(key) {
    return localStorage.getItem(key);
  },

  deleteItem(key) {
    localStorage.removeItem(key);
  },
});
