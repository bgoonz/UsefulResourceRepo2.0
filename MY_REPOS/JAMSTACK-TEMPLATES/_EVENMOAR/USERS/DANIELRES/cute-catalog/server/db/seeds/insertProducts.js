const amount = 14;

const { PLACEHOLDERS_BASE_URL } = process.env;

const products = [...Array(amount)].map((_, i) => ({
  title: `Item ${i + 1}`,
  description: `Hand-made thing ${i + 1} with shiny colors`,
  imageSrc: `${PLACEHOLDERS_BASE_URL}${i + 1}`,
}));

//eslint-disable-next-line no-unused-vars
exports.seed = (knex, Promise) =>
  knex("Product")
    .del()
    .then(() => knex("Product").insert(products));
