<?hh // strict
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file was moved from fbsource to www. View old history in diffusion:
 * https://fburl.com/xm1y32k1
 */
namespace Facebook\ShipIt;

abstract class ShellTest extends \Facebook\HackTest\HackTest { // @oss-enable
// @oss-disable: abstract class ShellTest extends \HackTest {

  protected static async function genExecSteps(
    string $cwd,
    Container<string> ...$steps
  ): Awaitable<void> {
    foreach ($steps as $step) {
      // @lint-ignore AWAIT_IN_LOOP These need to be run serially
      await (new ShipItShellCommand($cwd, ...$step))->setOutputToScreen()
        ->genRun();
    }
  }

  protected static async function genConfigureGit(
    ShipItTempDir $temp_dir,
  ): Awaitable<void> {
    await self::genExecSteps(
      $temp_dir->getPath(),
      vec['git', 'config', 'user.name', 'FBShipIt Unit Test'],
      vec['git', 'config', 'user.email', 'fbshipit@example.com'],
    );
  }

  protected static function configureHg(ShipItTempDir $temp_dir): void {
    PHP\file_put_contents(
      $temp_dir->getPath().'/.hg/hgrc',
      '[ui]
username = FBShipIt Unit Test <fbshipit@example.com>',
    );
  }
}
