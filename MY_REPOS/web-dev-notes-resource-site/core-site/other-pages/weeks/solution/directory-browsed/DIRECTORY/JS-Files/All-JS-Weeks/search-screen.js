const {
  Task,
  Note,
  Sequelize
} = require( './models' );

class SearchScreen {
  constructor( rl ) {
    this.rl = rl;
  }

  async printUi() {
    console.clear();
    console.log( "********************************************" );
    console.log( "* SEARCH ITEMS                  (c) 1987   *" );
    console.log( "********************************************" );
    console.log();
    console.log( "Please type your search term and hit Enter." );
    console.log();
  }

  async printResultsUi( term ) {
    console.clear();
    console.log( "********************************************" );
    console.log( "* SEARCH RESULTS                (c) 1987   *" );
    console.log( "********************************************" );
    console.log();
    console.log( "Your search matches" );
    console.log();

    console.log( 'NOTES' );
    const notes = await Note.findAll( {
      where: {
        reminder: {
          [ Sequelize.Op.substring ]: term
        }
      }
    } );
    for ( let note of notes ) {
      console.log( `${note.reminder.substring(40)}...` );
    }
    console.log();

    console.log( 'TASKS' );
    const tasks = await Task.findAll( {
      where: {
        title: {
          [ Sequelize.Op.substring ]: term
        }
      }
    } );
    for ( let task of tasks ) {
      console.log( `${task.title.substring(40)}...` );
    }

    console.log();
  }

  async show() {
    await this.printUi();
    this.rl.question( "> ", async term => {
      await this.printResultsUi( term );
      this.rl.question( "Enter to return to the main screen. ", () => {
        const screen = new MainScreen( this.rl );
        screen.show();
      } );
    } );
  }
}

exports.SearchScreen = SearchScreen;

const {
  MainScreen
} = require( './main-screen' );
