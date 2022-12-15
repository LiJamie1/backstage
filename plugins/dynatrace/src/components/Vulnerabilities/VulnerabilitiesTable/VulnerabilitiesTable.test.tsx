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
import { VulnerabilitiesTable } from './VulnerabilitiesTable';
import { renderInTestApp, TestApiRegistry } from '@backstage/test-utils';
import { securityProblems } from '../../../mocks/securityProblems.json';
import { ApiProvider, ConfigReader } from '@backstage/core-app-api';
import { configApiRef } from '@backstage/core-plugin-api';

describe('VulnerabilitiesTable', () => {
  const apis = TestApiRegistry.from([
    configApiRef,
    new ConfigReader({ dynatrace: { baseUrl: '__dynatrace__' } }),
  ]);
  it('renders the table with some vulnerability data', async () => {
    const rendedred = await renderInTestApp(
      <ApiProvider apis={apis}>
        <VulnerabilitiesTable
          vulnerabilities={securityProblems}
          dynatraceBaseUrl="__dynatrace__"
        />
        ,
      </ApiProvider>,
    );

    // Checking for Title from mocked vulnerabilities
    expect(
      await rendedred.findByText('this IS a big security problem'),
    ).toBeInTheDocument();
  });
});
