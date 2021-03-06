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
IsEmpty } from '../util/Path';

/**
 * A cache node only stores complete children. Additionally it holds a flag whether the node can be considered fully
 * initialized in the sense that we know at one point in time this represented a valid state of the world, e.g.
 * initialized with data from the server, or a complete overwrite by the client. The filtered flag also tracks
 * whether a node potentially had children removed due to a filter.
 */
export class CacheNode {
  constructor(
    private node_: Node,
    private fullyInitialized_: boolean,
    private filtered_: boolean
  ) {}

  /**
   * Returns whether this node was fully initialized with either server data or a complete overwrite by the client
   */
  isFullyInitialized(): boolean {
    return this.fullyInitialized_;
  }

  /**
   * Returns whether this node is potentially missing children due to a filter applied to the node
   */
  isFiltered(): boolean {
    return this.filtered_;
  }

  isCompleteForPath(path: Path): boolean {
    if (pathIsEmpty(path)) {
      return this.isFullyInitialized() && !this.filtered_;
    }

    const childKey = pathGetFront(path);
    return this.isCompleteForChild(childKey);
  }

  isCompleteForChild(key: string): boolean {
    return (
      (this.isFullyInitialized() && !this.filtered_) || this.node_.hasChild(key)
    );
  }

  getNode(): Node {
    return this.node_;
  }
}
