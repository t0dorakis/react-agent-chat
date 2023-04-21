// rollup.config.js
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import terser from '@rollup/plugin-terser'

export default {
  input: './src/react-agent-chat.tsx',
  output: [
       {
      name: 'react-agent-chat',
      file: pkg.browser,
      format: 'umd',
      extend: true,
      globals: { react: 'React' },
      exports: "named"
    },
    {
      file: pkg.module,
      format: 'es',
      globals: { react: 'React' },
      exports: "named"
    },
    {
      file: pkg.main,
      format: 'cjs',
      globals: { react: 'React' },
      exports: "named"
    },
  ],

  // targets: [
  //   {
  //     dest: pkg.main,
  //     format: 'cjs',
  //     // exports: "named"
  //   },
  //   {
  //     dest: pkg.module,
  //     format: 'es',
  //     // exports: "named"
  //   },
  //   {
  //     dest: pkg.browser,
  //     format: 'umd',
  //     // exports: "named"
  //   }
  // ],

  plugins: [
    typescript(),
    peerDepsExternal(),
    terser(),
    postcss({
      extract: true,
      modules: true,
      use: ['sass'],
    }),
    babel({ exclude: 'node_modules/**' }),
    resolve(),
    commonjs(),
  ],

  external: ['react', 'react-dom'],
};