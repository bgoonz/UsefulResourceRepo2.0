// IMPORTANT! IMPORTANT!
// ---------------------------------------------------------------------
// ALL SCREEN CLASSES HAVE A this.state INSTANCE VARIABLE THAT HOLDS THE
// APPLICATION STATE CREATED IN THE program.js. WHENEVER YOUR CODE NEEDS
// TO INTERACT WITH THE STATE IN ONE OF THE FOLLOWING CLASSES, DO IT
// THROUGH THE this.state INSTANCE VARIABLE.

class ItemDetailScreen {
  constructor(rl, state, index) {
    this.rl = rl;
    this.state = state;
    this.index = index;
  }

  printNoteUi(item) {
    console.clear();
    console.log("********************************************");
    console.log("* TO-DO ITEM (NOTE)             (c) 1987   *");
    console.log("********************************************");
    console.log();
    console.log(item.text);
    console.log();
  }

  printTaskUi(item) {
    console.clear();
    const category = this.state.getCategoryByIndex(item.categoryIndex);
    console.log("********************************************");
    console.log("* TO-DO ITEM (TASK)             (c) 1987   *");
    console.log("********************************************");
    console.log();
    console.log(`TITLE: ${item.title}`);
    console.log(`CATEGORY: ${category}`);
    console.log("DESCRIPTION");
    console.log(item.description);
    console.log();
  }

  show() {
    const item = this.state.getItemByIndex(this.index);
    if (item) {
      if (item.type === "Note") {
        this.printNoteUi(item);
      } else {
        this.printTaskUi(item);
      }
      console.log('Type "C" and hit "Enter" to complete this');
      console.log("task and return to the list screen. Just");
      console.log('hit "Enter" to return to the list screen.');
      this.rl.question("> ", (answer) => {
        if (answer === "C") {
          item.complete();
          this.state.save();
        }
        const screen = new ManageTasksScreen(this.rl, this.state);
        screen.show();
      });
    } else {
      const screen = new ManageTasksScreen(this.rl, this.state);
      screen.show();
    }
  }
}

exports.ItemDetailScreen = ItemDetailScreen;

// Requires at bottom to prevent circular dependencies problems in node
const { ManageTasksScreen } = require("./manage-task-screen");
