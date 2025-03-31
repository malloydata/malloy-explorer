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
import {atomicTypeToIcon, fieldKindToColor} from '../../utils/icon';
import {Token} from '../../primitives';
import {sortFieldInfos} from '../../utils/fields';

interface Group {
  name: string;
  path: string[];
  fields: Array<
    | Malloy.FieldInfoWithDimension
    | Malloy.FieldInfoWithMeasure
    | Malloy.FieldInfoWithView
  >;
}

export interface FieldListProps {
  fields: Malloy.FieldInfo[];
  search: string;
  onClick: (field: Malloy.FieldInfo, path: string[]) => void;
  types: Array<'dimension' | 'measure' | 'view'>;
}

export function FieldList({fields, onClick, search, types}: FieldListProps) {
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
        .filter(
          field => field.name.includes(search) && types.includes(field.kind)
        );

      const joins = fields.filter(field => field.kind === 'join');

      if (filteredFields.length) {
        groups.push({
          path,
          name: path.length ? path.join(' > ') : name,
          fields: filteredFields,
        });
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
  }, [fields, search, types]);

  return (
    <div style={{overflow: 'auto', overflowY: 'scroll', flex: 1}}>
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
                role="menuitem"
                tabIndex={-1}
                key={group.name + ':' + field.name}
                {...stylex.props(addMenuStyles.item, styles.fieldItem)}
                onClick={() => onClick(field, group.path)}
              >
                <Field field={field} />
              </div>
            ))}
          </div>
        ))
      ) : (
        <div {...stylex.props(addMenuStyles.item)} data-disabled="true">
          No matching items
        </div>
      )}
    </div>
  );
}

export interface FieldProps {
  field:
    | Malloy.FieldInfoWithDimension
    | Malloy.FieldInfoWithMeasure
    | Malloy.FieldInfoWithView;
}

export function Field({field}: FieldProps) {
  const color = fieldKindToColor(field.kind);
  const icon =
    field.kind === 'view' ? 'query' : atomicTypeToIcon(field.type.kind);

  return <Token label={field.name} icon={icon} color={color} />;
}

const styles = stylex.create({
  fieldItem: {
    height: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
});
