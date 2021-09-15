/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

  host: string;
  port: number;
}

export interface DatabaseConfig extends EmulatorConfig {}

export interface FirestoreConfig extends EmulatorConfig {
  webSocketHost?: string;
  webSocketPort?: number;
}

export interface FunctionsConfig extends EmulatorConfig {}

export interface LoggingConfig extends EmulatorConfig {}

export interface AuthConfig extends EmulatorConfig {}

export type Emulator =
  | 'database'
  | 'auth'
  | 'firestore'
  | 'functions'
  | 'logging'
  | 'hosting'
  | 'storage'
  | 'pubsub';

export interface Config {
  projectId: string;
  database?: DatabaseConfig;
  auth?: AuthConfig;
  firestore?: FirestoreConfig;
  functions?: FunctionsConfig;
  logging?: LoggingConfig;
  hosting?: EmulatorConfig;
  storage?: EmulatorConfig;
  pubsub?: EmulatorConfig;
}
