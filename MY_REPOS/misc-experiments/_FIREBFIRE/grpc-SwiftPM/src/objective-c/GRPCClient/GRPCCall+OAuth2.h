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


@protocol GRPCAuthorizationProtocol;

/**
 * The interface is deprecated. Please use GRPCCallOptions instead for
 * corresponding configurations.
 */
@interface GRPCCall (OAuth2)

@property(atomic, copy) NSString* oauth2AccessToken;
@property(atomic, copy, readonly) NSString* oauth2ChallengeHeader;
@property(atomic, strong) id<GRPCAuthorizationProtocol> tokenProvider;

@end
