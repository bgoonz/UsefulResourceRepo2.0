/*
 *
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *

#import <Cronet/Cronet.h>

void configureCronet(bool enable_netlog) {
  static dispatch_once_t configureCronet;
  dispatch_once(&configureCronet, ^{
    NSLog(@"configureCronet()");
    [Cronet setHttp2Enabled:YES];
    [Cronet setSslKeyLogFileName:@"Documents/key"];
    [Cronet enableTestCertVerifierForTesting];
    NSURL *url = [[[NSFileManager defaultManager] URLsForDirectory:NSDocumentDirectory
                                                         inDomains:NSUserDomainMask] lastObject];
    NSLog(@"Documents directory: %@", url);
    if (enable_netlog) {
      [Cronet startNetLogToFile:@"cronet_netlog.json" logBytes:YES];
    }
    [Cronet start];
  });
}
