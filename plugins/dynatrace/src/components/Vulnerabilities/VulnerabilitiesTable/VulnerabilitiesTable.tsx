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
import { DynatraceVulnerability } from '../../../api/DynatraceApi';
import { VulnerabilityStatus } from '../VulnerabilityStatus';
import { Link } from '@backstage/core-components';

type VulnerabilityTableProps = {
  vulnerabilities: DynatraceVulnerability[];
  dynatraceBaseUrl: string;
};

const parseTimestamp = (timestamp: number | undefined) => {
  return timestamp ? new Date(timestamp).toLocaleString() : 'N/A';
};

export const VulnerabilitiesTable = (props: VulnerabilityTableProps) => {
  const { vulnerabilities, dynatraceBaseUrl } = props;
  const columns: TableColumn[] = [
    {
      title: 'Title',
      field: 'title',
      render: (row: Partial<DynatraceVulnerability>) => (
        <Link
          to={`${dynatraceBaseUrl}/#securityProblems/problemdetails;pid=${row.securityProblemId}`}
        >
          {row.title}
        </Link>
      ),
    },
    {
      title: 'Status',
      field: 'status',
      render: (row: Partial<DynatraceVulnerability>) => (
        <VulnerabilityStatus status={row.status} />
      ),
    },
    {
      title: 'Vulnerability Type',
      field: 'vulnerabilityType',
      render: (row: Partial<DynatraceVulnerability>) => row.vulnerabilityType,
    },
    {
      title: 'Start Time',
      field: 'firstSeenTimestamp',
      render: (row: Partial<DynatraceVulnerability>) =>
        parseTimestamp(row.firstSeenTimestamp),
    },
    {
      title: 'Last Update',
      field: 'lastUpdatedTimestamp',
      render: (row: Partial<DynatraceVulnerability>) =>
        parseTimestamp(row.lastUpdatedTimestamp),
    },
  ];

  return (
    <Table
      options={{ search: true, paging: true }}
      columns={columns}
      data={vulnerabilities.map(v => {
        return { ...v, id: v.securityProblemId };
      })}
    />
  );
};
