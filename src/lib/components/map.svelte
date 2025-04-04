<script lang="ts">
	import {
		GeolocateControl,
		MapLibre,
		RasterDEMTileSource,
		Terrain,
		TerrainControl
	} from 'svelte-maplibre-gl';

	// Центр карты (например, используем координаты для примера)
	const center = { lng: 10.0, lat: 50.0 };

	// Параметры карты
	let zoom = 12;
	let pitch = 70;
	let maxPitch = 85;

	// URL стиля MapTiler (замените YOUR_API_KEY на свой ключ)
	const styleUrl = 'https://api.maptiler.com/maps/outdoor/style.json?key=r8lhIWYHOsXCted9dVIj';

	// URL для DEM (террейн-слоя) от MapTiler
	const demTilesUrl =
		'https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=r8lhIWYHOsXCted9dVIj';

	// Коэффициент увеличения рельефа (exaggeration)
	let exaggeration = 1.5;
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
