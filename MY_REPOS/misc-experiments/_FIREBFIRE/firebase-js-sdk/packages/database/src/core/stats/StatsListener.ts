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

import { StatsCollection } from './StatsCollection';

/**
 * Returns the delta from the previous call to get stats.
 *
 * @param collection_ - The collection to "listen" to.
 */
export class StatsListener {
  private last_: { [k: string]: number } | null = null;

  constructor(private collection_: StatsCollection) {}

  get(): { [k: string]: number } {
    const newStats = this.collection_.get();

    const delta = { ...newStats };
    if (this.last_) {
      each(this.last_, (stat: string, value: number) => {
        delta[stat] = delta[stat] - value;
      });
    }
    this.last_ = newStats;

    return delta;
  }
}
