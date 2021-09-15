import { createDocumentMigration } from "./migrate/createDocumentMigration";
import { getLatestMigrationId } from "./migrate/getLatestMigrationId";
import { migrations } from "./migrate/migrations";
import { client } from "./utils/admin/client";

const run = async () => {
  console.log(`=== Running fauna:migrate (env: ${process.env.NODE_ENV})`);

  const latestMigrationId = await getLatestMigrationId(client);

  for (const migration of migrations) {
    console.log(`Running migrations - Latest: ${latestMigrationId}`);

    const { action, id, name } = migration;
    try {
      if (latestMigrationId < id) {
        await action(client);
        await createDocumentMigration(client, { id, name });
        console.log(`✔ Migration ${id}: ${name}`);
      } else {
        console.log(`SKIP Migration ${id}: ${name}`);
      }
    } catch (error) {
      console.error(
        `✗ Migration ${id}: ${name}`.padEnd(50),
        `Error: ${error.message}`
      );
    }
  }
};

run().then(() => {
  console.log("fauna:migrate done");
});
