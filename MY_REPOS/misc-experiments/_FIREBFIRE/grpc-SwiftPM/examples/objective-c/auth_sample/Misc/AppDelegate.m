/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *


#import <Google/SignIn.h>

@implementation AppDelegate

// As instructed in https://developers.google.com/identity/sign-in/ios/sign-in
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  NSError* configureError;
  [GGLContext.sharedInstance configureWithError: &configureError];
  NSAssert(!configureError, @"Error configuring Google services: %@", configureError);

  return YES;
}

// As instructed in https://developers.google.com/identity/sign-in/ios/sign-in
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  // This will properly handle the URL that the application receives at the end of the
  // authentication process.
  return [GIDSignIn.sharedInstance handleURL:url
                           sourceApplication:sourceApplication
                                  annotation:annotation];
}

@end
