const shortid = require("shortid");
const { knex } = require("../index");

const getTenants = ({ id }) =>
  knex("Tenant")
    .select(
      "Tenant.*",
      "TenantUserRelation.type",
      "TenantUserRelation.createdAt as joinedAt"
    )
    .leftJoin("TenantUserRelation", "Tenant.id", "TenantUserRelation.tenantId")
    .where("TenantUserRelation.userId", id);

module.exports = {
  create: async args =>
    (
      await knex("User")
        .insert(args)
        .returning("*")
    )[0],

  findBySub: sub =>
    knex("User")
      .where("sub", sub)
      .first(),

  getTenants: getTenants,

  getTenant: ({ id }, shortId) =>
    getTenants({ id })
      .andWhere("Tenant.shortId", shortId)
      .first(),

  createTenant: (user, args) => {
    const shortId = shortid.generate();
    return knex.transaction(async tx => {
      const tenant = (
        await knex("Tenant")
          .transacting(tx)
          .insert({ ...args, shortId })
          .returning("*")
      )[0];
      const relation = await knex("TenantUserRelation")
        .transacting(tx)
        .insert({
          userId: user.id,
          tenantId: tenant.id,
          type: "owner"
        });
      return tenant;
    });
  }
};
