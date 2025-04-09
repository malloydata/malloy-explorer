import {defineConfig} from 'vite';
import {resolve} from 'path';

import replace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import babelConfig from './babel.config.mjs';

export default defineConfig({
  plugins: [
    svgr(),
    react({babel: babelConfig}),
    replace({
      'Object.defineProperty(exports, "__esModule", { value: true });':
        'Object.defineProperty(typeof exports !== \'undefined\' ? exports : {}, "__esModule", { value: true });',
      delimiters: ['\n', '\n'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: format => {
        if (format === 'cjs') return 'cjs/[name].cjs';
        return 'esm/[name].js';
      },
      name: 'index',
    },
    rollupOptions: {
      preserveSymlinks: true,
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@malloydata/malloy-tag',
        '@malloydata/malloy-filter',
        '@malloydata/malloy-interfaces',
        '@malloydata/malloy-query-builder',
        '@malloydata/render',
        '@malloydata/render/webcomponent',
      ],
      output: {
        manualChunks: _id => {
          return 'index';
        },
      },
    },
    minify: false,
    sourcemap: true,
  },
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    force: true,
    include: [
      '@malloydata/render',
      '@malloydata/malloy-tag',
      '@malloydata/malloy-filter',
      '@malloydata/malloy-interfaces',
      '@malloydata/malloy-query-builder',
      '@malloydata/render/webcomponent',
    ],
  },
});
