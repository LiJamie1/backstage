/*
 * Copyright 2022 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import useAsync from 'react-use/lib/useAsync';
import {
  Progress,
  ResponseErrorPanel,
  EmptyState,
} from '@backstage/core-components';
import { useApi, configApiRef } from '@backstage/core-plugin-api';
import { SecurityProblemsTable } from '../SecurityProblemsTable';
import { dynatraceApiRef, DynatraceSecurityProblem } from '../../../api';
import { InfoCard } from '@backstage/core-components';

type SecurityProblemsListProps = {
  processGroupName: string;
};

const cardContents = (
  securityProblems: DynatraceSecurityProblem[],
  dynatraceBaseUrl: string,
) => {
  return securityProblems.length ? (
    <SecurityProblemsTable
      securityProblems={securityProblems || []}
      dynatraceBaseUrl={dynatraceBaseUrl}
    />
  ) : (
    <EmptyState title="No Security Problems to Report!" missing="data" />
  );
};

export const SecurityProblemsList = (props: SecurityProblemsListProps) => {
  const { processGroupName } = props;
  const configApi = useApi(configApiRef);
  const dynatraceApi = useApi(dynatraceApiRef);
  const dynatraceBaseUrl = configApi.getString('dynatrace.baseUrl');

  const { value, loading, error } = useAsync(async () => {
    return dynatraceApi.getDynatraceSecurityProblems(
      processGroupName,
      'EXPOSED',
      'false',
    );
  }, [dynatraceApi, processGroupName]);
  const securityProblems = value?.securityProblems;
  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return (
    <InfoCard title="Security Problems" subheader={`${processGroupName}`}>
      {cardContents(securityProblems || [], dynatraceBaseUrl)}
    </InfoCard>
  );
};
