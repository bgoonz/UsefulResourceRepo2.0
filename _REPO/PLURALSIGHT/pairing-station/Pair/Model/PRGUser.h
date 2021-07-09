#import <Foundation/Foundation.h>

@interface PRGUser : NSObject

@property (nonatomic, strong) NSString *name;
@property (nonatomic, strong) NSString *username;
@property (nonatomic, strong) NSString *email;
@property (nonatomic, strong) NSString *imageUrl;
@property (nonatomic, readonly) NSString *displayName;


- (NSString *)imageUrlPath;

@end
