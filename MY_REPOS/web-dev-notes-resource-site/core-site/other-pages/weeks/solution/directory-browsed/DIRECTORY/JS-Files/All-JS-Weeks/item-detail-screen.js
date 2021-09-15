const {
  Task,
  Note,
  Category
} = require( './models' );

class ItemDetailScreen {
  constructor( rl, detailId ) {
    this.rl = rl;
    this.detailId = detailId;
  }

  async printNoteUi( item ) {
    console.clear();
    console.log( "********************************************" );
    console.log( "* TO-DO ITEM (NOTE)             (c) 1987   *" );
    console.log( "********************************************" );
    console.log();

    console.log( item.reminder );

    console.log();
  }

  async printTaskUi( item ) {
    console.clear();
    console.log( "********************************************" );
    console.log( "* TO-DO ITEM (TASK)             (c) 1987   *" );
    console.log( "********************************************" );
    console.log();

    console.log( `TITLE: ${item.title}` );
    console.log( `CATEGORY: ${item.Category.name}` );
    console.log();
    console.log( item.description );

    console.log();
  }

  async show() {
    let item = await Task.findByPk( this.detailId, {
      include: Category
    } );
    if ( !item ) {
      item = await Note.findByPk( this.detailId );
    }

    if ( item ) {
      if ( item.reminder !== undefined ) {
        await this.printNoteUi( item );
      } else {
        await this.printTaskUi( item );
      }
      console.log( "Type \"C\" and hit \"Enter\" to complete this" );
      console.log( "task and return to the list screen. Just" );
      console.log( "hit \"Enter\" to return to the list screen." );
      this.rl.question( "> ", async answer => {
        if ( answer === "C" ) {

          item.completed = true;
          await item.save();

        }
        const screen = new ManageTasksScreen( this.rl );
        screen.show();
      } );
    } else {
      const screen = new ManageTasksScreen( this.rl );
      screen.show();
    }
  }
}

exports.ItemDetailScreen = ItemDetailScreen;

// Requires at bottom to prevent circular dependencies problems in node
const {
  ManageTasksScreen
} = require( './manage-task-screen' );
