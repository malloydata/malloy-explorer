/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ChevronDown from '../../../assets/chevrons/chevron_down.svg?react';
import ChevronLeft from '../../../assets/chevrons/chevron_left.svg?react';
import ChevronRight from '../../../assets/chevrons/chevron_right.svg?react';
import Checkmark from '../../../assets/ui/checkmark.svg?react';
import Clear from '../../../assets/refinements/clear.svg?react';
import Copy from '../../../assets/ui/copy.svg?react';
import Insert from '../../../assets/refinements/insert.svg?react';
import AggregateIcon from '../../../assets/refinements/insert_measure.svg?react';
import Filter from '../../../assets/refinements/insert_filter.svg?react';
import GroupByIcon from '../../../assets/refinements/insert_group_by.svg?react';
import LimitIcon from '../../../assets/refinements/insert_limit.svg?react';
import InsertNest from '../../../assets/refinements/insert_nest.svg?react';
import OrderByIcon from '../../../assets/refinements/insert_order_by.svg?react';
import ManyToOneIcon from '../../../assets/types/type-icon-many-to-one.svg?react';
import OneToManyIcon from '../../../assets/types/type-icon-one-to-many.svg?react';
import OneToOneIcon from '../../../assets/types/type-icon-one-to-one.svg?react';
import TypeIconDatabase from '../../../assets/types/type-icon-database.svg?react';
import TypeIconNumberMeasure from '../../../assets/types/type-icon-number-measure.svg?react';
import TypeIconProjection from '../../../assets/types/type-icon-projection.svg?react';
import TypeIconString from '../../../assets/types/type-icon-string.svg?react';
import TypeIconArray from '../../../assets/types/type-icon-array.svg?react';
import TypeIconBoolean from '../../../assets/types/type-icon-on-off.svg?react';
import TypeIconDate from '../../../assets/types/type-icon-date.svg?react';
import TypeIconJson from '../../../assets/types/type-icon-json.svg?react';
import TypeIconNumber from '../../../assets/types/type-icon-number.svg?react';
import TypeIconQuery from '../../../assets/types/type-icon-query.svg?react';
import TypeIconQueryFilled from '../../../assets/types/type-icon-query-filled.svg?react';
import TypeIconSqlNative from '../../../assets/types/type-icon-sql-native.svg?react';
import Meatballs from '../../../assets/ui/meatballs.svg?react';
import PlayIcon from '../../../assets/ui/play.svg?react';
import RadioChecked from '../assets/radio_checked.svg?react';
import RadioUnchecked from '../assets/radio_unchecked.svg?react';
import Warning from '../../../assets/ui/warning.svg?react';
import CheckCircle from '../../../assets/ui/check_circle.svg?react';
import Gear from '../../../assets/ui/gear.svg?react';
import Info from '../../../assets/ui/info.svg?react';
import Error from '../../../assets/ui/error.svg?react';
import Refresh from '../../../assets/ui/refresh.svg?react';
import SidebarCollapse from '../../../assets/ui/sidebar_collapse.svg?react';
import FilterSliders from '../../../assets/ui/filter-sliders.svg?react';

import VizBarChar from '../../../assets/visualizations/viz_bar_chart.svg?react';
import VizBoolean from '../../../assets/visualizations/viz_boolean.svg?react';
import VizColumnChart from '../../../assets/visualizations/viz_column_chart.svg?react';
import VizCurrency from '../../../assets/visualizations/viz_currency.svg?react';
import VizDashboard from '../../../assets/visualizations/viz_dashboard.svg?react';
import VizImage from '../../../assets/visualizations/viz_image.svg?react';
import VizJson from '../../../assets/visualizations/viz_json.svg?react';
import VizLine from '../../../assets/visualizations/viz_line.svg?react';
import VizLink from '../../../assets/visualizations/viz_link.svg?react';
import VizList from '../../../assets/visualizations/viz_list.svg?react';
import VizListDetail from '../../../assets/visualizations/viz_list_detail.svg?react';
import VizMapPoints from '../../../assets/visualizations/viz_map_points.svg?react';
import VizMapSegment from '../../../assets/visualizations/viz_map_segment.svg?react';
import VizMapShape from '../../../assets/visualizations/viz_map_shape.svg?react';
import VizNumber from '../../../assets/visualizations/viz_number.svg?react';
import VizPercent from '../../../assets/visualizations/viz_percent.svg?react';
import VizScatter from '../../../assets/visualizations/viz_scatter.svg?react';
import VizSparkline from '../../../assets/visualizations/viz_sparkline.svg?react';
import VizTable from '../../../assets/visualizations/viz_table.svg?react';
import VizText from '../../../assets/visualizations/viz_text.svg?react';
import VizTime from '../../../assets/visualizations/viz_time.svg?react';

import Search from '../assets/search.svg?react';

export const ICON_MAP = {
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  clear: Clear,
  meatballs: Meatballs,
  play: PlayIcon,
  copy: Copy,
  checkmark: Checkmark,
  radioChecked: RadioChecked,
  radioUnchecked: RadioUnchecked,
  warning: Warning,
  check_circle: CheckCircle,
  gear: Gear,
  info: Info,
  error: Error,
  refresh: Refresh,
  sidebarCollapse: SidebarCollapse,
  filterSliders: FilterSliders,

  // Operations
  aggregate: AggregateIcon,
  dimension: TypeIconString,
  filter: Filter,
  groupBy: GroupByIcon,
  insert: Insert,
  limit: LimitIcon,
  orderBy: OrderByIcon,
  measure: TypeIconNumberMeasure,
  nest: InsertNest,

  // Types
  array: TypeIconArray,
  boolean: TypeIconBoolean,
  database: TypeIconDatabase,
  date: TypeIconDate,
  json: TypeIconJson,
  number: TypeIconNumber,
  query: TypeIconQuery,
  search: Search,
  sql_native: TypeIconSqlNative,
  string: TypeIconString,
  view: TypeIconProjection,
  view_filled: TypeIconQueryFilled,

  // Joins
  many_to_one: ManyToOneIcon,
  one_to_many: OneToManyIcon,
  one_to_one: OneToOneIcon,

  // Visualizations
  viz_bar_chart: VizBarChar,
  viz_bar: VizBarChar,
  viz_boolean: VizBoolean,
  viz_bytes: VizNumber,
  viz_cartesian_chart: VizLine,
  viz_column_chart: VizColumnChart,
  viz_currency: VizCurrency,
  viz_dashboard: VizDashboard,
  viz_image: VizImage,
  viz_json: VizJson,
  viz_line_chart: VizLine,
  viz_line: VizLine,
  viz_link: VizLink,
  viz_list: VizList,
  viz_list_detail: VizListDetail,
  viz_point_map: VizMapPoints,
  viz_segment_map: VizMapSegment,
  viz_shape_map: VizMapShape,
  viz_number: VizNumber,
  viz_percent: VizPercent,
  viz_scatter_chart: VizScatter,
  viz_single_value: TypeIconNumberMeasure,
  viz_sparkline: VizSparkline,
  viz_table: VizTable,
  viz_text: VizText,
  viz_time: VizTime,
  viz_url: VizLink,
  viz_vega: VizLine,
} as const;

export type IconType = keyof typeof ICON_MAP;
