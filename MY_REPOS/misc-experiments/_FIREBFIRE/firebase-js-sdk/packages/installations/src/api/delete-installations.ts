/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
./helpers/idb-manager';
import { RequestStatus } from '../interfaces/installation-entry';
import { ERROR_FACTORY, ErrorCode } from '../util/errors';
import { FirebaseInstallationsImpl } from '../interfaces/installation-impl';
import { Installations } from '../interfaces/public-types';

/**
 * Deletes the Firebase Installation and all associated data.
 * @param installations - The `Installations` instance.
 *
 * @public
 */
export async function deleteInstallations(
  installations: Installations
): Promise<void> {
  const { appConfig } = installations as FirebaseInstallationsImpl;

  const entry = await update(appConfig, oldEntry => {
    if (oldEntry && oldEntry.registrationStatus === RequestStatus.NOT_STARTED) {
      // Delete the unregistered entry without sending a deleteInstallation request.
      return undefined;
    }
    return oldEntry;
  });

  if (entry) {
    if (entry.registrationStatus === RequestStatus.IN_PROGRESS) {
      // Can't delete while trying to register.
      throw ERROR_FACTORY.create(ErrorCode.DELETE_PENDING_REGISTRATION);
    } else if (entry.registrationStatus === RequestStatus.COMPLETED) {
      if (!navigator.onLine) {
        throw ERROR_FACTORY.create(ErrorCode.APP_OFFLINE);
      } else {
        await deleteInstallationRequest(appConfig, entry);
        await remove(appConfig);
      }
    }
  }
}
