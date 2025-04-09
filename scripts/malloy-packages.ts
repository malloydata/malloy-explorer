#!/usr/bin/env ts-node
import packageJson from '../package.json';

const deps = Object.keys(packageJson.dependencies);
const devDeps = Object.keys(packageJson.devDependencies);
const peerDeps = Object.keys(packageJson.peerDependencies);

let malloyPackages = [...deps, ...devDeps, ...peerDeps].filter(name =>
  name.startsWith('@malloydata')
);

if (process.argv.length === 3) {
  malloyPackages = malloyPackages.map(
    packageJson => `${packageJson}@${process.argv[2]}`
  );
}
console.log(malloyPackages.join(' '));
