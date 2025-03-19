/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {Badge, Button, Card, Icon} from '../primitives';
import stylex from '@stylexjs/stylex';
import {fontStyles} from '../primitives/styles';

interface BookmarkedViewProps {
  view: string;
}

export function BookmarkedView({view: _}: BookmarkedViewProps) {
  return (
    <div>
      <Card
        header={
          <div>
            <div {...stylex.props(styles.viewHeader)}>
              <div>
                <Icon name="view" color="purple" />
                <Badge label="View" color="purple" />
              </div>
              <Button
                variant="default"
                size="compact"
                label="Add"
                onClick={() => {}}
              />
            </div>
            <div>
              <div {...stylex.props(fontStyles.emphasized)}>by_carrier</div>
              <div {...stylex.props(fontStyles.supporting)}>
                flight count by top five carriers
              </div>
            </div>
          </div>
        }
      >
        <ViewAttributeTable view="" />
      </Card>
    </div>
  );
}

interface ViewAttributeTableProps {
  view: string;
}

function ViewAttributeTable({view: _}: ViewAttributeTableProps) {
  return <div {...stylex.props(styles.attributeTable)}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>;
}

const styles = stylex.create({
  viewHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  attributeTable: {
    display: 'flex',
    padding: '8px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
    alignSelf: 'stretch',
    borderRadius: '10px',
    backgroundColor: '#F1F4F7',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
  },
  attributeTableRow: {

  }
});
