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
 * Domain name for firebase storage.
 */
export const DEFAULT_HOST = 'firebasestorage.googleapis.com';

/**
 * The key in Firebase config json for the storage bucket.
 */
export const CONFIG_STORAGE_BUCKET_KEY = 'storageBucket';

/**
 * 2 minutes
 *
 * The timeout for all operations except upload.
 */
export const DEFAULT_MAX_OPERATION_RETRY_TIME = 2 * 60 * 1000;

/**
 * 10 minutes
 *
 * The timeout for upload.
 */
export const DEFAULT_MAX_UPLOAD_RETRY_TIME = 10 * 60 * 1000;

/**
 * This is the value of Number.MIN_SAFE_INTEGER, which is not well supported
 * enough for us to use it directly.
 */
export const MIN_SAFE_INTEGER = -9007199254740991;
