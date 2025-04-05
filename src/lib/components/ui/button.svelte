<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
		children?: Snippet;
		variant?: 'default' | 'secondary';
	}
	const classes = {
		default: 'bg-primary',
		secondary: 'bg-secondary'
	};
	let { children, variant = 'default', ...rest }: IButtonProps = $props();
</script>

<button
	class={cn('label-button rounded-lg px-6 py-3 text-white', classes[variant], rest.class)}
	{...rest}
>
	{@render children?.()}
</button>
