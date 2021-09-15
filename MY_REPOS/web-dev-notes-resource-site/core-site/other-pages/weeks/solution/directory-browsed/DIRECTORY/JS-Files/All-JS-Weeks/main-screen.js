const {
  sequelize
} = require( './models' );

class MainScreen {
  constructor( rl ) {
    this.rl = rl;
  }

  async printUi() {
    console.clear();
    console.log( "********************************************" );
    console.log( "* TO-DO FOR YOU!!!!!            (c) 1987   *" );
    console.log( "********************************************" );
    console.log();
    console.log( "Please choose one of the following options:" );
    console.log( "1. Review my to-do items" );
    console.log( "2. Search for a to-do item" );
    console.log( "3. Manage categories" );
    console.log();
    console.log( "X. Exit" );
    console.log();
    console.log( "Type a number to go to another screen. Type" );
    console.log( "an X to return to the main menu." );
  }

  async show() {
    await this.printUi();
    this.rl.question( "> ", async answer => {
      let screen = this;
      if ( answer === "1" ) {
        screen = new ManageTasksScreen( this.rl );
      } else if ( answer === "2" ) {
        screen = new SearchScreen( this.rl );
      } else if ( answer === "3" ) {
        screen = new ManageCategoriesScreen( this.rl );
      } else if ( answer === "X" ) {
        console.clear();
        this.rl.close();
        await sequelize.close();
        return;
      }
      screen.show();
    } );
  }
}

exports.MainScreen = MainScreen;

// Requires at bottom to prevent circular dependencies problems in node
const {
  ManageCategoriesScreen
} = require( './manage-categories-screen' );
const {
  ManageTasksScreen
} = require( './manage-task-screen' );
const {
  SearchScreen
} = require( './search-screen' );
