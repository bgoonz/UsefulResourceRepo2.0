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
er_address:', 'total_only::']);
$parts = explode(':', $args['metrics_server_address']);
$server_host = $parts[0];
$server_port = (count($parts) == 2) ? $parts[1] : '';

$socket = socket_create(AF_INET, SOCK_STREAM, 0);
if (@!socket_connect($socket, $server_host, $server_port)) {
    echo "Cannot connect to merics server...\n";
    exit(1);
}
socket_write($socket, 'qps');
while ($out = socket_read($socket, 1024)) {
    echo "$out\n";
}
socket_close($socket);
