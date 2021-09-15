let myMap = function(array, callback) {
   let newArr = [];
   for (let i = 0; i < array.length; i ++) {
      mapped = callback(array[i], i, array);
      newArr.push(mapped);
   }
   return newArr;
}
console.log( myMap([16,25,36], Math.sqrt)); // => [4, 5, 6];let myMapArrow = (array, callback) => {
   let newArr = [];
   array.forEach( (ele, ind, array) => {
      newArr.push(callback(ele, ind, array));
   })
   return newArr;
}
console.log(myMapArrow([16,25,36], Math.sqrt)); // => [4, 5, 6];