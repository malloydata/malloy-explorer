/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import * as Malloy from '@malloydata/malloy-interfaces';
import {
  BooleanParser,
  StringParser,
  NumberParser,
  DateParser,
  FilterLog,
} from '@malloydata/malloy-filter';
import {
  ASTQuery,
  ASTSegmentViewDefinition,
  ParsedFilter,
} from '@malloydata/malloy-query-builder';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@radix-ui/react-dialog';
import {dialogStyles} from './styles';
import {useContext, useState} from 'react';
import {QueryContext} from '../../contexts/QueryContext';

export interface FilterDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  rootQuery: ASTQuery;
  segment: ASTSegmentViewDefinition;
  filterField:
    | Malloy.FieldInfoWithDimension
    | Malloy.FieldInfoWithMeasure
    | undefined;
}

export function FilterDialog({
  open,
  rootQuery,
  setOpen,
  segment,
  filterField,
}: FilterDialogProps) {
  const {setQuery} = useContext(QueryContext);
  const [value, setValue] = useState('');
  const [errors, setErrors] = useState<FilterLog[]>([]);

  if (!filterField) {
    return null;
  }

  return (
    <Dialog open={open}>
      <DialogPortal>
        <DialogOverlay {...stylex.props(dialogStyles.overlay)}>
          <DialogContent {...stylex.props(dialogStyles.content)}>
            <DialogTitle {...stylex.props(dialogStyles.title)}>
              Add Filter...
            </DialogTitle>
            <div {...stylex.props(dialogStyles.center)}>
              {filterField.name}
              <input
                type="string"
                value={value}
                onChange={event => {
                  setValue(event.target.value);
                }}
              />
            </div>
            <div>
              {errors.map((error, key) => (
                <div key={key}>{error.message}</div>
              ))}
            </div>
            <div {...stylex.props(dialogStyles.footer)}>
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button
                onClick={() => {
                  let filter: ParsedFilter | undefined;
                  let logs: FilterLog[] = [];
                  switch (filterField.type.kind) {
                    case 'string_type':
                      {
                        const result = new StringParser(value).parse();
                        logs = result.logs;
                        filter = {
                          kind: 'string',
                          clauses: result.clauses,
                        };
                      }
                      break;
                    case 'boolean_type':
                      {
                        const result = new BooleanParser(value).parse();
                        logs = result.logs;
                        filter = {
                          kind: 'boolean',
                          clauses: result.clauses,
                        };
                      }
                      break;
                    case 'number_type':
                      {
                        const result = new NumberParser(value).parse();
                        logs = result.logs;
                        filter = {
                          kind: 'number',
                          clauses: result.clauses,
                        };
                      }
                      break;
                    case 'timestamp_type':
                    case 'date_type':
                      {
                        const result = new DateParser(value).parse();
                        logs = result.logs;
                        filter = {
                          kind: 'date',
                          clauses: result.clauses,
                        };
                      }
                      break;
                  }
                  setErrors(logs);
                  if (logs.length === 0 && filter) {
                    segment.addWhere(filterField.name, filter);
                    setQuery?.(rootQuery.build());
                    setOpen(false);
                  }
                }}
              >
                OK
              </button>
            </div>
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
}
