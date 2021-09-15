/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

namespace Firebase.Platform {
  /// <summary>Creates FirebaseHttpRequests.</summary>
  internal interface IHttpFactoryService {
    FirebaseHttpRequest OpenConnection(Uri url);
  }
}

