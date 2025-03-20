import {Tag} from '@malloydata/malloy-tag';
import LineChartIcon from '../../assets/visualizations/viz_line.svg?react';
import ListIcon from '../../assets/visualizations/viz_list.svg?react';
import ListDetailIcon from '../../assets/visualizations/viz_list_detail.svg?react';
import BarChartIcon from '../../assets/visualizations/viz_list_detail.svg?react';


export function hasRenderTag(annotations: Array<Malloy.Annotation>)

// const VIEW_RENDER_TAG_MAP = [
//   list : ,
//   'list_detail',
//   'bar_chart',
//   'line_chart',
//   'dashboard',
//   'scatter_chart',
//   'shape_map',
//   'segment_map',
// ];

function renderTagFromAnnotations(annotations: Array<Malloy.Annotation>) {
    const tag = tagFromAnnotations(annotations);
    return Object.keys(tag.properties ?? {})
      .reverse()
      .filter(t => t in VIEW_RENDER_TAG_MAP)
      .at(0);
  }
  
  function tagFromAnnotations(
    annotations: Malloy.Annotation[] | undefined,
    prefix = '# '
  ) {
    const tagLines =
      annotations?.map(a => a.value)?.filter(l => l.startsWith(prefix)) ?? [];
    return Tag.fromTagLines(tagLines).tag ?? new Tag();
  }
  
  const VIEW_RENDER_TAG_MAP = [
    list : ,
    'list_detail',
    'bar_chart',
    'line_chart',
    'dashboard',
    'scatter_chart',
    'shape_map',
    'segment_map',
  ];