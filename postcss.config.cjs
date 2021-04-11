const cssnano = require('cssnano');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

module.exports = {
	plugins: [
		require('postcss-import'),
		require('postcss-nested'),
		require('tailwindcss'),
		// require('postcss-custom-properties'),
		require('autoprefixer'),

		!dev &&
			cssnano({
				preset: 'default'
			})
	]
};
