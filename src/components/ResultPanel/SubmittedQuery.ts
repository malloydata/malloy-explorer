import * as Malloy from '@malloydata/malloy-interfaces';
import {ExplorerError} from '../../types/error';

export const EXECUTION_STATES = {
  compiling: 'Compiling',
  running: 'Running',
  finished: 'Finished',
  canceled: 'Canceled',
};

export type QueryExecutionState = keyof typeof EXECUTION_STATES;

export type SubmittedQuery = {
  query: Malloy.Query;
  executionState: QueryExecutionState;
  queryResolutionStartMillis: number;
  onCancel: () => void;
  response?: QueryResponse;
};

export type RunStats = {
  compileTime: number;
  runTime: number;
  rowsProcessed: number;
  peakMemory: number;
  queryId: string;
};

export type QueryResponse = {
  error?: ExplorerError;
  result?: Malloy.Result;
  runStats?: RunStats;
};
