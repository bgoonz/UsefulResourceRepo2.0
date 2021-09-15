<?php
/*
 *
 * Copyright 2016 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
lhost:1000', [
    'credentials' => Grpc\ChannelCredentials::createInsecure()
]);

$deadline = Grpc\Timeval::infFuture();
$call = new Grpc\Call($channel,
                      'dummy_method',
                      $deadline);

$call->cancel();
$channel->close();
