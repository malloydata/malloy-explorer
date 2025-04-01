/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {FieldInfo, ViewInfo} from '@malloydata/malloy-interfaces';
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import stylex from '@stylexjs/stylex';
import * as React from 'react';
import BadgeForField from './primitives/BadgeForField';
import {textColors} from './primitives/colors.stylex';
import {fontStyles} from './primitives/styles';
import ViewAttributeTable from './ResultPanel/ViewAttributeTable';

interface HoverCardContentProps {
  /**
   * The field information associated with the field token.
   */
  field: FieldInfo;

  /**
   * The different items in the path to the field.
   */
  pathParts: string[];
}

interface HoverCardProps extends HoverCardContentProps {
  children: React.ReactElement;
}

/**
 * Renders the a hover card for a field when the user hovers over the
 * children of this component.
 **/
export default function HoverCard({
  field,
  children,
  pathParts,
}: HoverCardProps) {
  return (
    <Tooltip>
      <TooltipPortal />
      <TooltipTrigger asChild>
        <div>{children}</div>
      </TooltipTrigger>
      <TooltipContent side="right">
        <HoverCardContent field={field} pathParts={pathParts} />
      </TooltipContent>
    </Tooltip>
  );
}

function HoverCardContent({field, pathParts}: HoverCardContentProps) {
  const pathString = pathParts.join(' > ');
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
        viewInfo={field as ViewInfo}
        isCompact={true}
        style={styles.viewAttributeTable}
      />
    );
  }

  return (
    <div {...stylex.props(styles.container, fontStyles.body)}>
      <div {...stylex.props(styles.metadataSection)}>
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
  metadataSection: {},
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
