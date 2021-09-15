import _ApolloServer from './ApolloServer'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import { createServer } from 'http'
import { nextTick } from 'process'

const app = express()

const corsOptions = {
  credentials: true,
  origin: process.env.CORS_ORIGIN,
  methods: 'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  allowedHeaders:
    'Origin, Authorization, X-Requested-With, Content-Type, Accept',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use('/graphql', async (req, res, next) => {
  console.log('run function before the thing')
  next()
})

_ApolloServer.applyMiddleware({ app, cors: corsOptions })

const httpServer = createServer(app)

_ApolloServer.installSubscriptionHandlers(httpServer)

httpServer.listen(
  {
    port: `4000`,
  },
  () => {
    console.log(`${
      process.env.NODE_ENV === `development`
        ? `🚀 Prisma server is on ${process.env.PRISMA_ENDPOINT}`
        : ``
    }
  `)
    console.log(`${
      process.env.NODE_ENV === `development`
        ? `🚀 Subscriptions ready on __________`
        : ``
    }
  `)
    console.log(`${
      process.env.NODE_ENV === `development`
        ? `👾 Server ready on http://localhost:4000/graphql`
        : ``
    }
  `)
  },
)
