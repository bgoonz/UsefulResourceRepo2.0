/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *

/**
 * A condition that looks for the presence of a specified function. This is
 * used with WebDriver .wait() as a proxy for determining when the JS has
 * finished loading in a page.
 */
export class JsLoadCondition extends Condition<boolean> {
  constructor(globalValue: string) {
    super(`Waiting for global value ${globalValue}`, driver => {
      return driver.executeScript(
        `return typeof ${globalValue} !== 'undefined';`
      );
    });
  }
}
