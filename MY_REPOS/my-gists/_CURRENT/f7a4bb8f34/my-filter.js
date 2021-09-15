let myFilter = function(array, callback) {
      let filtered = [];
      for (let i = 0; i < array.length; i++) {
          if (callback(array[i])) {
              filtered.push(array[i], i, array);
          }
      }
  }