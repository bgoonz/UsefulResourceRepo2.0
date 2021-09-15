import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import { makeSchema } from '@nexus/schema'
import { resolvers } from '../graphql'

export const schema = makeSchema({
  types: resolvers,
  plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: __dirname + '/schema/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('../context.ts'),
        alias: 'Context',
      },
    ],
  },
})
