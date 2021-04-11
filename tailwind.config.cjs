const { tailwindExtractor } = require('tailwindcss/lib/lib/purgeUnusedStyles');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

module.exports = {
	mode: dev && 'jit',
	purge: {
		content: ['./src/**/*.{html,js,svelte,ts}'],
		options: {
			defaultExtractor: (content) => [
				// If this stops working, please open an issue at https://github.com/svelte-add/tailwindcss/issues rather than bothering Tailwind Labs about it
				...tailwindExtractor(content),
				// Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
				...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(
					([_match, group, ..._rest]) => group
				)
			],
			keyframes: true
		}
	},
	theme: {
		extend: {
			colors: {
				orange: {
					100: '#fffaf0',
					200: '#feebc8',
					300: '#fbd38d',
					400: '#f6ad55',
					500: '#ed8936',
					600: '#dd6b20',
					700: '#c05621',
					800: '#9c4221',
					900: '#7b341e'
				}
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
