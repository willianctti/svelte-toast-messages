import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import sveltePreprocess from 'svelte-preprocess';

export default {
  input: 'src/lib/index.ts',
  output: {
    format: 'es',
    file: 'dist/index.js'
  },
  external: ['svelte', 'svelte/internal'],
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
      compilerOptions: {
        dev: false
      },
      emitCss: false
    }),
    resolve(),
    commonjs(),
    typescript({
      sourceMap: true,
      declaration: true,
      declarationDir: './dist',
      rootDir: './src/lib'
    })
  ]
};