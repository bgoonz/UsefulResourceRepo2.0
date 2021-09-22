<?hh // strict
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file was moved from fbsource to www. View old history in diffusion:
 * https://fburl.com/lhprnur6
 */
namespace Facebook\ShipIt;

abstract class ShipItPhase {
  private bool $skipped = false;

  abstract public function getReadableName(): string;
  abstract protected function genRunImpl(
    ShipItManifest $manifest,
  ): Awaitable<void>;

  public function getCLIArguments(): vec<ShipItCLIArgument> {
    return vec[];
  }

  final public function isSkipped(): bool {
    return $this->skipped;
  }

  final protected function skip(): void {
    $this->skipped = true;
  }

  final protected function unskip(): void {
    $this->skipped = false;
  }

  final public async function genRun(
    ShipItManifest $manifest,
  ): Awaitable<void> {
    $logger = new ShipItVerboseLogger($manifest->isVerboseEnabled());

    if ($this->isSkipped()) {
      $logger->out("Skipping phase: %s", $this->getReadableName());
      return;
    }
    $logger->out("Starting phase: %s", $this->getReadableName());
    try {
      await $this->genRunImpl($manifest);
    } catch (ShipItExitException $e) {
      $logger->out("Finished phase: %s", $this->getReadableName());
      // This is used to signal that ShipIt is exiting, not a reportable
      // error message.
      throw $e;
    } catch (\Exception $e) {
      $logger->out(
        "Finished phase WITH EXCEPTION: %s",
        $this->getReadableName(),
      );
      throw $e;
    }
    $logger->out("Finished phase: %s", $this->getReadableName());
  }
}
