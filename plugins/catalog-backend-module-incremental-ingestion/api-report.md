## API Report File for "@backstage/plugin-catalog-backend-module-incremental-ingestion"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
/// <reference types="express" />

import { BackendFeature } from '@backstage/backend-plugin-api';
import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
import type { Config } from '@backstage/config';
import type { DeferredEntity } from '@backstage/plugin-catalog-backend';
import type { DurationObjectUnits } from 'luxon';
import type { Logger } from 'winston';
import type { PermissionEvaluator } from '@backstage/plugin-permission-common';
import type { PluginDatabaseManager } from '@backstage/backend-common';
import type { PluginTaskScheduler } from '@backstage/backend-tasks';
import { Router } from 'express';
import type { UrlReader } from '@backstage/backend-common';

// @public
export type EntityIteratorResult<T> =
  | {
      done: false;
      entities: DeferredEntity[];
      cursor: T;
    }
  | {
      done: true;
      entities?: DeferredEntity[];
      cursor?: T;
    };

// @public
export const INCREMENTAL_ENTITY_PROVIDER_ANNOTATION =
  'backstage.io/incremental-provider-name';

// @public (undocumented)
export class IncrementalCatalogBuilder {
  // (undocumented)
  addIncrementalEntityProvider<TCursor, TContext>(
    provider: IncrementalEntityProvider<TCursor, TContext>,
    options: IncrementalEntityProviderOptions,
  ): void;
  // (undocumented)
  build(): Promise<{
    incrementalAdminRouter: Router;
  }>;
  static create(
    env: PluginEnvironment,
    builder: CatalogBuilder,
  ): Promise<IncrementalCatalogBuilder>;
}

// @public
export interface IncrementalEntityProvider<TCursor, TContext> {
  around(burst: (context: TContext) => Promise<void>): Promise<void>;
  getProviderName(): string;
  next(
    context: TContext,
    cursor?: TCursor,
  ): Promise<EntityIteratorResult<TCursor>>;
}

// @public (undocumented)
export interface IncrementalEntityProviderOptions {
  backoff?: DurationObjectUnits[];
  burstInterval: DurationObjectUnits;
  burstLength: DurationObjectUnits;
  restLength: DurationObjectUnits;
}

// @alpha
export const incrementalIngestionEntityProviderCatalogModule: (options: {
  providers: {
    provider: IncrementalEntityProvider<unknown, unknown>;
    options: IncrementalEntityProviderOptions;
  }[];
}) => BackendFeature;

// @public (undocumented)
export type PluginEnvironment = {
  logger: Logger;
  database: PluginDatabaseManager;
  scheduler: PluginTaskScheduler;
  config: Config;
  reader: UrlReader;
  permissions: PermissionEvaluator;
};
```
