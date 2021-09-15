// function getTempCallback (location, callback){
//     callback(undefined, 78);
//     callback("City not found");
// }

// getTempCallback("Philadelphia", function (err, temp){
//     if(err){
//         console.log("error", err);
//     }
//     else {
//         console.log("success", temp)
//     }
// });

// function getTempPromise (location) {
//     return new Promise(function (resolve, reject) {
//         setTimeout(function(){
//         resolve(79);
//         reject("City not found");
//         }, 1000);
//     });
// }

// getTempPromise("Philadelphia").then(function(temp) {
//   console.log("promise success", temp);
// }, function (err) {
//     console.log("promise error", err);
// });

// function addPromise(num1, num2){
//     return new Promise(function(resolve, reject){
//       if(arguments.length <= 2 && ( typeof num1 === "number" && typeof num2 === "number")){
//           resolve(num1+num2);
//       } else{
//           reject("Cannot add these numbers");
//       }
//     });
// }

// addPromise(85, 12).then(function(sum){
//   console.log("success", sum)
// }, function(err){
//     console.log("Error: ", err);
// });
