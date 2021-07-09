const knex = require("knex");
const config = require("../../knexfile.js");
const db = knex(config.development);

module.exports = {
  find,
  findById,
  add,
  remove,
  update,
  findDogs,
};

function find(query) {
  const { page = 1, limit = 2, sortby = "id", sortdir = "asc" } = query;
  const offset = limit * (page - 1);

  const rows = db("adopters")
    .orderBy(sortby, sortdir)
    .limit(limit)
    .offset(offset);

  return rows;
}

function findById(id) {
  return db("adopters").where({ id }).first();
}

async function add(adopter) {
  const [id] = await db("adopters").insert(adopter);

  return findById(id);
}

function remove(id) {
  return db("adopters").where({ id }).del();
}

function update(id, changes) {
  return db("adopters").where({ id }).update(changes, "*");
}

function findDogs(adopterId) {
  return db("adopters as a")
    .join("dogs as d", "a.id", "d.adopter_id")
    .select("a.id", "a.name", "a.email", "d.id as dog_id", "d.name as dog_name")
    .where({ "a.id": adopterId });
}
