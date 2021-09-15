<?php
/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *

class GeneratedCodeTest extends AbstractGeneratedCodeTest
{
    public function setUp()
    {
        self::$client = new Math\MathClient(
            getenv('GRPC_TEST_HOST'), [
                'credentials' => Grpc\ChannelCredentials::createInsecure(),
            ]);
    }

    public function tearDown()
    {
        self::$client->close();
    }
}
