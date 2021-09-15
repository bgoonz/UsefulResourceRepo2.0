import * as http from 'http'
import * as https from 'https'
import { GraphQLClient } from 'graphql-request'
const debug = require('debug')('TestClient')
import { GraphQLServer } from 'graphql-yoga'
import { server } from '../src'

export default class TestClient {
  app: GraphQLServer
  server: http.Server
  address: any
  client: GraphQLClient
  initPromise: Promise<void>
  constructor() {
    this.app = server
    this.initPromise = this.init()
    debug({ address: this.address })
  }
  async init(): Promise<void> {
    if (!this.server) {
      this.server = (await this.app.start({
        port: 0,
        debug: false,
      })) as any
    }
    const { port }: any = this.server.address()
    const protocol = this.server instanceof https.Server ? 'https' : 'http'
    this.address = `${protocol}://127.0.0.1:${port}/`
    this.client = new GraphQLClient(this.address)
  }
  async request<T = any>(
    query: string,
    variables?: any,
    headers?: any,
  ): Promise<any> {
    debug(this.address, query, variables)
    await this.initPromise
    if (headers) {
      return new GraphQLClient(this.address, { headers }).request(
        query,
        variables,
      )
    }
    return this.client.request<T>(query, variables)
  }
}