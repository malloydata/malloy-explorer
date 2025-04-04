import * as Malloy from '@malloydata/malloy-interfaces';
import {
  ASTLimitViewOperation,
  ASTNestViewOperation,
  ASTOrderByViewOperation,
  ASTQuery,
  ASTSegmentViewDefinition,
} from '@malloydata/malloy-query-builder';

export function segmentHasLimit(segment: ASTSegmentViewDefinition) {
  return (
    segment.operations.items.find(
      operation => operation instanceof ASTLimitViewOperation
    ) !== undefined
  );
}

export function segmentHasOrderBy(
  segment: ASTSegmentViewDefinition,
  name: string
) {
  return (
    segment.operations.items.find(
      operation =>
        operation instanceof ASTOrderByViewOperation && operation.name === name
    ) !== undefined
  );
}

export function segmentNestNo(
  segment: ASTSegmentViewDefinition,
  name?: string
) {
  return segment.operations.items.reduce((acc, operation) => {
    if (operation instanceof ASTNestViewOperation) {
      if (name) {
        if (operation.name === name) {
          do {
            acc += 1;
          } while (segment.hasFieldNamed(`${name} ${acc}`));
        }
      } else {
        return acc + 1;
      }
    }
    return acc;
  }, 1);
}

export function addGroupBy(
  rootQuery: ASTQuery,
  segment: ASTSegmentViewDefinition,
  field: Malloy.FieldInfo,
  path: string[],
  setQuery?: (query: Malloy.Query) => void
): void {
  segment.addGroupBy(field.name, path);
  if (!segmentHasLimit(segment)) {
    segment.setLimit(10);
  }
  segment.addOrderBy(field.name);
  setQuery?.(rootQuery.build());
}
