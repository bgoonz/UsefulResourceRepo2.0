Diffs should be exported in the same way that the ShipItRepo does - for example:

$ hhvm -m debug
Welcome to HipHop Debugger!
Type "help" or "?" for a complete list of commands.

hphpd> require_once('./autoload.php')
hphpd> $repo = new \Facebook\ShipIt\ShipItRepoHG('/tmp/hgtest', 'master')
hphpd> $header = $repo->getNativeHeaderFromID('5ecc4b73aba8abb77f814a1fa0020e46e0327c53')
hphpd> $patch = $repo->getNativePatchFromID('5ecc4b73aba8abb77f814a1fa0020e46e0327c53')
hphpd> file_put_contents('tests/shipit/git-diffs/add-newline-at-eof.header', $header)
hphpd> file_put_contents('tests/shipit/git-diffs/add-newline-at-eof.patch', $patch)
