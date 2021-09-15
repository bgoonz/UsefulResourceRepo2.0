/*
 *
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
.h>

NS_ASSUME_NONNULL_BEGIN

@protocol GRPCResponseHandler;
@class GRPCCallOptions;
@protocol GRPCChannelFactory;

@interface GRPCCall2Internal : GRPCTransport

- (instancetype)initWithTransportManager:(GRPCTransportManager *)transportManager;

- (void)startWithRequestOptions:(GRPCRequestOptions *)requestOptions
                    callOptions:(GRPCCallOptions *)callOptions;

- (void)writeData:(id)data;

- (void)finish;

- (void)cancel;

- (void)receiveNextMessages:(NSUInteger)numberOfMessages;

@end

NS_ASSUME_NONNULL_END
