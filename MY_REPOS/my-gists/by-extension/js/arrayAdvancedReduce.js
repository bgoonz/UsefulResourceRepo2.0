// An array of articles with their tags.
var articles = [
  {title: "Introduction to Javascript Scope", tags: [ "Javascript", "Variables", "Scope"]},
  {title: "Javascript Closures", tags: [ "Javascript", "Variables", "Closures"]},
  {title: "A Guide to PWAs", tags: [ "Javascript", "PWA"]},
  {title: "Javascript Functional Programming Examples", tags: [ "Javascript", "Functional", "Function"]},
  {title: "Why Javascript Closures are Important", tags: [ "Javascript", "Variables", "Closures"]},
];

// A function that reduces the above array to an
// array based on tags.
var tagView = function(accumulator, x){
  // For every tag in the article's tag array
  x.tags.forEach(function(currentTag){
    // Create a function to check if it matches
    var findCurrentTag = function(y) { return y.tag == currentTag; };
    // Check if it's already in the accumulator array
    if (accumulator.some(findCurrentTag)){
      // Find it and get its index
      var existingTag = accumulator.find(findCurrentTag);
      var existingTagIndex = accumulator.findIndex(findCurrentTag);
      // Update the number and array of articles
      accumulator[existingTagIndex].count += 1;
      accumulator[existingTagIndex].articles.push(x.title);
    }
    // Otherwise add the tag to the accumulator array
    else {
      accumulator.push({tag: currentTag, count: 1, articles: [x.title]});
    }
  });
  // Return the accumulator array
  return accumulator;
}

// Transform the original array
articles.reduce(tagView,[]);
// Output:
/*
[
 {tag: "Javascript", count: 5, articles: [
    "Introduction to Javascript Scope", 
    "Javascript Closures",
    "A Guide to PWAs", 
    "Javascript Functional Programming Examples",
    "Why Javascript Closures are Important"
 ]},
 {tag: "Variables", count: 3, articles: [
    "Introduction to Javascript Scope", 
    "Javascript Closures",
    "Why Javascript Closures are Important"
 ]},
 {tag: "Scope", count: 1, articles: [ 
    "Introduction to Javascript Scope" 
 ]},
 {tag: "Closures", count: 2, articles: [
    "Javascript Closures",
    "Why Javascript Closures are Important"
 ]},
 {tag: "PWA", count: 1, articles: [
    "A Guide to PWAs"
 ]},
 {tag: "Functional", count: 1, articles: [
    "Javascript Functional Programming Examples"
 ]},
 {tag: "Function", count: 1, articles: [
    "Javascript Functional Programming Examples"
 ]}
]
*/