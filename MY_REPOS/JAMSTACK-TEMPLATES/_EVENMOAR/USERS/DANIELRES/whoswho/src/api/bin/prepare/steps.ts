import { Client } from "faunadb";
import { createCollectionMigrations } from "./createCollectionMigrations";
import { createIndexMigrationIds } from "./createIndexMigrationIds";

export const steps = [
  (client: Client) => ({
    name: `create db "_migrations"`,
    action: () => createCollectionMigrations(client),
  }),
  (client: Client) => ({
    name: `create reverse index "migration_ids"`,
    action: () => createIndexMigrationIds(client),
  }),
];
