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
';
import { Path } from './util/Path';

/**
 * Mutable object which basically just stores a reference to the "latest" immutable snapshot.
 */
export class SnapshotHolder {
  private rootNode_: Node = ChildrenNode.EMPTY_NODE;

  getNode(path: Path): Node {
    return this.rootNode_.getChild(path);
  }

  updateSnapshot(path: Path, newSnapshotNode: Node) {
    this.rootNode_ = this.rootNode_.updateChild(path, newSnapshotNode);
  }
}
