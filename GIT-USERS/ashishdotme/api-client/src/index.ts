/**
 *
 * Ashish Patel
 * e: ashishsushilPatel@gmail.com
 * w: https://ashish.me
 *
 */

import { TodoRequest, TodoResponse } from '@ashishdotme/sdk/todo';
import Axios, { AxiosInstance, Method } from 'axios';

class APIClient {
  private axios: AxiosInstance;
  private async req<T>(method: Method, url: string, body?: any): Promise<T>;
  private async req<T>(method: Method, url: string, body?: any): Promise<T> {
    const res = (await this.axios.request({ method, url, data: body })).data;
    return res;
  }

  todos = {
    getAll: async () => this.req<TodoResponse[]>('GET', `/todos`),
    create: async (params: TodoRequest) => this.req('POST', `/todos`, params),
  };
  constructor(baseURL = 'https://api.prod.ashish.me') {
    this.axios = Axios.create({ baseURL: baseURL });
  }
}

export const API = new APIClient();
