/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Malloy from '@malloydata/malloy-interfaces';
import {LogMessage, MalloyError, malloyToQuery} from '@malloydata/malloy';
import {LogSeverity} from '@malloydata/malloy-interfaces';
import {stubCompile} from './stub_compile';
import {getModel} from './utils';
import * as Monaco from '../components/utils/monaco_shim';

export async function diagnostics(
  modelUri: string,
  malloy: string
): Promise<Monaco.editor.IMarkerData[]> {
  const modelDef = getModel(modelUri);

  const markers: Monaco.editor.IMarkerData[] = [];
  try {
    const model = await stubCompile(modelDef, malloy);
    for (const log of model.problems) {
      markers.push(logToMarker(log));
    }
    const {logs} = malloyToQuery(malloy);
    for (const log of logs) {
      markers.push(stableLogToMarker(log));
    }
  } catch (error) {
    if (error instanceof MalloyError) {
      for (const log of error.problems) {
        markers.push(logToMarker(log));
      }
    }
  }
  return markers;
}

function convertSeverity(severity: LogSeverity): Monaco.MarkerSeverity {
  const monaco = Monaco.getMonaco();

  switch (severity) {
    case 'error':
      return monaco.MarkerSeverity.Error;
    case 'warn':
      return monaco.MarkerSeverity.Warning;
    case 'info':
      return monaco.MarkerSeverity.Info;
  }
  return monaco.MarkerSeverity.Hint;
}

function logToMarker(log: LogMessage): Monaco.editor.IMarkerData {
  return {
    severity: convertSeverity(log.severity),
    message: log.message,
    startLineNumber: (log.at?.range.start.line ?? 0) + 1,
    startColumn: (log.at?.range.start.character ?? 0) + 1,
    endLineNumber: (log.at?.range.end.line ?? 0) + 1,
    endColumn: (log.at?.range.end.character ?? 0) + 1,
  };
}

function stableLogToMarker(log: Malloy.LogMessage): Monaco.editor.IMarkerData {
  const monaco = Monaco.getMonaco();

  return {
    severity: monaco.MarkerSeverity.Hint,
    message: log.message,
    startLineNumber: (log.range.start.line ?? 0) + 1,
    startColumn: (log.range.start.character ?? 0) + 1,
    endLineNumber: (log.range.end.line ?? 0) + 1,
    endColumn: (log.range.end.character ?? 0) + 1,
  };
}
