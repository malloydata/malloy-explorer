import * as React from 'react';
import stylex from '@stylexjs/stylex';
import {
  FIELD_KIND_TO_TITLE,
  FieldItem,
  groupFieldItemsByKind,
  groupFieldItemsByPath,
} from './utils';
import {fontStyles} from '../primitives/styles';
import FieldToken from './FieldToken';
import {Button} from '../primitives';

interface SearchResultListProps {
  items: FieldItem[];
}

const FIELD_KIND_ORDER = ['view', 'measure', 'dimension'] as const;

export default function SearchResultList({items}: SearchResultListProps) {
  const fieldGroupsByKindByPath = React.useMemo(() => {
    return groupFieldItemsByKind(items)
      .sort(
        (a, b) =>
          FIELD_KIND_ORDER.indexOf(a.group) - FIELD_KIND_ORDER.indexOf(b.group)
      )
      .map(group => ({
        ...group,
        items: groupFieldItemsByPath(group.items),
      }));
  }, [items]);

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
            {groupItems.map(({pathKey: subgroup, items: subgroupItems}) => (
              <div
                {...stylex.props(styles.subgroupContent)}
                key={`${group}-${subgroup}`}
              >
                <div {...stylex.props(fontStyles.supporting)}>{subgroup}</div>
                {subgroupItems.map(({field}) => (
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
                      </>
                    }
                  />
                ))}
              </div>
            ))}
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
