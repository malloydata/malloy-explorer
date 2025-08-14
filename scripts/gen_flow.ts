import {unstable_translateTSDefToFlowDef} from 'flow-api-translator';
import * as fs from 'fs';
import * as path from 'path';

const outDir = path.resolve('@flowtypes');
const inDir = path.resolve('dist/types');

const files = [
  'index.d.ts',
  'components/MalloyExplorerProvider.d.ts',
  'components/QueryPanel/QueryPanel.d.ts',
  'components/ResultPanel/ResultPanel.d.ts',
  'components/ResultPanel/SubmittedQuery.d.ts',
  'components/SourcePanel/SourcePanel.d.ts',
  'components/ResizableCollapsiblePanel.d.ts',
  'components/CodeEditor/index.d.ts',
  'components/CodeEditor/CodeEditor.d.ts',
  'components/CodeEditor/CodeEditorContext.d.ts',
];

async function go() {
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, {recursive: true});
  }

  for (const file of files) {
    const inFile = path.resolve(inDir, file);
    const outFile = path.resolve(outDir, file.replace('.d.ts', '.flow.js'));
    const outFileDir = path.dirname(outFile);
    console.log(`Generating flow types for file ${file}`);
    const contents = fs.readFileSync(inFile, 'utf8');
    const flow = await unstable_translateTSDefToFlowDef(contents);
    if (!fs.existsSync(outFileDir)) {
      fs.mkdirSync(outFileDir, {recursive: true});
    }
    fs.writeFileSync(outFile, flow);
  }
}

go();
