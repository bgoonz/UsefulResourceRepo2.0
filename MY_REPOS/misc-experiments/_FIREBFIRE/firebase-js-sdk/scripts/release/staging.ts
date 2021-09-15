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
om '../utils';
import { getAllPackages, mapPkgNameToPkgJson } from './utils/workspace';

export async function bumpVersionForStaging(): Promise<
  Map<string, [string, string]>
> {
  const packages = await getAllPackages();
  const originalVersions = new Map<string, string>();

  const pkgJsons = await Promise.all(
    packages.map(pkg => mapPkgNameToPkgJson(pkg))
  );
  for (const { name, version } of pkgJsons) {
    originalVersions.set(name, version);
  }

  await spawn('yarn', ['changeset', 'version', '--snapshot'], {
    cwd: root,
    stdio: 'inherit'
  });

  const updatedPkgJsons: {
    name: string;
    version: string;
    private: boolean;
  }[] = await Promise.all(packages.map(pkg => mapPkgNameToPkgJson(pkg)));
  const updatedVersions = new Map<string, [string, string]>();

  for (const {
    name,
    version: updatedVersion,
    private: isPrivate
  } of updatedPkgJsons) {
    if (isPrivate) {
      continue;
    }

    const originalVersion = originalVersions.get(name)!;
    if (updatedVersion && originalVersion !== updatedVersion) {
      updatedVersions.set(name, [originalVersion, updatedVersion]);
    }
  }

  return updatedVersions;
}
