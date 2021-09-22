exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      return knex("users").insert([
        {
          id: 1,
          username: "tom",
          password: "password",
          noteOrder: "[3, 2, 1]"
        }
      ]);
    });
};
