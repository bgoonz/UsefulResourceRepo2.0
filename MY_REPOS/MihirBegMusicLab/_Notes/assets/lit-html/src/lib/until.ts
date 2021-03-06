/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import { directive, DirectiveFn, NodePart } from "../lit-html.js";

/**
 * Display `defaultContent` until `promise` resolves.
 */
export const until = (
  promise: Promise<any>,
  defaultContent: any
): DirectiveFn<NodePart> =>
  directive((part: NodePart): void => {
    part.setValue(defaultContent);
    part.setValue(promise);
  });
