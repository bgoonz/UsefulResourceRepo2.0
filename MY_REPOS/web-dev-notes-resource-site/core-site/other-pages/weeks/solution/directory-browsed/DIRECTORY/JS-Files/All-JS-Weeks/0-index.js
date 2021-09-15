// ./index.js
/*
const {
    sequelize
} = require( "./models" );

async function main() { //promise
    try {
        await sequelize.authenticate(); //authenticate method returns promise object
        //await to wait for the database connection to be established.
    } catch ( e ) {
        console.log( "Database connection failure." );
        console.log( e );
        return;
    }

    console.log( "Database connection success!" );
    console.log( "Sequelize is ready to use!" );

    // Close database connection when done with it.
    await sequelize.close();
    //Node.js JavaScript program will not terminate until all open files and database connections are closed.
}

main();

// Prints:
// Executing (default): SELECT 1+1 AS result
// Database connection success!
// Sequelize is ready to use!

*/


const {
    sequelize,
    Cat
} = require( "./models" );

async function main() {
    try {
        await sequelize.authenticate();
    } catch ( e ) {
        console.log( "Database connection failure." );
        console.log( e );
        return;
    }

    console.log( "Database connection success!" );
    console.log( "Sequelize is ready to use!" );

    const cat = await Cat.findByPk( 1 );
    console.log( cat.toJSON() );

    await sequelize.close();
}

main();

// This code prints:
//
// Executing (default): SELECT "id", "firstName", "specialSkill", "age", "createdAt", "updatedAt" FROM "Cats" AS "Cat" WHERE "Cat"."id" = 1;
// {
//   id: 1,
//   firstName: 'Markov',
//   specialSkill: 'sleeping',
//   age: 5,
//   createdAt: 2020-02-03T21:32:28.960Z,
//   updatedAt: 2020-02-03T21:32:28.960Z
// }
