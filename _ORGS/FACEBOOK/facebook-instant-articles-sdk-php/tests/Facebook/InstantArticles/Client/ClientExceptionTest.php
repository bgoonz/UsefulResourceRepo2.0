<?php
/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
namespace Facebook\InstantArticles\Client;

use PHPUnit\Framework\TestCase;

class ClientExceptionTest extends TestCase
{
    public function testExtendsException()
    {
        $exception = new ClientException();

        $this->assertInstanceOf('Exception', $exception);
    }
}
