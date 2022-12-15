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
import { VulnerabilitiesList } from './SecurityProblemsList';
import { renderInTestApp, TestApiRegistry } from '@backstage/test-utils';
import { dynatraceApiRef } from '../../../api';
import { securityProblems } from '../../../mocks/securityProblems.json';
import { ApiProvider, ConfigReader } from '@backstage/core-app-api';
import { configApiRef } from '@backstage/core-plugin-api';

const mockDynatraceApi = {
  getDynatraceVulnerabilities: jest.fn(),
};
const apis = TestApiRegistry.from(
  [dynatraceApiRef, mockDynatraceApi],
  [configApiRef, new ConfigReader({ dynatrace: { baseUrl: '__dynatrace__' } })],
);

describe('VulnerabilityStatus', () => {
  it('renders a table with security problem data', async () => {
    mockDynatraceApi.getDynatraceVulnerabilities = jest
      .fn()
      .mockResolvedValue({ securityProblems });
    const rendered = await renderInTestApp(
      <ApiProvider apis={apis}>
        <VulnerabilitiesList kubernetesId="__kubernetes_id__" />
      </ApiProvider>,
    );
    expect(await rendered.findByText('example-service')).toBeInTheDocument();
  });

  it('returns "No Vulnerabilities to Report!" if no security problems are found', async () => {
    mockDynatraceApi.getDynatraceVulnerabilities = jest
      .fn()
      .mockResolvedValue({});
    const rendered = await renderInTestApp(
      <ApiProvider apis={apis}>
        <VulnerabilitiesList kubernetesId="example-service-3" />
      </ApiProvider>,
    );
    expect(
      await rendered.findByText('No Vulnerabilities to Report!'),
    ).toBeInTheDocument();
  });
});
