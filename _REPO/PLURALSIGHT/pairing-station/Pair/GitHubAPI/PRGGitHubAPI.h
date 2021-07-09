#import <Foundation/Foundation.h>
#import <AFNetworking/AFHTTPRequestOperationManager.h>

typedef void(^PRGGitHubUserFetchCompletion)(NSDictionary *userDict);

@interface PRGGitHubAPI : NSObject

@property (nonatomic, strong) AFHTTPRequestOperationManager *requestManager;

- (void)fetchUserWithEmail:(NSString *)email
                  password:(NSString *)password
             twoFactorCode:(NSString *)code
                completion:(PRGGitHubUserFetchCompletion)completion;
@end
