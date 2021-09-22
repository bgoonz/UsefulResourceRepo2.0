<?hh
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file was moved from fbsource to www. View old history in diffusion:
 * https://fburl.com/h7qboesh
 */
namespace Facebook\ShipIt;

interface ShipItDestinationRepo {
  require extends ShipItRepo;

  /**
   * Find the contents of the fbshipit-source-id: header in the latest commit.
   *
   * @param $roots list of paths that contain synced commits.
   */
  public function genFindLastSourceCommit(
    keyset<string> $roots,
  ): Awaitable<?string>;

  /**
   * Generate a text patch ready for committing
   */
  public static function renderPatch(ShipItChangeset $patch): string;

  /**
   * Commit a standardized patch to the repo
   */
  public function genCommitPatch(
    ShipItChangeset $patch,
    bool $do_submodules = true,
  ): Awaitable<string>;

  /**
   * push local changes to the upstream
   */
  public function genPush(): Awaitable<void>;
}
