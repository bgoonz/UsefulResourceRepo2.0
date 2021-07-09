

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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const lastDateOfMonth = (date = new Date()) => {
  let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.toISOString().split('T')[0];
};

//--------------------------------


lastDateOfMonth(new Date('2015-08-11')); // '2015-08-30'

//--------------------------------


const levenshteinDistance = (s, t) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

//--------------------------------


levenshteinDistance('duck', 'dark'); // 2

//--------------------------------


const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

//--------------------------------


mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

//--------------------------------


const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

//--------------------------------


mapNumRange(5, 0, 10, 0, 100); // 50

//--------------------------------


const mapObject = (arr, fn) =>
  arr.reduce((acc, el, i) => {
    acc[el] = fn(el, i, arr);
    return acc;
  }, {});

//--------------------------------


mapObject([1, 2, 3], a => a * a); // { 1: 1, 2: 4, 3: 9 }

//--------------------------------


const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

//--------------------------------


mapString('lorem ipsum', c => c.toUpperCase()); // 'LOREM IPSUM'

//--------------------------------


const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

//--------------------------------


median([5, 6, 50, 1, -5]); // 5

//--------------------------------


const mergeSort = arr => {
  if (arr.length < 2) return arr;
  const mid = Math.floor(arr.length / 2);
  const l = mergeSort(arr.slice(0, mid));
  const r = mergeSort(arr.slice(mid, arr.length));
  return Array.from({ length: l.length + r.length }, () => {
    if (!l.length) return r.shift();
    else if (!r.length) return l.shift();
    else return l[0] > r[0] ? r.shift() : l.shift();
  });
};

//--------------------------------


mergeSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]

//--------------------------------


const mergeSortedArrays = (a, b) => {
  const _a = [...a],
    _b = [...b];
  return Array.from({ length: _a.length + _b.length }, () => {
    if (!_a.length) return _b.shift();
    else if (!_b.length) return _a.shift();
    else return _a[0] > _b[0] ? _b.shift() : _a.shift();
  });
};

//--------------------------------


mergeSortedArrays([1, 4, 5], [2, 3, 6]); // [1, 2, 3, 4, 5, 6]

//--------------------------------


const mostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

//--------------------------------


mostFrequent(['a', 'b', 'a', 'c', 'a', 'a', 'b']); // 'a'

//--------------------------------


const objectFromPairs = arr =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

//--------------------------------


objectFromPairs([['a', 1], ['b', 2]]); // {a: 1, b: 2}

//--------------------------------


const omit = (obj, arr) =>
  Object.keys(obj)
    .filter(k => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omit({ a: 1, b: '2', c: 3 }, ['b']); // { 'a': 1, 'c': 3 }

//--------------------------------


const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

//--------------------------------


omitBy({ a: 1, b: '2', c: 3 }, x => typeof x === 'number'); // { b: '2' }

//--------------------------------


const palindrome = str => {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === [...s].reverse().join('');
};

//--------------------------------


palindrome('taco cat'); // true

//--------------------------------


const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

//--------------------------------


percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

//--------------------------------


const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

//--------------------------------


pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }

//--------------------------------


const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

//--------------------------------


powerset([1, 2]); // [[], [1], [2], [2, 1]]

//--------------------------------


const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

//--------------------------------


prefersDarkColorScheme(); // true

//--------------------------------


const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: light)').matches;

//--------------------------------


prefersLightColorScheme(); // true

//--------------------------------


const primeFactors = n => {
  let a = [],
    f = 2;
  while (n > 1) {
    if (n % f === 0) {
      a.push(f);
      n /= f;
    } else {
      f++;
    }
  }
  return a;
};

//--------------------------------


primeFactors(147); // [3, 7, 7]

//--------------------------------


const primes = num => {
  let arr = Array.from({ length: num - 1 }).map((x, i) => i + 2),
    sqroot = Math.floor(Math.sqrt(num)),
    numsTillSqroot = Array.from({ length: sqroot - 1 }).map((x, i) => i + 2);
  numsTillSqroot.forEach(x => (arr = arr.filter(y => y % x !== 0 || y === x)));
  return arr;
};

//--------------------------------


primes(10); // [2, 3, 5, 7]

//--------------------------------


const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//--------------------------------


quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]

//--------------------------------


const randomAlphaNumeric = length => {
  let s = '';
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

//--------------------------------


randomAlphaNumeric(5); // '0afad'

//--------------------------------


const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

//--------------------------------


randomHexColorCode(); // '#e34155'

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


const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

//--------------------------------


redirect('https://google.com');

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


const requireUncached = module => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

//--------------------------------


const fs = requireUncached('fs'); // 'fs' will be loaded fresh every time

//--------------------------------


const round = (n, decimals = 0) => 
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//--------------------------------


round(1.005, 2); // 1.01

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


const sortCharactersInString = str =>
  [...str].sort((a, b) => a.localeCompare(b)).join('');

//--------------------------------


sortCharactersInString('cabbage'); // 'aabbceg'

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


const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

//--------------------------------


timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms

//--------------------------------


const toHSLObject = hslStr => {
  const [hue, saturation, lightness] = hslStr.match(/\d+/g).map(Number);
  return { hue, saturation, lightness };
};

//--------------------------------


toHSLObject('hsl(50, 10%, 10%)'); // { hue: 50, saturation: 10, lightness: 10 }

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


const toRGBObject = rgbStr => {
  const [red, green, blue] = rgbStr.match(/\d+/g).map(Number);
  return { red, green, blue };
};

//--------------------------------


toRGBObject('rgb(255, 12, 0)'); // {red: 255, green: 12, blue: 0}

//--------------------------------


const tomorrow = () => {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


tomorrow(); // 2018-10-19 (if current date is 2018-10-18)

//--------------------------------


const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

//--------------------------------


truncateString('boomerang', 7); // 'boom...'

//--------------------------------


const untildify = str =>
  str.replace(/^~($|\/|\\)/, `${require('os').homedir()}$1`);

//--------------------------------


untildify('~/node'); // '/Users/aUser/node'

//--------------------------------


const vectorAngle = (x, y) => {
  let mX = Math.sqrt(x.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  let mY = Math.sqrt(y.reduce((acc, n) => acc + Math.pow(n, 2), 0));
  return Math.acos(x.reduce((acc, n, i) => acc + n * y[i], 0) / (mX * mY));
};

//--------------------------------


vectorAngle([3, 4], [4, 3]); // 0.283794109208328

//--------------------------------


const vectorDistance = (x, y) =>
  Math.sqrt(x.reduce((acc, val, i) => acc + Math.pow(val - y[i], 2), 0));

//--------------------------------


vectorDistance([10, 0, 5], [20, 0, 10]); // 11.180339887498949

//--------------------------------


const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

//--------------------------------


weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727

//--------------------------------


const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

//--------------------------------


weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9

//--------------------------------


const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

//--------------------------------


xProd([1, 2], ['a', 'b']); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

//--------------------------------


const yesterday = () => {
  let d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

//--------------------------------


yesterday(); // 2018-10-17 (if current date is 2018-10-18)

//--------------------------------


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


const crypto = require('crypto