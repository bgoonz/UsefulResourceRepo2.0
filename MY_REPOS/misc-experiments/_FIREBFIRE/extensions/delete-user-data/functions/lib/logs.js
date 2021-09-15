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
exports.complete = (uid) => {
    firebase_functions_1.logger.log(`Successfully removed data for user: ${uid}`);
};
exports.firestoreDeleted = () => {
    firebase_functions_1.logger.log("Finished deleting user data from Cloud Firestore");
};
exports.firestoreDeleting = () => {
    firebase_functions_1.logger.log("Deleting user data from Cloud Firestore");
};
exports.firestoreNotConfigured = () => {
    firebase_functions_1.logger.log("Cloud Firestore paths are not configured, skipping");
};
exports.firestorePathDeleted = (path, recursive) => {
    firebase_functions_1.logger.log(`Deleted: '${path}' from Cloud Firestore ${recursive ? "with recursive delete" : ""}`);
};
exports.firestorePathDeleting = (path, recursive) => {
    firebase_functions_1.logger.log(`Deleting: '${path}' from Cloud Firestore ${recursive ? "with recursive delete" : ""}`);
};
exports.firestorePathError = (path, err) => {
    firebase_functions_1.logger.error(`Error when deleting: '${path}' from Cloud Firestore`, err);
};
exports.init = () => {
    firebase_functions_1.logger.log("Initializing extension with configuration", config_1.default);
};
exports.rtdbDeleted = () => {
    firebase_functions_1.logger.log("Finished deleting user data from the Realtime Database");
};
exports.rtdbDeleting = () => {
    firebase_functions_1.logger.log("Deleting user data from the Realtime Database");
};
exports.rtdbPathDeleted = (path) => {
    firebase_functions_1.logger.log(`Deleted: '${path}' from the Realtime Database`);
};
exports.rtdbNotConfigured = () => {
    firebase_functions_1.logger.log("Realtime Database paths are not configured, skipping");
};
exports.rtdbPathDeleting = (path) => {
    firebase_functions_1.logger.log(`Deleting: '${path}' from the Realtime Database`);
};
exports.rtdbPathError = (path, err) => {
    firebase_functions_1.logger.error(`Error when deleting: '${path}' from the Realtime Database`, err);
};
exports.start = () => {
    firebase_functions_1.logger.log("Started extension execution with configuration", config_1.default);
};
exports.storageDeleted = () => {
    firebase_functions_1.logger.log("Finished deleting user data from Cloud Storage");
};
exports.storageDeleting = () => {
    firebase_functions_1.logger.log("Deleting user data from Cloud Storage");
};
exports.storageNotConfigured = () => {
    firebase_functions_1.logger.log("Cloud Storage paths are not configured, skipping");
};
exports.storagePathDeleted = (path) => {
    firebase_functions_1.logger.log(`Deleted: '${path}' from Cloud Storage`);
};
exports.storagePathDeleting = (path) => {
    firebase_functions_1.logger.log(`Deleting: '${path}' from Cloud Storage`);
};
exports.storagePath404 = (path) => {
    firebase_functions_1.logger.log(`File: '${path}' does not exist in Cloud Storage, skipping`);
};
exports.storagePathError = (path, err) => {
    firebase_functions_1.logger.error(`Error deleting: '${path}' from Cloud Storage`, err);
};
