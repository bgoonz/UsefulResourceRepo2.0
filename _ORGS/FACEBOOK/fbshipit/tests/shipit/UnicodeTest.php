<?hh // strict
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file was moved from fbsource to www. View old history in diffusion:
 * https://fburl.com/pt2dnpjf
 */
namespace Facebook\ShipIt;

use namespace HH\Lib\Str; // @oss-enable
use type Facebook\HackTest\DataProvider; // @oss-enable
// @oss-disable: use type DataProvider;

<<\Oncalls('open_source')>>
final class UnicodeTest extends ShellTest {
  const string CONTENT_SHA256 =
    '7b61b2a5bc81a5ef79267f11b5464a006824cb07b47da8773c8c5230c5c803e9';
  const string CONTENT_FILE = __DIR__.'/files/unicode.txt';
  private ?string $ctype;

  <<__Override>>
  public async function beforeEachTestAsync(): Awaitable<void> {
    $ctype = PHP\getenv('LC_CTYPE');
    if ($ctype !== false) {
      $this->ctype = $ctype;
    }
    PHP\putenv('LC_CTYPE=US-ASCII');
  }

  <<__Override>>
  public async function afterEachTestAsync(): Awaitable<void> {
    PHP\putenv('LC_CTYPE='.(string)$this->ctype);
  }

  <<__Memoize>>
  private function getExpectedContent(): string {
    $content = \file_get_contents(self::CONTENT_FILE);
    \expect(PHP\hash('sha256', $content, /* raw output = */ false))
      ->toEqual(self::CONTENT_SHA256);
    return $content;
  }

  public static function getSourceRepoImplementations(
  ): vec<(classname<ShipItSourceRepo>, string, string)> {
    return vec[
      tuple(
        ShipItRepoGIT::class,
        __DIR__.'/git-diffs/unicode.header',
        __DIR__.'/git-diffs/unicode.patch',
      ),
      tuple(
        ShipItRepoHG::class,
        __DIR__.'/hg-diffs/unicode.header',
        __DIR__.'/hg-diffs/unicode.patch',
      ),
    ];
  }

  <<DataProvider('getSourceRepoImplementations')>>
  public function testCommitMessage(
    classname<ShipItSourceRepo> $impl,
    string $header_file,
    string $patch_file,
  ): void {
    $changeset = $impl::getChangesetFromExportedPatch(
      \file_get_contents($header_file),
      \file_get_contents($patch_file),
    );
    $changeset = \expect($changeset)->toNotBeNull();
    \expect($changeset->getMessage())->toEqual(
      Str\trim($this->getExpectedContent()),
    );
  }

  public async function testCreatedFileWithGit(): Awaitable<void> {
    $changeset = ShipItRepoGIT::getChangesetFromExportedPatch(
      \file_get_contents(__DIR__.'/git-diffs/unicode.header'),
      \file_get_contents(__DIR__.'/git-diffs/unicode.patch'),
    );
    $changeset = \expect($changeset)->toNotBeNull();

    $tempdir = new ShipItTempDir('unicode-test-git');
    await $this->genInitGitRepo($tempdir);

    $repo = new ShipItRepoGIT(new ShipItDummyLock(), $tempdir->getPath());
    await $repo->genSetBranch('master');
    await $repo->genCommitPatch($changeset);

    \expect(\file_get_contents($tempdir->getPath().'/unicode-example.txt'))
      ->toEqual($this->getExpectedContent());
  }

  public async function testCreatedFileWithMercurial(): Awaitable<void> {
    $changeset = ShipItRepoGIT::getChangesetFromExportedPatch(
      \file_get_contents(__DIR__.'/git-diffs/unicode.header'),
      \file_get_contents(__DIR__.'/git-diffs/unicode.patch'),
    );
    $changeset = \expect($changeset)->toNotBeNull();

    $tempdir = new ShipItTempDir('unicode-test-hg');
    await $this->genInitMercurialRepo($tempdir);

    $repo = new ShipItRepoHG(new ShipItDummyLock(), $tempdir->getPath());
    await $repo->genSetBranch('master');
    await $repo->genCommitPatch($changeset);

    \expect(\file_get_contents($tempdir->getPath().'/unicode-example.txt'))
      ->toEqual($this->getExpectedContent());
  }

  public async function testCreatingCommitWithGit(): Awaitable<void> {
    $tempdir = new ShipItTempDir('unicode-test');
    $path = $tempdir->getPath();
    await $this->genInitGitRepo($tempdir);

    PHP\file_put_contents($tempdir->getPath().'/foo', 'bar');

    await (new ShipItShellCommand($path, 'git', 'add', 'foo'))->genRun();
    await (
      new ShipItShellCommand(
        $path,
        'git',
        'commit',
        '-m',
        "Subject\n\n".$this->getExpectedContent(),
      )
    )->setEnvironmentVariables(dict[
      'LC_ALL' => 'en_US.UTF-8',
    ])
      ->genRun();

    $repo = new ShipItRepoGIT(new ShipItDummyLock(), $tempdir->getPath());
    await $repo->genSetBranch('master');
    $changeset = await $repo->genChangesetFromID('HEAD');
    \expect($changeset->getMessage())
      ->toEqual(Str\trim($this->getExpectedContent()));
  }

  public async function testCreatingCommitWithHG(): Awaitable<void> {
    $tempdir = new ShipItTempDir('unicode-test');
    $path = $tempdir->getPath();
    await $this->genInitMercurialRepo($tempdir);

    PHP\file_put_contents($tempdir->getPath().'/foo', 'bar');

    await (
      new ShipItShellCommand(
        $path,
        'hg',
        'commit',
        '-Am',
        "Subject\n\n".$this->getExpectedContent(),
      )
    )->setEnvironmentVariables(dict[
      'LC_ALL' => 'en_US.UTF-8',
    ])
      ->genRun();

    $repo = new ShipItRepoHG(new ShipItDummyLock(), $tempdir->getPath());
    await $repo->genSetBranch('master');
    $changeset = await $repo->genChangesetFromID('.');
    \expect($changeset?->getMessage())->toEqual(
      Str\trim($this->getExpectedContent()),
    );
  }

  private async function genInitGitRepo(
    ShipItTempDir $tempdir,
  ): Awaitable<void> {
    $path = $tempdir->getPath();
    await (new ShipItShellCommand($path, 'git', 'init'))->genRun();
    await (
      new ShipItShellCommand(
        $path,
        'git',
        'config',
        'user.name',
        'FBShipIt Unit Test',
      )
    )->genRun();
    await (
      new ShipItShellCommand(
        $path,
        'git',
        'config',
        'user.email',
        'fbshipit@example.com',
      )
    )->genRun();
    await (
      new ShipItShellCommand(
        $path,
        'git',
        'commit',
        '--allow-empty',
        '-m',
        'initial commit',
      )
    )->genRun();
  }

  private async function genInitMercurialRepo(
    ShipItTempDir $tempdir,
  ): Awaitable<void> {
    $path = $tempdir->getPath();
    await (new ShipItShellCommand($path, 'hg', 'init'))->genRun();
    self::configureHg($tempdir);
  }
}
