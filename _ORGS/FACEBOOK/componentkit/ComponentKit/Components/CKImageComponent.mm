/*
 *  Copyright (c) 2014-present, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 */

#import "CKImageComponent.h"

@implementation CKImageComponent

- (instancetype)initWithImage:(UIImage *)image
                  attributes:(const CKViewComponentAttributeValueMap &)attributes
                        size:(const RCComponentSize &)size
{
  CKViewComponentAttributeValueMap updatedAttributes(attributes);
  updatedAttributes.insert({
    {@selector(setImage:), image},
  });

  return [super initWithView:{
            [UIImageView class],
            std::move(updatedAttributes)
          } size:size];
}

@end
