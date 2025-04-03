export type SeverityLevel = 'INFO' | 'DEBUG' | 'WARN' | 'ERROR' | 'FATAL';

export type ExplorerError = {
  severity: SeverityLevel;
  title: string;
  description?: string;
  content?: string;
};
