<?php
/*
 *
 * Copyright 2018 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *

if ($pid == -1) {
  die("could not fork");

} else if ($pid) {
  // parent
  echo "parent waiting...\n";
  pcntl_waitpid($pid, /*&*/$pcntl_status);

} else {
  // child
  echo "child exiting...\n";
  exit(0);
}

echo "parent finishing. Done\n";
