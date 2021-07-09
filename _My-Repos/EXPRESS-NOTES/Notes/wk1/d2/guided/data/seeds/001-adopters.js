exports.seed = function (knex) {
  return knex("adopters").insert([
    { name: "Jane", email: "jane@jane.com" },
    { name: "Paul", email: "paul@paul.com" },
    { name: "Sarah", email: "sarah@sarah.com" },
    { name: "Peter", email: "peter@peter.com" },
    { name: "Nabeelah", email: "nabeelah@nabeelah.com" },
  ]);
};
