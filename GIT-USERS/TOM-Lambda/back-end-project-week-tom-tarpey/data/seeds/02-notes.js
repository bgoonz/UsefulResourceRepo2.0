exports.seed = function(knex, Promise) {
  return knex("notes")
    .del()
    .then(function() {
      return knex("notes").insert([
        {
          id: 1,
          title: "Number 1 The Larch",
          content: "The Larch... The Larch!",
          user_id: 1
        },
        {
          id: 2,
          title: "Number 2 The Larch",
          content: "The Larch... The Larch!",
          user_id: 1
        },
        {
          id: 3,
          title: "Number 3 The Larch",
          content: "The Larch... The Larch!",
          user_id: 1
        }
      ]);
    });
};
