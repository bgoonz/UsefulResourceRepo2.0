class Invoker {
  constructor(db) {
    this.db = db;
    this.stack = [];
  }

  execute(command) {
    this.stack.push(command);
    command.execute(this.db);
  }

  undo() {
    const lastCommand = this.stack.pop();
    if (lastCommand) lastCommand.undo(this.db);
  }
}

module.exports = Invoker;
