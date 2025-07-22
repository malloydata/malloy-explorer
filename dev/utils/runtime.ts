/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Malloy from '@malloydata/malloy-interfaces';
import {
  API,
  MalloyError,
  malloyToQuery,
  ModelDef,
  SingleConnectionRuntime,
  URLReader,
} from '@malloydata/malloy';
import {DuckDBWASMConnection} from '@malloydata/db-duckdb/wasm';

class Fetcher implements API.LookupConnection<API.Connection>, URLReader {
  private registeredTables: Record<string, boolean> = {};
  private connection: API.Connection;
  duckdb: DuckDBWASMConnection;

  constructor(private url: URL) {
    this.duckdb = new DuckDBWASMConnection('duckdb', null, 'malloy');
    this.connection = API.util.wrapLegacyConnection(this.duckdb);
    this.duckdb.registerRemoteTableCallback(this.remoteTableCallback);
  }

  async readURL(url: URL) {
    const result = await fetch(url);
    return result.text();
  }

  async lookupConnection(_: string): Promise<API.Connection> {
    return this.connection;
  }

  remoteTableCallback = async (tableName: string) => {
    if (this.registeredTables[tableName]) {
      return undefined;
    }
    this.duckdb.registerRemoteTable(
      tableName,
      new URL(tableName, this.url).toString()
    );
    this.registeredTables[tableName] = true;
    return undefined;
  };
}

const fetchers: Record<string, Fetcher> = {};

function getFetcher(url: URL): Fetcher {
  let fetcher: Fetcher;
  if (fetchers[url.toString()]) {
    fetcher = fetchers[url.toString()];
  } else {
    fetcher = new Fetcher(url);
    fetchers[url.toString()] = fetcher;
  }
  return fetcher;
}

export async function compileMalloy(url: URL): Promise<Malloy.ModelInfo> {
  const fetcher = getFetcher(url);

  const response = await API.asynchronous.compileModel(
    {
      model_url: url.toString(),
    },
    {
      connections: fetcher,
      urls: fetcher,
    }
  );
  if (response.logs) {
    throw new Error(response.logs[0].message);
  }
  if (response.model) {
    return response.model;
  }
  throw new Error('Unable to compile model');
}

export async function runQuery(url: URL, query: Malloy.Query) {
  const fetcher = getFetcher(url);

  return API.asynchronous.runQuery(
    {
      model_url: url.toString(),
      query,
    },
    {
      connections: fetcher,
      urls: fetcher,
    }
  );
}

export async function runRawQuery(
  url: URL,
  query: string
): Promise<Malloy.CompileQueryResponse> {
  const fetcher = getFetcher(url);
  const runtime = new SingleConnectionRuntime({
    urlReader: fetcher,
    connection: fetcher.duckdb,
  });
  const modelMaterializer = runtime.loadModel(url);
  const queryMaterializer = modelMaterializer.loadQuery(query, {
    noThrowOnError: true,
  });
  try {
    const result = await queryMaterializer.run();
    return {result: API.util.wrapResult(result)};
  } catch (error) {
    if (error instanceof MalloyError) {
      return {
        logs: error.problems.map(problem => {
          const {at, severity, message} = problem;
          const {url, range} = at || EMPTY_LOCATION;
          return {
            url,
            range,
            severity,
            message,
          };
        }),
      };
    } else {
      return {
        logs: [
          {
            ...EMPTY_LOCATION,
            severity: 'error',
            message: error instanceof Error ? error.message : String(error),
          },
        ],
      };
    }
  }
}

const EMPTY_LOCATION = {
  url: '',
  range: {
    start: {
      line: 0,
      character: 0,
    },
    end: {
      line: 0,
      character: 0,
    },
  },
};

export async function initLspContext(url: URL): Promise<ModelDef> {
  const fetcher = getFetcher(url);
  const runtime = new SingleConnectionRuntime({
    urlReader: fetcher,
    connection: fetcher.duckdb,
  });
  const model = await runtime.getModel(url);
  return model._modelDef;
}

export function malloyToStableQuery(malloy: string) {
  return malloyToQuery(malloy);
}
