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

  Report
} from '../../repo-scripts/size-analysis/analysis-helper';
import { mapWorkspaceToPackages } from '../release/utils/workspace';
import { projectRoot } from '../utils';
import {
  upload,
  runId,
  RequestBody,
  RequestEndpoint
} from './size_report_helper';
interface ModularExportBinarySizeRequestBody extends RequestBody {
  modules: Report[];
}

async function generateReport(): Promise<ModularExportBinarySizeRequestBody> {
  let allModulesLocation: string[] = await mapWorkspaceToPackages([
    `${projectRoot}/packages/*`
  ]);

  allModulesLocation = allModulesLocation.filter(path => {
    const json = require(`${path}/package.json`);
    return (
      json.name.startsWith('@firebase') &&
      !json.name.includes('-compat') &&
      !json.name.includes('-types')
    );
  });

  const reports: Report[] = await generateReportForModules(allModulesLocation);
  return {
    log: `https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${runId}`,
    modules: reports
  };
}

async function main(): Promise<void> {
  try {
    const reports: ModularExportBinarySizeRequestBody = await generateReport();
    console.log(JSON.stringify(reports, null, 4));
    upload(reports, RequestEndpoint.MODULAR_EXPORT_BINARY_SIZE);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
main();
