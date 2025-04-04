<script lang="ts">
	import Footer from '$lib/components/ui/footer.svelte';
	import '../app.css';
	import Header from '../lib/components/ui/header.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-screen w-full flex-col px-8">
	<Header />

	<div class="relative flex w-full flex-1 flex-col">
		{@render children()}
	</div>

	<Footer />
</div>
