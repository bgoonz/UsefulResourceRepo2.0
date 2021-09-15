/*
 * Copyright 2017 Google
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

#import "auth/src/ios/fake/FIRAuthCredential.h"

NS_ASSUME_NONNULL_BEGIN

@implementation FIRGitHubAuthProvider

+ (FIRAuthCredential *)credentialWithToken:(NSString *)token {
  return [[FIRAuthCredential alloc] initWithProvider:@"github.com"];
}

@end

NS_ASSUME_NONNULL_END
