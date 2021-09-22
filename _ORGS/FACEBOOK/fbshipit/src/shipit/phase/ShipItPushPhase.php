<?hh // strict
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file was moved from fbsource to www. View old history in diffusion:
 * https://fburl.com/c1c26x5q
 */
namespace Facebook\ShipIt;

final class ShipItPushPhase extends ShipItPhase {
  <<__Override>>
  final public function getReadableName(): string {
    return "Push destination repository";
  }

  <<__Override>>
  final public function getCLIArguments(): vec<ShipItCLIArgument> {
    return vec[
      shape(
        'long_name' => 'skip-push',
        'description' => 'Do not push the destination repository',
        'write' => $_ ==> $this->skip(),
      ),
    ];
  }

  <<__Override>>
  protected async function genRunImpl(
    ShipItManifest $manifest,
  ): Awaitable<void> {
    $repo = await ShipItRepo::genOpen(
      $manifest->getDestinationSharedLock(),
      $manifest->getDestinationPath(),
      $manifest->getDestinationBranch(),
    );
    invariant(
      $repo is ShipItDestinationRepo,
      '%s is not a writable repository type - got %s, needed %s',
      $manifest->getDestinationPath(),
      \get_class($repo),
      ShipItDestinationRepo::class,
    );
    await $repo->genPush();
  }
}
