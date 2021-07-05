#import "PRGGitHubAPI.h"

@import AppKit;

@implementation PRGGitHubAPI

- (instancetype)init {
    self = [super init];
    if (self) {
        self.requestManager = [[AFHTTPRequestOperationManager alloc] initWithBaseURL:[NSURL URLWithString:@"https://api.github.com/"]];
        self.requestManager.requestSerializer = [AFJSONRequestSerializer serializer];
    }
    return self;
}

- (void)fetchUserWithEmail:(NSString *)email
                  password:(NSString *)password
             twoFactorCode:(NSString *)code
                completion:(PRGGitHubUserFetchCompletion)completion {
    [self.requestManager.requestSerializer setAuthorizationHeaderFieldWithUsername:email password:password];
    
    if (code) {
        [self.requestManager.requestSerializer setValue:code forHTTPHeaderField:@"X-GitHub-OTP"];
    } else {
        [self.requestManager.requestSerializer setValue:@"" forHTTPHeaderField:@"X-GitHub-OTP"];
    }
    
    [self.requestManager GET:@"/user"
                  parameters:nil
                     success:^(AFHTTPRequestOperation *operation, id responseObject) {
                         if (completion) {
                             completion(responseObject);
                         }
                     }
                     failure:^(AFHTTPRequestOperation *operation, NSError *error) {
                         if (completion) {
                             completion(nil);
                         }
                     }];
}

@end
