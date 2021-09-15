const {
  Task,
  Note,
  Category
} = require( './models' );

class ManageTasksScreen {
  constructor( rl ) {
    this.rl = rl;
    this.index = 0;
  }

  async printUi() {
    console.clear();
    console.log( "********************************************" );
    console.log( "* TO-DO ITEMS                   (c) 1987   *" );
    console.log( "********************************************" );
    console.log();

    console.log( 'NOTES' );
    const notes = await Note.findAll( {
      where: {
        completed: false
      }
    } );
    for ( let note of notes ) {
      console.log( `${note.id}. ${note.reminder.substring(0, 40)}...` );
    }
    console.log();

    console.log( 'TASKS' );
    const tasks = await Task.findAll( {
      where: {
        completed: false
      }
    } );
    for ( let task of tasks ) {
      console.log( `${task.id}. ${task.title.substring(0, 40)}...` );
    }

    console.log();
    console.log( "A. Add a new item" );
    console.log( "X. Return to main menu" );
    console.log( "C. Continue" );
    console.log();
  }

  async show() {
    await this.printUi();
    this.rl.question( "> ", answer => {
      const index = Number.parseInt( answer );
      let screen = this;
      if ( answer === "A" ) {
        screen = new AddItemScreen( this.rl );
      } else if ( answer === "X" ) {
        screen = new MainScreen( this.rl );
      } else if ( !isNaN( index ) ) {
        screen = new ItemDetailScreen( this.rl, index );
      }
      screen.show();
    } );
  }
}

exports.ManageTasksScreen = ManageTasksScreen;

// Requires at bottom to prevent circular dependencies problems in node
const {
  AddItemScreen
} = require( './add-item-screen' );
const {
  MainScreen
} = require( './main-screen' );
const {
  ItemDetailScreen
} = require( './item-detail-screen' );
