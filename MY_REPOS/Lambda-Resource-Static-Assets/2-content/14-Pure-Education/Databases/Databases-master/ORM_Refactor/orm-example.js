/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

import Sequelize from "sequelize";

const sequelize = new Sequelize("chat", "bacon", "pass");
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
const User = sequelize.define('User', {
  user_name: Sequelize.STRING,
});

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
User.sync().success(() => {
  /* This callback function is called once sync succeeds. */

  // now instantiate an object and save it:
  const newUser = User.build({user_name: "Jean Valjean"});
  newUser.save().success(() => {

    /* This callback function is called once saving succeeds. */

    // Retrieve objects from the database:
    User.findAll({ where: {user_name: "Jean Valjean"} }).success(usrs => {
      // This function is called back with an array of matches.
      for (let i = 0; i < usrs.length; i++) {
        console.log(`${usrs[i].user_name} exists`);
      }
    });
  });
});
