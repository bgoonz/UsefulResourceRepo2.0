import { useRef } from 'react';

const usePromise = () => {
  const ref = [];
  const container = useRef(ref);

  ref[0] = new Promise((resolve, reject) => {
    ref[1] = resolve;
    ref[2] = reject;
  });

  // [promise, resolve, reject]
  return container.current;
};

export { usePromise };
