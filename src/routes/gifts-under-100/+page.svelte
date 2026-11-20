<script lang="ts">
	import { products, site } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';

	const under100 = $derived(products.filter((p) => p.price < 100));
</script>

<svelte:head>
	<title>Gifts Under $100 — Aurel Jewels</title>
	<meta
		name="description"
		content="Beautiful jewellery gifts under $100 — studs, hoops, pendants and charms, gift-ready in our signature emerald box."
	/>
	<link rel="canonical" href="{site.url}/gifts-under-100" />
	<meta property="og:url" content="{site.url}/gifts-under-100" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Gifts under $100' }]} />

<PageHero
	eyebrow="GIFTS UNDER $100"
	title="Thoughtful, not expensive"
	subtitle="Real jewellery, real materials, under $100 — studs, hoops, pendants and charms that arrive gift-ready in our signature emerald box."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<p class="text-sm text-muted" aria-live="polite">{under100.length} pieces under $100</p>
	<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each under100 as product (product.slug)}
			<ProductCard {product} />
		{/each}
	</div>
	<p class="mt-10 text-center text-sm text-muted">
		A little more to spend? <a href="/gifts-under-250" class="font-semibold text-emerald underline underline-offset-2">Gifts under $250</a>
		· <a href="/gift-cards" class="font-semibold text-emerald underline underline-offset-2">Or let them choose with a gift card</a>
	</p>
</section>
