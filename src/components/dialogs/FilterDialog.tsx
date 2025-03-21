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
  BooleanFilterExpression,
  NumberFilterExpression,
  StringFilterExpression,
  TemporalFilterExpression,
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
import {QueryEditorContext} from '../../contexts/QueryEditorContext';
import {Button} from '../primitives';

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
  const {setQuery} = useContext(QueryEditorContext);
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
              <Button onClick={() => setOpen(false)} label="Cancel" />
              <Button
                onClick={() => {
                  let filter: ParsedFilter | undefined;
                  let logs: FilterLog[] = [];
                  switch (filterField.type.kind) {
                    case 'string_type':
                      {
                        const result = StringFilterExpression.parse(value);
                        logs = result.log;
                        filter = {
                          kind: 'string',
                          parsed: result.parsed,
                        };
                      }
                      break;
                    case 'boolean_type':
                      {
                        const result = BooleanFilterExpression.parse(value);
                        logs = result.log;
                        filter = {
                          kind: 'boolean',
                          parsed: result.parsed,
                        };
                      }
                      break;
                    case 'number_type':
                      {
                        const result = NumberFilterExpression.parse(value);
                        logs = result.log;
                        filter = {
                          kind: 'number',
                          parsed: result.parsed,
                        };
                      }
                      break;
                    case 'date_type':
                      {
                        const result = TemporalFilterExpression.parse(value);
                        logs = result.log;
                        filter = {
                          kind: 'date',
                          parsed: result.parsed,
                        };
                      }
                      break;
                    case 'timestamp_type': {
                      const result = TemporalFilterExpression.parse(value);
                      logs = result.log;
                      filter = {
                        kind: 'timestamp',
                        parsed: result.parsed,
                      };
                    }
                  }
                  setErrors(logs);
                  if (logs.length === 0 && filter) {
                    segment.addWhere(filterField.name, filter);
                    setQuery?.(rootQuery.build());
                    setOpen(false);
                  }
                }}
                label="OK"
                variant="primary"
              />
            </div>
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
}
