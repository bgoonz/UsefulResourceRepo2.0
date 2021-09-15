"use strict";
/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
ire("firebase-functions");
const config_1 = require("./config");
exports.childCount = (path, childCount) => {
    firebase_functions_1.logger.log(`Node: '${path}' has: ${childCount} children`);
};
exports.complete = () => {
    firebase_functions_1.logger.log("Completed execution of extension");
};
exports.error = (err) => {
    firebase_functions_1.logger.error("Error when truncating the database node", err);
};
exports.init = () => {
    firebase_functions_1.logger.log("Initializing extension with configuration", config_1.default);
};
exports.pathSkipped = (path) => {
    firebase_functions_1.logger.log(`Path: '${path}' does not need to be truncated`);
};
exports.pathTruncated = (path, count) => {
    firebase_functions_1.logger.log(`Truncated path: '${path}' to ${count} items`);
};
exports.pathTruncating = (path, count) => {
    firebase_functions_1.logger.log(`Truncating path: '${path}' to ${count} items`);
};
exports.start = () => {
    firebase_functions_1.logger.log("Started execution of extension with configuration", config_1.default);
};
