import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {
  FIELD_KIND_TO_TITLE,
  FieldItem,
  groupFieldItemsByKind,
  groupFieldItemsByPath,
} from './utils';
import {fontStyles} from '../primitives/styles';

import {FieldTokenWithActions} from './FieldTokenWithActions';
import {SourceInfo} from '@malloydata/malloy-interfaces';

interface SearchResultListProps {
  source: SourceInfo;
  items: FieldItem[];
}

const FIELD_KIND_ORDER = ['view', 'dimension', 'measure'] as const;

export default function SearchResultList({
  source,
  items,
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
                  {subgroupItems.map(({field, path}) => (
                    <FieldTokenWithActions
                      key={[...path, field.name].join('.')}
                      field={field}
                      path={path}
                    />
                  ))}
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
