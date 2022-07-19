import path from 'path';
import {babel} from '@rollup/plugin-babel';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import {terser} from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';

const input = path.join(__dirname, 'src/index.ts');

const bundles = [
  {
    input,
    output: {
      file: path.join(
        __dirname,
        'dist/floating-ui.react-dom-interactions.esm.js'
      ),
      format: 'esm',
    },
  },
  {
    input,
    output: {
      file: path.join(
        __dirname,
        'dist/floating-ui.react-dom-interactions.esm.min.js'
      ),
      format: 'esm',
    },
  },
  {
    input,
    output: {
      name: 'FloatingUIReactDOM',
      file: path.join(
        __dirname,
        'dist/floating-ui.react-dom-interactions.umd.js'
      ),
      format: 'umd',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'aria-hidden': 'ariaHidden',
        '@floating-ui/core': 'FloatingUICore',
        '@floating-ui/dom': 'FloatingUIDOM',
        '@floating-ui/react-dom': 'FloatingUIReactDOM',
      },
    },
  },
  {
    input,
    output: {
      name: 'FloatingUIReactDOM',
      file: path.join(
        __dirname,
        'dist/floating-ui.react-dom-interactions.umd.min.js'
      ),
      format: 'umd',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'aria-hidden': 'ariaHidden',
        '@floating-ui/core': 'FloatingUICore',
        '@floating-ui/dom': 'FloatingUIDOM',
        '@floating-ui/react-dom': 'FloatingUIReactDOM',
      },
    },
  },
  {
    input,
    output: {
      file: path.join(__dirname, 'dist/floating-ui.react-dom-interactions.mjs'),
      format: 'esm',
    },
  },
];

export default bundles.map(({input, output}) => ({
  input,
  output,
  external: [
    'react',
    'react-dom',
    '@floating-ui/core',
    '@floating-ui/dom',
    '@floating-ui/react-dom',
  ].concat(output.format !== 'umd' ? ['point-in-polygon', 'aria-hidden'] : []),
  plugins: [
    commonjs(),
    nodeResolve({extensions: ['.ts', '.tsx']}),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts', '.tsx'],
      plugins: ['annotate-pure-calls'],
    }),
    replace({
      __DEV__: output.file.includes('.min.')
        ? 'false'
        : 'process.env.NODE_ENV !== "production"',
      preventAssignment: true,
    }),
    output.file.includes('.min.') && terser(),
  ],
}));
