<?hh // strict
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file was moved from fbsource to www. View old history in diffusion:
 * https://fburl.com/vl0gf10a
 */
namespace Facebook\ShipIt;

use namespace HH\Lib\Str; // @oss-enable

final class ShipItShellCommandException extends \Exception {
  public function __construct(
    private string $command,
    private ShipItShellCommandResult $result,
  ) {
    $exitCode = $result->getExitCode();
    $error = $result->getStdErr();
    if (((string)Str\trim($error)) === '') {
      $error = $result->getStdOut();
    }
    $message = Str\format(
      '%s returned exit code %d: %s',
      $command,
      $exitCode,
      Str\trim($error),
    );
    parent::__construct($message);
  }

  public function getError(): string {
    return $this->result->getStdErr();
  }

  public function getExitCode(): int {
    return $this->result->getExitCode();
  }

  public function getOutput(): string {
    return $this->result->getStdOut();
  }

  public function getResult(): ShipItShellCommandResult {
    return $this->result;
  }
}
