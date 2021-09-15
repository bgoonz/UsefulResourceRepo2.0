import firebase from "firebase";

var config = {
  apiKey: "AIzaSyAp5RheaOcKZGOEaWP1U-Z9DYo5hrGAcLs",
  authDomain: "jerga-todo-app-5e937.firebaseapp.com",
  databaseURL: "https://jerga-todo-app-5e937.firebaseio.com",
  storageBucket: "jerga-todo-app-5e937.appspot.com",
};

firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();

firebaseRef.set({
  app: {
    name: "Test app",
    version: "1.0.0",
  },
  isRunning: true,
  user: {
    name: "Andrew",
    age: 25,
  },
});

// var notesRef = firebaseRef.child('notes');
//
// notesRef.on("child_added", (snapshot)=> {
//     console.log("child added", snapshot.key, snapshot.val());
// });
//
// notesRef.on("child_changed", (snapshot)=> {
//     console.log("child_changed", snapshot.key, snapshot.val());
// });
//
// notesRef.on("child_removed", (snapshot)=> {
//     console.log("child_removed", snapshot.key, snapshot.val());
// });
//
// var newNoteRef = notesRef.push({
//     text: "walk the dog!!!"
// });
//
// console.log(newNoteRef.key);

var todosRef = firebaseRef.child("todos");

todosRef.on("child_added", (snapshot) => {
  console.log("Child_added: ", snapshot.val());
});

var newTodosRef = todosRef.push();

newTodosRef.set({
  text: "walk a moon",
});

todosRef.push({
  text: "i am lesss",
});

// firebaseRef.update({
//     isRunning: false,
//     "app/name" : "kokociny"
// });

// firebaseRef.child("app").update({
//     name: "I AM STRONGER"
// });

// // firebaseRef.set({
// //     appName : "ASDADS"
// // });
//
// firebaseRef.child('user').set({
//    name: "Mike"
// });
//
// firebaseRef.child('app').set({
//     name: "Super App"
// });

//firebaseRef.child('app/name').remove();

// firebaseRef.child('app').update({
//     version: "4.4",
//     name: null
// });

// firebaseRef.update({
//     isRunning: null
// });
//
// firebaseRef.child('user/age').remove();

// firebaseRef.child('app').once('value').then((snapshot) => {
//     console.log("got entire database", snapshot.key ,snapshot.val());
// }, (e) => {
//     console.log("Unable fetch value", e)
// });

// var logData = (snapshot) => {
//     console.log('Got value', snapshot.val());
// };
//
// firebaseRef.on('value', logData);
//
// firebaseRef.off(logData);
//
//
// firebaseRef.update({isRunning: false});

// var logger = (placeholder) => {
//     console.log("Loggind: ", placeholder.val());
// }
//
// firebaseRef.child('user').on('value', logger);
//
// firebaseRef.child('user').update({
//     name: "Filip"
// })
