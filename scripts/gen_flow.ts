import {unstable_translateTSDefToFlowDef} from 'flow-api-translator';
import * as fs from 'fs';
import * as path from 'path';

const outDir = path.resolve('flow');
const inDir = path.resolve('dist/types');

const files = [
  'index.d.ts',
  'components/MalloyPreview.d.ts',
  'components/QueryPanel/QueryEditor.d.ts',
  'components/QueryPanel/QueryActionBar.d.ts',
  'components/RawPreview.d.ts',
  'components/SourcePanel/SourcePanel.d.ts',
];
const directories = [
  'components',
  'components/QueryPanel',
  'components/SourcePanel',
];

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
