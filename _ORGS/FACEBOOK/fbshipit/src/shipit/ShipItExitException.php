<?hh
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

namespace Facebook\ShipIt;

final class ShipItExitException extends \Exception {
  public function __construct(public int $exitCode) {
    parent::__construct("ShipIt exited with code: $exitCode");
  }
}
