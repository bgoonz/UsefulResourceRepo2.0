
let sayMeow = cat.purrMore;
console.log(sayMeow()); 
// TypeError: this.purr is not a function
// we can use the built in Function.bind to ensure our context, our this , 
// is the cat object 
let boundCat = sayMeow.bind(cat);boundCat(); 
// prints "meow"-`bind`
