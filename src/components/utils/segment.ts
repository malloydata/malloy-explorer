import {
  ASTLimitViewOperation,
  ASTOrderByViewOperation,
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

export function segmentNestNo(segment: ASTSegmentViewDefinition) {
  return segment.operations.items.reduce((acc, operation) => {
    return operation.kind === 'nest' ? acc + 1 : acc;
  }, 1);
}
