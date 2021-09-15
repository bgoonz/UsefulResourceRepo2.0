function doesKeyExist(obj, key) {
  // obj[key] !== undefined
  // or:
  return key in obj;
}
let course = {
  bootcamp: "Lambda",
  course: "Bootcamp Prep",
};
console.log(doesKeyExist(course, "course")); // => true
console.log(doesKeyExist(course, "name")); // => false
