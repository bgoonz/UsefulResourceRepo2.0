/*
 * Copyright 2017 Google
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

#import "FIRAuthCredential.h"

NS_ASSUME_NONNULL_BEGIN

/** @class FIRPhoneAuthCredential
    @brief Implementation of FIRAuthCredential for Phone Auth credentials.
 */
NS_SWIFT_NAME(PhoneAuthCredential)
@interface FIRPhoneAuthCredential : FIRAuthCredential <NSSecureCoding>

#if !defined(FIREBASE_AUTH_TESTING)
/** @fn init
    @brief This class is not supposed to be instantiated directly.
 */
- (instancetype)init NS_UNAVAILABLE;
#endif  // !defined(FIREBASE_AUTH_TESTING)

@end

NS_ASSUME_NONNULL_END
