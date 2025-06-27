/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {JSONSchemaArray} from '@malloydata/render';
import stylex from '@stylexjs/stylex';
import {styles} from './styles';
import {EditorProps} from './types';
import InfoHover from './InfoHover';
import {PillInput} from '../../filters/PillInput';
import {useRef, useState} from 'react';
import FieldToken from '../../FieldToken';
import {FieldHoverCard} from '../../FieldHoverCard';

export default function FieldEditor({
  view,
  name,
  path,
  current,
  option,
  updateCurrent,
}: EditorProps<JSONSchemaArray, string[]>) {
  const [searchValue, setSearchValue] = useState('');
  const valueListRef = useRef<HTMLDivElement>(null);

  const jsonFields: string[] = (current ?? []) as string[];
  const fields = jsonFields.map(field => {
    try {
      return JSON.parse(field)[0] as string;
    } catch (e) {
      console.warn('Failed to parse field', field, e);
      return '';
    }
  });
  const updateFields = (path: string[], value: unknown) => {
    const jsonFields = (value as string[]).map(field =>
      JSON.stringify([field])
    );
    updateCurrent(path, jsonFields);
  };
  const lcSearch = searchValue.toLocaleLowerCase();
  const dimensions = view.definition.getOutputSchema()
    .fields as Malloy.FieldInfoWithDimension[];

  const filteredFields = dimensions
    .filter(field => field.name.toLocaleLowerCase().includes(lcSearch))
    .filter(field => !fields.includes(field.name))
    .filter(
      field =>
        !('fieldTypes' in option.items) ||
        option.items.fieldTypes?.includes(field.type.kind)
    );

  return (
    <>
      <div {...stylex.props(styles.left, styles.label)}>
        <label>{option.title ?? name}:</label>
      </div>
      <div style={{minHeight: 0, display: 'grid', gap: 4}}>
        <PillInput
          values={fields}
          setValues={values => {
            updateFields(path, values);
          }}
          value={searchValue}
          setValue={setSearchValue}
          focusElement={valueListRef}
        />
        <FieldList
          ref={valueListRef}
          fields={filteredFields}
          search={searchValue}
          onClick={value => {
            updateFields(path, [...fields, value]);
          }}
        />
      </div>
      {option.description ? <InfoHover info={option.description} /> : <div />}
    </>
  );
}

interface FieldListProps {
  ref: React.RefObject<HTMLDivElement | null>;
  fields: Malloy.FieldInfo[];
  search: string;
  onClick: (value: string) => void;
}

function FieldList({ref, fields, search, onClick}: FieldListProps) {
  if (fields.length) {
    return (
      <div ref={ref} {...stylex.props(localStyles.fieldList)}>
        {fields.map(field => (
          <FieldToken
            key={field.name}
            field={field}
            onClick={() => onClick(field.name)}
            tooltip={<FieldHoverCard field={field} path={[]} />}
            tooltipProps={{
              side: 'right',
              align: 'start',
              sideOffset: 4,
              alignOffset: 24,
            }}
          />
        ))}
      </div>
    );
  } else {
    if (search) {
      return (
        <div {...stylex.props(localStyles.item)} data-disabled="true">
          No matching fields
        </div>
      );
    }
  }
}

const localStyles = stylex.create({
  item: {},
  fieldList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 4,
  },
});
