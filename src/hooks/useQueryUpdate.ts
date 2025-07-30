/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {createContext, useContext} from 'react';

interface UpdateQueryContextProps {
  updateQuery: () => void;
}

export const UpdateQueryContext = createContext<UpdateQueryContextProps>({
  updateQuery: () => {
    console.warn('Missing <MalloyExplorerProvider>');
  },
});

/**
 * A layer of indirection should we ever decide to optimize
 * this behavior
 */
export function useUpdateQuery() {
  const {updateQuery} = useContext(UpdateQueryContext);
  return updateQuery;
}
