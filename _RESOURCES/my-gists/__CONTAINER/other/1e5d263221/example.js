var a = 7;
var b = a;
b = 10;
// a = 7
// b = 10

var a = ref(7);
var b = a;
b.value = 100;
// a = 100
// b = 100
