import React from "react";
import createFragment from "react-addons-create-fragment";

export function createChildFragment(fragments) {
  const newFragments = {};
  let validChildrenCount = 0;
  let firstKey;

  // Only create non-empty key fragments
  for (const key in fragments) {
    const currentChild = fragments[key];

    if (currentChild) {
      if (validChildrenCount === 0) firstKey = key;
      newFragments[key] = currentChild;
      validChildrenCount++;
    }
  }

  if (validChildrenCount === 0) return undefined;
  if (validChildrenCount === 1) return newFragments[firstKey];
  return createFragment(newFragments);
}

export function extendChildren(children, extendedProps, extendedChildren) {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    const newProps =
      typeof extendedProps === "function"
        ? extendedProps(child)
        : extendedProps;

    const newChildren =
      typeof extendedChildren === "function"
        ? extendedChildren(child)
        : extendedChildren
        ? extendedChildren
        : child.props.children;

    return React.cloneElement(child, newProps, newChildren);
  });
}
