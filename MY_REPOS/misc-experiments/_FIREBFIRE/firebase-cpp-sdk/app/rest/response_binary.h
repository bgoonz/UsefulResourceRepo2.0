/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
E_BINARY_H_

#include <string>

#include "app/rest/response.h"
#include "app/rest/zlibwrapper.h"

namespace firebase {
namespace rest {

class ResponseBinary : public Response {
 public:
  ResponseBinary();

  void GetBody(const char** data, size_t* size) const override;

  // Call `set_use_gunzip(true)` to use gzip to uncompress HTTP body.
  //
  // By default we don't use decompression.
  virtual void set_use_gunzip(bool use_gunzip) { use_gunzip_ = use_gunzip; }

 private:
  std::string Gunzip(const char* input_data, size_t input_size) const;

  mutable ZLib zlib_;
  bool use_gunzip_;
  mutable std::string body_gunzip_cache_;
};

}  // namespace rest
}  // namespace firebase

#endif  // FIREBASE_APP_REST_RESPONSE_BINARY_H_
