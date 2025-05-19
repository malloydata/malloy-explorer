/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {ASTNestViewOperation} from '@malloydata/malloy-query-builder';
import React, {useContext} from 'react';
import {NestViewPathContext} from '../contexts/NestViewPathContext';
import {useQueryFocus} from '../MalloyQueryFocusProvider';

export interface FocusableViewProps {
  children: React.ReactNode | React.ReactNode[];
  nest?: ASTNestViewOperation;
}

export function FocusableView({children, nest}: FocusableViewProps) {
  const {focusNestView, focusMainView} = useQueryFocus();
  const parentNestViewPath = useContext(NestViewPathContext);

  return (
    <div
      onPointerDown={e => {
        e.stopPropagation();
        if (nest) {
          focusNestView([...parentNestViewPath, nest.name]);
        } else {
          focusMainView();
        }
      }}
    >
      {nest ? (
        <NestViewPathContext.Provider
          value={[...parentNestViewPath, nest.name]}
        >
          <div>{children}</div>
        </NestViewPathContext.Provider>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}
