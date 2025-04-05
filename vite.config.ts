import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			manifest: false, // использовать внешний /manifest.webmanifest
			includeAssets: [
				'favicon.ico',
				'favicon-16x16.png',
				'favicon-32x32.png',
				'apple-touch-icon.png',
				'android-chrome-192x192.png',
				'android-chrome-512x512.png'
			],
			workbox: {
				globPatterns: ['**/*.{js,css,html,png,ico,svg,webmanifest}'],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/api\.maptiler\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'maptiler-cache',
							expiration: {
								maxEntries: 100,
								maxAgeSeconds: 60 * 60 * 24 * 30
							}
						}
					}
				]
			}
		})
	]
});
