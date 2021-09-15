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
, field2) => field1 === field2;
exports.fieldNameIsTranslationPath = (inputFieldName, outputFieldName, languages) => {
    for (const language of languages) {
        if (inputFieldName === `${outputFieldName}.${language}`) {
            return true;
        }
    }
    return false;
};
