---
id: binding
title: Binding
---

## Default binding

```javascript
function display() {
  console.log(this); // 'this' will point to the global object
}
display();
```

## Implicit binding

```javascript
var obj = {
  name: "Saurabh",
  display: function () {
    console.log(this.name); // 'this' points to obj
  },
};
obj.display(); // Saurabh
```

```javascript
var name = "uh oh! global";
var outerDisplay = obj.display;
outerDisplay(); // uh oh! global
```

```javascript
function setTimeout(callback, delay) {
  callback(); // callback = obj.display;
}
setTimeout(obj.display, 1000);

var name = "uh oh! global";
setTimeout(obj.display, 1000);
// uh oh! global
```

## Explicit hard binding

```javascript
var name = "uh oh! global";
obj.display = obj.display.bind(obj);
var outerDisplay = obj.display;
outerDisplay();
// Saurabh
```
