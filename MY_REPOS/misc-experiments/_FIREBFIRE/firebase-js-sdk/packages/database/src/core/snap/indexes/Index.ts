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
til/util';
import { Node, NamedNode } from '../Node';

export abstract class Index {
  abstract compare(a: NamedNode, b: NamedNode): number;

  abstract isDefinedOn(node: Node): boolean;

  /**
   * @returns A standalone comparison function for
   * this index
   */
  getCompare(): Comparator<NamedNode> {
    return this.compare.bind(this);
  }

  /**
   * Given a before and after value for a node, determine if the indexed value has changed. Even if they are different,
   * it's possible that the changes are isolated to parts of the snapshot that are not indexed.
   *
   *
   * @returns True if the portion of the snapshot being indexed changed between oldNode and newNode
   */
  indexedValueChanged(oldNode: Node, newNode: Node): boolean {
    const oldWrapped = new NamedNode(MIN_NAME, oldNode);
    const newWrapped = new NamedNode(MIN_NAME, newNode);
    return this.compare(oldWrapped, newWrapped) !== 0;
  }

  /**
   * @returns a node wrapper that will sort equal to or less than
   * any other node wrapper, using this index
   */
  minPost(): NamedNode {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (NamedNode as any).MIN;
  }

  /**
   * @returns a node wrapper that will sort greater than or equal to
   * any other node wrapper, using this index
   */
  abstract maxPost(): NamedNode;

  abstract makePost(indexValue: unknown, name: string): NamedNode;

  /**
   * @returns String representation for inclusion in a query spec
   */
  abstract toString(): string;
}
