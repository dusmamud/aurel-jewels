<script lang="ts">
	import { Star } from '@lucide/svelte';

	let { rating, reviews }: { rating: number; reviews?: number } = $props();
	const full = $derived(Math.round(rating));
</script>

<span class="inline-flex items-center gap-1" role="img" aria-label={`Rated ${rating} out of 5`}>
	{#each Array(5) as _, i}
		<Star
			size={15}
			aria-hidden="true"
			class={i < full
				? 'fill-gold-dark text-gold-dark' /* #7a5f1e: 6.03:1 on white, passes 3:1 for graphics */
				: 'fill-sand-deep text-muted' /* muted stroke keeps empty stars visible (5.9:1 on white) */}
		/>
	{/each}
	{#if reviews !== undefined}
		<span class="ml-1 text-sm text-muted">({reviews})</span>
	{/if}
</span>
