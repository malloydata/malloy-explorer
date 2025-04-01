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

  const pathString = [source?.name ?? '', ...path].join(' > ');
  const descriptionAnnotation = field.annotations?.find(a =>
    a.value.startsWith('#"')
  );
  const description = descriptionAnnotation
    ? descriptionAnnotation.value.substring(2)
    : 'This is a ' + field.kind + '.';

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
    <div {...stylex.props(styles.container, fontStyles.body)}>
      <div>
        <div {...stylex.props(styles.badge)}>
          <BadgeForField field={field} />
        </div>
        <div {...stylex.props(fontStyles.supporting, styles.path)}>
          {pathString}
        </div>
        <div {...stylex.props(fontStyles.emphasized)}>{field.name}</div>
        {description && <div>{description}</div>}
      </div>
      {details && <div {...stylex.props(styles.detailsSection)}>{details}</div>}
    </div>
  );
}

const styles = stylex.create({
  container: {
    width: '323px',
    maxHeight: '248px',

    boxShadow:
      '0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 12px 0 rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '12px',

    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  badge: {
    marginBottom: '4px',
  },
  path: {
    color: textColors.secondary,
  },
  detailsSection: {},
  viewPreview: {
    maxHeight: '136px',
    overflow: 'auto',
  },
  viewAttributeTable: {
    height: '136px',
  },
});
