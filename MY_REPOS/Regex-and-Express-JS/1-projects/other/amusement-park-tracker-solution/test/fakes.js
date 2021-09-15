
class SequelizeQueryInterfaceFake {
  constructor() {
    this.insertTableName = null;
    this.insertRecords = null;
    this.deleteTableName = null;
  }

  bulkInsert(tableName, records) {
    this.insertTableName = tableName;
    this.insertRecords = records;
    return Promise.resolve(this.records);
  }

  bulkDelete(tableName) {
    this.deleteTableName = tableName;
    return Promise.resolve();
  }
}

module.exports = {
  SequelizeQueryInterfaceFake,
};
