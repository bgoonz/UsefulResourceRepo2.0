const test = require("tape");
const { knex, cleanDb, setup, teardown, samples } = require("../test/support");

const User = require("./user");

test("User.create", async t => {
  await cleanDb();
  const { alice } = samples;
  const result = await User.create(alice);
  t.equal(result.sub, alice.sub);
  t.equal(result.name, alice.name);
  t.equal(result.email, alice.email);
  t.end();
});

test("User.createTenant", async t => {
  await cleanDb();
  const { alice } = samples;
  const dbAlice = await User.create(alice);
  const dbTenant = await User.createTenant(dbAlice, { name: "Acme" });
  const relation = await knex("TenantUserRelation").first();
  t.equal(dbTenant.name, "Acme");
  t.equal(relation.userId, dbAlice.id);
  t.equal(relation.type, "owner");
  t.equal(relation.tenantId, dbTenant.id);
  t.end();
});

test("User.getTenant", async t => {
  await cleanDb();
  const { alice } = samples;
  const dbAlice = await User.create(alice);
  const t1 = await User.createTenant(dbAlice, { name: "aTenant1" });
  const t2 = await User.createTenant(dbAlice, { name: "aTenant2" });

  const aT1 = await User.getTenant(dbAlice, t1.shortId);
  const aT2 = await User.getTenant(dbAlice, t2.shortId);

  t.deepEqual(aT1.name, "aTenant1");
  t.deepEqual(aT2.name, "aTenant2");

  t.end();
});

test("User.getTenants", async t => {
  await cleanDb();
  const { alice, bob } = samples;
  const dbAlice = await User.create(alice);
  const dbBob = await User.create(bob);
  await User.createTenant(dbAlice, { name: "aTenant1" });
  await User.createTenant(dbAlice, { name: "aTenant2" });
  await User.createTenant(dbBob, { name: "bTenant1" });
  await User.createTenant(dbBob, { name: "bTenant2" });

  const aTenants = await User.getTenants(dbAlice);
  const bTenants = await User.getTenants(dbBob);

  t.deepEqual(
    aTenants.map(t => t.name),
    ["aTenant1", "aTenant2"]
  );
  t.deepEqual(
    bTenants.map(t => t.name),
    ["bTenant1", "bTenant2"]
  );

  t.end();
});

test("(teardown)", teardown);
