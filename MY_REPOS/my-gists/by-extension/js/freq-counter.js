let elementCounts = function(array) {
      let obj = {};
      array.forEach(function(el) {
          if (el in obj) obj[el] += 1;
          else obj[el] = 1;
      })
      return obj;
  }
  console.log(elementCounts(["e", "f", "g", "f"])); // => Object {e: 1, f: 2, g: 1}