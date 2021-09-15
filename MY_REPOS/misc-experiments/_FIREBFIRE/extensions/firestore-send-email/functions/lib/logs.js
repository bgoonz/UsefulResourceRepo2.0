"use strict";
/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
g");
const firebase_functions_1 = require("firebase-functions");
exports.obfuscatedConfig = Object.assign({}, config_1.default, {
    smtpConnectionUri: "<omitted>",
});
function init() {
    firebase_functions_1.logger.log("Initializing extension with configuration", exports.obfuscatedConfig);
}
exports.init = init;
function start() {
    firebase_functions_1.logger.log("Started execution of extension with configuration", exports.obfuscatedConfig);
}
exports.start = start;
function error(err) {
    firebase_functions_1.logger.log("Unhandled error occurred during processing:", err);
}
exports.error = error;
function complete() {
    firebase_functions_1.logger.log("Completed execution of extension");
}
exports.complete = complete;
function attemptingDelivery(ref) {
    firebase_functions_1.logger.log(`Attempting delivery for message: ${ref.path}`);
}
exports.attemptingDelivery = attemptingDelivery;
function delivered(ref, info) {
    firebase_functions_1.logger.log(`Delivered message: ${ref.path} successfully. messageId: ${info.messageId} accepted: ${info.accepted.length} rejected: ${info.rejected.length} pending: ${info.pending.length}`);
}
exports.delivered = delivered;
function deliveryError(ref, e) {
    firebase_functions_1.logger.error(`Error when delivering message=${ref.path}: ${e.toString()}`);
}
exports.deliveryError = deliveryError;
function missingDeliveryField(ref) {
    firebase_functions_1.logger.error(`message=${ref.path} is missing 'delivery' field`);
}
exports.missingDeliveryField = missingDeliveryField;
function missingUids(uids) {
    firebase_functions_1.logger.log(`The following uids were provided, however a document does not exist or has no 'email' field: ${uids.join(",")}`);
}
exports.missingUids = missingUids;
function noPartialAttachmentSupport() {
    firebase_functions_1.logger.warn("partial attachments are not handled and will be ignored");
}
exports.noPartialAttachmentSupport = noPartialAttachmentSupport;
function registeredPartial(name) {
    firebase_functions_1.logger.log(`registered partial '${name}'`);
}
exports.registeredPartial = registeredPartial;
function partialRegistered(name) {
    firebase_functions_1.logger.log(`registered partial '${name}'`);
}
exports.partialRegistered = partialRegistered;
function templateLoaded(name) {
    firebase_functions_1.logger.log(`loaded template '${name}'`);
}
exports.templateLoaded = templateLoaded;
function checkingMissingTemplate(name) {
    firebase_functions_1.logger.log(`checking missing template '${name}'`);
}
exports.checkingMissingTemplate = checkingMissingTemplate;
function foundMissingTemplate(name) {
    firebase_functions_1.logger.log(`template '${name}' has been found`);
}
exports.foundMissingTemplate = foundMissingTemplate;
