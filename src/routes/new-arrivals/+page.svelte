<script lang="ts">
	import { products, site } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';

	// "New" badge first, then the most-reviewed pieces — the freshest edit.
	const fresh = $derived(
		[...products].sort((a, b) => {
			const an = a.badge === 'New' ? 0 : 1;
			const bn = b.badge === 'New' ? 0 : 1;
			return an - bn || b.reviews - a.reviews;
		})
	);
</script>

<svelte:head>
	<title>New Arrivals — Aurel Jewels</title>
	<meta
		name="description"
		content="The newest pieces at Aurel Jewels — fresh designs in rings, necklaces, earrings and bracelets."
	/>
	<link rel="canonical" href="{site.url}/new-arrivals" />
	<meta property="og:url" content="{site.url}/new-arrivals" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'New arrivals' }]} />

<PageHero
	eyebrow="NEW ARRIVALS"
	title="Fresh from the atelier"
	subtitle="The newest pieces in the store — new designs first, then the pieces everyone keeps coming back for."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="mt-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each fresh as product (product.slug)}
			<ProductCard {product} />
		{/each}
	</div>
	<p class="mt-10 text-center text-sm text-muted">
		Prefer the proven favourites? <a href="/best-sellers" class="font-semibold text-emerald underline underline-offset-2">Shop best sellers</a>
	</p>
</section>
