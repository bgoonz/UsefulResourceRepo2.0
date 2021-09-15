@import AppKit;
@class PRGUser, PRGGitManager, PRGGitHubAPI, UserMenuItem;

typedef NS_ENUM(NSInteger, PRGSeatSide) {
    PRGSeatSideLeft,
    PRGSeatSideRight
};

@interface PRGStationCoordinator : NSObject

@property (nonatomic, strong) PRGGitManager *gitManager;
@property (nonatomic, strong) PRGGitHubAPI *gitHubAPI;

@property (nonatomic, strong) PRGUser *leftUser;
@property (nonatomic, strong) PRGUser *rightUser;

@property (nonatomic, strong) UserMenuItem *leftUserMenuItem;
@property (nonatomic, strong) UserMenuItem *rightUserMenuItem;


- (void)initializeMenuItems;

- (void)swapUsers;
- (void)removeLeftUser;
- (void)removeRightUser;
- (void)removeBoth;

- (void)promptForLoginOnSeatSide:(PRGSeatSide)seatSide;

@end
