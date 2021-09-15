/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

import { Indexable } from '../util/misc';
import { doubleToIEEE754String } from '../util/util';

import { Node } from './Node';

let MAX_NODE: Node;

export function setMaxNode(val: Node) {
  MAX_NODE = val;
}

export const priorityHashText = function (priority: string | number): string {
  if (typeof priority === 'number') {
    return 'number:' + doubleToIEEE754String(priority);
  } else {
    return 'string:' + priority;
  }
};

/**
 * Validates that a priority snapshot Node is valid.
 */
export const validatePriorityNode = function (priorityNode: Node) {
  if (priorityNode.isLeafNode()) {
    const val = priorityNode.val();
    assert(
      typeof val === 'string' ||
        typeof val === 'number' ||
        (typeof val === 'object' && contains(val as Indexable, '.sv')),
      'Priority must be a string or number.'
    );
  } else {
    assert(
      priorityNode === MAX_NODE || priorityNode.isEmpty(),
      'priority of unexpected type.'
    );
  }
  // Don't call getPriority() on MAX_NODE to avoid hitting assertion.
  assert(
    priorityNode === MAX_NODE || priorityNode.getPriority().isEmpty(),
    "Priority nodes can't have a priority of their own."
  );
};
