/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import {Badge, Button, Card} from '../primitives';
import stylex from '@stylexjs/stylex';
import {fontStyles} from '../primitives/styles';
import ViewAttributeTable from './ViewAttributeTable';

interface BookmarkedViewProps {
  viewInfo: Malloy.ViewInfo;
  onClick: () => void;
}

export function BookmarkedView({viewInfo, onClick}: BookmarkedViewProps) {
  const description = getDescriptionAnnotation(viewInfo.annotations ?? []);

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
                onClick={onClick}
              />
            </div>
            <div>
              <div {...stylex.props(fontStyles.emphasized)}>
                {viewInfo.name}
              </div>
              {description && (
                <div {...stylex.props(fontStyles.supporting)}>
                  {description}
                </div>
              )}
            </div>
          </div>
        }
        style={styles.card}
      >
        <ViewAttributeTable viewInfo={viewInfo} />
      </Card>
    </div>
  );
}

const DESCRIPTION_ANNOTATION_PREFIX: string = '#" ';

const getDescriptionAnnotation = (
  annotations: Array<Malloy.Annotation>
): string | undefined => {
  const firstDesc = annotations
    ?.map(a => a.value)
    ?.filter(val => val.startsWith(DESCRIPTION_ANNOTATION_PREFIX))
    .at(0);

  return firstDesc?.slice(DESCRIPTION_ANNOTATION_PREFIX.length);
};

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
