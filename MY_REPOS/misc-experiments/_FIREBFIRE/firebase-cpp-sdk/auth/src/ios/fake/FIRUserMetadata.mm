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

@implementation FIRUserMetadata

- (instancetype)init {
  self = [super init];
  if (self) {
    _lastSignInDate = [NSDate dateWithTimeIntervalSince1970:1];
    _creationDate =  [NSDate dateWithTimeIntervalSince1970:1];
  }
  return self;
}

@end

NS_ASSUME_NONNULL_END
