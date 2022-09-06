import resolve from '@rollup/plugin-node-resolve';
//import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import sucrase from '@rollup/plugin-sucrase';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		file: 'public/bundle.js',
		format: 'es', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true
	},
	plugins: [
		resolve({
			extensions: ['.js', '.ts']
		}), // tells Rollup how to find date-fns in node_modules
		sucrase({
			exclude: ['node_modules/**'],
			transforms: ['typescript']
		}),
		//commonjs(), // converts date-fns to ES modules
		production && terser() // minify, but only in production
	]
};
