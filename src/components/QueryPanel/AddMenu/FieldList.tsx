/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {useMemo} from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {addMenuStyles} from './styles';
import {sortFieldInfos, ViewParent} from '../../utils/fields';
import FieldToken from '../../FieldToken';
import {FieldHoverCard} from '../../FieldHoverCard';

interface Group {
  name: string;
  path: string[];
  fields: Array<
    | Malloy.FieldInfoWithDimension
    | Malloy.FieldInfoWithMeasure
    | Malloy.FieldInfoWithView
  >;
}

const isArrayOrRecord = (
  field: Malloy.FieldInfo
): field is Malloy.FieldInfoWithDimension | Malloy.FieldInfoWithMeasure =>
  (field.kind === 'dimension' || field.kind === 'measure') &&
  ((field.type.kind === 'array_type' &&
    field.type.element_type.kind === 'record_type') ||
    field.type.kind === 'record_type');

export interface FieldListProps {
  view: ViewParent;
  fields: Malloy.FieldInfo[];
  search: string;
  onClick: (
    field: Malloy.FieldInfo,
    path: string[],
    event: React.MouseEvent
  ) => void;
  types: Array<'dimension' | 'measure' | 'view'>;
  filter?: (
    view: ViewParent,
    field: Malloy.FieldInfo,
    path: string[]
  ) => boolean;
}

export function FieldList({
  view,
  fields,
  onClick,
  search,
  types,
  filter,
}: FieldListProps) {
  const groups = useMemo(() => {
    const groups: Group[] = [];

    const buildGroups = (
      types: Array<'dimension' | 'measure' | 'view'>,
      path: string[],
      name: string,
      fields: Malloy.FieldInfo[]
    ) => {
      const filteredFields = sortFieldInfos(fields)
        .filter(field => field.kind !== 'join')
        .filter(field => !isArrayOrRecord(field))
        .filter(
          field => field.name.includes(search) && types.includes(field.kind)
        )
        .filter(field => (filter ? filter(view, field, path) : true));

      const joins = fields.filter(field => field.kind === 'join');
      const arraysAndRecords = fields.filter(isArrayOrRecord);

      if (filteredFields.length) {
        groups.push({
          path,
          name: path.length ? path.join(' > ') : name,
          fields: filteredFields,
        });
      }

      for (const array of arraysAndRecords) {
        if (
          array.type.kind === 'array_type' &&
          array.type.element_type.kind === 'record_type'
        ) {
          buildGroups(
            types,
            [...path, array.name],
            array.name,
            array.type.element_type.fields.map(field => ({
              kind: array.kind,
              ...field,
            }))
          );
        } else if (array.type.kind === 'record_type') {
          buildGroups(
            types,
            [...path, array.name],
            array.name,
            array.type.fields.map(field => ({
              kind: array.kind,
              ...field,
            }))
          );
        }
      }

      for (const join of joins) {
        buildGroups(
          types.filter(type => type !== 'view'), // Don't include views from joins
          [...path, join.name],
          join.name,
          join.schema.fields
        );
      }
    };

    buildGroups(types, [], 'Source', fields);

    return groups;
  }, [fields, filter, search, view, types]);

  return (
    <div>
      {groups.length ? (
        groups.map(group => (
          <div key={group.name}>
            <div>
              <div
                {...stylex.props(addMenuStyles.item, styles.fieldItem)}
                data-disabled="true"
              >
                {group.name}
              </div>
            </div>
            {group.fields.map(field => (
              <div
                key={group.name + ':' + field.name}
                role="menuitem"
                tabIndex={-1}
                {...stylex.props(addMenuStyles.item, styles.fieldItem)}
              >
                <FieldToken
                  field={field}
                  onClick={event => onClick(field, group.path, event)}
                  tooltip={<FieldHoverCard field={field} path={group.path} />}
                  tooltipProps={{
                    side: 'right',
                    align: 'start',
                    sideOffset: 4,
                    alignOffset: 24,
                  }}
                />
              </div>
            ))}
          </div>
        ))
      ) : (
        <div {...stylex.props(addMenuStyles.item)} data-disabled="true">
          No matching fields
        </div>
      )}
    </div>
  );
}

const styles = stylex.create({
  fieldItem: {
    height: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
});
