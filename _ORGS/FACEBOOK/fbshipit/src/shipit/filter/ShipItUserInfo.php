<?hh // strict
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file was moved from fbsource to www. View old history in diffusion:
 * https://fburl.com/v5jxhmm9
 */
namespace Facebook\ShipIt;

// Not an interface: https://github.com/facebook/hhvm/issues/6820
abstract class ShipItUserInfo {
  // eg convert a local unix account name to a github account name
  abstract public static function genDestinationUserFromLocalUser(
    string $local_user,
  ): Awaitable<?string>;

  // eg convert a local unix account name to "Foo Bar <foobar@example.com>"
  abstract public static function genDestinationAuthorFromLocalUser(
    string $local_user,
  ): Awaitable<?string>;
}
