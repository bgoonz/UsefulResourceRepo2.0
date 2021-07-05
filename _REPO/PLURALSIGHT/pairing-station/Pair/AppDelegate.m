#import "AppDelegate.h"

#import "PRGUser.h"
@import AppKit;
#import "MenubarController.h"

@interface AppDelegate ()

@property (nonatomic, strong) MenubarController *menuController;

@end

@implementation AppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification {
    
    self.stationCoordinator = [[PRGStationCoordinator alloc] init];
    [self.stationCoordinator initializeMenuItems];
    
    self.menuController = [MenubarController new];
}

- (void)quit {
    [NSApp terminate:self];
}

- (void)swap {
    [self.stationCoordinator swapUsers];
}

- (void)removeLeft
{
    [self.stationCoordinator removeLeftUser];
}

- (void)removeRight
{
    [self.stationCoordinator removeRightUser];
}

- (void)removeBoth
{
    [self.stationCoordinator removeBoth];
}

- (void)setLeftPair:(NSMenuItem *)sender {
    [self.stationCoordinator promptForLoginOnSeatSide:PRGSeatSideLeft];
}

- (void)setRightPair:(NSMenuItem *)sender {
    [self.stationCoordinator promptForLoginOnSeatSide:PRGSeatSideRight];
}


@end
