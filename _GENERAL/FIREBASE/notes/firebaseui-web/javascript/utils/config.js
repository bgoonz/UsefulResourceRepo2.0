/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Utilities for FirebaseUI widget configuration.
 */

goog.provide("firebaseui.auth.Config");

/**
 * Structure for defining and manipulating configuration fields.
 */
firebaseui.auth.Config = class {
  constructor() {
    /**
     * The instance for storing all configurations.
     * @type {Object}
     * @private
     */
    this.instance_ = {};
  }

  /**
   * @param {string} name The name of the configuration.
   * @return {boolean} Whether the configuration is defined.
   * @private
   */
  has_(name) {
    return name.toLowerCase() in this.instance_;
  }

  /**
   * @param {string} name The name of the configuration.
   * @return {*|undefined} The configuration value.
   * @private
   */
  get_(name) {
    return this.instance_[name.toLowerCase()];
  }

  /**
   * Sets the information for a configuration.
   *
   * @param {string} name The name of the configuration.
   * @param {*|undefined} value The configuration value.
   * @private
   */
  set_(name, value) {
    this.instance_[name.toLowerCase()] = value;
  }

  /**
   * Defines a configuration with the given name and value.
   *
   * @param {string} name The name of the configuration.
   * @param {*=} value The value of the configuration.
   */
  define(name, value) {
    if (this.has_(name)) {
      throw new Error("Configuration " + name + " has already been defined.");
    }
    this.set_(name, value);
  }

  /**
   * Updates the configuration and its descendants with the given value.
   *
   * @param {string} name The name of the configuration.
   * @param {*} value The value of the configuration.
   */
  update(name, value) {
    if (!this.has_(name)) {
      throw new Error("Configuration " + name + " is not defined.");
    }
    this.set_(name, value);
  }

  /**
   * Gets the configuration value for the given name. If an unrecognized name is
   * specified, an `Error` is thrown.
   *
   * @param {string} name The name of the configuration.
   * @return {*|undefined} The configuration value.
   */
  get(name) {
    if (!this.has_(name)) {
      throw new Error("Configuration " + name + " is not defined.");
    }
    return this.get_(name);
  }

  /**
   * Gets the configuration value for the given name. If an unrecognized name is
   * specified or the value is not provided, an `Error` is thrown.
   *
   * @param {string} name The name of the configuration.
   * @return {*} The configuration value.
   */
  getRequired(name) {
    var value = this.get(name);
    if (!value) {
      throw new Error("Configuration " + name + " is required.");
    }
    return value;
  }
};
