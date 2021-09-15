// TODO: import your models, here

class EditCategoryScreen {
  constructor(rl, categoryId) {
    this.rl = rl;
    this.categoryId = categoryId;
  }

  async printUi() {
    // TODO: Get the category by its index

    console.clear();
    console.log("********************************************");
    console.log("* EDIT CATEGORY                 (c) 1987   *");
    console.log("********************************************");
    console.log();

    // TODO: Show the category name here

    console.log();
    console.log("What would you like to rename it? Hit");
    console.log("\"Enter\" when you are done.");
    console.log();
  }

  async show() {
    await this.printUi();
    this.rl.question("> ", newCategoryName => {

      // TODO: Get the category by its categoryId that was passed in through the
      //       constructor and is stored in this.categoryId
      // TODO: Update it with the new category name
      // TODO: Save it

      new ManageCategoriesScreen(this.rl).show();
    });
  }
}

exports.EditCategoryScreen = EditCategoryScreen;

// Requires at bottom to prevent circular dependencies problems in node
const { ManageCategoriesScreen } = require('./manage-categories-screen');
