/*
 *
 * Copyright 2017 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *


@implementation GIDSignIn (GRPC)

- (void)getTokenWithHandler:(void (^)(NSString *token))handler {
  NSString *token = self.currentUser.authentication.accessToken;
  handler(token);
}

@end
