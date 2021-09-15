// node --allow-natives-syntax index.js
var before, after, a;
before = %GetHeapUsage();
a = {};
after = %GetHeapUsage();
console.log(after - before);
