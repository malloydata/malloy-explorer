import {Element} from 'hast';
import {GetTransformer, TransformerOptions} from './transformers';

const LINE_SPACING_MAP = {
  single: '1em',
  double: '2em',
};

export type LineSpacing = keyof typeof LINE_SPACING_MAP;

const getLineSpacingTransformer: GetTransformer = ({
  lineSpacing,
}: TransformerOptions) => {
  return {
    line(node: Element) {
      const styled = [
        ...(Array.isArray(node.properties.style)
          ? node.properties.style
          : typeof node.properties.style === 'string'
            ? [node.properties.style]
            : []),
      ];

      styled.push(`line-height: ${LINE_SPACING_MAP[lineSpacing]};`);
      node.properties.style = styled;
    },
  };
};

export default getLineSpacingTransformer;
