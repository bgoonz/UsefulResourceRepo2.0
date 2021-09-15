const HSBToRGB = (h, s, b) => {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

//--------------------------------


HSBToRGB(18, 81, 99); // [252.45, 109.31084999999996, 47.965499999999984]

//--------------------------------


const HSLToRGB = (h, s, l) => {
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

//--------------------------------


HSLToRGB(13, 100, 11); // [56.1, 12.155, 0]

//--------------------------------


const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

//--------------------------------


RGBToHSL(45, 23, 11); // [21.17647, 60.71428, 10.98039]

//--------------------------------


const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

//--------------------------------


RGBToHex(255, 165, 1); // 'ffa501'

//--------------------------------


const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

//--------------------------------


UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

//--------------------------------


const crypto = require('crypto');

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

//--------------------------------


UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'

//--------------------------------


const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

//--------------------------------


approximatelyEqual(Math.PI / 2.0, 1.5708); // true

//--------------------------------


const arithmeticProgression  = (n, lim) =>
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );

//--------------------------------


arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]

//--------------------------------


const arrayToHTMLList = (arr, listID) => 
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

//--------------------------------


arrayToHTMLList(['item 1', 'item 2'], 'myListID');

//--------------------------------


const binomialCoefficient = (n, k) => {
  if (Number.isNaN(n) || Number.isNaN(k)) return NaN;
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  if (k === 1 || k === n - 1) return n;
  if (n - k < k) k = n - k;
  let res = n;
  for (let j = 2; j <= k; j++) res *= (n - j + 1) / j;
  return Math.round(res);
};

//--------------------------------


binomialCoefficient(8, 2); // 28

//--------------------------------


const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);

//--------------------------------


bottomVisible(); // true

//--------------------------------


const bubbleSort = arr => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};

//--------------------------------


bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]

//--------------------------------


const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach(val => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};

//--------------------------------


bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());

//--------------------------------


capitalizeEveryWord('hello world!'); // 'Hello World!'

//--------------------------------


const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

//--------------------------------


chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

//--------------------------------


const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

//--------------------------------


chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]

//--------------------------------


const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

//--------------------------------


copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.

//--------------------------------


const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

//--------------------------------


countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

//--------------------------------


const dayOfYear = date =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

//--------------------------------


dayOfYear(new Date()); // 272

//--------------------------------


const daysAgo = n => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)

//--------------------------------


const daysFromNow = n => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split('T')[0];
};

//--------------------------------


daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)

//--------------------------------


const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

//--------------------------------


deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]

//--------------------------------


const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);

//--------------------------------


defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }

//--------------------------------


const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? 'Mobile'
    : 'Desktop';

//--------------------------------


detectDeviceType(); // 'Mobile' or 'Desktop'

//--------------------------------


const detectLanguage = (defaultLang = 'en-US') => 
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;

//--------------------------------


detectLanguage(); // 'nl-NL'

//--------------------------------


const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

//--------------------------------


difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]

//--------------------------------


const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};

//--------------------------------


dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

//--------------------------------


const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

//--------------------------------


dropWhile([1, 2, 3, 4], n => n >= 3); // [3, 4]

//--------------------------------


const factorial = n =>
  n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);

//--------------------------------


factorial(6); // 720

//--------------------------------


const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

//--------------------------------


fibonacci(6); // [0, 1, 1, 2, 3, 5]

//--------------------------------


const filterNonUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

//--------------------------------


filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

//--------------------------------


const filterUnique = arr =>
  [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

//--------------------------------


filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]

//--------------------------------


const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

//--------------------------------


flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }

//--------------------------------


const forEachRight = (arr, callback) =>
  arr
    .slice()
    .reverse()
    .forEach(callback);

//--------------------------------


forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'

//--------------------------------


const forOwn = (obj, fn) =>
  Object.keys(obj).forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwn({ foo: 'bar', a: 1 }, v => console.log(v)); // 'bar', 1

//--------------------------------


const forOwnRight = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .forEach(key => fn(obj[key], key, obj));

//--------------------------------


forOwnRight({ foo: 'bar', a: 1 }, v => console.log(v)); // 1, 'bar'

//--------------------------------


const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

//--------------------------------


getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

//--------------------------------


const getElementsBiggerThanViewport = () => {
  const docWidth = document.documentElement.offsetWidth;
  return [...document.querySelectorAll('*')].filter(
    el => el.offsetWidth > docWidth
  );
};

//--------------------------------


getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

//--------------------------------


const getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
  Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );

//--------------------------------


getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4

//--------------------------------


const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

//--------------------------------


getScrollPosition(); // {x: 0, y: 200}

//--------------------------------


const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

//--------------------------------


getSiblings(document.querySelector('head')); // ['body']

//--------------------------------


const getType = v =>
  (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

//--------------------------------


getType(new Set([1, 2, 3])); // 'Set'

//--------------------------------


const getVerticalOffset = el => {
  let offset = el.offsetTop,
    _el = el;
  while (_el.offsetParent) {
    _el = _el.offsetParent;
    offset += _el.offsetTop;
  }
  return offset;
};

//--------------------------------


getVerticalOffset('.my-element'); // 120

//--------------------------------


const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

//--------------------------------


hammingDistance(2, 3); // 1

//--------------------------------


const haveSameContents = (a, b) => {
  for (const v of new Set([...a, ...b]))
    if (a.filter(e => e === v).length !== b.filter(e => e === v).length)
      return false;
  return true;
};

//--------------------------------


haveSameContents([1, 2, 4], [2, 4, 1]); // true

//--------------------------------


const heapsort = arr => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};

//--------------------------------


heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const initialize2DArray = (w, h, val = null) =>
  Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));

//--------------------------------


initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]

//--------------------------------


const initializeArrayWithValues = (n, val = 0) =>
  Array.from({ length: n }).fill(val);

//--------------------------------


initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]

//--------------------------------


const insertionSort = arr =>
  arr.reduce((acc, x) => {
    if (!acc.length) return [x];
    acc.some((y, j) => {
      if (x <= y) {
        acc.splice(j, 0, x);
        return true;
      }
      if (x > y && j === acc.length - 1) {
        acc.splice(j + 1, 0, x);
        return true;
      }
      return false;
    });
    return acc;
  }, []);

//--------------------------------


insertionSort([6, 3, 4, 1]); // [1, 3, 4, 6]

//--------------------------------


const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter(x => s.has(x));
};

//--------------------------------


intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

//--------------------------------


const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

//--------------------------------


isAnagram('iceman', 'cinema'); // true

//--------------------------------


const isContainedIn = (a, b) => {
  for (const v of new Set(a)) {
    if (
      !b.some(e => e === v) ||
      a.filter(e => e === v).length > b.filter(e => e === v).length
    )
      return false;
  }
  return true;
};

//--------------------------------


isContainedIn([1, 4], [2, 4, 1]); // true

//--------------------------------


const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isLocalStorageEnabled(); // true, if localStorage is accessible

//--------------------------------


const isPrime = num => {
  const boundary = Math.floor(Math.sqrt(num));
  for (let i = 2; i <= boundary; i++) if (num % i === 0) return false;
  return num >= 2;
};

//--------------------------------


isPrime(11); // true

//--------------------------------


const isSameDate = (dateA, dateB) =>
  dateA.toISOString() === dateB.toISOString();

//--------------------------------


isSameDate(new Date(2010, 10, 20), new Date(2010, 10, 20)); // true

//--------------------------------


const isSessionStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.sessionStorage.setItem(key, null);
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

//--------------------------------


isSessionStorageEnabled(); // true, if sessionStorage is accessible

//--------------------------------


const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};

//--------------------------------


kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]

//--------------------------------