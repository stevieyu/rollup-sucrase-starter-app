import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import sucrase from '@rollup/plugin-sucrase';

// `npm run build` -> `isProd` is true
// `npm run dev` -> `isProd` is false
const isProd = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		file: 'public/bundle.js',
		format: 'es', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true
	},
	plugins: [
		replace({
			values: {
				'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
			},
			preventAssignment: true,
		}),
		resolve({
			extensions: ['.js','.jsx', '.ts', '.tsx']
		}), // tells Rollup how to find date-fns in node_modules
		commonjs({
			include: /node_modules/,
		}),
		sucrase({
			exclude: ['node_modules/**'],
			transforms: ['typescript', 'jsx', 'react-hot-loader']
		}),
		isProd && terser() // minify, but only in production
	]
};
