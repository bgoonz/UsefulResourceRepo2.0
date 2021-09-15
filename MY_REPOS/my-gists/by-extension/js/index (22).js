import React from 'react';
import {findReactChildRecursively} from './find-react-child-recursively.js';

function MyComponent({children}) {
  // Example: find whether an MDX A tag exists within
  // the children passed to this component
  const foundMdxATag = findReactChildRecursively(
    children,
    (child) => child?.props?.mdxType === 'a',
  );
}