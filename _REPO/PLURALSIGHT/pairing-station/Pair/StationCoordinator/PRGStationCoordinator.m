#import "PRGStationCoordinator.h"
#import "PRGUser.h"
#import "PRGGitManager.h"
#import "PRGGitHubAPI.h"
#import "Pair-Swift.h"
#import "AppDelegate.h"
#import "UserMenuItem.h"

@interface PRGStationCoordinator()

@property (nonatomic, weak) IBOutlet NSView *alertAccessoryView;

@end

@implementation PRGStationCoordinator

- (instancetype)init {
    self = [super init];
    if (self) {
        _gitManager = [[PRGGitManager alloc] init];
        _gitHubAPI  = [[PRGGitHubAPI alloc] init];
    }
    return self;
}

- (void)initializeMenuItems {
    [self applyUsersToGitProfile];
    
    self.leftUserMenuItem = [[UserMenuItem alloc] initWithTitle:@"Left Pair" action:@selector(setLeftPair:) keyEquivalent:@""];
    self.rightUserMenuItem = [[UserMenuItem alloc] initWithTitle:@"Right Pair" action:@selector(setRightPair:) keyEquivalent:@""];
}


- (void)promptForLoginOnSeatSide:(PRGSeatSide)seatSide {
    NSAlert *alert = [[NSAlert alloc] init];
    [alert setMessageText:@"Enter your Github credentials"];
    [alert addButtonWithTitle:@"Ok"];
    [alert addButtonWithTitle:@"Cancel"];
    
    NSNib *alertNib = [[NSNib alloc] initWithNibNamed:@"SignInAlertView" bundle:nil];
    PRGAuthenticationAlertAccessoryView *accessoryView = nil;
    NSArray *topLevelObjects;
    [alertNib instantiateWithOwner:nil topLevelObjects:&topLevelObjects];
    for (id obj in topLevelObjects) {
        if ([obj isKindOfClass:[PRGAuthenticationAlertAccessoryView class]]) {
            accessoryView = obj;
            [alert setAccessoryView:accessoryView];
            
        }
    }
    
    NSInteger button = [alert runModal];
    
    if (button == NSAlertFirstButtonReturn) {
        NSString *email = accessoryView.emailField.stringValue;
        NSString *password = accessoryView.passwordField.stringValue;
        NSString *twoFactor = accessoryView.twoFactorField.stringValue;

    [self.gitHubAPI fetchUserWithEmail:email
                              password:password
                         twoFactorCode:twoFactor
                            completion:^(NSDictionary *userDict) {
                                if (!userDict || (!userDict[@"login"] && !userDict[@"name"])) {
                                    return;
                                }
                                PRGUser *user = [[PRGUser alloc] init];
                                user.name = userDict[@"name"];
                                user.username = userDict[@"login"];
                                user.email = email;
                                user.imageUrl = userDict[@"avatar_url"];
                       
                                if (seatSide == PRGSeatSideLeft) {
                                    [self setLeftUser:user];
                                }
                                else {
                                    [self setRightUser:user];
                                }
                                
                                if ([self.leftUser isEqual:self.rightUser]) {
                                    if (seatSide == PRGSeatSideLeft) {
                                        [self setRightUser:nil];
                                    } else {
                                        [self setLeftUser:nil];
                                    }
                                }
                            }];
            }
}


- (void)setLeftUser:(PRGUser *)user {
    _leftUser = user;
    [self.leftUserMenuItem setUser:user];    
    [self applyUsersToGitProfile];
}


- (void)setRightUser:(PRGUser *)user {
    _rightUser = user;
    [self.rightUserMenuItem setUser:user];
    [self applyUsersToGitProfile];
}


- (NSString *)emailString {
    NSString *emailString;
    if (!_leftUser.email && !_rightUser.email) {
        emailString = nil;
    }
    else if (_leftUser.email && _rightUser.email) {
        emailString = [NSString stringWithFormat:@"%@, %@", _leftUser.email, _rightUser.email];
    }
    else {
        emailString = _leftUser.email ?: _rightUser.email;
    }
    return emailString;
}

- (NSString *)nameString {
    NSString *nameString;
    if (!_leftUser.displayName && !_rightUser.displayName) {
        nameString = @"Pairing Station";
    }
    else if (_leftUser.displayName && _rightUser.displayName) {
        nameString = [NSString stringWithFormat:@"%@ and %@", _leftUser.displayName, _rightUser.displayName];
    }
    else {
        nameString = _leftUser.displayName ?: _rightUser.displayName;
    }
    return nameString;
}

- (void)applyUsersToGitProfile {
    NSString *nameString = [self nameString];
    NSString *emailString = [self emailString];
    [self.gitManager setConfigUsername:nameString email:emailString];
}

- (void)swapUsers
{
    PRGUser *origLeftUser = self.leftUser;
    [self setLeftUser:self.rightUser];
    [self setRightUser:origLeftUser];
}

- (void)removeLeftUser
{
    [self setLeftUser:nil];
}

- (void)removeRightUser
{
    [self setRightUser:nil];
}

- (void)removeBoth
{
    [self removeLeftUser];
    [self removeRightUser];
}



@end
