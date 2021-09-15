// IMPORTANT! IMPORTANT!
// ---------------------------------------------------------------------
// ALL SCREEN CLASSES HAVE A this.state INSTANCE VARIABLE THAT HOLDS THE
// APPLICATION STATE CREATED IN THE program.js. WHENEVER YOUR CODE NEEDS
// TO INTERACT WITH THE STATE IN ONE OF THE FOLLOWING CLASSES, DO IT
// THROUGH THE this.state INSTANCE VARIABLE.

class ManageCategoriesScreen {
  constructor(rl, state) {
    this.rl = rl;
    this.state = state;
  }

  printUi() {
    console.clear();
    console.log("********************************************");
    console.log("* CATEGORIES                    (c) 1987   *");
    console.log("********************************************");
    console.log();
    for (let i = 0; i < this.state.getCategoryCount(); i += 1) {
      console.log(`${i + 1}. ${this.state.getCategoryByIndex(i)}`);
    }
    console.log();
    console.log("X. Go to main screen");
    console.log();
    console.log("Type a number to edit a category. Type an X");
    console.log("to return to the main menu.");
  }

  show() {
    this.printUi();
    this.rl.question("> ", answer => {
      if (["1", "2", "3", "4", "5"].includes(answer)) {
        const index = Number.parseInt(answer) - 1;
        new EditCategoryScreen(this.rl, this.state, index).show();
      } else {
        new MainScreen(this.rl, this.state).show();
      }
    });
  }
}

exports.ManageCategoriesScreen = ManageCategoriesScreen;

// Requires at bottom to prevent circular dependencies problems in node
const { EditCategoryScreen } = require('./edit-category-screen');
const { MainScreen } = require('./main-screen');
