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
import { Table, TableColumn } from '@backstage/core-components';
import { DynatraceSecurityProblem } from '../../../api/DynatraceApi';
import { SecurityProblemStatus } from '../SecurityProblemStatus';
import { Link } from '@backstage/core-components';

type VulnerabilityTableProps = {
  securityProblems: DynatraceSecurityProblem[];
  dynatraceBaseUrl: string;
};

const parseTimestamp = (timestamp: number | undefined) => {
  return timestamp ? new Date(timestamp).toLocaleString() : 'N/A';
};

export const SecurityProblemsTable = (props: VulnerabilityTableProps) => {
  const { securityProblems } = props;
  const columns: TableColumn[] = [
    {
      title: 'Title',
      field: 'title',
      render: (row: Partial<DynatraceSecurityProblem>) => (
        <Link to={`${row.url}`}>{row.title}</Link>
      ),
    },
    {
      title: 'Status',
      field: 'status',
      render: (row: Partial<DynatraceSecurityProblem>) => (
        <SecurityProblemStatus status={row.status} />
      ),
    },
    {
      title: 'Risk Level',
      field: 'riskLevel',
      render: (row: Partial<DynatraceSecurityProblem>) =>
        row.riskAssessment?.riskLevel,
    },
    {
      title: 'Exposure',
      field: 'exposure',
      render: (row: Partial<DynatraceSecurityProblem>) =>
        row.riskAssessment?.exposure,
    },
    {
      title: 'Data Assets',
      field: 'dataAssets',
      render: (row: Partial<DynatraceSecurityProblem>) =>
        row.riskAssessment?.dataAssets,
    },
    {
      title: 'Vulnerability Type',
      field: 'vulnerabilityType',
      render: (row: Partial<DynatraceSecurityProblem>) => row.vulnerabilityType,
    },
    {
      title: 'Start Time',
      field: 'firstSeenTimestamp',
      render: (row: Partial<DynatraceSecurityProblem>) =>
        parseTimestamp(row.firstSeenTimestamp),
    },
  ];

  return (
    <Table
      options={{ search: true, paging: true }}
      columns={columns}
      data={securityProblems.map(v => {
        return { ...v, id: v.securityProblemId };
      })}
    />
  );
};
