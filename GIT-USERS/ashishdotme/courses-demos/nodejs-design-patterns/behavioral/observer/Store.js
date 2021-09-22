const events = require("./Eventbus");
const colors = require("colors");

class Store {
  constructor() {
    events.on("new-post", (data) => this.writeToDb(data));
  }

  writeToDb({ topic, message }) {
    console.log(
      colors.red(
        `STORE ::: Storing "${colors.yellow(
          message
        )}" under TOPICS :: ${topic.toUpperCase()}`
      )
    );
  }
}

module.exports = new Store();
