/**
 * Created by ahadsheriff on 5/24/16.
 */

function greetUser(name) {
  if (typeof name === "undefined") {
    console.log("That is not a name");
  } else {
    console.log(name);
  }
}

greetUser("Ahad");
greetUser();
