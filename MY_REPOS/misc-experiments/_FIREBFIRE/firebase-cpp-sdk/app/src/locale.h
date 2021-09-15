
/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
_

#include <string>

namespace firebase {
namespace internal {

// Get the current locale, e.g. "en_US". Returns an empty string if
// the locale cannot be discerned.
std::string GetLocale();

// Get the current time zone, e.g. "US/Pacific" or "EDT".
std::string GetTimezone();

}  // namespace internal
}  // namespace firebase

#endif  // FIREBASE_APP_SRC_LOCALE_H_
