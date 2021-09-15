// test
// const pattern = /\w+@\w+\.\w+/;
// const email = 'bob28@gmail.com';
// console.log(pattern.test(email));
// match
// const pattern = /\w*o\w*/g;
// const sentence = 'The quick brown fox jumps over the lazy dog. It barked.';
// console.log(sentence.match(pattern));
// replace

const data = { name: 'Charlie', age: 36 };
const str = 'My name is %name%, and my age is %age%';

// const gibberish = 'bimbop';
// const pattern = /(bim)(bop)/;

// console.log(gibberish.replace(pattern, '$1'));
const pattern = /%(\w+(me))%/g;
const replaced = str.replace(pattern, (match, p1, p2) => {
  console.log(p1);
  return data[p1];
});

console.log(replaced);
