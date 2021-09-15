import Base from "ember-simple-auth/authorizers/base";

export default Base.extend({
  authorize(data, block) {
    const userToken = data["token"];
    if (userToken) {
      block("Authorization", `Bearer ${userToken}`);
    }
  },
});
