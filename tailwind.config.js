module.exports = {
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		styled: true,
		themes: [
			{
				mytheme: {
					primary: '#6BC2B1',

					secondary: '#0A1F2E',

					accent: '#ACEAAA',

					neutral: '#316587',

					'base-100': '#FFFFFF',

					info: '#3ABFF8',

					success: '#36D399',

					warning: '#FBBD23',

					error: '#FF4444'
				}
			}
		],
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: '',
		darkTheme: 'light'
	}
}
