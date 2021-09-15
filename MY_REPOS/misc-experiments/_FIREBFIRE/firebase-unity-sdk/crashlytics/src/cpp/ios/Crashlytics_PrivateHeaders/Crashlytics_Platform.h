/*
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

//

#import <FIRCrashlytics.h>

@interface FIRCrashlytics (Platform)

@property(nonatomic, strong, nullable) NSString* developmentPlatformName;
@property(nonatomic, strong, nullable) NSString* developmentPlatformVersion;

@end

void FIRCLSUserLoggingRecordInternalKeyValue(NSString* key, id value);
