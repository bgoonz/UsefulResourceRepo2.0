// Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
//
// You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
// copy, modify, and distribute this software in source code or binary form for use
// in connection with the web services and APIs provided by Facebook.
//
// As with any software that integrates with the Facebook platform, your use of
// this software is subject to the Facebook Developer Principles and Policies
// [http://developers.facebook.com/policy/]. This copyright notice shall be
// included in all copies or substantial portions of the software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

#import <Foundation/Foundation.h>

#import "FBSDKKeychainStoreProtocol.h"

NS_SWIFT_NAME(KeychainStore)
@interface FBSDKKeychainStore : NSObject <FBSDKKeychainStore>

@property (nonatomic, readonly, copy) NSString *service;
@property (nonatomic, readonly, copy) NSString *accessGroup;

- (instancetype)init NS_UNAVAILABLE;
+ (instancetype)new NS_UNAVAILABLE;
- (instancetype)initWithService:(NSString *)service accessGroup:(NSString *)accessGroup NS_DESIGNATED_INITIALIZER;

- (BOOL)setDictionary:(NSDictionary<NSString *, id> *)value forKey:(NSString *)key accessibility:(CFTypeRef)accessibility;
- (NSDictionary<NSString *, id> *)dictionaryForKey:(NSString *)key;

- (BOOL)setString:(NSString *)value forKey:(NSString *)key accessibility:(CFTypeRef)accessibility;
- (NSString *)stringForKey:(NSString *)key;

- (BOOL)setData:(NSData *)value forKey:(NSString *)key accessibility:(CFTypeRef)accessibility;
- (NSData *)dataForKey:(NSString *)key;

// hook for subclasses to override keychain query construction.
- (NSMutableDictionary<NSString *, id> *)queryForKey:(NSString *)key;

@end

