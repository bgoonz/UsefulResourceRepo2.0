// IMPORTANT! IMPORTANT!
// ---------------------------------------------------------------------
// ALL SCREEN CLASSES HAVE A this.state INSTANCE VARIABLE THAT HOLDS THE
// APPLICATION STATE CREATED IN THE program.js. WHENEVER YOUR CODE NEEDS
// TO INTERACT WITH THE STATE IN ONE OF THE FOLLOWING CLASSES, DO IT
// THROUGH THE this.state INSTANCE VARIABLE.

class ManageTasksScreen {
  constructor(rl, state) {
    this.rl = rl;
    this.state = state;
    this.index = 0;
  }

  printUi() {
    console.clear();
    console.log("********************************************");
    console.log("* TO-DO ITEMS                   (c) 1987   *");
    console.log("********************************************");
    console.log();

    let numberOfRows = process.stdout.rows - 10;
    for (let i = this.index; i < this.state.getItemCount(); i += 1) {
      if (this.state.getItemIsIncomplete(i)) {
        numberOfRows -= 1;
        console.log(`${i}. ${this.state.getItemListText(i)}`);
      }
      if (numberOfRows <= 0) {
        break;
      }
    }

    console.log();
    console.log("A. Add a new item");
    console.log("X. Return to main menu");
    console.log("C. Continue");
    console.log();
  }

  show() {
    this.printUi();
    this.rl.question("> ", (answer) => {
      const index = Number.parseInt(answer);
      let screen = this;
      if (answer === "A") {
        screen = new AddItemScreen(this.rl, this.state);
      } else if (answer === "X") {
        screen = new MainScreen(this.rl, this.state);
      } else if (!isNaN(index)) {
        screen = new ItemDetailScreen(this.rl, this.state, index);
      }
      screen.show();
    });
  }
}

exports.ManageTasksScreen = ManageTasksScreen;

// Requires at bottom to prevent circular dependencies problems in node
const { AddItemScreen } = require("./add-item-screen");
const { MainScreen } = require("./main-screen");
const { ItemDetailScreen } = require("./item-detail-screen");
