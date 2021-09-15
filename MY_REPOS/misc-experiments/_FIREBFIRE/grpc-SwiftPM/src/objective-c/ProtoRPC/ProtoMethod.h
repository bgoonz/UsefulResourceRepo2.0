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


/**
 * A fully-qualified proto service method name. Full qualification is needed because a gRPC endpoint
 * can implement multiple services.
 */
__attribute__((deprecated("Please use GRPCProtoMethod."))) @interface ProtoMethod
    : NSObject @property(nonatomic, readonly) NSString *package;
@property(nonatomic, readonly) NSString *service;
@property(nonatomic, readonly) NSString *method;

@property(nonatomic, readonly) NSString *HTTPPath;

- (instancetype)initWithPackage:(NSString *)package
                        service:(NSString *)service
                         method:(NSString *)method;
@end

/**
 * This subclass is empty now. Eventually we'll remove ProtoMethod class
 * to avoid potential naming conflict
 */
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
    @interface GRPCProtoMethod : ProtoMethod
#pragma clang diagnostic pop

                                 @end
