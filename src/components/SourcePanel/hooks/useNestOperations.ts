import {
  ASTArrowQueryDefinition,
  ASTArrowViewDefinition,
  ASTNestViewOperation,
  ASTQuery,
  ASTRefinementViewDefinition,
  ASTSegmentViewDefinition,
  ASTViewDefinition,
} from '@malloydata/malloy-query-builder';
import {useMemo} from 'react';

type NestOperation = {
  name: string;
  view: ASTViewDefinition;
};

/**
 * Retrieves nest view operations from the root query.
 */
export function useNestOperations(rootQuery?: ASTQuery): NestOperation[] {
  const nestOperations = useMemo(() => {
    if (rootQuery) {
      const queryDef = rootQuery.definition;

      if (queryDef instanceof ASTArrowQueryDefinition) {
        return extractNestOperations(queryDef.view);
      }
    }

    return [];
  }, [rootQuery]);

  return nestOperations;
}

const extractNestOperations = (
  view: ASTViewDefinition,
  nestOperations: NestOperation[] = []
): NestOperation[] => {
  if (view instanceof ASTArrowViewDefinition) {
    return extractNestOperations(view.view, nestOperations);
  } else if (view instanceof ASTSegmentViewDefinition) {
    view.operations.items
      .filter(operation => operation instanceof ASTNestViewOperation)
      .forEach(operation => {
        const nestView = operation.view.definition;
        nestOperations.push({
          name: operation.name,
          view: nestView,
        });
        extractNestOperations(nestView, nestOperations);
      });

    return nestOperations;
  } else if (view instanceof ASTRefinementViewDefinition) {
    return extractNestOperations(view.refinement, nestOperations);
  }

  return nestOperations;
};
