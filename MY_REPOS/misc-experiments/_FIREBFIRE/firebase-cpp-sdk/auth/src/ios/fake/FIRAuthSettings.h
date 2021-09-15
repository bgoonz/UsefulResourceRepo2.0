/*
 * Copyright 2018 Google
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

NS_ASSUME_NONNULL_BEGIN

/** @class FIRAuthSettings
    @brief Determines settings related to an auth object.
 */
NS_SWIFT_NAME(AuthSettings)
@interface FIRAuthSettings : NSObject

/** @property appVerificationDisabledForTesting
    @brief Flag to determine whether app verification should be disabled for testing or not.
 */
@property(nonatomic, assign, getter=isAppVerificationDisabledForTesting) BOOL
    appVerificationDisabledForTesting;

@end

NS_ASSUME_NONNULL_END
