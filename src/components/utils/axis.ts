import type {
  FieldInfo,
  FieldInfoWithDimension,
  Schema,
} from '@malloydata/malloy-interfaces';
import {
  ASTArrowQueryDefinition,
  ASTQuery,
} from '@malloydata/malloy-query-builder';

/**
 * Gets the computed primary axis from the root query. Roughly follows this logic:
 * - Find the first output field with the `# x` annotation
 * - Otherwise find the first output field with a time or date type'
 * - Otherwise, find the first output field
 */
export const getPrimaryAxis = (rootQuery: ASTQuery): FieldInfo | undefined => {
  const defintion = rootQuery.definition as ASTArrowQueryDefinition;
  const view = defintion?.view;
  const schema = view.getOutputSchema();
  return getPrimaryAxisFromSchema(schema);
};

export const getPrimaryAxisFromSchema = (
  schema: Schema
): FieldInfo | undefined => {
  let primaryAxisField: FieldInfo | undefined = undefined;
  primaryAxisField =
    findAxisFieldByAnnotation(schema.fields) ||
    findAxisFieldByType(schema.fields) ||
    findDefaultAxisField(schema.fields);

  return primaryAxisField;
};

const findAxisFieldByAnnotation = (
  fields: FieldInfo[]
): FieldInfo | undefined => {
  return fields.find(field => {
    if (
      field.kind === 'dimension' &&
      field.annotations &&
      field.annotations.find(annotation => annotation.value === '# x')
    ) {
      return true;
    }

    return false;
  });
};

const findAxisFieldByType = (fields: FieldInfo[]): FieldInfo | undefined => {
  return fields.find(field => {
    if (field.kind === 'dimension') {
      const dimension = field as FieldInfoWithDimension;
      if (
        dimension.type.kind === 'date_type' ||
        dimension.type.kind === 'timestamp_type'
      ) {
        return true;
      }
    }
    return false;
  });
};

// Finds the first available dimension fieod.
const findDefaultAxisField = (fields: FieldInfo[]): FieldInfo | undefined => {
  return fields.find(field => {
    if (field.kind === 'dimension') {
      return true;
    }
    return false;
  });
};
