const Wabt = require('wabt');

async function main() {
  const wabt = await Wabt();

  const module = wabt.parseWat(
    'async-adder.wat',
    `(module
        (import "global" "table" (table 2 funcref))
        (elem (i32.const 0) $sumClosure1 $sumClosure2)
        (import "promise" "then" (func $then (param $promisePointer i32) (param $contextPointer i32) (result i32)))
        (import "promise" "resolve" (func $resolve (param $resultPointer i32) (result i32)))
        (import "external" "getX" (func $getX (result i32)))
        (import "external" "getY" (func $getY (result i32)))
        
        (import "closure" "createContext" (func $createContext (param $tableIndex i32) (result i32)))
        (import "closure" "setScopei32" (func $setScopei32 (param $contextPointer i32) (param $index i32) (param $value i32)))
        (import "closure" "getScopei32" (func $getScopei32 (param $contextPointer i32) (param $index i32) (result i32)))
        (import "closure" "deleteContext" (func $deleteContext (param $contextPointer i32)))

        (func (export "sum") (result i32) (local $xPromisePointer i32) (local $closurePointer i32)
          call $getX
          local.set $xPromisePointer
          i32.const 0
          call $createContext
          local.set $closurePointer
          local.get $xPromisePointer
          local.get $closurePointer
          call $then
        )

        (func $sumClosure1 (param $thisClosurePointer i32) (param $xValue i32) (result i32) (local $xPointer i32) (local $yPromisePointer i32) (local $closurePointer i32)
          local.get $thisClosurePointer
          call $deleteContext
          call $getY
          local.set $yPromisePointer
          i32.const 1
          call $createContext
          local.tee $closurePointer
          i32.const 0
          local.get $xValue
          call $setScopei32
          local.get $yPromisePointer
          local.get $closurePointer
          call $then
        )

        (func $sumClosure2 (param $thisClosurePointer i32) (param $yValue i32) (result i32) (local $xValue i32) (local $result i32) (local $resultPointer i32)
          local.get $thisClosurePointer
          i32.const 0
          call $getScopei32
          local.set $xValue
          local.get $thisClosurePointer
          call $deleteContext
          local.get $xValue
          local.get $yValue
          i32.add
          call $resolve
        )
      )
    `
  );

  let nextPromiseIndex = 0;
  const promises = {};

  let nextContextIndex = 0;
  const contexts = {};

  const table = new WebAssembly.Table({
    initial: 2,
    element: 'anyfunc'
  });

  const {
    instance: { exports }
  } = await WebAssembly.instantiate(module.toBinary({}).buffer, {
    global: {
      table
    },
    promise: {
      then(parentPromisePointer, contextPointer) {
        const promisePointer = nextPromiseIndex++;
        promises[promisePointer] = promises[parentPromisePointer].then(
          value => {
            const { tableIndex } = contexts[contextPointer];
            const nextPromisePointer = table.get(tableIndex)(
              contextPointer,
              value
            );
            return promises[nextPromisePointer];
          }
        );
        return promisePointer;
      },
      resolve(value) {
        const promisePointer = nextPromiseIndex++;
        promises[promisePointer] = Promise.resolve(value);
        return promisePointer;
      }
    },
    closure: {
      createContext(tableIndex) {
        const contextPointer = nextContextIndex++;
        contexts[contextPointer] = {
          tableIndex,
          values: {}
        };
        return contextPointer;
      },
      setScopei32(contextPointer, index, value) {
        contexts[contextPointer].values[index] = value;
      },
      getScopei32(contextPointer, index) {
        return contexts[contextPointer].values[index];
      },
      deleteContext(contextIndex) {
        delete contexts[contextIndex];
      }
    },
    external: {
      getX() {
        const promisePointer = nextPromiseIndex++;
        promises[promisePointer] = getX();
        return promisePointer;
      },
      getY() {
        const promisePointer = nextPromiseIndex++;
        promises[promisePointer] = getY();
        return promisePointer;
      }
    }
  });

  async function getX() {
    return 42;
  }

  async function getY() {
    return new Promise(resolve => setTimeout(() => resolve(69), 100));
  }

  async function sum() {
    const promisePointer = exports.sum();
    return promises[promisePointer];
  }

  console.log('await getX() + await getY() =', await sum());
  // console.assert(Object.keys(promises).length === 0, 'leaked promises');  // don't know how to delete promises yet
  console.assert(Object.keys(contexts).length === 0, 'leaked contexts');
}
main();
