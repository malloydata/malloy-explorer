/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react';
import {Badge, Button, Card} from '../primitives';
import stylex from '@stylexjs/stylex';
import {fontStyles} from '../primitives/styles';
import ViewAttributeTable from './ViewAttributeTable';

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
              <Badge
                label="view"
                icon="view_filled"
                color="purple"
                style={styles.viewBadge}
              />
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
        style={styles.card}
      >
        <ViewAttributeTable view="" />
      </Card>
    </div>
  );
}

const styles = stylex.create({
  viewHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewBadge: {
    backgroundColor: 'transparent',
  },
  card: {
    width: '350px',
  },
});
