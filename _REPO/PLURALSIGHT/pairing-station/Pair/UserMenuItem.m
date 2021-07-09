//
//  UserMenuItem.m
//  Pair
//
//  Created by Dev Team on 7/1/15.
//  Copyright (c) 2015 Button. All rights reserved.
//

#import "UserMenuItem.h"
#import "PRGUser.h"

@interface UserMenuItem ()

@property (nonatomic, strong) NSString *oldTitle;

@end


@implementation UserMenuItem


- (void)setUser:(PRGUser *)user {
    
    if (user) {
        self.oldTitle = self.title;
        NSString *imageUrlPath = user.imageUrl ?: [user imageUrlPath];
        
        NSImage *image = [[NSImage alloc] initWithContentsOfURL:[NSURL URLWithString:imageUrlPath]];
        image.size = CGSizeMake(25, 25);
        
        [self setImage:image];
        [self setTitle:user.name];

    } else {
        [self setImage:nil];
        [self setTitle:self.oldTitle];
    }
}


@end
