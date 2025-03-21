import {FieldInfo, SourceInfo} from '@malloydata/malloy-interfaces';

export type FieldItem = {
  path: string[];
  field: FieldInfo;
};

export type FieldGroupByPath = {
  pathKey: string;
  path: string[];
  items: FieldItem[];
};

export type FieldGroupByKind = {
  group: 'view' | 'measure' | 'dimension';
  items: FieldItem[];
};

export function flattenFieldsTree(
  fields: FieldInfo[],
  path: string[]
): FieldItem[] {
  return fields.flatMap<FieldItem>(field => {
    switch (field.kind) {
      case 'view':
      case 'measure':
      case 'dimension':
        return [{path: [...path, field.name], field}];
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

export function groupFieldItemsByPath(items: FieldItem[]): FieldGroupByPath[] {
  return Object.values(
    items.reduce((acc: Record<string, FieldGroupByPath>, current) => {
      const path = current.path.slice(0, -1);
      const pathKey = path.join(' > ');
      if (!acc[pathKey]) {
        acc[pathKey] = {pathKey, path, items: []};
      }
      acc[pathKey].items.push(current);
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

export const FIELD_KIND_TO_TITLE = {
  view: 'Views',
  measure: 'Measures',
  dimension: 'Dimensions',
} as const;
