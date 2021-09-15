# wasm-event-loop

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/wasm-event-loop)

This is a demo of promises + closures inside WebAssembly. The sample implements an async function that sums values from two async other async functions.

Pseudo-code of async sum in WebAssembly
```js
import {getX, getY} from './external.js';

export async function sum(): i32 {
  const xValue: i32 = await getX();
  const yValue: i32 = await getY();
  return xValue + yValue;
}
```

...as promises
```js
import {getX, getY} from './external.js';

export function sum(): Promise<i32> {
  return getX()
    .then((const xValue: i32) => {
      return getY()
        .then((const yValue: i32) => {
          return xValue + yValue;
        });
    });
}
```

...closures converted to functions
```js
import {createContext, setScopeValue, getScopeValue, deleteContext} from './closure.js';
import {then, resolve} from './promise.js';
import {getX, getY} from './external.js';

export function sum(): i32 { // i32 is pointer to promise
  const xPromise = getX();
  const sumClosure1ContextPointer = createContext(sumClosure1);
  return then(xPromise, sumClosure1ContextPointer);
}

export function sumClosure1(sumClosure1ContextPointer: i32, xValue: i32): i32 {
  deleteContext(sumClosure1ContextPointer);
  const yPromise = getY();
  const sumClosure2ContextPointer = createContext(sumClosure2);
  setScopei32Value(sumClosure2ContextPointer, 0, xValue)
  return then(yPromise, sumClosure2ContextPointer);
}

export function sumClosure2(sumClosure2ContextPointer: i32, yValue: i32): i32 {
  const xValue = getScopei32Value(sumClosure2ContextPointer, 0)
  deleteContext(sumClosure2ContextPointer);
  return resolve(xValue + yValue);
}
```
