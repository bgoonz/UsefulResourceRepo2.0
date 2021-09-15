let myEvery = function(array, callback) {
      for (let i = 0; i < array.length; i++) {
          if (!callback(array[i], i, array)) {
              return false
          }
      }
      return true;
  }
  // with arrow function syntax
  let myEvery = (array, callback) => {
      for (let i = 0; i < array.length; i++) {
          if (!callback(array[i])) {
              return false
          }
      }
      return true;
  }