<?hh // strict
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file was moved from fbsource to www. View old history in diffusion:
 * https://fburl.com/bd6ijkr5
 */
namespace Facebook\ShipIt;

use namespace HH\Lib\Str; // @oss-enable

<<\Oncalls('open_source')>>
final class ShipItShellCommandTest extends ShellTest {
  public async function testExitCodeZero(): Awaitable<void> {
    $result = await (new ShipItShellCommand('/', 'true'))->genRun();
    \expect($result->getExitCode())->toEqual(0);
  }

  public async function testExitOneException(): Awaitable<void> {
    try {
      await (new ShipItShellCommand('/', 'false'))->genRun();
      self::fail('Expected exception');
    } catch (ShipItShellCommandException $e) {
      \expect($e->getExitCode())->toEqual(1);
    }
  }

  public async function testExitOneWithoutException(): Awaitable<void> {
    $result = await (new ShipItShellCommand('/', 'false'))
      ->setNoExceptions()
      ->genRun();
    \expect($result->getExitCode())->toEqual(1);
  }

  public async function testStdIn(): Awaitable<void> {
    $result = await (new ShipItShellCommand('/', 'cat'))
      ->setStdIn('Hello, world.')
      ->genRun();
    \expect($result->getStdOut())->toEqual('Hello, world.');
    \expect($result->getStdErr())->toEqual('');
  }

  public async function testSettingEnvironmentVariable(): Awaitable<void> {
    $herp = ShipItTempDir::randomHex(16);
    $result = await (new ShipItShellCommand('/', 'env'))
      ->setEnvironmentVariables(dict['HERP' => $herp])
      ->genRun();
    \expect($result->getStdOut())->toContainSubstring('HERP='.$herp);
  }

  public async function testInheritingEnvironmentVariable(): Awaitable<void> {
    $to_try = keyset[
      // Need to keep SSH/Kerberos environment variables to be able to access
      // repositories
      'SSH_AUTH_SOCK',
      'KRB5CCNAME',
      // Arbitrary common environment variables so we can test /something/ if
      // the above aren't set
      'MAIL',
      'EDITOR',
      'HISTFILE',
      'PATH',
    ];

    $output = (
      await (new ShipItShellCommand('/', 'env'))
        ->setEnvironmentVariables(dict[])
        ->genRun()
    )
      ->getStdOut();

    $matched_any = false;
    foreach ($to_try as $var) {
      $value = PHP\getenv($var);
      if ($value !== false) {
        \expect($output)->toContainSubstring($var.'='.(string)$value."\n");
        $matched_any = true;
      }
    }
    \expect($matched_any)->toBeTrue('No acceptable variables found');
  }

  public async function testWorkingDirectory(): Awaitable<void> {
    \expect(
      (
        await (new ShipItShellCommand('/', 'pwd'))
          ->genRun()
      )
        ->getStdOut()
        |> Str\trim($$),
    )->toEqual('/');

    $tmp = PHP\sys_get_temp_dir();
    \expect(
      (
        await (new ShipItShellCommand($tmp, 'pwd'))
          ->genRun()
      )
        ->getStdOut()
        |> Str\trim($$),
    )->toContainSubstring(Str\trim($tmp, '/'));
  }

  public async function testMultipleArguments(): Awaitable<void> {
    $output = (
      await (new ShipItShellCommand('/', 'echo', 'foo', 'bar'))
        ->genRun()
    )
      ->getStdOut();
    \expect($output)->toEqual("foo bar\n");
  }

  public async function testEscaping(): Awaitable<void> {
    $output = (
      await (new ShipItShellCommand('/', 'echo', 'foo', '$FOO'))
        ->setEnvironmentVariables(dict['FOO' => 'variable value'])
        ->genRun()
    )
      ->getStdOut();
    \expect($output)->toEqual("foo \$FOO\n");
  }

  public async function testFailureHandlerNotCalledWhenNoFailure(
  ): Awaitable<void> {
    await (new ShipItShellCommand('/', 'true'))
      ->setFailureHandler($_ ==> {
        throw new \Exception("handler called");
      })
      ->genRun();
    // no exception
  }

  public async function testFailureHandlerCalledOnFailure(): Awaitable<void> {
    \expect(async () ==> {
      await (new ShipItShellCommand('/', 'false'))
        ->setFailureHandler($_ ==> {
          throw new \Exception("handler called");
        })
        ->genRun();
    })->toThrow(\Exception::class);
  }

  public async function testNoRetriesByDefault(): Awaitable<void> {
    $file = PHP\tempnam(PHP\sys_get_temp_dir(), __CLASS__) as string;
    /* HH_IGNORE_ERROR[2049] __PHPStdLib */
    /* HH_IGNORE_ERROR[4107] __PHPStdLib */
    \unlink($file);
    $result = await (new ShipItShellCommand('/', 'test', '-e', $file))
      ->setFailureHandler(async $_ ==> PHP\touch($file))
      ->setNoExceptions()
      ->genRun();
    /* HH_IGNORE_ERROR[2049] __PHPStdLib */
    /* HH_IGNORE_ERROR[4107] __PHPStdLib */
    \unlink($file);
    \expect($result->getExitCode())->toEqual(1);
  }

  public async function testRetries(): Awaitable<void> {
    $file = PHP\tempnam(PHP\sys_get_temp_dir(), __CLASS__) as string;
    /* HH_IGNORE_ERROR[2049] __PHPStdLib */
    /* HH_IGNORE_ERROR[4107] __PHPStdLib */
    \unlink($file);
    $result = await (new ShipItShellCommand('/', 'test', '-e', $file))
      ->setFailureHandler(async $_ ==> PHP\touch($file))
      ->setNoExceptions()
      ->setRetries(1)
      ->genRun();
    if (PHP\file_exists($file)) {
      /* HH_IGNORE_ERROR[2049] __PHPStdLib */
      /* HH_IGNORE_ERROR[4107] __PHPStdLib */
      \unlink($file);
    }
    \expect($result->getExitCode())->toEqual(0);
  }

  public async function testRetriesNotUsedOnSuccess(): Awaitable<void> {
    $file = PHP\tempnam(PHP\sys_get_temp_dir(), __CLASS__) as string;
    // rm will fail if ran twice with same arg
    if (Str\contains(PHP\php_uname('s'), 'Darwin')) {
      // MacOS doesn't have GNU rm
      $result = await (new ShipItShellCommand('/', 'rm', $file))
        ->setRetries(1)
        ->genRun();
    } else {
      $result = await (
        new ShipItShellCommand('/', 'rm', '--preserve-root', $file)
      )
        ->setRetries(1)
        ->genRun();
    }
    if (PHP\file_exists($file)) {
      /* HH_IGNORE_ERROR[2049] __PHPStdLib */
      /* HH_IGNORE_ERROR[4107] __PHPStdLib */
      \unlink($file);
    }
    \expect($result->getExitCode())->toEqual(0);
  }
}
