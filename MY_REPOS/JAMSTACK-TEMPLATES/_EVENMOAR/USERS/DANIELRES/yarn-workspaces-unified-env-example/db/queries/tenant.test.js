const test = require("tape");
const { knex, cleanDb, setup, teardown, samples } = require("../test/support");

const { Tenant, User } = require(".");

test("(setup)", setup);

test("Tenant.getOwner", async t => {
  await cleanDb();

  const { alice, bob } = samples;
  const dbAlice = await User.create(alice);
  const dbBob = await User.create(bob);
  const aTenant1 = await User.createTenant(dbAlice, { name: "aTenant1" });
  const aTenant2 = await User.createTenant(dbAlice, { name: "aTenant2" });
  const bTenant1 = await User.createTenant(dbBob, { name: "bTenant1" });
  const bTenant2 = await User.createTenant(dbBob, { name: "bTenant2" });

  const actual1 = await Tenant.getOwner(aTenant1);
  const actual2 = await Tenant.getOwner(bTenant2);

  t.deepEqual(actual1, dbAlice);
  t.deepEqual(actual2, dbBob);

  t.end();
});

test("Tenant.getUsers", async t => {
  await cleanDb();

  const { alice, bob } = samples;
  const dbAlice = await User.create(alice);
  const aTenant1 = await User.createTenant(dbAlice, { name: "aTenant1" });
  const result = await Tenant.getUsers(aTenant1);

  t.end();
});
