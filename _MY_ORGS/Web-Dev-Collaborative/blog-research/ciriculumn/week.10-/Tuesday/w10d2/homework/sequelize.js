// npm init
// npm install sequelize@^ 5.0.0
// npm install sequelize - cli@^ 5.0.0
// npm install pg@^ 8.0.0
// npx sequelize init SETS UP FOLDER


const { sequelize } = require("./models");

async function main() {
    try {
        await sequelize.authenticate();
    } catch (e) {
        console.log("Database connection failure.");
        console.log(e);
        return;
    }

    console.log("Database connection success!");
    console.log("Sequelize is ready to use!");

    // Close database connection when done with it.
    await sequelize.close();
}

main();

// Prints:
//
// Executing (default): SELECT 1+1 AS result
// Database connection success!
// Sequelize is ready to use!
