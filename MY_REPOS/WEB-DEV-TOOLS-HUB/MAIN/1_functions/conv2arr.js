'use strict';

const c2arr = value => {
  if (value === null || value === undefined) {
    return [];
  }
  //(method) ArrayConstructor.isArray<any>(arg: any): arg is any[]
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    return [value];
  }
  //var Symbol: SymbolConstructor
  //SymbolConstructor.iterator: symbol
  //A method that returns the default iterator for an object. Called by the semantics of the for-of statement.
  if (typeof value[Symbol.iterator] === "function") {
    return [...value];
  }

  return [value];
};
//const c2arr: (value: any) => any[]
module.exports = c2arr;
