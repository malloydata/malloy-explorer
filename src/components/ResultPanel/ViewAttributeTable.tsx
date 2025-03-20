/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {ScrollableArea} from '../primitives';
import {fontStyles} from '../primitives/styles';
import {Visualization} from './Visualization';
import FieldToken from '../SourcePanel/FieldToken';

interface ViewAttributeTableProps {
  viewInfo: Malloy.ViewInfo;
}

export default function ViewAttributeTable({
  viewInfo,
}: ViewAttributeTableProps) {
  const dimensions = viewInfo.schema.fields.filter(f => f.kind === 'dimension');

  return (
    <div {...stylex.props(styles.attributeTableContainer)}>
      <ScrollableArea>
        <table {...stylex.props(styles.attributeTable)}>
          <ViewAttributeTableRow attribute="chart type">
            <div {...stylex.props(styles.chartTypeViz)}>
              <Visualization annotations={viewInfo.annotations || []} />
            </div>
          </ViewAttributeTableRow>

          {/* <ViewAttributeTableRow attribute="aggregate" />
          <ViewAttributeTableRow attribute="group by" /> */}
          <ViewAttributeTableRow attribute="dimension">
            {dimensions.map(f => (
              <span key={`${f.kind}::${f.name}`}>
                <FieldToken field={f} />
              </span>
            ))}
          </ViewAttributeTableRow>
          {/* <ViewAttributeTableRow attribute="order by" />
          <ViewAttributeTableRow attribute="limit" /> */}
        </table>
      </ScrollableArea>
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
    backgroundColor: '#F1F4F7',
    boxSizing: 'border-box',
    width: '100%',
    height: '200px',
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
