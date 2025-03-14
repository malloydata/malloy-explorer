/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {SourceInfo} from '@malloydata/malloy-interfaces';

import * as theme from './styles';
import {
  Badge,
  Icon,
  List,
  ListItem,
  Divider,
  Token,
  ScrollableArea,
} from './primitives';

interface SourcePanelProps {
  source: SourceInfo;
}

export function SourcePanel({source}: SourcePanelProps) {
  const schema = source.schema;
  const fields = schema.fields;

  const dimensions = fields.filter(field => field.kind === 'dimension');
  const measures = fields.filter(field => field.kind === 'measure');
  const views = fields.filter(field => field.kind === 'view');

  return (
    <div {...stylex.props(styles.main)}>
      <div {...stylex.props(styles.header)}>
        <div {...stylex.props(theme.styles.labelWithIcon)}>
          <Icon name="database" color="gray" />
          {source.name}
        </div>
      </div>
      <Divider />
      <ScrollableArea>
        <div {...stylex.props(styles.content)}>
          <List>
            <ListItem
              key="views"
              label="Views"
              startIcon={<Icon name="view" color="purple" />}
              badge={<Badge label={views.length.toString()} color="purple" />}
              endIcon={<Icon name="chevronRight" color="secondary" />}
            />
            <ListItem
              key="measures"
              label="Measures"
              startIcon={<Icon name="measure" color="green" />}
              badge={<Badge label={measures.length.toString()} color="green" />}
              endIcon={<Icon name="chevronRight" color="secondary" />}
            />
            <ListItem
              key="dimensions"
              label="Dimensions"
              startIcon={<Icon name="dimension" color="cyan" />}
              badge={
                <Badge label={dimensions.length.toString()} color="cyan" />
              }
              endIcon={<Icon name="chevronRight" color="secondary" />}
            />
          </List>
          <Divider style={styles.divider} />
          <div {...stylex.props(styles.tokens)}>
            {fields
              .filter(field => field.kind !== 'join')
              .map(field => (
                <div key={`${field.kind}::${field.name}`}>
                  <Token
                    label={field.name}
                    color={
                      field.kind === 'view'
                        ? 'purple'
                        : field.kind === 'dimension'
                          ? 'green'
                          : 'cyan'
                    }
                    icon={field.kind}
                    onClick={() => console.debug('token clicked')}
                    onHover={isHovered =>
                      console.debug('token hovered: ', isHovered)
                    }
                  />
                </div>
              ))}
          </div>
        </div>
      </ScrollableArea>
    </div>
  );
}

const styles = stylex.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '280px',
    height: '100vh',
    backgroundColor: '#F1F4F7',
    boxShadow: '-1px 0px 0px 0px #C8CCD2 inset',
  },
  header: {
    display: 'flex',
    justifyContent: 'start',
    padding: '8px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
  },
  divider: {
    margin: '16px 0',
  },
  tokens: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '4px',
    padding: '0px 4px',
  },
});
