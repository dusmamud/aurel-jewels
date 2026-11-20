<script lang="ts">
	import { products, site } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';

	// Bestsellers first, then the most-reviewed pieces.
	const best = $derived(
		[...products].sort((a, b) => {
			const ab = a.badge === 'Bestseller' ? 0 : 1;
			const bb = b.badge === 'Bestseller' ? 0 : 1;
			return ab - bb || b.reviews - a.reviews;
		})
	);
</script>

<svelte:head>
	<title>Best Sellers — Aurel Jewels</title>
	<meta
		name="description"
		content="The pieces Aurel Jewels customers buy again and again — best-selling rings, necklaces, earrings and bracelets."
	/>
	<link rel="canonical" href="{site.url}/best-sellers" />
	<meta property="og:url" content="{site.url}/best-sellers" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Best sellers' }]} />

<PageHero
	eyebrow="BEST SELLERS"
	title="The pieces everyone loves"
	subtitle="Our most-bought, most-gifted, most-reviewed jewellery — ranked by the people who actually wear it."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="mt-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each best as product (product.slug)}
			<ProductCard {product} />
		{/each}
	</div>
	<p class="mt-10 text-center text-sm text-muted">
		Want what's new instead? <a href="/new-arrivals" class="font-semibold text-emerald underline underline-offset-2">Shop new arrivals</a>
	</p>
</section>
