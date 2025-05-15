/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Malloy from '@malloydata/malloy-interfaces';

import {
  addAggregate,
  addFilter,
  addGroupBy,
  addNest,
  addOrderBy,
  getSegmentIfPresent,
  segmentHasLimit,
  segmentHasOrderBy,
  segmentHasOrderBySourceField,
  segmentNestNo,
} from './segment';
import {modelInfo} from '../../test/model';
import {
  ASTAggregateViewOperation,
  ASTArrowQueryDefinition,
  ASTGroupByViewOperation,
  ASTHavingViewOperation,
  ASTNestViewOperation,
  ASTOrderByViewOperation,
  ASTQuery,
  ASTTimeTruncationExpression,
  ASTWhereViewOperation,
} from '@malloydata/malloy-query-builder';
import {
  expectDimension,
  expectInstanceOf,
  expectMeasure,
  expectView,
} from '../../test/utils';

const sourceInfo = modelInfo.entries.at(-1) as Malloy.SourceInfo;

describe('segment utils', () => {
  let query: ASTQuery;
  let definition: ASTArrowQueryDefinition;

  beforeEach(() => {
    query = new ASTQuery({
      query: undefined,
      source: sourceInfo,
    });
    definition = query.definition as ASTArrowQueryDefinition;
  });

  describe('segmentHasLimit', () => {
    it('is false when there is no limit', () => {
      const segment = query.getOrAddDefaultSegment();
      expect(segmentHasLimit(segment)).toBe(false);
    });

    it('is true when there is a limit', () => {
      const segment = query.getOrAddDefaultSegment();
      segment.setLimit(10);
      expect(segmentHasLimit(segment)).toBe(true);
    });
  });

  describe('segmentHasOrderBy', () => {
    it('is false when there are no order_bys', () => {
      const segment = query.getOrAddDefaultSegment();
      expect(segmentHasOrderBy(segment, 'measure_a')).toBe(false);
    });

    it('is false when there is no order_by with a given name', () => {
      const segment = query.getOrAddDefaultSegment();
      segment.addGroupBy('string_dimension');
      segment.addOrderBy('string_dimension');
      expect(segmentHasOrderBy(segment, 'measure_a')).toBe(false);
    });

    it('is true when there is an order_by measure with a given name', () => {
      const segment = query.getOrAddDefaultSegment();
      segment.addAggregate('measure_a');
      segment.addOrderBy('measure_a');
      expect(segmentHasOrderBy(segment, 'measure_a')).toBe(true);
    });

    it('is true when there is an order_by dimension with a given name', () => {
      const segment = query.getOrAddDefaultSegment();
      segment.addGroupBy('string_dimension');
      segment.addOrderBy('string_dimension');
      expect(segmentHasOrderBy(segment, 'string_dimension')).toBe(true);
    });
  });

  describe('segmentHasOrderBySourceField', () => {
    it('resolves items when the source field has a path', () => {
      const segment = query.getOrAddDefaultSegment();
      segment.addGroupBy('string_dimension');
      segment.addGroupBy(
        'string_dimension',
        ['join_a'],
        'join_a string_dimension'
      );
      segment.addOrderBy('join_a string_dimension');
      expect(
        segmentHasOrderBySourceField(segment, ['join_a'], 'string_dimension')
      ).toBe(true);
    });
  });

  describe('segmentNestNo', () => {
    it('is 1 when there are no nests', () => {
      const segment = definition.getOrAddDefaultSegment();
      expect(segmentNestNo(segment)).toBe(1);
    });

    it('is not 1 when there are nests', () => {
      const segment = definition.getOrAddDefaultSegment();
      segment.addEmptyNest('foo');
      segment.addEmptyNest('bar');
      expect(segmentNestNo(segment)).toBe(3);
    });

    it('is cam take a name', () => {
      const segment = definition.getOrAddDefaultSegment();
      segment.addEmptyNest('foo');
      segment.addEmptyNest('bar');
      expect(segmentNestNo(segment, 'foo')).toBe(2);
    });
  });

  describe('addGroupBy', () => {
    it('adds a group_by', () => {
      const dimension = expectDimension(sourceInfo.schema, 'string_dimension');
      addGroupBy(definition, dimension, []);
      const segment = getSegmentIfPresent(definition);
      const groupByOp = expectInstanceOf(
        segment?.operations.last,
        ASTGroupByViewOperation
      );
      expect(groupByOp.name).toEqual('string_dimension');
    });

    it('adds a group_by and dedupes names', () => {
      query.setView('view_a'); // Creates new query definition
      definition = expectInstanceOf(query.definition, ASTArrowQueryDefinition);
      const dimension = expectDimension(sourceInfo.schema, 'string_dimension');
      addGroupBy(definition, dimension, []);
      const segment = getSegmentIfPresent(definition);
      const groupByOp = expectInstanceOf(
        segment?.operations.last,
        ASTGroupByViewOperation
      );
      expect(groupByOp.name).toEqual('string_dimension 2');
    });

    it('grouping by date field has truncation', () => {
      query.setView('view_a'); // Creates new query definition
      definition = expectInstanceOf(query.definition, ASTArrowQueryDefinition);
      const dimension = expectDimension(sourceInfo.schema, 'date_dimension');
      addGroupBy(definition, dimension, []);
      const segment = getSegmentIfPresent(definition);
      const groupByOp = expectInstanceOf(
        segment?.operations.last,
        ASTGroupByViewOperation
      );
      expect(groupByOp.name).toEqual('date_dimension');
      const expression = expectInstanceOf(
        groupByOp.field.expression,
        ASTTimeTruncationExpression
      );
      expect(expression.truncation).toEqual('day');
    });

    it('grouping by timestamp field has truncation', () => {
      query.setView('view_a'); // Creates new query definition
      definition = expectInstanceOf(query.definition, ASTArrowQueryDefinition);
      const dimension = expectDimension(
        sourceInfo.schema,
        'timestamp_dimension'
      );
      addGroupBy(definition, dimension, []);
      const segment = getSegmentIfPresent(definition);
      const groupByOp = expectInstanceOf(
        segment?.operations.last,
        ASTGroupByViewOperation
      );
      expect(groupByOp.name).toEqual('timestamp_dimension');
      const expression = expectInstanceOf(
        groupByOp.field.expression,
        ASTTimeTruncationExpression
      );
      expect(expression.truncation).toEqual('second');
    });
  });

  describe('addAggregate', () => {
    it('adds an aggregate', () => {
      const measure = expectMeasure(sourceInfo.schema, 'measure_a');
      expect(measure.kind).toBe('measure');
      addAggregate(definition, measure, []);
      const segment = getSegmentIfPresent(definition);
      const aggregateOp = expectInstanceOf(
        segment?.operations.last,
        ASTAggregateViewOperation
      );
      expect(aggregateOp.name).toEqual('measure_a');
    });

    it('adds an aggregate and dedupes names', () => {
      query.setView('view_a'); // Creates new query definition
      const definition = expectInstanceOf(
        query.definition,
        ASTArrowQueryDefinition
      );
      const measure = expectMeasure(sourceInfo.schema, 'measure_a');
      addAggregate(definition, measure, []);
      const segment = getSegmentIfPresent(definition);
      const aggregateOp = expectInstanceOf(
        segment?.operations.last,
        ASTAggregateViewOperation
      );
      expect(aggregateOp.name).toEqual('measure_a 2');
    });
  });

  describe('addNest', () => {
    it('adds a nest', () => {
      const view = expectView(sourceInfo.schema, 'view_a');
      addNest(definition, view);
      const segment = getSegmentIfPresent(definition);
      expect(segment?.operations.length).toBe(1);
      const viewOp = expectInstanceOf(
        segment?.operations.last,
        ASTNestViewOperation
      );
      expect(viewOp.name).toBe('view_a');
    });

    it('adds a duplicate nest with renaming', () => {
      const view = expectView(sourceInfo.schema, 'view_a');
      addNest(definition, view);
      addNest(definition, view);
      const segment = getSegmentIfPresent(definition);
      expect(segment?.operations.length).toBe(2);
      const viewOp = expectInstanceOf(
        segment?.operations.last,
        ASTNestViewOperation
      );
      expect(viewOp.name).toBe('view_a 2');
    });
  });

  describe('addOrderBy', () => {
    it('adds an dimension order_by', () => {
      const dimension = expectDimension(sourceInfo.schema, 'string_dimension');
      addGroupBy(definition, dimension, []);
      addOrderBy(definition, dimension);
      const segment = getSegmentIfPresent(definition);
      expect(segment?.operations.length).toBe(2);
      const orderByOp = expectInstanceOf(
        segment?.operations.last,
        ASTOrderByViewOperation
      );
      expect(orderByOp.name).toEqual('string_dimension');
    });

    it('adds a measure order_by', () => {
      const measure = expectMeasure(sourceInfo.schema, 'measure_a');
      addAggregate(definition, measure, []);
      addOrderBy(definition, measure);
      const segment = getSegmentIfPresent(definition);
      expect(segment?.operations.length).toBe(2);
      const orderByOp = expectInstanceOf(
        segment?.operations.last,
        ASTOrderByViewOperation
      );
      expect(orderByOp.name).toEqual('measure_a');
    });
  });

  describe('addFilter', () => {
    it('adds a where for a dimension', () => {
      const dimension = expectDimension(sourceInfo.schema, 'string_dimension');
      addFilter(definition, dimension, [], {
        kind: 'string',
        parsed: null,
      });
      const segment = getSegmentIfPresent(definition);
      expect(segment?.operations.length).toBe(1);
      expectInstanceOf(segment?.operations.last, ASTWhereViewOperation);
    });

    it('adds a having for a measure', () => {
      const measure = expectMeasure(sourceInfo.schema, 'measure_a');
      addFilter(definition, measure, [], {
        kind: 'number',
        parsed: null,
      });
      const segment = getSegmentIfPresent(definition);
      expect(segment?.operations.length).toBe(1);
      expectInstanceOf(segment?.operations.last, ASTHavingViewOperation);
    });
  });

  describe('getSegmentIfPresent', () => {
    it('returns undefined if no segment', () => {
      const stableQuery: Malloy.Query = {
        definition: {
          kind: 'arrow',
          source: {
            kind: 'source_reference',
            name: 'source_a',
          },
          view: {
            kind: 'view_reference',
            name: 'view_a',
          },
        },
      };
      const query = new ASTQuery({query: stableQuery, source: sourceInfo});
      definition = expectInstanceOf(query.definition, ASTArrowQueryDefinition);
      expect(getSegmentIfPresent(definition)).toBe(undefined);
    });

    it('returns as segment if one has been added segment', () => {
      const segment = query.getOrAddDefaultSegment();
      definition = expectInstanceOf(query.definition, ASTArrowQueryDefinition);
      expect(getSegmentIfPresent(definition)).toEqual(segment);
    });
  });
});
