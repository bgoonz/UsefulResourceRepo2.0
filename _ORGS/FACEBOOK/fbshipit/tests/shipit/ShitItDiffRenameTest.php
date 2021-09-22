<?hh // strict
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

namespace Facebook\ShipIt;

<<\Oncalls('open_source')>>
final class ShitItDiffRenameTest extends ShellTest {
  public async function testShipItDiffRenamePathParse(): Awaitable<void> {
    $diff = ShipItRepoGIT::parseDiffHunk(
      "diff --git a/a.txt b/a_rename.txt \n similarity index 100% \n rename from a.txt \n rename to a_rename.txt",
    );
    \expect($diff !== null);
    \expect($diff as nonnull['path'] === 'a.txt');
    \expect(Shapes::idx($diff, 'new_path') !== null);
    \expect(Shapes::idx($diff, 'new_path') as nonnull === 'a_rename.txt');
  }
}
