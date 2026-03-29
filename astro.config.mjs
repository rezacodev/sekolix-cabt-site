// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Sekolix CABT',
			description: 'Dokumentasi resmi sistem ujian berbasis komputer Sekolix CABT.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/your-org/sekolix-cabt' },
			],
			customCss: ['./src/styles/docs.css'],
			sidebar: [
				{
					label: 'Mulai di Sini',
					items: [
						{ label: 'Tentang Sekolix CABT', slug: 'docs/tentang' },
						{ label: 'Instalasi Cepat', slug: 'docs/instalasi' },
					],
				},
				{
					label: '🎓 Panduan Peserta',
					autogenerate: { directory: 'docs/panduan-peserta' },
				},
				{
					label: '👨‍🏫 Panduan Guru',
					autogenerate: { directory: 'docs/panduan-guru' },
				},
				{
					label: '🏫 Panduan Admin',
					autogenerate: { directory: 'docs/panduan-admin' },
				},
				{
					label: '⚙️ Panduan Super Admin',
					autogenerate: { directory: 'docs/panduan-super-admin' },
				},
				{
					label: '📚 Referensi',
					autogenerate: { directory: 'docs/referensi' },
				},
			],
			editLink: {
				baseUrl: 'https://github.com/your-org/sekolix-cabt-site/edit/main/',
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				'@': new URL('./src', import.meta.url).pathname,
			},
		},
	},
});
