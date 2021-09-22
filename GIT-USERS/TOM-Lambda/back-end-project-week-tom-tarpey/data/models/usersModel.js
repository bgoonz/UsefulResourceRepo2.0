const db = require("../dbConfig");

module.exports = {
  // get method
  get: credentials => {
    return db("users")
      .where({ username: credentials.username })
      .first();
  },
  // insert method
  insert: user => {
    return db("users").insert(user);
  },
  // getNoteOrder method
  getNoteOrder: id => {
    return db("users")
      .where("id", id)
      .select("noteOrder")
      .first();
  },
  // updateNoteOrder method
  updateNoteOrder: (id, updatedNoteOrder) => {
    return db("users")
      .where("id", id)
      .update(updatedNoteOrder)
      .then(count => (count > 0 ? module.exports.getNoteOrder(id) : 0));
  }
};
