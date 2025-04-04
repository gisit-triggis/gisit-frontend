<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
		children?: Snippet;
	}
	let { children, ...rest }: IButtonProps = $props();
</script>

<button {...rest}>
	{@render children?.()}
</button>
