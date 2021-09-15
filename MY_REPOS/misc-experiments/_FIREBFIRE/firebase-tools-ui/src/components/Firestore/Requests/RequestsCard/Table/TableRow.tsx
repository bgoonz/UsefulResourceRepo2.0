/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *

import { DataTableCell, DataTableRow } from '@rmwc/data-table';
import { Icon } from '@rmwc/icon';
import { Tooltip } from '@rmwc/tooltip';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { CustomThemeProvider } from '../../../../../themes';
import RequestPath from '../../RequestPath';
import { FirestoreRulesEvaluation } from '../../rules_evaluation_result_model';
import { OutcomeData } from '../../types';
import { OUTCOME_DATA } from '../../utils';

interface TableRowRequestData {
  requestTimeComplete: string;
  requestTimeFormatted: string;
  requestMethod: string;
  resourcePath: string;
  outcomeData: OutcomeData;
}
// Outputs (in a clean format) the request data used by the table-row
function getTableRowRequestData(
  request: FirestoreRulesEvaluation
): TableRowRequestData {
  const { rulesContext, outcome, time } = request;
  const requestDate = new Date(time);
  return {
    requestTimeComplete: requestDate.toLocaleString(),
    requestTimeFormatted: requestDate.toLocaleTimeString('en-US', {
      hour12: false,
    }),
    requestMethod: rulesContext.method,
    resourcePath: rulesContext.path.replace(
      '/databases/(default)/documents',
      ''
    ),
    outcomeData: OUTCOME_DATA[outcome],
  };
}

interface Props {
  request: FirestoreRulesEvaluation;
  requestId: string;
  setShowCopyNotification: (value: boolean) => void;
  requestPathContainerWidth?: number;
}

const RequestTableRow: React.FC<Props> = ({
  request,
  requestId,
  setShowCopyNotification,
  requestPathContainerWidth,
}) => {
  const history = useHistory();
  const {
    requestTimeComplete,
    requestTimeFormatted,
    requestMethod,
    resourcePath,
    outcomeData,
  } = getTableRowRequestData(request);

  return (
    <DataTableRow
      onClick={() => history.push(`/firestore/requests/${requestId}`)}
    >
      <Tooltip
        content={requestTimeComplete}
        align="bottomLeft"
        enterDelay={300}
      >
        <DataTableCell className="Firestore-Request-Date" theme="secondary">
          {requestTimeFormatted}
        </DataTableCell>
      </Tooltip>
      <CustomThemeProvider use={outcomeData?.theme || 'note'} wrap>
        <DataTableCell className="Firestore-Request-Outcome">
          {outcomeData?.icon && (
            <Tooltip
              content={outcomeData?.label}
              align="bottom"
              enterDelay={100}
            >
              <Icon
                className="Firestore-Request-Outcome-Icon"
                icon={{ icon: outcomeData?.icon, size: 'medium' }}
              />
            </Tooltip>
          )}
        </DataTableCell>
      </CustomThemeProvider>
      <DataTableCell className="Firestore-Request-Method">
        {requestMethod}
      </DataTableCell>
      <DataTableCell className="Firestore-Request-Path">
        {resourcePath && (
          <RequestPath
            resourcePath={resourcePath}
            setShowCopyNotification={setShowCopyNotification}
            requestPathContainerWidth={requestPathContainerWidth}
          />
        )}
      </DataTableCell>
    </DataTableRow>
  );
};

export default RequestTableRow;
