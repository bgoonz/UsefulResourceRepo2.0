/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *


export const childCount = (path: string, childCount: number) => {
  logger.log(`Node: '${path}' has: ${childCount} children`);
};

export const complete = () => {
  logger.log("Completed execution of extension");
};

export const error = (err: Error) => {
  logger.error("Error when truncating the database node", err);
};

export const init = () => {
  logger.log("Initializing extension with configuration", config);
};

export const pathSkipped = (path: string) => {
  logger.log(`Path: '${path}' does not need to be truncated`);
};

export const pathTruncated = (path: string, count: number) => {
  logger.log(`Truncated path: '${path}' to ${count} items`);
};

export const pathTruncating = (path: string, count: number) => {
  logger.log(`Truncating path: '${path}' to ${count} items`);
};

export const start = () => {
  logger.log("Started execution of extension with configuration", config);
};
