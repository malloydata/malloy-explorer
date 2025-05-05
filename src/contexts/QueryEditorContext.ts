/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {ASTQuery, ASTView} from '@malloydata/malloy-query-builder';

// TODO switch to stable API when available
export interface SearchValueMapResult {
  fieldName: string;
  cardinality: number;
  values: {
    fieldValue: string | null;
    weight: number;
  }[];
}

export interface QueryEditorContextProps {
  /** Source object at the root level */
  source?: Malloy.SourceInfo;
  /** Query object to represent current state at the root level  */
  rootQuery?: ASTQuery;
  /** Provide to allow editing of the query */
  setQuery?: (rootQuery: Malloy.Query | undefined) => void;
  topValues?: SearchValueMapResult[];
  /** Currently focused nest query panel element */
  currentNestQueryPanel?: HTMLElement | null;
  /** Callback function for when the current focused nest query panel changes */
  onCurrentNestQueryPanelChange?: (panel: HTMLElement | null) => void;
  /** Nest view object corresponding to current focused nest query panel */
  currentNestView?: ASTView | null;
  /**
   * Callback function for when the nest view object
   * corresponding to current focused nest query panel changes
   */
  onCurrentNestViewChange?: (view: ASTView | null) => void;
}

/**
 * QueryEditorContext enables query editing by providing the setQuery
 * callback.
 */
export const QueryEditorContext = React.createContext<QueryEditorContextProps>(
  {}
);
