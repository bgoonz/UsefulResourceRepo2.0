/*
 * Copyright 2018 Google
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

@class FIRAuthCredential;

NS_ASSUME_NONNULL_BEGIN

/**
    @brief A string constant identifying the Game Center identity provider.
 */
extern NSString *const FIRGameCenterAuthProviderID NS_SWIFT_NAME(GameCenterAuthProviderID);

/**
    @brief A string constant identifying the Game Center sign-in method.
 */
extern NSString *const _Nonnull FIRGameCenterAuthSignInMethod
NS_SWIFT_NAME(GameCenterAuthSignInMethod);

/** @typedef FIRGameCenterCredentialCallback
    @brief The type of block invoked when the Game Center credential code has finished.
    @param credential On success, the credential will be provided, nil otherwise.
    @param error On error, the error that occurred, nil otherwise.
 */
typedef void (^FIRGameCenterCredentialCallback)(FIRAuthCredential *_Nullable credential,
                                                NSError *_Nullable error)
NS_SWIFT_NAME(GameCenterCredentialCallback);

/** @class FIRGameCenterAuthProvider
    @brief A concrete implementation of @c FIRAuthProvider for Game Center Sign In.
 */
NS_SWIFT_NAME(GameCenterAuthProvider)
@interface FIRGameCenterAuthProvider : NSObject

/** @fn getCredentialWithCompletion:
    @brief Creates a @c FIRAuthCredential for a Game Center sign in.
 */
+ (void)getCredentialWithCompletion:(FIRGameCenterCredentialCallback)completion
NS_SWIFT_NAME(getCredential(completion:));

/** @fn init
    @brief This class is not meant to be initialized.
 */
- (instancetype)init NS_UNAVAILABLE;

@end

NS_ASSUME_NONNULL_END
