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
import {sortFieldInfos} from '../../utils/fields';
import {Field} from '../Field';
import {FieldHover} from '../FieldHover';

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
              <FieldHover
                key={group.name + ':' + field.name}
                field={field}
                path={group.path}
                side="right"
                align="start"
              >
                <div
                  role="menuitem"
                  tabIndex={-1}
                  {...stylex.props(addMenuStyles.item, styles.fieldItem)}
                  onClick={() => onClick(field, group.path)}
                >
                  <Field field={field} path={group.path} />
                </div>
              </FieldHover>
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
