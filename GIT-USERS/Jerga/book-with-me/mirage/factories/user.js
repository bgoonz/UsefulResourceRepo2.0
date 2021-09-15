import { Factory } from "ember-cli-mirage";
import bcrypt from "npm:bcryptjs";

export default Factory.extend({
  id(i) {
    return i;
  },
  username: "Test User",
  email: "test@gmail.com",
  password() {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync("testtest", salt);
  },
});
