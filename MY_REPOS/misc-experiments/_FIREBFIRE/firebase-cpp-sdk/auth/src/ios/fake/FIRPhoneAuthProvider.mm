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
#import "auth/src/ios/fake/FIRPhoneAuthCredential.h"

NS_ASSUME_NONNULL_BEGIN

@implementation FIRPhoneAuthProvider

- (instancetype)init {
  return [super init];
}

+ (instancetype)provider {
  return [[FIRPhoneAuthProvider alloc] init];
}

+ (instancetype)providerWithAuth:(FIRAuth *)auth {
  return [FIRPhoneAuthProvider provider];
}

- (void)verifyPhoneNumber:(NSString *)phoneNumber
               UIDelegate:(nullable id<FIRAuthUIDelegate>)UIDelegate
               completion:(nullable FIRVerificationResultCallback)completion {}

- (FIRPhoneAuthCredential *)credentialWithVerificationID:(NSString *)verificationID
                                        verificationCode:(NSString *)verificationCode {
  return [[FIRPhoneAuthCredential alloc] initWithProvider:@"phone"];
}

@end

NS_ASSUME_NONNULL_END
