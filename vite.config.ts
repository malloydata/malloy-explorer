import {defineConfig} from 'vite';
import {resolve} from 'path';

import replace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import stylex from '@stylexjs/rollup-plugin';

export default defineConfig({
  plugins: [
    stylex({}),
    svgr(),
    react({jsxRuntime: 'automatic'}),
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
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@malloydata/malloy',
        '@malloydata/render',
        '@malloydata/malloy-tag',
        '@malloydata/malloy-filter',
        '@malloydata/malloy-interfaces',
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
});
