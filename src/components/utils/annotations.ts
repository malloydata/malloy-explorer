import * as Malloy from '@malloydata/malloy-interfaces';

const DESCRIPTION_ANNOTATION_PREFIX: string = '#" ';

export const getDescriptionAnnotation = (
  annotations: Array<Malloy.Annotation>
): string | undefined => {
  const descriptions = annotations
    .filter(a => a.value.startsWith(DESCRIPTION_ANNOTATION_PREFIX))
    .map(a => a.value.slice(DESCRIPTION_ANNOTATION_PREFIX.length).trim());

  if (!descriptions.length) {
    return undefined;
  }

  return descriptions.join('\n');
};
