<script lang="ts">
	import '../app.css';
	import Header from '../lib/components/ui/header.svelte';

	let { children } = $props();
</script>

<div class="flex flex-col px-8">
	<Header />
	{@render children()}
</div>
