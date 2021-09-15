/*
 * Copyright 2020 Google
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
C_IOS_FAKE_FIRINSTALLATIONSAUTHTOKENRESULT_H_
#define FIREBASE_INSTALLATIONS_SRC_IOS_FAKE_FIRINSTALLATIONSAUTHTOKENRESULT_H_

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

/** The class represents a result of the installation auth token request. */
NS_SWIFT_NAME(InstallationsAuthTokenResult)
@interface FIRInstallationsAuthTokenResult : NSObject

/** The installation auth token string. */
@property(nonatomic, readonly) NSString *authToken;

/** The installation auth token expiration date. */
@property(nonatomic, readonly) NSDate *expirationDate;

- (instancetype)initWithToken:(NSString *)token expirationDate:(NSDate *)expirationTime;

@end

NS_ASSUME_NONNULL_END

#endif  // FIREBASE_INSTALLATIONS_SRC_IOS_FAKE_FIRINSTALLATIONSAUTHTOKENRESULT_H_
