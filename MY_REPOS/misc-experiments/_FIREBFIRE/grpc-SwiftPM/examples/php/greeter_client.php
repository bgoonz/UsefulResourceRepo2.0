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
th=./../protos   --php_out=./   --grpc_out=./ --plugin=protoc-gen-grpc=./../../bins/opt/grpc_php_plugin ./../protos/helloworld.proto

require dirname(__FILE__).'/vendor/autoload.php';

@include_once dirname(__FILE__).'/Helloworld/GreeterClient.php';
@include_once dirname(__FILE__).'/Helloworld/HelloReply.php';
@include_once dirname(__FILE__).'/Helloworld/HelloRequest.php';
@include_once dirname(__FILE__).'/GPBMetadata/Helloworld.php';

function greet($name)
{
    $client = new Helloworld\GreeterClient('localhost:50051', [
        'credentials' => Grpc\ChannelCredentials::createInsecure(),
    ]);
    $request = new Helloworld\HelloRequest();
    $request->setName($name);
    list($reply, $status) = $client->SayHello($request)->wait();
    $message = $reply->getMessage();

    return $message;
}

$name = !empty($argv[1]) ? $argv[1] : 'world';
echo greet($name)."\n";
