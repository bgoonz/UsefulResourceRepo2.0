const Command = require("./Command");
const colors = require("colors");

class View extends Command {
  constructor(query = {}) {
    super();
    this.query = query;
  }

  execute(db) {
    const results = db.getPost(this.query);
    results.forEach((post) =>
      console.log(
        `${colors.green(post.title)} [${colors.red(post.timestamp)}] : ${
          post.content
        }`
      )
    );
  }
}

module.exports = View;
