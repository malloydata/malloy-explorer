import {unstable_translateTSDefToFlowDef} from 'flow-api-translator';
import * as fs from 'fs';
import * as path from 'path';

const outDir = path.resolve('flow');
const inDir = path.resolve('dist/types');

const files = [
  'index.d.ts',
  'components/MalloyPreview.d.ts',
  'components/QueryEditor.d.ts',
  'components/RawPreview.d.ts',
  'contexts/QueryEditorContext.d.ts',
];
const directories = ['components', 'contexts'];

async function go() {
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, {recursive: true});
  }
  for (const directory of directories) {
    fs.mkdirSync(path.resolve(outDir, directory), {recursive: true});
  }
  await Promise.all(
    files.map(async file => {
      const inFile = path.resolve(inDir, file);
      const outFile = path.resolve(outDir, file.replace('.d.ts', '.flow.js'));
      console.log(`Generating flow types for file ${file}`);
      const contents = fs.readFileSync(inFile, 'utf8');
      const flow = await unstable_translateTSDefToFlowDef(contents);
      await fs.promises.writeFile(outFile, flow);
    })
  );
}

go();
