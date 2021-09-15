/*
 * Copyright 2019 Google
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

NS_ASSUME_NONNULL_BEGIN

@implementation FIRPhoneAuthCredential

+ (BOOL)supportsSecureCoding {
      return YES;
}

- (void)encodeWithCoder:(NSCoder *)aCoder {}

- (nullable instancetype)initWithCoder:(NSCoder *)aDecoder {
  return [self initWithProvider:@"phone"];
}

@end

NS_ASSUME_NONNULL_END
