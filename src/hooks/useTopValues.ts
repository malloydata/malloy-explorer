/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {createContext, useContext} from 'react';

// TODO switch to stable API when available
export interface SearchValueMapResult {
  fieldName: string;
  cardinality: number;
  values: {
    fieldValue: string | null;
    weight: number;
  }[];
}

interface TopValuesContextProps {
  topValues?: SearchValueMapResult[];
}

export const TopValuesContext = createContext<TopValuesContextProps>({});

/**
 * A layer of indirection should we ever decide to optimize
 * this behavior
 */
export function useTopValues(): SearchValueMapResult[] | undefined {
  const {topValues} = useContext(TopValuesContext);
  return topValues;
}
