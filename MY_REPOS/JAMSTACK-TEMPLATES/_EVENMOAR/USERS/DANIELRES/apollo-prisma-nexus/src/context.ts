import { PrismaClient } from '@prisma/client'
import { PubSub } from 'apollo-server-express'

const prisma = new PrismaClient()
const pubsub = new PubSub()

export interface Context {
  prisma: PrismaClient
  pubsub: PubSub
}

export const createContext = (ctx: any): Context => {
  return {
    ...ctx,
    prisma,
    pubsub,
  }
}
