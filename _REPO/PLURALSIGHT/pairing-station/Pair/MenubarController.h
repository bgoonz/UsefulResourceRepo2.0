//
//  MenubarController.h
//  Pair
//
//  Created by Dev Team on 6/4/15.
//  Copyright (c) 2015 Button. All rights reserved.
//

@import AppKit;

#define STATUS_ITEM_VIEW_WIDTH 24.0

#pragma mark -

@interface MenubarController : NSObject

@property (nonatomic) BOOL hasActiveIcon;
@property (nonatomic, strong, readonly) NSStatusItem *statusItem;

@end
