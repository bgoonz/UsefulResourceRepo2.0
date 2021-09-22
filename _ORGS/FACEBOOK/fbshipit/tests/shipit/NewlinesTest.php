<?hh // strict
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file was moved from fbsource to www. View old history in diffusion:
 * https://fburl.com/wrfvw1gs
 */
namespace Facebook\ShipIt;

use namespace HH\Lib\Str; // @oss-enable

<<\Oncalls('open_source')>>
final class NewlinesTest extends ShellTest {
  const UNIX_TXT = "foo\nbar\nbaz\n";
  const WINDOWS_TXT = "foo\r\nbar\r\nbaz\r\n";

  public function testTestData(): void {
    \expect(Str\length(self::WINDOWS_TXT))->toEqual(
      Str\length(self::UNIX_TXT) + 3,
    );
  }

  public async function testMercurialSource(): Awaitable<void> {
    $temp_dir = new ShipItTempDir('mercurial-newline-test');

    $this->createTestFiles($temp_dir);
    await $this->genInitMercurialRepo($temp_dir);

    await self::genExecSteps(
      $temp_dir->getPath(),
      vec['hg', 'commit', '-Am', 'add files'],
    );

    $repo = new ShipItRepoHG(new ShipItDummyLock(), $temp_dir->getPath());
    await $repo->genSetBranch('master');
    $changeset = await $repo->genChangesetFromID('.');
    $changeset = \expect($changeset)->toNotBeNull();

    $this->assertContainsCorrectNewLines($changeset);
    await $this->genAssertCreatesCorrectNewLines($changeset);
  }

  public async function testGitSource(): Awaitable<void> {
    $temp_dir = new ShipItTempDir('git-newline-test');

    $this->createTestFiles($temp_dir);
    await $this->genInitGitRepo($temp_dir);

    await self::genExecSteps(
      $temp_dir->getPath(),
      vec['git', 'add', '.'],
      vec['git', 'commit', '-m', 'add files'],
    );

    $repo = new ShipItRepoGIT(new ShipItDummyLock(), $temp_dir->getPath());
    await $repo->genSetBranch('master');
    $changeset = await $repo->genChangesetFromID('HEAD');
    $changeset = \expect($changeset)->toNotBeNull();

    $this->assertContainsCorrectNewLines($changeset);
    await $this->genAssertCreatesCorrectNewLines($changeset);
  }

  private function createTestFiles(ShipItTempDir $temp_dir): void {
    PHP\file_put_contents($temp_dir->getPath().'/unix.txt', self::UNIX_TXT);
    PHP\file_put_contents(
      $temp_dir->getPath().'/windows.txt',
      self::WINDOWS_TXT,
    );
  }

  private function assertContainsCorrectNewLines(
    ShipItChangeset $changeset,
  ): void {
    $map = dict[];
    foreach ($changeset->getDiffs() as $diff) {
      $map[$diff['path']] = $diff['body'];
    }
    \expect($map['unix.txt'])->toContainSubstring("\n");
    \expect($map['windows.txt'])->toContainSubstring("\r\n");
    \expect($map['unix.txt'])->toNotContainSubstring("\r\n");
  }

  private async function genInitGitRepo(
    ShipItTempDir $temp_dir,
  ): Awaitable<void> {
    await self::genExecSteps($temp_dir->getPath(), vec['git', 'init']);
    await self::genConfigureGit($temp_dir);
  }

  private async function genInitMercurialRepo(
    ShipItTempDir $temp_dir,
  ): Awaitable<void> {
    await self::genExecSteps($temp_dir->getPath(), vec['hg', 'init']);
    self::configureHg($temp_dir);
  }

  private async function genAssertCreatesCorrectNewLines(
    ShipItChangeset $changeset,
  ): Awaitable<void> {
    $git_dir = new ShipItTempDir('newline-output-test-git');
    await $this->genInitGitRepo($git_dir);
    $hg_dir = new ShipItTempDir('newline-output-test-hg');
    await $this->genInitMercurialRepo($hg_dir);
    $git_repo = new ShipItRepoGIT(
      new ShipItDummyLock(),
      $git_dir->getPath(),

    );
    $hg_repo = new ShipItRepoHG(new ShipItDummyLock(), $hg_dir->getPath());
    await $git_repo->genSetBranch('--orphan=master');
    await $hg_repo->genSetBranch('master');
    $repos = vec[
      $git_repo,
      $hg_repo,
    ];

    foreach ($repos as $repo) {
      // @lint-ignore AWAIT_IN_LOOP These need to be committed one at a time
      await $repo->genCommitPatch($changeset);

      \expect(\file_get_contents($repo->getPath().'/unix.txt'))->toEqual(
        self::UNIX_TXT,
        'Unix test file',
      );
      \expect(\file_get_contents($repo->getPath().'/windows.txt'))->toEqual(
        self::WINDOWS_TXT,
        'Windows text file',
      );
    }
  }
}
