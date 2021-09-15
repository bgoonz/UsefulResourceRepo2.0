import { ApolloServer } from 'apollo-server-express'
import { schema } from './schema/makeSchema'
import { createContext } from './context'

const _ApolloServer = new ApolloServer({
  schema,
  context: createContext,
  tracing: process.env.NODE_ENV === 'development',
  playground: process.env.NODE_ENV === 'development',
})

export default _ApolloServer
