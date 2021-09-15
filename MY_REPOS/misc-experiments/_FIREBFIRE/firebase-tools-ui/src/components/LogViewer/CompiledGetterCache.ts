/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
tion } = {};

  getOrCompile(path: string, obj: any) {
    if (!this.getters[path]) {
      try {
        // eslint-disable-next-line no-new-func
        this.getters[path] = new Function('obj', 'return obj.' + path + ';');
      } catch (err) {
        console.warn(err);
        return undefined;
      }
    }

    try {
      return this.getters[path](obj);
    } catch (err) {
      return undefined;
    }
  }
}
