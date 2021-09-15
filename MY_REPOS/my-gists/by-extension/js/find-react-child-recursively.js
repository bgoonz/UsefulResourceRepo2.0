import React from 'react';

export function findReactChildRecursively(children, findFunction) {
  const found = React.Children.toArray(children).find(findFunction);

  if (found) {
    return true;
  } else if (children?.props?.children) {
    findReactChildRecursively(children.props.children);
  }

  return false;
}