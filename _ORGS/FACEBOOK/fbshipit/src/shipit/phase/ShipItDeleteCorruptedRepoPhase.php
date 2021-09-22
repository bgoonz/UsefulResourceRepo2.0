<?hh // strict
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file was moved from fbsource to www. View old history in diffusion:
 * https://fburl.com/knpiszng
 */
namespace Facebook\ShipIt;

use namespace HH\Lib\{Regex, Str}; // @oss-enable

final class ShipItDeleteCorruptedRepoPhase extends ShipItPhase {
  public function __construct(private ShipItRepoSide $side) {
    // Skipped by default, 'unskipped' by --$SIDE-allow-nuke flag
    $this->skip();
  }

  <<__Override>>
  public function getReadableName(): string {
    return 'Delete '.$this->side.' repository if corrupted';
  }

  <<__Override>>
  public function getCLIArguments(): vec<ShipItCLIArgument> {
    return vec[
      shape(
        'long_name' => $this->side.'-allow-nuke',
        'description' => 'Allow FBShipIt to delete the repository if corrupted',
        'write' => $_ ==> $this->unskip(),
      ),
    ];
  }

  <<__Override>>
  protected async function genRunImpl(
    ShipItManifest $manifest,
  ): Awaitable<void> {
    $local_path = $this->side === ShipItRepoSide::SOURCE
      ? $manifest->getSourcePath()
      : $manifest->getDestinationPath();

    if (!PHP\file_exists($local_path)) {
      return;
    }

    if (!(await $this->genIsCorrupted($local_path))) {
      return;
    }

    ShipItLogger::err("  Corruption detected, re-cloning\n");
    $path = PHP\dirname($local_path);
    if (Str\contains(PHP\php_uname('s'), 'Darwin')) {
      // MacOS doesn't have GNU rm
      await (new ShipItShellCommand($path, 'rm', '-rf', $local_path))->genRun();
    } else {
      await (
        new ShipItShellCommand(
          $path,
          'rm',
          '-rf',
          '--preserve-root',
          $local_path,
        )
      )
        ->genRun();
    }
  }

  private async function genIsCorrupted(string $local_path): Awaitable<bool> {
    if (PHP\file_exists($local_path.'/.git/')) {
      return await $this->genIsCorruptedGitRepo($local_path);
    }
    if (PHP\file_exists($local_path.'/.hg/')) {
      return await $this->genIsCorruptedHGRepo($local_path);
    }
    return false;
  }

  private async function genIsCorruptedGitRepo(
    string $local_path,
  ): Awaitable<bool> {
    $commands = vec[
      vec['git', 'show', 'HEAD'],
      vec['git', 'fsck'],
    ];

    foreach ($commands as $command) {
      $exit_code = (
        // @lint-ignore AWAIT_IN_LOOP perform shell opertaions serially
        await (new ShipItShellCommand($local_path, ...$command))
          ->setNoExceptions()
          ->genRun()
      )
        ->getExitCode();
      if ($exit_code !== 0) {
        return true;
      }
    }

    return false;
  }

  private async function genIsCorruptedHGRepo(
    string $local_path,
  ): Awaitable<bool> {
    // Given ShipItRepoHG's lock usage, there should never be a transaction in
    // progress if we have the lock.
    if (PHP\file_exists($local_path.'/.hg/store/journal')) {
      return true;
    }

    $result = await (
      new ShipItShellCommand(
        $local_path,
        'hg',
        'log',
        '-r',
        'tip',
        '--template',
        "{node}\n",
      )
    )
      ->setNoExceptions()
      ->setEnvironmentVariables(dict['HGPLAIN' => '1'])
      ->genRun();

    if ($result->getExitCode() !== 0) {
      return true;
    }
    $revision = Str\trim($result->getStdOut());
    if (Regex\matches($revision, re'/^0+$/')) {
      // 000000...0 is not a valid revision ID, but it's what we get
      // for an empty repository
      return true;
    }

    return false;
  }
}
