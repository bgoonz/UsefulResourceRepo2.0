import delay from "./delay";

// This file mocks a web API by working with the hard-coded data below.
// All calls return promises.

const fakeData = [{}];

class SomeApi {
  static someMethod() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], fakeData));
      }, delay);
    });
  }
}

export default SomeApi;
