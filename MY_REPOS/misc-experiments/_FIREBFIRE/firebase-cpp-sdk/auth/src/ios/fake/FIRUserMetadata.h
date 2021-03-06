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

/** @class FIRUserMetadata
    @brief A data class representing the metadata corresponding to a Firebase user.
 */
NS_SWIFT_NAME(UserMetadata)
@interface FIRUserMetadata : NSObject

/** @property lastSignInDate
    @brief Stores the last sign in date for the corresponding Firebase user.
 */
@property(copy, nonatomic, readonly, nullable) NSDate *lastSignInDate;

/** @property creationDate
    @brief Stores the creation date for the corresponding Firebase user.
 */
@property(copy, nonatomic, readonly, nullable) NSDate *creationDate;

#if defined(FIREBASE_AUTH_TESTING)
- (instancetype)init;
#else
/** @fn init
    @brief This class should not be initialized manually, an instance of this class can be obtained
        from a Firebase user object.
 */
- (instancetype)init NS_UNAVAILABLE;
#endif  // defined(FIREBASE_AUTH_TESTING)

@end

NS_ASSUME_NONNULL_END
