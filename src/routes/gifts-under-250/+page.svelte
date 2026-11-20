<script lang="ts">
	import { products, site } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';

	const under250 = $derived(products.filter((p) => p.price < 250));
</script>

<svelte:head>
	<title>Gifts Under $250 — Aurel Jewels</title>
	<meta
		name="description"
		content="Show-stopping jewellery gifts under $250 — tennis bracelets, emerald necklaces and solitaires, gift-ready in our signature emerald box."
	/>
	<link rel="canonical" href="{site.url}/gifts-under-250" />
	<meta property="og:url" content="{site.url}/gifts-under-250" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Gifts under $250' }]} />

<PageHero
	eyebrow="GIFTS UNDER $250"
	title="The grand gesture, under $250"
	subtitle="Tennis bracelets, emerald necklaces and solitaires — the pieces people remember opening, all under $250 and gift-ready."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<p class="text-sm text-muted" aria-live="polite">{under250.length} pieces under $250</p>
	<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each under250 as product (product.slug)}
			<ProductCard {product} />
		{/each}
	</div>
	<p class="mt-10 text-center text-sm text-muted">
		Keeping it smaller? <a href="/gifts-under-100" class="font-semibold text-emerald underline underline-offset-2">Gifts under $100</a>
		· <a href="/gift-finder" class="font-semibold text-emerald underline underline-offset-2">Not sure? Take the gift finder quiz</a>
	</p>
</section>
