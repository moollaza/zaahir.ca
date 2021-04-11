const sveltePreprocess = require('svelte-preprocess');
// const static = require('@sveltejs/adapter-static');
const vercel = require('@sveltejs/adapter-vercel');
const pkg = require('./package.json');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	preprocess: [
		sveltePreprocess({
			defaults: {
				style: 'postcss'
			},
			postcss: true
		})
	],
	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		adapter: vercel(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {})
			}
		}
	}
};
