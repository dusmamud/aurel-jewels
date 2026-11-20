<script lang="ts">
	import { recentlyViewed } from '#lib/recentlyViewed.svelte.ts';
	import ProductCard from './ProductCard.svelte';

	let { title = 'Recently viewed', excludeSlug }: { title?: string; excludeSlug?: string } = $props();
	const items = $derived(recentlyViewed.items.filter((p) => p.slug !== excludeSlug).slice(0, 4));
</script>

{#if items.length > 0}
	<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" aria-label={title}>
		<div class="flex items-baseline justify-between gap-4">
			<h2 class="font-display text-[clamp(1.6rem,3.5vw,2.2rem)] font-medium text-ink">{title}</h2>
			<a href="/shop" class="inline-flex min-h-12 items-center text-sm font-semibold text-emerald hover:text-emerald-deep">
				Shop all →
			</a>
		</div>
		<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each items as product (product.slug)}
				<ProductCard {product} />
			{/each}
		</div>
	</section>
{/if}
