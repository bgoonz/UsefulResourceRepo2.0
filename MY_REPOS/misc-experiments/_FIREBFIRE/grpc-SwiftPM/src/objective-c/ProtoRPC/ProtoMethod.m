/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *


#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-implementations"
@implementation ProtoMethod
#pragma clang diagnostic pop
- (instancetype)initWithPackage:(NSString *)package
                        service:(NSString *)service
                         method:(NSString *)method {
  if ((self = [super init])) {
    _package = [package copy];
    _service = [service copy];
    _method = [method copy];
  }
  return self;
}

- (NSString *)HTTPPath {
  if (_package && _package.length > 0) {
    return [NSString stringWithFormat:@"/%@.%@/%@", _package, _service, _method];
  } else {
    return [NSString stringWithFormat:@"/%@/%@", _service, _method];
  }
}
@end

@implementation GRPCProtoMethod

@end
