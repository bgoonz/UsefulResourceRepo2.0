//
//  MenubarController.m
//  Pair
//
//  Created by Dev Team on 6/4/15.
//  Copyright (c) 2015 Button. All rights reserved.
//

#import "MenubarController.h"
#import "AppDelegate.h"
#import "UserMenuItem.h"

@interface MenubarController()

@property (nonatomic, strong) NSStatusItem *statusItem;

@end

@implementation MenubarController

#pragma mark -

- (id)init
{
    self = [super init];
    if (self != nil)
    {
        // Install status item into the menu bar
        _statusItem = [[NSStatusBar systemStatusBar] statusItemWithLength:STATUS_ITEM_VIEW_WIDTH];
        [_statusItem.button setImage:[NSImage imageNamed:@"menubar-icon"]];
        
        NSMenu *menu = [NSMenu new];

        AppDelegate *delegate = (AppDelegate *)[NSApplication sharedApplication].delegate;
        
        [menu addItem:delegate.stationCoordinator.leftUserMenuItem];
        [menu addItem:delegate.stationCoordinator.rightUserMenuItem];
        
        [menu addItem:[NSMenuItem separatorItem]];
        
        [menu addItemWithTitle:@"Switch" action:@selector(swap) keyEquivalent:@""];
        [menu addItemWithTitle:@"Remove Left" action:@selector(removeLeft) keyEquivalent:@""];
        [menu addItemWithTitle:@"Remove Right" action:@selector(removeRight) keyEquivalent:@""];
        [menu addItemWithTitle:@"Remove Both" action:@selector(removeBoth) keyEquivalent:@""];
        [menu addItem:[NSMenuItem separatorItem]];
        [menu addItemWithTitle:@"Quit" action:@selector(quit) keyEquivalent:@""];
        
        
        
        
        _statusItem.menu = menu;
    }
    return self;
}



- (void)dealloc
{
    [[NSStatusBar systemStatusBar] removeStatusItem:self.statusItem];
}

@end
