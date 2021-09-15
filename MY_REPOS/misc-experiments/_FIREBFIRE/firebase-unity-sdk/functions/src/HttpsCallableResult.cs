/*
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
leResult {
    internal HttpsCallableResult(object data) {
      this.Data = data;
    }

    /// <returns>the result of the call as a generic object.</returns>
    public object Data { get; private set; }
  }
}

