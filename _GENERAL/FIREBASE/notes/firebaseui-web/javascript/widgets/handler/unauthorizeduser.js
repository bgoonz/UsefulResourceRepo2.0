/*
 * Copyright 2021 Google Inc. All Rights Reserved.
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
 * @fileoverview Unauthorized user handler.
 */

goog.provide("firebaseui.auth.widget.handler.handleUnauthorizedUser");

goog.require("firebaseui.auth.ui.page.UnauthorizedUser");
goog.require("firebaseui.auth.widget.Handler");
goog.require("firebaseui.auth.widget.HandlerName");
goog.require("firebaseui.auth.widget.handler");
goog.require("firebaseui.auth.widget.handler.common");

/**
 * Handles unauthorized user.
 *
 * @param {!firebaseui.auth.AuthUI} app The current Firebase UI instance whose
 *     configuration is used.
 * @param {!Element} container The container DOM element.
 * @param {?string} email The email address of the account.
 * @param {string} provider The provider user uses.
 */
firebaseui.auth.widget.handler.handleUnauthorizedUser = function (
  app,
  container,
  email,
  provider
) {
  let backCallbackFunction = function () {
    firebaseui.auth.widget.handler.common.handleSignInStart(app, container);
  };
  // Defines the backCallbackFunction.
  if (provider === firebase.auth.EmailAuthProvider.PROVIDER_ID) {
    // Email password or Email link.
    backCallbackFunction = function () {
      // Go back to start email sign in handler.
      firebaseui.auth.widget.handler.common.handleSignInWithEmail(
        app,
        container
      );
    };
  }
  const component = new firebaseui.auth.ui.page.UnauthorizedUser(
    email || null,
    function () {
      component.dispose();
      backCallbackFunction();
    },
    app.getConfig().getEmailProviderAdminEmail(),
    app.getConfig().getEmailProviderHelperLink(),
    app.getConfig().getTosUrl(),
    app.getConfig().getPrivacyPolicyUrl()
  );
  component.render(container);
  // Set current UI component.
  app.setCurrentComponent(component);
};

// Register handler.
firebaseui.auth.widget.handler.register(
  firebaseui.auth.widget.HandlerName.UNAUTHORIZED_USER,
  /** @type {!firebaseui.auth.widget.Handler} */
  (firebaseui.auth.widget.handler.handleUnauthorizedUser)
);
