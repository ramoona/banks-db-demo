import postcss from 'rollup-plugin-postcss';
import path from 'path';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pluginJSON from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

import autoprefixer from 'autoprefixer';
import normalize from 'postcss-normalize';
import nested from 'postcss-nested';
import contrast from 'postcss-contrast';

export default {
  input: 'src/index.ts',
  output: { file: 'dist/index.min.js', format: 'iife', sourcemap: true },
  plugins: [
    resolve(),
    commonjs(),
    pluginJSON(),
    typescript(),
    postcss({
      plugins: [autoprefixer, normalize, nested, contrast],
      extract: path.resolve('dist/styles.css')
    })
  ]
};
