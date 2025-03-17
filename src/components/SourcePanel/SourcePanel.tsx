/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {SourceInfo} from '@malloydata/malloy-interfaces';

import * as theme from '../styles';
import {
  Badge,
  Icon,
  List,
  ListItem,
  Divider,
  ScrollableArea,
  Button,
} from '../primitives';
import {textColors} from '../primitives/colors.stylex';
import FieldToken from './FieldToken';

interface SourcePanelProps {
  source: SourceInfo;
}

type PanelType = 'view' | 'dimension' | 'measure' | null;

export default function SourcePanel({source}: SourcePanelProps) {
  const schema = source.schema;
  const fields = schema.fields;

  const dimensions = fields.filter(field => field.kind === 'dimension');
  const measures = fields.filter(field => field.kind === 'measure');
  const views = fields.filter(field => field.kind === 'view');

  const [panelType, setPanelType] = React.useState<PanelType>(null);

  return (
    <div {...stylex.props(styles.main)}>
      <div {...stylex.props(styles.header)}>
        {panelType == null ? (
          <div {...stylex.props(theme.styles.labelWithIcon)}>
            <Icon name="database" color="gray" />
            {source.name}
          </div>
        ) : (
          <Button
            icon="chevronLeft"
            label="Back"
            variant="flat"
            size="compact"
            onClick={() => setPanelType(null)}
          />
        )}
      </div>
      <Divider />
      <ScrollableArea>
        <div {...stylex.props(styles.content)}>
          {panelType == null ? (
            <List>
              <ListItem
                key="views"
                label="Views"
                startIcon={<Icon name="view" color="purple" />}
                badge={<Badge label={views.length.toString()} color="purple" />}
                endIcon={<Icon name="chevronRight" color="secondary" />}
                onClick={() => setPanelType('view')}
              />
              <ListItem
                key="measures"
                label="Measures"
                startIcon={<Icon name="measure" color="green" />}
                badge={
                  <Badge label={measures.length.toString()} color="green" />
                }
                endIcon={<Icon name="chevronRight" color="secondary" />}
                onClick={() => setPanelType('measure')}
              />
              <ListItem
                key="dimensions"
                label="Dimensions"
                startIcon={<Icon name="dimension" color="cyan" />}
                badge={
                  <Badge label={dimensions.length.toString()} color="cyan" />
                }
                endIcon={<Icon name="chevronRight" color="secondary" />}
                onClick={() => setPanelType('dimension')}
              />
            </List>
          ) : (
            <div {...stylex.props(styles.tokens)}>
              {fields
                .filter(field => field.kind === panelType)
                .map(field => (
                  <div key={`${field.kind}::${field.name}`}>
                    <FieldToken
                      key={`${field.kind}::${field.name}`}
                      field={field}
                      hoverActions={
                        <>
                          <Button
                            variant="flat"
                            size="compact"
                            icon="insert"
                            onClick={() => {}}
                          />
                          <Button
                            variant="flat"
                            size="compact"
                            icon="nest"
                            onClick={() => {}}
                          />
                          <Button
                            variant="flat"
                            size="compact"
                            label="pin"
                            onClick={() => {}}
                          />
                          <Button
                            variant="flat"
                            size="compact"
                            label="remove"
                            onClick={() => {}}
                          />
                        </>
                      }
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      </ScrollableArea>
    </div>
  );
}

const styles = stylex.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    width: '280px',
    height: '100vh',
    backgroundColor: '#F1F4F7',
    boxShadow: '-1px 0px 0px 0px #C8CCD2 inset',
  },
  header: {
    display: 'flex',
    justifyContent: 'start',
    padding: '8px',
    minHeight: '28px',
    fontFamily: 'SF Pro Text',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '20px',
    color: textColors.primary,
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
