/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {backgroundColors, textColors} from './primitives/colors.stylex';
import {useTopValues} from '../hooks/useTopValues';

export interface TopValuesTableProps {
  field: Malloy.FieldInfo;
  path: string[];
}

export function TopValuesTable({field, path}: TopValuesTableProps) {
  const topValues = useTopValues();
  const fieldPath = [...path, field.name].join('.');
  const fieldTopValues = topValues?.find(
    entry => entry.fieldName === fieldPath
  );

  if (!fieldTopValues) {
    return null;
  }

  return (
    <div {...stylex.props(styles.topValues)}>
      <div {...stylex.props(styles.topValuesTitle)}>Top Values</div>
      {fieldTopValues.values.slice(0, 6).map(value => (
        <div key={value.fieldValue} {...stylex.props(styles.topValuesRow)}>
          <div {...stylex.props(styles.topValuesValue)}>
            <div {...stylex.props(styles.topValuesWeightInner)}>
              {value.fieldValue === null ? <span>∅</span> : value.fieldValue}
            </div>
          </div>
          <div {...stylex.props(styles.topValuesWeight)}>
            {largeNumberLabel(value.weight)}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = stylex.create({
  topValues: {
    backgroundColor: backgroundColors.surfaceSubtle,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
  },
  topValuesTitle: {
    fontWeight: 'bold',
  },
  topValuesRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'center',
  },
  topValuesValue: {},
  topValuesWeightInner: {
    textOverflow: 'ellipsis',
    textTransform: 'none',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  topValuesWeight: {
    display: 'flex',
    gap: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
    flexShrink: 0,
    color: textColors.secondary,
  },
});

export function largeNumberLabel(n: number | null): string {
  if (n === null) {
    return '∅';
  }
  if (n < 1_000) {
    return n.toLocaleString();
  } else if (n < 10_000) {
    return (n / 1000).toFixed(1) + 'K';
  } else if (n < 1_000_000) {
    return Math.floor(n / 1000).toLocaleString() + 'K';
  } else if (n < 10_000_000) {
    return (n / 1_000_000).toFixed(1) + 'M';
  } else {
    return Math.floor(n / 1000).toLocaleString() + 'M';
  }
}
