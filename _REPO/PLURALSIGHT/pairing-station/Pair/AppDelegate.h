#import <Cocoa/Cocoa.h>
#import "PRGStationCoordinator.h"

@interface AppDelegate : NSObject <NSApplicationDelegate>

@property (nonatomic, strong) PRGStationCoordinator *stationCoordinator;

- (void)quit;
- (void)swap;
- (void)removeLeft;
- (void)removeRight;
- (void)removeBoth;
- (void)setLeftPair:(NSMenuItem *)sender;
- (void)setRightPair:(NSMenuItem *)sender;

@end

