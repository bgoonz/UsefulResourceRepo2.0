//--------------------------------


const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

//--------------------------------


randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]

//--------------------------------


const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

//--------------------------------


randomIntegerInRange(0, 5); // 2

//--------------------------------


const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;

//--------------------------------


randomNumberInRange(2, 10); // 6.0211363285087005

//--------------------------------


const rangeGenerator = function* (start, end, step = 1) {
  let i = start;
  while (i < end) {
    yield i;
    i += step;
  }
};

//--------------------------------


for (let i of rangeGenerator(6, 10)) console.log(i);
// Logs 6, 7, 8, 9

//--------------------------------


const fs = require('fs');

const readFileLines = filename =>
  fs
    .readFileSync(filename)
    .toString('UTF8')
    .split('\n');

//--------------------------------


/*
contents of test.txt :
  line1
  line2
  line3
  ___________________________
*/
let arr = readFileLines('test.txt');
console.log(arr); // ['line1', 'line2', 'line3']

//--------------------------------


const rearg = (fn, indexes) => (...args) => fn(...indexes.map(i => args[i]));

//--------------------------------


var rearged = rearg(
  function(a, b, c) {
    return [a, b, c];
  },
  [2, 0, 1]
);
rearged('b', 'c', 'a'); // ['a', 'b', 'c']

//--------------------------------


const recordAnimationFrames = (callback, autoStart = true) => {
  let running = false,
    raf;
  const stop = () => {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
  };
  const start = () => {
    if (running) return;
    running = true;
    run();
  };
  const run = () => {
    raf = requestAnimationFrame(() => {
      callback();
      if (running) run();
    });
  };
  if (autoStart) start();
  return { start, stop };
};

//--------------------------------


const cb = () => console.log('Animation frame fired');
const recorder = recordAnimationFrames(cb);
// logs 'Animation frame fired' on each animation frame
recorder.stop(); // stops logging
recorder.start(); // starts again
const recorder2 = recordAnimationFrames(cb, false);
// `start` needs to be explicitly called to begin recording frames

//--------------------------------


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

//--------------------------------


const reduceSuccessive = (arr, fn, acc) =>
  arr.reduce(
    (res, val, i, arr) => (res.push(fn(res.slice(-1)[0], val, i, arr)), res),
    [acc]
  );

//--------------------------------


reduceSuccessive([1, 2, 3, 4, 5, 6], (acc, val) => acc + val, 0);
// [0, 1, 3, 6, 10, 15, 21]

//--------------------------------


const reduceWhich = (arr, comparator = (a, b) => a - b) =>
  arr.reduce((a, b) => (comparator(a, b) >= 0 ? b : a));

//--------------------------------


reduceWhich([1, 3, 2]); // 1
reduceWhich([1, 3, 2], (a, b) => b - a); // 3
reduceWhich(
  [
    { name: 'Tom', age: 12 },
    { name: 'Jack', age: 18 },
    { name: 'Lucy', age: 9 }
  ],
  (a, b) => a.age - b.age
); // {name: 'Lucy', age: 9}

//--------------------------------


const reducedFilter = (data, keys, fn) =>
  data.filter(fn).map(el =>
    keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {})
  );

//--------------------------------


const data = [
  {
    id: 1,
    name: 'john',
    age: 24
  },
  {
    id: 2,
    name: 'mike',
    age: 50
  }
];
reducedFilter(data, ['id', 'name'], item => item.age > 24);
// [{ id: 2, name: 'mike'}]

//--------------------------------


const reject = (pred, array) => array.filter((...args) => !pred(...args));

//--------------------------------


reject(x => x % 2 === 0, [1, 2, 3, 4, 5]); // [1, 3, 5]
reject(word => word.length > 4, ['Apple', 'Pear', 'Kiwi', 'Banana']);
// ['Pear', 'Kiwi']

//--------------------------------



const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1);
      return acc.concat(val);
    }, [])
    : [];

//--------------------------------


remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

//--------------------------------


const removeAccents = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

//--------------------------------


removeAccents('Antoine de Saint-Exupéry'); // 'Antoine de Saint-Exupery'

//--------------------------------


const removeClass = (el, className) => el.classList.remove(className);

//--------------------------------


removeClass(document.querySelector('p.special'), 'special');
// The paragraph will not have the 'special' class anymore

//--------------------------------


const removeElement = el => el.parentNode.removeChild(el);

//--------------------------------


removeElement(document.querySelector('#my-element'));
// Removes #my-element from the DOM

//--------------------------------


const removeNonASCII = str => str.replace(/[^\x20-\x7E]/g, '');

//--------------------------------


removeNonASCII('äÄçÇéÉêlorem-ipsumöÖÐþúÚ'); // 'lorem-ipsum'

//--------------------------------


const removeWhitespace = str => str.replace(/\s+/g, '');

//--------------------------------


removeWhitespace('Lorem ipsum.\n Dolor sit amet. ');
// 'Loremipsum.Dolorsitamet.'

//--------------------------------


const renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] }
    }),
    {}
  );

//--------------------------------


const obj = { name: 'Bobo', job: 'Front-End Master', shoeSize: 100 };
renameKeys({ name: 'firstName', job: 'passion' }, obj);
// { firstName: 'Bobo', passion: 'Front-End Master', shoeSize: 100 }

//--------------------------------


const renderElement = ({ type, props = {} }, container) => {
  const isTextElement = !type;
  const element = isTextElement
    ? document.createTextNode('')
    : document.createElement(type);

  const isListener = p => p.startsWith('on');
  const isAttribute = p => !isListener(p) && p !== 'children';

  Object.keys(props).forEach(p => {
    if (isAttribute(p)) element[p] = props[p];
    if (!isTextElement && isListener(p))
      element.addEventListener(p.toLowerCase().slice(2), props[p]);
  });

  if (!isTextElement && props.children && props.children.length)
    props.children.forEach(childElement =>
      renderElement(childElement, element)
    );

  container.appendChild(element);
};

//--------------------------------


const myElement = {
  type: 'button',
  props: {
    type: 'button',
    className: 'btn',
    onClick: () => alert('Clicked'),
    children: [{ props: { nodeValue: 'Click me' } }]
  }
};

renderElement(myElement, document.body);

//--------------------------------


const repeatGenerator = function* (val) {
  let v = val;
  while (true) {
    let newV = yield v;
    if (newV !== undefined) v = newV;
  }
};

//--------------------------------


const repeater = repeatGenerator(5);
repeater.next(); // { value: 5, done: false }
repeater.next(); // { value: 5, done: false }
repeater.next(4); // { value: 4, done: false }
repeater.next(); // { value: 4, done: false }

//--------------------------------


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const reverseNumber = n => 
  parseFloat(`${n}`.split('').reverse().join('')) * Math.sign(n);

//--------------------------------


reverseNumber(981); // 189
reverseNumber(-500); // -5
reverseNumber(73.6); // 6.37
reverseNumber(-5.23); // -32.5

//--------------------------------


const reverseString = str => [...str].reverse().join('');

//--------------------------------


reverseString('foobar'); // 'raboof'

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

//--------------------------------


const runAsync = fn => {
  const worker = new Worker(
    URL.createObjectURL(new Blob([`postMessage((${fn})());`]), {
      type: 'application/javascript; charset=utf-8'
    })
  );
  return new Promise((res, rej) => {
    worker.onmessage = ({ data }) => {
      res(data), worker.terminate();
    };
    worker.onerror = err => {
      rej(err), worker.terminate();
    };
  });
};

//--------------------------------


const longRunningFunction = () => {
  let result = 0;
  for (let i = 0; i < 1000; i++)
    for (let j = 0; j < 700; j++)
      for (let k = 0; k < 300; k++) result = result + i + j + k;

  return result;
};
/*
  NOTE: Since the function is running in a different context, closures are not supported.
  The function supplied to `runAsync` gets stringified, so everything becomes literal.
  All variables and functions must be defined inside.
*/
runAsync(longRunningFunction).then(console.log); // 209685000000
runAsync(() => 10 ** 3).then(console.log); // 1000
let outsideVariable = 50;
runAsync(() => typeof outsideVariable).then(console.log); // 'undefined'

//--------------------------------


const runPromisesInSeries = ps =>
  ps.reduce((p, next) => p.then(next), Promise.resolve());

//--------------------------------


const delay = d => new Promise(r => setTimeout(r, d));
runPromisesInSeries([() => delay(1000), () => delay(2000)]);
// Executes each promise sequentially, taking a total of 3 seconds to complete

//--------------------------------


const sample = arr => arr[Math.floor(Math.random() * arr.length)];

//--------------------------------


sample([3, 7, 9, 11]); // 9

//--------------------------------


const sampleSize = ([...arr], n = 1) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr.slice(0, n);
};

//--------------------------------


sampleSize([1, 2, 3], 2); // [3, 1]
sampleSize([1, 2, 3], 4); // [2, 3, 1]

//--------------------------------


const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

//--------------------------------


scrollToTop(); // Smooth-scrolls to the top of the page

//--------------------------------


const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

//--------------------------------


sdbm('name'); // -3521204949

//--------------------------------


const selectionSort = arr => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

//--------------------------------


selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const serializeCookie = (name, val) =>
  `${encodeURIComponent(name)}=${encodeURIComponent(val)}`;

//--------------------------------


serializeCookie('foo', 'bar'); // 'foo=bar'

//--------------------------------


const serializeForm = form =>
  Array.from(new FormData(form), field =>
    field.map(encodeURIComponent).join('=')
  ).join('&');

//--------------------------------


serializeForm(document.querySelector('#form'));
// email=test%40email.com&name=Test%20Name

//--------------------------------


const setStyle = (el, rule, val) => (el.style[rule] = val);

//--------------------------------


setStyle(document.querySelector('p'), 'font-size', '20px');
// The first <p> element on the page will have a font-size of 20px

//--------------------------------


const shallowClone = obj => Object.assign({}, obj);

//--------------------------------


const a = { x: true, y: 1 };
const b = shallowClone(a); // a !== b

//--------------------------------


const shank = (arr, index = 0, delCount = 0, ...elements) =>
  arr
    .slice(0, index)
    .concat(elements)
    .concat(arr.slice(index + delCount));

//--------------------------------


const names = ['alpha', 'bravo', 'charlie'];
const namesAndDelta = shank(names, 1, 0, 'delta');
// [ 'alpha', 'delta', 'bravo', 'charlie' ]
const namesNoBravo = shank(names, 1, 1); // [ 'alpha', 'charlie' ]
console.log(names); // ['alpha', 'bravo', 'charlie']

//--------------------------------


const show = (...el) => [...el].forEach(e => (e.style.display = ''));

//--------------------------------


show(...document.querySelectorAll('img'));
// Shows all <img> elements on the page

//--------------------------------


const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

//--------------------------------


const foo = [1, 2, 3];
shuffle(foo); // [2, 3, 1], foo = [1, 2, 3]

//--------------------------------


const similarity = (arr, values) => arr.filter(v => values.includes(v));

//--------------------------------


similarity([1, 2, 3], [1, 2, 4]); // [1, 2]

//--------------------------------



const size = val =>
  Array.isArray(val)
    ? val.length
    : val && typeof val === 'object'
      ? val.size || val.length || Object.keys(val).length
      : typeof val === 'string'
        ? new Blob([val]).size
        : 0;

//--------------------------------


size([1, 2, 3, 4, 5]); // 5
size('size'); // 4
size({ one: 1, two: 2, three: 3 }); // 3

//--------------------------------


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

//--------------------------------


async function sleepyWork() {
  console.log("I'm going to sleep for 1 second.");
  await sleep(1000);
  console.log('I woke up after 1 second.');
}

//--------------------------------


const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

//--------------------------------


slugify('Hello World!'); // 'hello-world'

//--------------------------------


const smoothScroll = element =>
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  });

//--------------------------------


smoothScroll('#fooBar'); // scrolls smoothly to the element with the id fooBar
smoothScroll('.fooBar');
// scrolls smoothly to the first element with a class of fooBar

//--------------------------------


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

//--------------------------------


const sortedIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr.findIndex(el => (isDescending ? n >= el : n <= el));
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndex([5, 3, 2, 1], 4); // 1
sortedIndex([30, 50], 40); // 1

//--------------------------------


const sortedIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr.findIndex(el =>
    isDescending ? val >= fn(el) : val <= fn(el)
  );
  return index === -1 ? arr.length : index;
};

//--------------------------------


sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0

//--------------------------------


const sortedLastIndex = (arr, n) => {
  const isDescending = arr[0] > arr[arr.length - 1];
  const index = arr
    .reverse()
    .findIndex(el => (isDescending ? n <= el : n >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndex([10, 20, 30, 30, 40], 30); // 4

//--------------------------------


const sortedLastIndexBy = (arr, n, fn) => {
  const isDescending = fn(arr[0]) > fn(arr[arr.length - 1]);
  const val = fn(n);
  const index = arr
    .map(fn)
    .reverse()
    .findIndex(el => (isDescending ? val <= el : val >= el));
  return index === -1 ? 0 : arr.length - index;
};

//--------------------------------


sortedLastIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 1

//--------------------------------


const splitLines = str => str.split(/\r?\n/);

//--------------------------------


splitLines('This\nis a\nmultiline\nstring.\n');
// ['This', 'is a', 'multiline', 'string.' , '']

//--------------------------------


const spreadOver = fn => argsArr => fn(...argsArr);

//--------------------------------


const arrayMax = spreadOver(Math.max);
arrayMax([1, 2, 3]); // 3

//--------------------------------


const stableSort = (arr, compare) =>
  arr
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
    .map(({ item }) => item);

//--------------------------------


const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const stable = stableSort(arr, () => 0); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

//--------------------------------


const standardDeviation = (arr, usePopulation = false) => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr
      .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
      .reduce((acc, val) => acc + val, 0) /
      (arr.length - (usePopulation ? 0 : 1))
  );
};

//--------------------------------


standardDeviation([10, 2, 38, 23, 38, 23, 21]); // 13.284434142114991 (sample)
standardDeviation([10, 2, 38, 23, 38, 23, 21], true);
// 12.29899614287479 (population)

//--------------------------------


const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split('')
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

//--------------------------------


stringPermutations('abc'); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']

//--------------------------------


const stringifyCircularJSON = obj => {
  const seen = new WeakSet();
  return JSON.stringify(obj, (k, v) => {
    if (v !== null && typeof v === 'object') {
      if (seen.has(v)) return;
      seen.add(v);
    }
    return v;
  });
};

//--------------------------------


const obj = { n: 42 };
obj.obj = obj;
stringifyCircularJSON(obj); // '{"n": 42}'

//--------------------------------


const stripHTMLTags = str => str.replace(/<[^>]*>/g, '');

//--------------------------------


stripHTMLTags('<p><em>lorem</em> <strong>ipsum</strong></p>'); // 'lorem ipsum'

//--------------------------------


const subSet = (a, b) => {
  const sA = new Set(a), sB = new Set(b);
  return [...sA].every(v => sB.has(v));
};

//--------------------------------


subSet(new Set([1, 2]), new Set([1, 2, 3, 4])); // true
subSet(new Set([1, 5]), new Set([1, 2, 3, 4])); // false

//--------------------------------


const sum = (...arr) => [...arr].reduce((acc, val) => acc + val, 0);

//--------------------------------


sum(1, 2, 3, 4); // 10
sum(...[1, 2, 3, 4]); // 10

//--------------------------------


const sumBy = (arr, fn) =>
  arr
    .map(typeof fn === 'function' ? fn : val => val[fn])
    .reduce((acc, val) => acc + val, 0);

//--------------------------------


sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], x => x.n); // 20
sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 20

//--------------------------------


const sumN = n => (n * (n + 1)) / 2;

//--------------------------------


sumN(100); // 5050

//--------------------------------


const sumPower = (end, power = 2, start = 1) =>
  Array(end + 1 - start)
    .fill(0)
    .map((x, i) => (i + start) ** power)
    .reduce((a, b) => a + b, 0);

//--------------------------------


sumPower(10); // 385
sumPower(10, 3); // 3025
sumPower(10, 3, 5); // 2925

//--------------------------------


const superSet = (a, b) => {
  const sA = new Set(a), sB = new Set(b);
  return [...sB].every(v => sA.has(v));
};

//--------------------------------


superSet(new Set([1, 2, 3, 4]), new Set([1, 2])); // true
superSet(new Set([1, 2, 3, 4]), new Set([1, 5])); // false

//--------------------------------


const supportsTouchEvents = () =>
  window && 'ontouchstart' in window;

//--------------------------------


supportsTouchEvents(); // true

//--------------------------------


const swapCase = str =>
  [...str]
    .map(c => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
    .join('');

//--------------------------------


swapCase('Hello world!'); // 'hELLO WORLD!'

//--------------------------------


const symmetricDifference = (a, b) => {
  const sA = new Set(a),
    sB = new Set(b);
  return [...a.filter(x => !sB.has(x)), ...b.filter(x => !sA.has(x))];
};

//--------------------------------


symmetricDifference([1, 2, 3], [1, 2, 4]); // [3, 4]
symmetricDifference([1, 2, 2], [1, 3, 1]); // [2, 2, 3]

//--------------------------------


const symmetricDifferenceBy = (a, b, fn) => {
  const sA = new Set(a.map(v => fn(v))),
    sB = new Set(b.map(v => fn(v)));
  return [...a.filter(x => !sB.has(fn(x))), ...b.filter(x => !sA.has(fn(x)))];
};

//--------------------------------


symmetricDifferenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [ 1.2, 3.4 ]
symmetricDifferenceBy(
  [{ id: 1 }, { id: 2 }, { id: 3 }],
  [{ id: 1 }, { id: 2 }, { id: 4 }],
  i => i.id
);
// [{ id: 3 }, { id: 4 }]

//--------------------------------


const symmetricDifferenceWith = (arr, val, comp) => [
  ...arr.filter(a => val.findIndex(b => comp(a, b)) === -1),
  ...val.filter(a => arr.findIndex(b => comp(a, b)) === -1)
];

//--------------------------------


symmetricDifferenceWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0, 3.9],
  (a, b) => Math.round(a) === Math.round(b)
); // [1, 1.2, 3.9]

//--------------------------------


const tail = arr => (arr.length > 1 ? arr.slice(1) : arr);

//--------------------------------


tail([1, 2, 3]); // [2, 3]
tail([1]); // [1]

//--------------------------------


const take = (arr, n = 1) => arr.slice(0, n);

//--------------------------------


take([1, 2, 3], 5); // [1, 2, 3]
take([1, 2, 3], 0); // []

//--------------------------------


const takeRight = (arr, n = 1) => arr.slice(arr.length - n, arr.length);

//--------------------------------


takeRight([1, 2, 3], 2); // [ 2, 3 ]
takeRight([1, 2, 3]); // [3]

//--------------------------------


const takeRightUntil = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightUntil([1, 2, 3, 4], n => n < 3); // [3, 4]

//--------------------------------


const takeRightWhile = (arr, fn) => {
  for (const [i, val] of [...arr].reverse().entries())
    if (!fn(val)) return i === 0 ? [] : arr.slice(-i);
  return arr;
};

//--------------------------------


takeRightWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const takeUntil = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeUntil([1, 2, 3, 4], n => n >= 3); // [1, 2]

//--------------------------------


const takeWhile = (arr, fn) => {
  for (const [i, val] of arr.entries()) if (!fn(val)) return arr.slice(0, i);
  return arr;
};

//--------------------------------


takeWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return function() {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function() {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

//--------------------------------


window.addEventListener(
  'resize',
  throttle(function(evt) {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
); // Will log the window dimensions at most every 250ms

//--------------------------------


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const times = (n, fn, context = undefined) => {
  let i = 0;
  while (fn.call(context, i) !== false && ++i < n) {}
};

//--------------------------------


var output = '';
times(5, i => (output += i));
console.log(output); // 01234

//--------------------------------


const toCamelCase = str => {
  let s =
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};

//--------------------------------


toCamelCase('some_database_field_name'); // 'someDatabaseFieldName'
toCamelCase('Some label that needs to be camelized');
// 'someLabelThatNeedsToBeCamelized'
toCamelCase('some-javascript-property'); // 'someJavascriptProperty'
toCamelCase('some-mixed_string with spaces_underscores-and-hyphens');
// 'someMixedStringWithSpacesUnderscoresAndHyphens'

//--------------------------------


const toCharArray = s => [...s];

//--------------------------------


toCharArray('hello'); // ['h', 'e', 'l', 'l', 'o']

//--------------------------------


const toCurrency = (n, curr, LanguageFormat = undefined) =>
  Intl.NumberFormat(LanguageFormat, {
    style: 'currency',
    currency: curr,
  }).format(n);

//--------------------------------


toCurrency(123456.789, 'EUR');
// €123,456.79  | currency: Euro | currencyLangFormat: Local
toCurrency(123456.789, 'USD', 'en-us');
// $123,456.79  | currency: US Dollar | currencyLangFormat: English (United States)
toCurrency(123456.789, 'USD', 'fa');
// ۱۲۳٬۴۵۶٫۷۹ ؜$ | currency: US Dollar | currencyLangFormat: Farsi
toCurrency(322342436423.2435, 'JPY');
// ¥322,342,436,423 | currency: Japanese Yen | currencyLangFormat: Local
toCurrency(322342436423.2435, 'JPY', 'fi');
// 322 342 436 423 ¥ | currency: Japanese Yen | currencyLangFormat: Finnish

//--------------------------------


const toDecimalMark = num => num.toLocaleString('en-US');

//--------------------------------


toDecimalMark(12305030388.9087); // '12,305,030,388.909'

//--------------------------------


const toHSLArray = hslStr => hslStr.match(/\d+/g).map(Number);

//--------------------------------


toHSLArray('hsl(50, 10%, 10%)'); // [50, 10, 10]

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

//--------------------------------


const toHash = (object, key) =>
  Array.prototype.reduce.call(
    object,
    (acc, data, index) => ((acc[!key ? index : data[key]] = data), acc),
    {}
  );

//--------------------------------


toHash([4, 3, 2, 1]); // { 0: 4, 1: 3, 2: 2, 3: 1 }
toHash([{ a: 'label' }], 'a'); // { label: { a: 'label' } }
// A more in depth example:
let users = [
  { id: 1, first: 'Jon' },
  { id: 2, first: 'Joe' },
  { id: 3, first: 'Moe' },
];
let managers = [{ manager: 1, employees: [2, 3] }];
// We use function here because we want a bindable reference, 
// but a closure referencing the hash would work, too.
managers.forEach(
  manager =>
    (manager.employees = manager.employees.map(function(id) {
      return this[id];
    }, toHash(users, 'id')))
);
managers; 
// [ {manager:1, employees: [ {id: 2, first: 'Joe'}, {id: 3, first: 'Moe'} ] } ]

//--------------------------------


const toISOStringWithTimezone = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    diff + pad(tzOffset / 60) +
    ':' + pad(tzOffset % 60);
};

//--------------------------------


toISOStringWithTimezone(new Date()); // '2020-10-06T20:43:33-04:00'

//--------------------------------


const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');

//--------------------------------


toKebabCase('camelCase'); // 'camel-case'
toKebabCase('some text'); // 'some-text'
toKebabCase('some-mixed_string With spaces_underscores-and-hyphens');
// 'some-mixed-string-with-spaces-underscores-and-hyphens'
toKebabCase('AllThe-small Things'); // 'all-the-small-things'
toKebabCase('IAmEditingSomeXMLAndHTML');
// 'i-am-editing-some-xml-and-html'

//--------------------------------


const toOrdinalSuffix = num => {
  const int = parseInt(num),
    digits = [int % 10, int % 100],
    ordinals = ['st', 'nd', 'rd', 'th'],
    oPattern = [1, 2, 3, 4],
    tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
  return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
    ? int + ordinals[digits[0] - 1]
    : int + ordinals[3];
};

//--------------------------------


toOrdinalSuffix('123'); // '123rd'

//--------------------------------


const toPairs = obj =>
  obj[Symbol.iterator] instanceof Function && obj.entries instanceof Function
    ? Array.from(obj.entries())
    : Object.entries(obj);

//--------------------------------


toPairs({ a: 1, b: 2 }); // [['a', 1], ['b', 2]]
toPairs([2, 4, 8]); // [[0, 2], [1, 4], [2, 8]]
toPairs('shy'); // [['0', 's'], ['1', 'h'], ['2', 'y']]
toPairs(new Set(['a', 'b', 'c', 'a'])); // [['a', 'a'], ['b', 'b'], ['c', 'c']]

//--------------------------------


const toRGBArray = rgbStr => rgbStr.match(/\d+/g).map(Number);

//--------------------------------


toRGBArray('rgb(255, 12, 0)'); // [255, 12, 0]

//--------------------------------


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const toRomanNumeral = num => {
  const lookup = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1],
  ];
  return lookup.reduce((acc, [k, v]) => {
    acc += k.repeat(Math.floor(num / v));
    num = num % v;
    return acc;
  }, '');
};

//--------------------------------


toRomanNumeral(3); // 'III'
toRomanNumeral(11); // 'XI'
toRomanNumeral(1998); // 'MCMXCVIII'

//--------------------------------


const toSafeInteger = num =>
  Math.round(
    Math.max(Math.min(num, Number.MAX_SAFE_INTEGER), Number.MIN_SAFE_INTEGER)
  );

//--------------------------------


toSafeInteger('3.2'); // 3
toSafeInteger(Infinity); // 9007199254740991

//--------------------------------


const toSnakeCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');

//--------------------------------


toSnakeCase('camelCase'); // 'camel_case'
toSnakeCase('some text'); // 'some_text'
toSnakeCase('some-mixed_string With spaces_underscores-and-hyphens');
// 'some_mixed_string_with_spaces_underscores_and_hyphens'
toSnakeCase('AllThe-small Things'); // 'all_the_small_things'
toKebabCase('IAmEditingSomeXMLAndHTML');
// 'i_am_editing_some_xml_and_html'

//--------------------------------


const toTitleCase = str =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
    .join(' ');

//--------------------------------


toTitleCase('some_database_field_name'); // 'Some Database Field Name'
toTitleCase('Some label that needs to be title-cased');
// 'Some Label That Needs To Be Title Cased'
toTitleCase('some-package-name'); // 'Some Package Name'
toTitleCase('some-mixed_string with spaces_underscores-and-hyphens');
// 'Some Mixed String With Spaces Underscores And Hyphens'

//--------------------------------


const toggleClass = (el, className) => el.classList.toggle(className);

//--------------------------------


toggleClass(document.querySelector('p.special'), 'special');
// The paragraph will not have the 'special' class anymore

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const transform = (obj, fn, acc) =>
  Object.keys(obj).reduce((a, k) => fn(a, obj[k], k, obj), acc);

//--------------------------------


transform(
  { a: 1, b: 2, c: 1 },
  (r, v, k) => {
    (r[v] || (r[v] = [])).push(k);
    return r;
  },
  {}
); // { '1': ['a', 'c'], '2': ['b'] }

//--------------------------------


const triggerEvent = (el, eventType, detail) =>
  el.dispatchEvent(new CustomEvent(eventType, { detail }));

//--------------------------------


triggerEvent(document.getElementById('myId'), 'click');
triggerEvent(document.getElementById('myId'), 'click', { username: 'bob' });

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const truncateStringAtWhitespace = (str, lim, ending = '...') => {
  if (str.length <= lim) return str;
  const lastSpace = str.slice(0, lim - ending.length + 1).lastIndexOf(' ');
  return str.slice(0, lastSpace > 0 ? lastSpace : lim - ending.length) + ending;
};

//--------------------------------


truncateStringAtWhitespace('short', 10); // 'short'
truncateStringAtWhitespace('not so short', 10); // 'not so...'
truncateStringAtWhitespace('trying a thing', 10); // 'trying...'
truncateStringAtWhitespace('javascripting', 10); // 'javascr...'

//--------------------------------
