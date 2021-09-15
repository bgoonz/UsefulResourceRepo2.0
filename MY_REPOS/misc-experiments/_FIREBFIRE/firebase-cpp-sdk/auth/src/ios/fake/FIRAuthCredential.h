/*
 * Copyright 2017 Google
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

NS_ASSUME_NONNULL_BEGIN

/** @class FIRAuthCredential
    @brief Represents a credential.
 */
NS_SWIFT_NAME(AuthCredential)
@interface FIRAuthCredential : NSObject

/** @property provider
    @brief Gets the name of the identity provider for the credential.
 */
@property(nonatomic, copy, readonly) NSString *provider;

/** @fn init
    @brief This is an abstract base class. Concrete instances should be created via factory
        methods available in the various authentication provider libraries (like the Facebook
        provider or the Google provider libraries.)
 */
- (instancetype)init NS_UNAVAILABLE;

// Only used for testing.
- (instancetype)initWithProvider:(NSString *)provider NS_DESIGNATED_INITIALIZER;

@end

NS_ASSUME_NONNULL_END
