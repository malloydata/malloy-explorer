import * as React from 'react';
import * as Malloy from '@malloydata/malloy-interfaces';
import stylex from '@stylexjs/stylex';
import {backgroundColors} from '../primitives/colors.stylex';
import {
  FIELD_KIND_TO_TITLE,
  FieldItem,
  groupFieldItemsByKind,
  groupFieldItemsByPath,
} from './utils';
import {fontStyles} from '../primitives/styles';

import {FieldTokenWithActions} from './FieldTokenWithActions';
import {SourceInfo} from '@malloydata/malloy-interfaces';
import {
  ASTArrowQueryDefinition,
  ASTQuery,
} from '@malloydata/malloy-query-builder';
import {FieldTokenWithCopy} from './FieldTokenWithCopy';

interface SearchResultListProps {
  rootQuery?: ASTQuery;
  source: SourceInfo;
  items: FieldItem[];
  onCopy: (field: Malloy.FieldInfo, path: string[]) => void;
}

const FIELD_KIND_ORDER = ['dimension', 'measure', 'view'] as const;

export default function SearchResultList({
  rootQuery,
  source,
  items,
  onCopy,
}: SearchResultListProps) {
  const fieldGroupsByKindByPath = React.useMemo(() => {
    return groupFieldItemsByKind(items)
      .sort(
        (a, b) =>
          FIELD_KIND_ORDER.indexOf(a.group) - FIELD_KIND_ORDER.indexOf(b.group)
      )
      .map(group => ({
        ...group,
        items: groupFieldItemsByPath(source, group.items),
      }));
  }, [source, items]);

  const viewDef = rootQuery?.definition;
  const astMode = rootQuery && viewDef instanceof ASTArrowQueryDefinition;

  return (
    <div {...stylex.props(styles.main)}>
      <div {...stylex.props(fontStyles.body, styles.heading)}>
        {`${items.length} result${items.length > 1 ? 's' : ''}`}
      </div>
      {fieldGroupsByKindByPath.map(({group, items: groupItems}) => (
        <div key={group}>
          <div {...stylex.props(fontStyles.body, styles.groupTitle)}>
            {FIELD_KIND_TO_TITLE[group]}
          </div>
          <div {...stylex.props(styles.groupContent)}>
            {groupItems.map(
              ({groupPath: subgroupPath, items: subgroupItems}) => (
                <div
                  {...stylex.props(styles.subgroupContent)}
                  key={subgroupPath.join('.')}
                >
                  <div {...stylex.props(fontStyles.supporting)}>
                    {subgroupPath.join(' > ')}
                  </div>
                  {subgroupItems.map(({field, path}) =>
                    astMode ? (
                      <FieldTokenWithActions
                        rootQuery={rootQuery}
                        key={[...path, field.name].join('.')}
                        field={field}
                        path={path}
                        viewDef={viewDef}
                      />
                    ) : (
                      <FieldTokenWithCopy
                        key={[...path, field.name].join('.')}
                        field={field}
                        path={path}
                        onCopy={onCopy}
                      />
                    )
                  )}
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = stylex.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '8px',
    backgroundColor: backgroundColors.surfaceSubtle,
  },
  heading: {
    fontWeight: 700,
  },
  groupTitle: {
    fontWeight: 700,
    fontSize: '12px',
  },
  groupContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  subgroupContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
});
