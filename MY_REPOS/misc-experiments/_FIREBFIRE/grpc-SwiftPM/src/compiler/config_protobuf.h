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
BUF_H
#define SRC_COMPILER_CONFIG_PROTOBUF_H

#include <grpcpp/impl/codegen/config_protobuf.h>

#ifndef GRPC_CUSTOM_CODEGENERATOR
#include <google/protobuf/compiler/code_generator.h>
#define GRPC_CUSTOM_CODEGENERATOR ::google::protobuf::compiler::CodeGenerator
#define GRPC_CUSTOM_GENERATORCONTEXT \
  ::google::protobuf::compiler::GeneratorContext
#endif

#ifndef GRPC_CUSTOM_PRINTER
#include <google/protobuf/io/coded_stream.h>
#include <google/protobuf/io/printer.h>
#include <google/protobuf/io/zero_copy_stream_impl_lite.h>
#define GRPC_CUSTOM_PRINTER ::google::protobuf::io::Printer
#define GRPC_CUSTOM_CODEDOUTPUTSTREAM ::google::protobuf::io::CodedOutputStream
#define GRPC_CUSTOM_STRINGOUTPUTSTREAM \
  ::google::protobuf::io::StringOutputStream
#endif

#ifndef GRPC_CUSTOM_PLUGINMAIN
#include <google/protobuf/compiler/plugin.h>
#define GRPC_CUSTOM_PLUGINMAIN ::google::protobuf::compiler::PluginMain
#endif

#ifndef GRPC_CUSTOM_PARSEGENERATORPARAMETER
#include <google/protobuf/compiler/code_generator.h>
#define GRPC_CUSTOM_PARSEGENERATORPARAMETER \
  ::google::protobuf::compiler::ParseGeneratorParameter
#endif

#endif  // SRC_COMPILER_CONFIG_PROTOBUF_H
