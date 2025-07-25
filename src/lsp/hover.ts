/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as Monaco from '../components/utils/monaco_shim';
import {Annotation, Model} from '@malloydata/malloy';

import {COMPLETION_DOCS} from './completion_docs';
import {stubCompile, stubParse} from './stub_compile';
import {convertPosition, getModel} from './utils';

// TODO: export from Malloy
type DocumentReference = Exclude<ReturnType<Model['getReference']>, undefined>;

export async function provideHover(
  textModel: Monaco.editor.ITextModel,
  position: Monaco.Position,
  _token: Monaco.CancellationToken,
  _context?: Monaco.languages.HoverContext<Monaco.languages.Hover>
): Promise<Monaco.languages.Hover | null> {
  const modelDef = getModel(textModel.uri.toString());
  const malloy = textModel.getValue();
  const context = stubParse(modelDef, malloy).helpContext(
    convertPosition(position)
  );

  if (context?.token) {
    const name = context.token.replace(/:$/, '');

    if (name) {
      const value = COMPLETION_DOCS[context.type][name];
      if (value) {
        return {
          contents: [
            {
              value,
            },
          ],
        };
      } else {
        const model = await stubCompile(modelDef, malloy);
        const reference = model?.getReference(convertPosition(position));
        if (reference) {
          return getReferenceHover(reference);
        }
      }
    }
  }

  return null;
}

function getReferenceHover({text, definition}: DocumentReference) {
  const tags = annotationToTaglines(definition.annotation).join('');
  const markdown = `\`\`\`
${tags}${text}: ${definition.type}
\`\`\``;
  const contents: Monaco.IMarkdownString[] = [
    {
      value: markdown,
    },
  ];
  return {
    contents,
  };
}

type NoteArray = Annotation['notes'];

function annotationToTaglines(
  annotation: Annotation | undefined,
  prefix?: RegExp
): string[] {
  annotation ||= {};
  const tagLines = annotation.inherits
    ? annotationToTaglines(annotation.inherits, prefix)
    : [];
  function prefixed(na: NoteArray | undefined): string[] {
    const ret: string[] = [];
    for (const n of na || []) {
      if (prefix === undefined || n.text.match(prefix)) {
        ret.push(n.text);
      }
    }
    return ret;
  }
  return tagLines.concat(
    prefixed(annotation.blockNotes),
    prefixed(annotation.notes)
  );
}
