/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	daisyui: {
		themes: [
			{
				default: {
					primary: '#72a972',
					secondary: '#dbeaf0',
					accent: '#1b7196',
					neutral: '#18161d',
					'base-100': '#fafafa',
					info: '#bae6fd',
					success: '#bef264',
					warning: '#f3ae3f',
					error: '#fb7185',
				},
			},
			'dark',
			'cupcake',
		],
	},
	plugins: [require('daisyui')],
};
