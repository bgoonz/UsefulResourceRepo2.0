const db = require("../dbConfig");

module.exports = {
  // get method
  get: id => {
    let query = db("notes");

    if (id) {
      return query.where("id", id).first();
    }

    return query;
  },

  // insert method
  insert: note => {
    console.log(note);
    return db("notes")
      .insert(note)
      .then(([id]) => module.exports.get(id));
  },
  // update method
  update: (id, editedNote) => {
    return (
      db("notes")
        .where("id", id)
        .update(editedNote)
        // get the id if there are more than 0 records otherwise get 0
        .then(count => (count > 0 ? module.exports.get(id) : 0))
    );
  },
  // delete method
  delete: id => {
    return db("notes")
      .where("id", id)
      .del();
  }
};
