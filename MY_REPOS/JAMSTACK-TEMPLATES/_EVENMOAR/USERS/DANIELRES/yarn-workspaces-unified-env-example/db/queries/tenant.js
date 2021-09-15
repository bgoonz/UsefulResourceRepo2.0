const { knex } = require("../index");

const getUsers = ({ id }) =>
  knex("User")
    .select("User.*")
    .leftJoin("TenantUserRelation", "User.id", "TenantUserRelation.userId")
    .where("TenantUserRelation.tenantId", id);

module.exports = {
  getOwner: ({ id }) =>
    getUsers({ id })
      .andWhere("TenantUserRelation.type", "owner")
      .first(),

  getUsers
};
