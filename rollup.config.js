import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import sucrase from '@rollup/plugin-sucrase';
import html from '@web/rollup-plugin-html'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/index.html',
	output: {
		entryFileNames: 'bundle/main.[hash].js',
		chunkFileNames: 'bundle/chunk.[hash].[ext]',
		format: 'esm', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true,
		dir: 'public'
	},
	external: [
		'https://openfpcdn.io/fingerprintjs/v3'
	],
	plugins: [
		commonjs(), // converts date-fns to ES modules
		resolve({
			extensions: ['.js','.jsx', '.ts', '.tsx']
		}), // tells Rollup how to find date-fns in node_modules
		sucrase({
			exclude: ['node_modules/**'],
			transforms: ['typescript', 'jsx']
		}),
		production && terser(), // minify, but only in production
		html(),
	]
};
