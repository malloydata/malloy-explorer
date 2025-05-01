import {FieldInfo, SourceInfo} from '@malloydata/malloy-interfaces';
import {ASTSegmentViewDefinition} from '@malloydata/malloy-query-builder';
import {segmentNestNo} from '../utils/segment';
import {isIndexView} from '../utils/fields';

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
        if (isIndexView(field)) {
          return [];
        } else if (path.length > 0) {
          return []; // exclude views in join fields
        } else {
          return [{path, field}];
        }
      case 'measure':
      case 'dimension':
        if (
          field.type.kind === 'array_type' &&
          field.type.element_type.kind === 'record_type'
        ) {
          return [
            {path, field},
            ...flattenFieldsTree(
              field.type.element_type.fields.map(dimension => ({
                kind: field.kind,
                ...dimension,
              })),
              [...path, field.name]
            ),
          ];
        } else if (field.type.kind === 'record_type') {
          return [
            {path, field},
            ...flattenFieldsTree(
              field.type.fields.map(dimension => ({
                kind: field.kind,
                ...dimension,
              })),
              [...path, field.name]
            ),
          ];
        }
        return [{path, field}];
      case 'join':
        return flattenFieldsTree(field.schema.fields, [...path, field.name]);
      default:
        return [];
    }
  });
}

export function sourceToFieldItems(source: SourceInfo): FieldItem[] {
  return flattenFieldsTree(source.schema.fields);
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

export const getNestName = (
  segment: ASTSegmentViewDefinition,
  rename = 'Nest'
) => {
  const nestNo = segmentNestNo(segment);
  return nestNo > 1 ? `${rename} ${nestNo}` : rename;
};

export const FIELD_KIND_TO_TITLE = {
  view: 'Views',
  measure: 'Measures',
  dimension: 'Dimensions',
} as const;
