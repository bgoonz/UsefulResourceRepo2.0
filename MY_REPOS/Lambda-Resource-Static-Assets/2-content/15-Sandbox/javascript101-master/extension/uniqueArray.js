const array = [1, 1, 2, 3, 5, 5, 1]
const uniqueArray1 = [...new Set(array)];
console.log(uniqueArray1);
//数组去重

/////////////
const uniqueArray2 = Array.from(new Set(array))
console.log(uniqueArray2);

/////////////
const uniqueArray3 =array.filter((arr, index) => array.indexOf(arr) === index)
console.log(uniqueArray3);


let array1 = Array(5).fill('');
console.log(array1);

