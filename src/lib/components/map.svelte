<script lang="ts">
	import {
		GeolocateControl,
		MapLibre,
		RasterDEMTileSource,
		Terrain,
		TerrainControl
	} from 'svelte-maplibre-gl';
	import { onMount } from 'svelte';

	const center = { lng: 10.0, lat: 50.0 };
	let zoom = 12;
	let pitch = 70;
	let maxPitch = 85;
	const styleUrl = 'https://api.maptiler.com/maps/outdoor/style.json?key=r8lhIWYHOsXCted9dVIj';
	const demTilesUrl = 'https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=r8lhIWYHOsXCted9dVIj';
	let exaggeration = 1.5;

	onMount(async () => {
		if ('permissions' in navigator && 'geolocation' in navigator) {
			try {
				const status = await navigator.permissions.query({ name: 'geolocation' as PermissionName });

				// Если пользователь ещё не дал разрешение, запрашиваем его
				if (status.state === 'prompt') {
					navigator.geolocation.getCurrentPosition(
						(pos) => {
							console.log('Геолокация получена:', pos.coords);
						},
						(err) => {
							console.warn('Ошибка получения геолокации:', err.message);
						}
					);
				}
			} catch (e) {
				console.error('Ошибка при запросе разрешения на геолокацию:', e);
			}
		}
	});
</script>


<MapLibre class="flex h-full w-full flex-1" style={styleUrl} {zoom} {pitch} {maxPitch} {center}>
	<GeolocateControl />
	<!-- Источник с DEM-данными для 3D terrain -->
	<RasterDEMTileSource
		id="terrain"
		tiles={[demTilesUrl]}
		minzoom={0}
		maxzoom={14}
		attribution="<a href='https://www.maptiler.com/copyright/' target='_blank'>© MapTiler</a>"
	>
		<!-- Включаем 3D terrain с заданным коэффициентом exaggeration -->
		<Terrain {exaggeration} />
		<!-- Добавляем контрол для управления terrain -->
		<TerrainControl position="top-right" />
	</RasterDEMTileSource>
</MapLibre>
