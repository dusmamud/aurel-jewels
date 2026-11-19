<script lang="ts">
	import { ChevronLeft } from '@lucide/svelte';
	import type { Collection } from '#lib/data/site.ts';
	import { products, site } from '#lib/data/site.ts';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';

	let { data }: { data: { collection: Collection } } = $props();
	const collection = $derived(data.collection);
	const items = $derived(
		collection.productSlugs
			.map((slug) => products.find((p) => p.slug === slug))
			.filter((p): p is (typeof products)[number] => p !== undefined)
	);
</script>

<svelte:head>
	<title>{collection.name} — Aurel Jewels</title>
	<meta name="description" content={collection.description} />
	<link rel="canonical" href="{site.url}/collections/{collection.slug}" />
</svelte:head>

<!-- Collection header with image -->
<Breadcrumbs
	items={[
		{ label: 'Home', href: '/' },
		{ label: 'Collections', href: '/collections' },
		{ label: collection.name }
	]}
/>
<section class="bg-cream">
	<div class="mx-auto max-w-7xl px-4 pt-6 pb-12 sm:px-6 sm:pt-8 sm:pb-14 lg:px-8">
		<a
			href="/collections"
			class="inline-flex min-h-12 items-center gap-1 text-sm font-semibold text-emerald hover:text-emerald-deep"
		>
			<ChevronLeft size={18} aria-hidden="true" /> All collections
		</a>
		<div class="mt-4 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
			<div class="min-w-0">
				<p class="text-xs font-bold tracking-[0.3em] text-gold-dark">COLLECTION</p>
				<h1
					class="mt-3 font-display text-[clamp(2rem,5vw,3.2rem)] leading-tight font-medium text-ink"
				>
					{collection.name}
				</h1>
				<p class="mt-3 font-display text-xl text-gold-dark italic">{collection.tagline}</p>
				<p class="mt-4 max-w-xl leading-relaxed text-muted">{collection.description}</p>
				<p class="mt-4 text-sm font-semibold text-ink">
					{items.length}
					{items.length === 1 ? 'piece' : 'pieces'} in this collection
				</p>
			</div>
			<div class="overflow-hidden rounded-3xl bg-sand ring-1 ring-line">
				<Picture
					name={collection.image}
					alt={collection.imageAlt}
					width={1200}
					height={900}
					sizes="(min-width: 1024px) 50vw, 100vw"
					eager
					imgClass="aspect-[4/3] w-full object-cover"
					pictureClass="block"
				/>
			</div>
		</div>
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
	{#if items.length > 0}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each items as product (product.slug)}
				<ProductCard {product} />
			{/each}
		</div>
	{:else}
		<div class="rounded-3xl bg-white px-6 py-16 text-center ring-1 ring-line">
			<p class="font-display text-2xl font-medium text-ink">This collection is being restyled</p>
			<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
				No pieces are in this collection right now. Browse the full shop while we prepare new
				arrivals.
			</p>
			<a
				href="/shop"
				class="mt-8 inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
			>
				Browse the shop
			</a>
		</div>
	{/if}
</section>
