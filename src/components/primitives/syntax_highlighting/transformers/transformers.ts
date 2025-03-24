import {ShikiTransformer} from 'shiki';
import lineSpacingTransformer, {LineSpacing} from './lineSpacingTransformer';
import lineNumberTransformer from './lineNumberTransformer';

export type TransformerOptions = {
  showLineNumbers: boolean;
  lineSpacing: LineSpacing;
};
export type GetTransformer = (
  options: TransformerOptions
) => ShikiTransformer | undefined;

const transformers: Array<GetTransformer> = [
  lineSpacingTransformer,
  lineNumberTransformer,
];

export default function getTransformers(
  options: TransformerOptions
): Array<ShikiTransformer> {
  return transformers.map(t => t(options)).filter(t => t !== undefined);
}
