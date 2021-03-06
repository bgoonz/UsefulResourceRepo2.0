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

export interface TransportConstructor {
  new (
    connId: string,
    repoInfo: RepoInfo,
    applicationId?: string,
    appCheckToken?: string,
    authToken?: string,
    transportSessionId?: string,
    lastSessionId?: string
  ): Transport;
  isAvailable: () => boolean;
  responsesRequiredToBeHealthy?: number;
  healthyTimeout?: number;
}

export abstract class Transport {
  /**
   * Bytes received since connection started.
   */
  abstract bytesReceived: number;

  /**
   * Bytes sent since connection started.
   */
  abstract bytesSent: number;

  /**
   * An identifier for this connection, used for logging
   */
  abstract connId: string;

  /**
   * @param connId - An identifier for this connection, used for logging
   * @param repoInfo - The info for the endpoint to send data to.
   * @param transportSessionId - Optional transportSessionId if this is connecting to an existing transport session
   * @param lastSessionId - Optional lastSessionId if there was a previous connection
   * @interface
   */
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    connId: string,
    repoInfo: RepoInfo,
    transportSessionId?: string,
    lastSessionId?: string
  ) {}

  /**
   * @param onMessage - Callback when messages arrive
   * @param onDisconnect - Callback with connection lost.
   */
  abstract open(
    onMessage: (a: {}) => void,
    onDisconnect: (a?: boolean) => void
  ): void;

  abstract start(): void;

  abstract close(): void;

  /**
   * @param data - The JSON data to transmit
   */
  abstract send(data: {}): void;

  abstract markConnectionHealthy(): void;

  abstract markConnectionHealthy(): void;
}
