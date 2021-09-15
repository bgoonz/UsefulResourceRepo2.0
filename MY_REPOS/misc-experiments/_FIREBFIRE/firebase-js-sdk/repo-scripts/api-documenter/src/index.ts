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
t for license information.

/**
 * API Documenter generates an API reference website from the .api.json files created by API Extractor.
 * The `@microsoft/api-documenter` package provides the command-line tool.  It also exposes a developer API that you
 * can use to create plugins that customize how API Documenter generates documentation.
 *
 * @packageDocumentation
 */

export {
  IFeatureDefinition,
  IApiDocumenterPluginManifest
} from './plugin/IApiDocumenterPluginManifest';
export { MarkdownDocumenterAccessor } from './plugin/MarkdownDocumenterAccessor';
export {
  MarkdownDocumenterFeatureContext,
  IMarkdownDocumenterFeatureOnBeforeWritePageArgs,
  IMarkdownDocumenterFeatureOnFinishedArgs,
  MarkdownDocumenterFeature
} from './plugin/MarkdownDocumenterFeature';
export {
  PluginFeature,
  PluginFeatureContext,
  PluginFeatureInitialization
} from './plugin/PluginFeature';
