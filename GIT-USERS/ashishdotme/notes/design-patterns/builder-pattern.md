## Builder Design Pattern

- It enables the creation of an easy to use interface to a complex process.
- By Introducing a step by step workflow, npm packages can be made easy to understand and consume

```javascript
// Course.js
class Course {
  constructor(name, sales, isFree = false, price, isCampain = false) {
    this.name = name;
    this.sales = sales || 0;
    this.isFree = isFree;
    this.price = price || 0;
    this.isCampain = isCampain; // Advertising Campaign
  }

  toString() {
    return console.log(JSON.stringify(this));
  }
}
module.exports = Course;
```

```javascript
// CourseBuilder.js
const Course = require("./course");

class CourseBuilder {
  constructor(name, sales = 0, price = 0) {
    this.name = name;
    this.sales = sales;
    this.price = price;
  }

  makePaid(price) {
    this.isFree = false;
    this.price = price;
    return this;
  }

  makeCampain() {
    this.isCampain = true;
    return this;
  }

  build() {
    return new Course(this);
  }
}

module.exports = CourseBuilder;
```

```javascript
//App.js
const CourseBuilder = require("./CourseBuilder");

//const course_1 = new CourseBuilder('Design Patterns 1', 0, true, 149 , true);
//const course_2 = new CourseBuilder('Design Patterns 1', 0,false, 0, false);
const course_1 = new CourseBuilder("Design Patterns 1")
  .makePaid(100)
  .makeCampain()
  .build();
const course_2 = new CourseBuilder("Design Patterns 2").build();

course_1.toString();
course_2.toString();
```
