#import "PRGUser.h"
#import <AFNetworking/AFHTTPRequestOperationManager.h>
#import <CommonCrypto/CommonDigest.h> 

static AFHTTPRequestOperationManager *_operationManager;

@implementation PRGUser

- (NSString *)displayName
{
    if (self.name.length > 0) {
        NSArray *names = [self.name componentsSeparatedByString:@" "];
        NSString *firstName = names.firstObject;
        NSMutableString *displayName = [NSMutableString stringWithString:firstName];
        
        if (names.count > 1) {
            NSString *lastName = names.lastObject;
            NSString *lastInitial = [lastName substringToIndex:1];
            [displayName appendFormat:@" %@.", lastInitial];
        }
        
        return displayName;
    }
    
    return self.username;
}

- (NSString *)imageUrlPath {
    NSString *baseUrl   = @"http://www.gravatar.com/avatar/";
    NSString *emailHash = [self md5HashString:_email];
    
    return [NSString stringWithFormat:@"%@%@", baseUrl, emailHash];
}


- (NSString *)md5HashString:(NSString *)str {
    const char *cStr = [str UTF8String];
    unsigned char result[CC_MD5_DIGEST_LENGTH];
    CC_MD5( cStr, strlen(cStr), result ); // This is the md5 call
    return [NSString stringWithFormat:
            @"%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x",
            result[0], result[1], result[2], result[3],
            result[4], result[5], result[6], result[7],
            result[8], result[9], result[10], result[11],
            result[12], result[13], result[14], result[15]
            ];  
}

- (BOOL)isEqual:(id)object
{
    if (!object) {
        return NO;
    }
    
    if (self == object) {
        return YES;
    }
    
    if ([object isKindOfClass:[self class]]) {
        PRGUser *otherUser = object;
        if ([self.username isEqualToString:otherUser.username]) {
            return YES;
        }
    }
    
    return NO;
}

@end
