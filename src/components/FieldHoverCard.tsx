/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {FieldInfo} from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import * as React from 'react';
import BadgeForField from './primitives/BadgeForField';
import {textColors} from './primitives/colors.stylex';
import {fontStyles} from './primitives/styles';
import ViewAttributeTable from './ResultPanel/ViewAttributeTable';
import {QueryEditorContext} from '../contexts/QueryEditorContext';
import {TopValuesTable} from './TopValuesTable';
import {getDescriptionAnnotation} from './utils/annotations';
import {HoverText} from './primitives/HoverText';
import {HoverCard} from './primitives/HoverCard';

interface FieldHoverCardProps {
  /**
   * The field information associated with the field token.
   */
  field: FieldInfo;

  /**
   * The different items in the path to the field.
   */
  path: string[];
}

export function FieldHoverCard({field, path}: FieldHoverCardProps) {
  const {source} = React.useContext(QueryEditorContext);

  const ref = React.useRef<HTMLDivElement>(null);

  const pathString = [source?.name ?? '', ...path].join(' > ');
  const descriptionAnnotation = getDescriptionAnnotation(
    field.annotations ?? []
  );
  const description = descriptionAnnotation ?? '';

  let details = null;
  if (field.kind === 'view') {
    details = (
      <ViewAttributeTable
        viewInfo={field}
        isCompact={true}
        style={styles.viewAttributeTable}
      />
    );
  } else if (field.kind === 'dimension') {
    details = <TopValuesTable field={field} path={path} />;
  }

  return (
    <HoverCard customStyle={styles.container}>
      <div ref={ref}>
        <div {...stylex.props(styles.badge)}>
          <BadgeForField field={field} />
        </div>
        <div {...stylex.props(fontStyles.supporting, styles.path)}>
          {pathString}
        </div>
        <div {...stylex.props(fontStyles.emphasized, styles.title)}>
          {field.name}
        </div>
        {description && <HoverText text={description} containerRef={ref} />}
      </div>
      {details && <div>{details}</div>}
    </HoverCard>
  );
}

const styles = stylex.create({
  container: {
    width: '323px',
    maxHeight: '280px',
  },
  badge: {
    marginBottom: '4px',
  },
  path: {
    color: textColors.secondary,
  },
  viewPreview: {
    maxHeight: '136px',
    overflow: 'auto',
  },
  viewAttributeTable: {
    height: '136px',
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});
