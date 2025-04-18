/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useContext} from 'react';
import {QueryEditorContext} from '../../../../contexts/QueryEditorContext';

export interface SearchIndexResult {
  fieldName: string;
  fieldValue: string | null;
  fieldType: string;
  weight: number;
}

export function useSearch(
  searchTerm: string,
  fieldPath?: string
): {searchResults: SearchIndexResult[] | undefined; isLoading: boolean} {
  const {topValues} = useContext(QueryEditorContext);
  if (topValues && searchTerm) {
    let searchValues = topValues;

    if (fieldPath) {
      const fieldValues = topValues.find(
        value => value.fieldName === fieldPath
      );
      if (fieldValues) {
        searchValues = [fieldValues];
      } else {
        searchValues = [];
      }
    }

    searchTerm = searchTerm.toLowerCase();

    return {
      searchResults: searchValues.reduce<SearchIndexResult[]>(
        (acc, searchValue) => {
          searchValue.values
            .filter(
              value =>
                value.fieldValue?.toLowerCase().includes(searchTerm) ?? false
            )
            .forEach(value => {
              acc.push({
                fieldValue: value.fieldValue,
                fieldName: searchValue.fieldName,
                fieldType: 'string',
                weight: value.weight,
              });
            });
          return acc;
        },
        []
      ),
      isLoading: false,
    };
  }
  return {
    searchResults: undefined,
    isLoading: false,
  };
}
