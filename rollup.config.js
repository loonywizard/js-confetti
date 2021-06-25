import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default [
  // ES
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/es/index.js', format: 'es',
    },
    plugins: [
      typescript(),
      babel({
        extensions: ['.ts'],
      }),
    ]
  },

  // UMD
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/js-confetti.min.js',
      format: 'umd',
      name: 'jsConfetti',
      indent: false,
    },
    plugins: [
      typescript(),
      babel({
        extensions: ['.ts'],
        exclude: 'node_modules/**',
      }),
      terser(),
    ],
  },

  // IIFE
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/js-confetti.browser.js',
      format: 'iife',
      name: 'JSConfetti',
    },
    plugins: [
      typescript(),
      babel({
        extensions: ['.ts'],
        exclude: 'node_modules/**',
      }),
      terser(),
    ],
  },
]