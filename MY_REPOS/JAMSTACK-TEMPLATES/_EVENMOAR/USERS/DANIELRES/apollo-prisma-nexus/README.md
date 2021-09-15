# GraphQL Apollo Server

### 1. Start the GraphQL server

Launch your GraphQL server with this command:

```
npm run dev
```

<Details><Summary><strong>API operations</strong></Summary>

## Evolving the app

Evolving the application typically requires four subsequent steps:

1. Migrating the database schema using SQL `npx prisma migrate save --experimental` and
   `npx prisma migrate up --experimental`
2. Updating your Prisma schema by introspecting the database with `prisma introspect`
3. Generating Prisma Client to match the new database schema with `prisma generate`
4. Using the updated Prisma Client in your application code

### 2. Introspect your database

```
npx prisma introspect
```

With the updated Prisma schema, you can now also update the Prisma Client API with the following command:

### 3. Generate a datamodel from the database

```
npx prisma generate
```

### 4. Migrate the database with new Datamodel

This saves the migration to the folder structure

```
npx prisma migrate save --experimental

```

This deploys the migration to the database and adds it to the migration table there

```
npx prisma migrate up --experimental
```
