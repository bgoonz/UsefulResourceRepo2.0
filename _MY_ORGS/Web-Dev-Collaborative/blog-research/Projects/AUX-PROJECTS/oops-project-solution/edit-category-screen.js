// IMPORTANT! IMPORTANT!
// ---------------------------------------------------------------------
// ALL SCREEN CLASSES HAVE A this.state INSTANCE VARIABLE THAT HOLDS THE
// APPLICATION STATE CREATED IN THE program.js. WHENEVER YOUR CODE NEEDS
// TO INTERACT WITH THE STATE IN ONE OF THE FOLLOWING CLASSES, DO IT
// THROUGH THE this.state INSTANCE VARIABLE.

class EditCategoryScreen {
  constructor(rl, state, categoryIndex) {
    this.rl = rl;
    this.state = state;
    this.categoryIndex = categoryIndex;
  }

  printUi() {
    const category = this.state.getCategoryByIndex(this.categoryIndex);

    console.clear();
    console.log("********************************************");
    console.log("* EDIT CATEGORY                 (c) 1987   *");
    console.log("********************************************");
    console.log();
    console.log(`You are editing \"${category}\".`);
    console.log();
    console.log("What would you like to rename it? Hit");
    console.log("\"Enter\" when you are done.");
    console.log();
  }

  show() {
    this.printUi();
    this.rl.question("> ", answer => {
      this.state.setCategory(this.categoryIndex, answer);
      this.state.save();
      new ManageCategoriesScreen(this.rl, this.state).show();
    });
  }
}

exports.EditCategoryScreen = EditCategoryScreen;

// Requires at bottom to prevent circular dependencies problems in node
const { ManageCategoriesScreen } = require('./manage-categories-screen');
