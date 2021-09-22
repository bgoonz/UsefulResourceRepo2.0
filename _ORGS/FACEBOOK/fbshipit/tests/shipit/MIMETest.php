<?hh // strict
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

namespace Facebook\ShipIt;

<<\Oncalls('open_source')>>
final class MIMETest extends ShellTest {
  public async function testCanCommitPatchWithMIME(): Awaitable<void> {
    $changeset = ShipItRepoHG::getChangesetFromExportedPatch(
      \file_get_contents(__DIR__.'/hg-diffs/needs-mime.header'),
      \file_get_contents(__DIR__.'/hg-diffs/needs-mime.patch'),
    );
    $changeset = \expect($changeset)->toNotBeNull();

    $tempdir = new ShipItTempDir('needs-mime-git');
    await (
      new ShipItShellCommand($tempdir->getPath(), 'git', 'init')
    )->genRun();
    await self::genConfigureGit($tempdir);
    await (
      new ShipItShellCommand(
        $tempdir->getPath(),
        'git',
        'commit',
        '--allow-empty',
        '-m',
        'initial commit',
      )
    )->genRun();

    $repo = new ShipItRepoGIT(
      new ShipItDummyLock(),
      $tempdir->getPath(),
    );
    await $repo->genSetBranch('master');
    await $repo->genCommitPatch($changeset);

    \expect(\file_get_contents($tempdir->getPath().'/example.txt'))
      ->toEqual("If you can see this it worked\n");
  }
}
