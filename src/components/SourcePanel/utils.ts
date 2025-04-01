import {FieldInfo, SourceInfo} from '@malloydata/malloy-interfaces';
import {ASTSegmentViewDefinition} from '@malloydata/malloy-query-builder';
import {segmentNestNo} from '../utils/segment';

export type FieldItem = {
  path: string[];
  field: FieldInfo;
};

export type FieldGroupByPath = {
  groupPath: string[];
  items: FieldItem[];
};

export type FieldGroupByKind = {
  group: 'view' | 'measure' | 'dimension';
  items: FieldItem[];
};

export function flattenFieldsTree(
  fields: FieldInfo[],
  path: string[] = []
): FieldItem[] {
  return fields.flatMap<FieldItem>(field => {
    switch (field.kind) {
      case 'view':
      case 'measure':
      case 'dimension':
        return [{path, field}];
      case 'join':
        return flattenFieldsTree(field.schema.fields, [...path, field.name]);
      default:
        return [];
    }
  });
}

export function sourceToFieldItems(source: SourceInfo): FieldItem[] {
  return flattenFieldsTree(source.schema.fields, [source.name]);
}

export function groupFieldItemsByPath(
  source: SourceInfo,
  items: FieldItem[]
): FieldGroupByPath[] {
  return Object.values(
    items.reduce((acc: Record<string, FieldGroupByPath>, current) => {
      const groupKey = [source.name, ...current.path].join('.');
      if (!acc[groupKey]) {
        acc[groupKey] = {
          groupPath: current.path,
          items: [],
        };
      }
      acc[groupKey].items.push(current);
      return acc;
    }, {})
  );
}

export function groupFieldItemsByKind(items: FieldItem[]): FieldGroupByKind[] {
  return Object.values(
    items.reduce((acc: Record<string, FieldGroupByKind>, current) => {
      const kind = current.field.kind as 'view' | 'measure' | 'dimension';
      if (!acc[kind]) {
        acc[kind] = {group: kind, items: []};
      }
      acc[kind].items.push(current);
      return acc;
    }, {})
  );
}

export const getNestName = (segment: ASTSegmentViewDefinition) => {
  const nestNo = segmentNestNo(segment);
  return `Nest ${nestNo}`;
};

export const FIELD_KIND_TO_TITLE = {
  view: 'Views',
  measure: 'Measures',
  dimension: 'Dimensions',
} as const;
