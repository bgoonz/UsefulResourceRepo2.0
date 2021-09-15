/*
 * Copyright 2018 Google
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

#import "auth/src/ios/fake/FIRAuthCredential.h"

@implementation FIRGameCenterAuthProvider

+ (void)getCredentialWithCompletion:(FIRGameCenterCredentialCallback)completion {
  completion([[FIRAuthCredential alloc] initWithProvider:@"gc.apple.com"], nil);
}

@end
