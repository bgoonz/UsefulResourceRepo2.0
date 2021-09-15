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

/**
 *  @brief The APNs token type for the app.
 */
typedef NS_ENUM(NSInteger, FIRAuthAPNSTokenType) {

  /** Unknown token type.
      The actual token type will be detected from the provisioning profile in the app's bundle.
   */
  FIRAuthAPNSTokenTypeUnknown,

  /** Sandbox token type.
   */
  FIRAuthAPNSTokenTypeSandbox,

  /** Production token type.
   */
  FIRAuthAPNSTokenTypeProd,
} NS_SWIFT_NAME(AuthAPNSTokenType);

NS_ASSUME_NONNULL_END
