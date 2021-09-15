/*
 * Copyright 2016 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
bileAds.h>

#include "admob/src/include/firebase/admob/types.h"

NS_ASSUME_NONNULL_BEGIN

namespace firebase {
namespace admob {

/// Returns a GADRequest from an admob::AdRequest.
GADRequest *GADRequestFromCppAdRequest(AdRequest adRequest);

}  // namespace admob
}  // namespace firebase

NS_ASSUME_NONNULL_END
