/*
 *
 * Copyright 2017 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
ument_option.h>

namespace grpc {

std::unique_ptr<ServerBuilderOption> MakeChannelArgumentOption(
    const std::string& name, const std::string& value) {
  class StringOption final : public ServerBuilderOption {
   public:
    StringOption(const std::string& name, const std::string& value)
        : name_(name), value_(value) {}

    virtual void UpdateArguments(ChannelArguments* args) override {
      args->SetString(name_, value_);
    }
    virtual void UpdatePlugins(
        std::vector<std::unique_ptr<ServerBuilderPlugin>>* /*plugins*/)
        override {}

   private:
    const std::string name_;
    const std::string value_;
  };
  return std::unique_ptr<ServerBuilderOption>(new StringOption(name, value));
}

std::unique_ptr<ServerBuilderOption> MakeChannelArgumentOption(
    const std::string& name, int value) {
  class IntOption final : public ServerBuilderOption {
   public:
    IntOption(const std::string& name, int value)
        : name_(name), value_(value) {}

    virtual void UpdateArguments(ChannelArguments* args) override {
      args->SetInt(name_, value_);
    }
    virtual void UpdatePlugins(
        std::vector<std::unique_ptr<ServerBuilderPlugin>>* /*plugins*/)
        override {}

   private:
    const std::string name_;
    const int value_;
  };
  return std::unique_ptr<ServerBuilderOption>(new IntOption(name, value));
}

}  // namespace grpc
