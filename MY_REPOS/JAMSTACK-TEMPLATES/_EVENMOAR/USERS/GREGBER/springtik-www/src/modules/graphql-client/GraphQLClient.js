export default class GraphQLClient {
  constructor(adapter) {
    this.adapter = adapter;
  }

  useAdapter(adapter) {
    this.adapter = adapter;
  }

  fetch(...args) {
    return this.adapter.fetch(...args);
  }
}
