module.exports = {
  filter: require("./lib/filter.js"),
  map: require("./lib/map.js"),
  countIf: require("./lib/countIf.js")
}

/******************************
 VERSION ONE
******************************/

// module.exports.filter = function (func, arr) {
//   var result = []
//   for (var i = 0; i < arr.length; i++) {
//     if (func(arr[i])) {
//       result.push(arr[i])
//     }
//   }
//   return result
// }
//
// exports.map= function (func, arr) {
//   var result = []
//   for (var i = 0; i < arr.length; i++) {
//     result.push(func(arr[i]))
//   }
//   return result
// }
//
// exports.countIf= function (testFunc, arr) {
//   var result = arr.filter(testFunc)
//   return result.length
// }


/******************************
 VERSION TWO
******************************/

// module.exports = {
//   filter: function (func, arr) {
//   var result = []
//   for (var i = 0; i < arr.length; i++) {
//     if (func(arr[i])) {
//       result.push(arr[i])
//     }
//   }
//   return result
// },
//   map: function (func, arr) {
//   var result = []
//   for (var i = 0; i < arr.length; i++) {
//     result.push(func(arr[i]))
//   }
//   return result
// },
//   countIf: function (testFunc, arr) {
//   var result = arr.filter(testFunc)
//   return result.length
// }
// }
