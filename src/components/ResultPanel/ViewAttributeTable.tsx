/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react';
import {ScrollableArea, Token} from '../primitives';
import stylex from '@stylexjs/stylex';
import {fontStyles} from '../primitives/styles';

interface ViewAttributeTableProps {
  view: string;
}

export default function ViewAttributeTable({view: _}: ViewAttributeTableProps) {
  return (
    <div {...stylex.props(styles.attributeTableContainer)}>
      <ScrollableArea>
        <table {...stylex.props(styles.attributeTable)}>
          <ViewAttributeTableRow attribute="chart type" value="test" />
          <ViewAttributeTableRow attribute="aggregate" />
          <ViewAttributeTableRow attribute="group by" />
          {/* use group by existence as proxy for display decision */}
          <ViewAttributeTableRow attribute="dimension" />
          <ViewAttributeTableRow attribute="order by" />
          <ViewAttributeTableRow attribute="limit" />
        </table>
      </ScrollableArea>
    </div>
  );
}

interface ViewAttributeTableRowProps {
  attribute: string;
  value?: string;
}

function ViewAttributeTableRow({attribute, value}: ViewAttributeTableRowProps) {
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
      <td>
        <Token label={value} />
        <Token label={value} />
        <Token label={value} />
        <Token label={value} />
        <Token label={value} />
        <Token label={value} />
        <Token label={value} />
      </td>
    </tr>
  );
}

const styles = stylex.create({
  attributeTableContainer: {
    padding: '8px',
    gap: '8px',
    borderRadius: '10px',
    backgroundColor: '#F1F4F7',
    boxSizing: 'border-box',
    width: '100%',
    height: '200px',
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
  attributeTableValueCellContent: {
    width: '1px',
  },
});
