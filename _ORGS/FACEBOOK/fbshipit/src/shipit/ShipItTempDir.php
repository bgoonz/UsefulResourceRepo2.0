<?hh // strict
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file was moved from fbsource to www. View old history in diffusion:
 * https://fburl.com/v6y4kokw
 */

namespace Facebook\ShipIt;

enum ShipItTempDirMode: string {
  AUTO_REMOVE = 'AUTO_REMOVE';
  KEEP = 'KEEP';
  REMOVED = 'REMOVE';
}

final class ShipItTempDir {
  private string $path;
  private ShipItTempDirMode $mode = ShipItTempDirMode::AUTO_REMOVE;

  public static function randomHex(int $length): string {
    /* HH_IGNORE_ERROR[2049] __PHPStdLib */
    /* HH_IGNORE_ERROR[4107] __PHPStdLib */
    return PHP\bin2hex(\random_bytes($length));
  }

  public function __construct(string $component) {
    $path = PHP\sys_get_temp_dir().'/shipit-'.$component.'-';
    $path .= self::randomHex(32);
    PHP\mkdir($path);
    $this->path = $path;
  }

  public function keep(): void {
    $this->assertMode(ShipItTempDirMode::AUTO_REMOVE);
    $this->mode = ShipItTempDirMode::KEEP;
  }

  public async function genRemove(): Awaitable<void> {
    $this->assertMode(ShipItTempDirMode::AUTO_REMOVE);
    await (
      new ShipItShellCommand(PHP\sys_get_temp_dir(), 'rm', '-rf', $this->path)
    )->genRun();
    $this->mode = ShipItTempDirMode::REMOVED;
  }

  public function getPath(): string {
    return $this->path;
  }

  public function __clone(): noreturn {
    invariant_violation("Can't touch^Wclone this");
  }

  private function assertMode(ShipItTempDirMode $mode): void {
    invariant(
      $this->mode === $mode,
      'Mode is %s, expected %s',
      $this->mode,
      $mode,
    );
  }
}
