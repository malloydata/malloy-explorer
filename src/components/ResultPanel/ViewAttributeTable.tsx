/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {fontStyles} from '../primitives/styles';
import {Visualization} from './Visualization';
import FieldToken from '../FieldToken';
import {backgroundColors} from '../primitives/colors.stylex';

interface ViewAttributeTableProps {
  viewInfo: Malloy.ViewInfo;
  isCompact?: boolean;
  style?: StyleXStyles;
}

export default function ViewAttributeTable({
  viewInfo,
  isCompact,
  style,
}: ViewAttributeTableProps) {
  const dimensions = viewInfo.schema.fields.filter(f => f.kind === 'dimension');

  return (
    <div {...stylex.props(styles.attributeTableContainer, style)}>
      <table {...stylex.props(styles.attributeTable)}>
        <tbody>
          <ViewAttributeTableRow attribute="chart type">
            <div {...stylex.props(styles.chartTypeViz)}>
              <Visualization annotations={viewInfo.annotations || []} />
            </div>
          </ViewAttributeTableRow>
          <ViewAttributeTableRow attribute="output">
            {dimensions.map(f => (
              <span key={`${f.kind}::${f.name}`}>
                <FieldToken
                  field={f}
                  size={isCompact ? 'compact' : 'default'}
                />
              </span>
            ))}
          </ViewAttributeTableRow>
          {/* <ViewAttributeTableRow attribute="order by" />
          <ViewAttributeTableRow attribute="limit" /> */}
        </tbody>
      </table>
    </div>
  );
}

interface ViewAttributeTableRowProps {
  attribute: string;
  children?: React.ReactNode;
}

function ViewAttributeTableRow({
  attribute,
  children,
}: ViewAttributeTableRowProps) {
  return (
    <tr {...stylex.props(styles.attributeTableRow)}>
      <td
        {...stylex.props(styles.attributeTableKeyCell, fontStyles.supporting)}
      >
        <div
          {...stylex.props(
            styles.attributeTableKeyCellContent,
            fontStyles.supporting
          )}
        >
          {attribute}
        </div>
      </td>
      <td {...stylex.props(styles.attributeTableValueCell)}>{children}</td>
    </tr>
  );
}

const styles = stylex.create({
  attributeTableContainer: {
    padding: '8px',
    gap: '8px',
    borderRadius: '10px',
    backgroundColor: backgroundColors.washOnWeb,
    boxSizing: 'border-box',
    width: '100%',
    height: '200px',
    overflow: 'auto',
  },
  chartTypeViz: {
    display: 'inline-block',
  },
  attributeTable: {
    borderCollapse: 'collapse',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
  },
  attributeTableRow: {
    textAlign: 'left',
  },
  attributeTableKeyCell: {
    whiteSpace: 'nowrap',
    width: '25%',
    verticalAlign: 'top',
  },
  attributeTableKeyCellContent: {
    height: '28px',
    display: 'flex',
    alignItems: 'center',
  },
  attributeTableValueCell: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2px',
  },
});
