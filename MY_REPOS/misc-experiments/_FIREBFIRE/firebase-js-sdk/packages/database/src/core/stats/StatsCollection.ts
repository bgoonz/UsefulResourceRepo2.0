/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

/**
 * Tracks a collection of stats.
 */
export class StatsCollection {
  private counters_: { [k: string]: number } = {};

  incrementCounter(name: string, amount: number = 1) {
    if (!contains(this.counters_, name)) {
      this.counters_[name] = 0;
    }

    this.counters_[name] += amount;
  }

  get() {
    return deepCopy(this.counters_);
  }
}
