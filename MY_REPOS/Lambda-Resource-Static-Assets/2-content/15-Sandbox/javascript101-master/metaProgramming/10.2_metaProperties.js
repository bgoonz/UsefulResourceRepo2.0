class Parent {
    constructor() {
        if (new.target === Parent) {
            console.log("Parent instantiated");
        }
        else {
            console.log("A child instantiated");
        }
    }
}
class Child extends Parent { }
var a = new Parent();
// Parent instantiated
var b = new Child();
// A child instantiated