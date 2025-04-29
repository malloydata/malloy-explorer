import * as Malloy from '@malloydata/malloy-interfaces';

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

export type RunInfo = {
  customContent?: React.ReactNode;

  queryLink?: {
    linkText: string;
    href: string;
  };
  /**
   * Logical, named groupings of performance aspects.
   */
  performanceAspects?: {
    [key: string]: {
      [key: string]: string;
    };
  };
};

export type QueryResponse = {
  /**
   * @deprecated use 'messages'
   */
  error?: Message;
  result?: Malloy.Result;
  runInfo?: RunInfo;
  messages?: Array<Message>;
};

export type SeverityLevel = 'INFO' | 'DEBUG' | 'WARN' | 'ERROR' | 'FATAL';

export type Message = {
  severity: SeverityLevel;
  title: string;
  description?: string;
  content?: string;
  customRenderer?: React.ReactNode;
};
