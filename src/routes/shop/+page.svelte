<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Search, X } from '@lucide/svelte';
	import { categories, inAnyCollection, products, site } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';

	type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'reviews';
	type PriceKey = 'all' | 'under-75' | '75-125' | 'over-125';

	let sort = $state<SortKey>('featured');
	let priceFilter = $state<PriceKey>('all');
	let searchText = $state('');

	// searchParams are unavailable during prerendering — read them client-side only.
	const q = $derived(browser ? (page.url.searchParams.get('q') ?? '') : '');
	const category = $derived(browser ? (page.url.searchParams.get('category') ?? 'all') : 'all');

	// Keep the search box in sync when the URL changes (back/forward, clear).
	$effect(() => {
		if (q !== searchText) searchText = q;
	});

	function updateParams(next: { q?: string; category?: string }) {
		const params = new URLSearchParams(page.url.search);
		const nextQ = next.q !== undefined ? next.q : q;
		const nextCat = next.category !== undefined ? next.category : category;
		if (nextQ.trim()) params.set('q', nextQ.trim());
		else params.delete('q');
		if (nextCat && nextCat !== 'all') params.set('category', nextCat);
		else params.delete('category');
		const query = params.toString();
		goto(query ? `/shop?${query}` : '/shop', { replaceState: true });
	}

	function onSearchInput() {
		updateParams({ q: searchText });
	}

	function chipHref(id: string) {
		const params = new URLSearchParams();
		if (q.trim()) params.set('q', q.trim());
		if (id !== 'all') params.set('category', id);
		const query = params.toString();
		return query ? `/shop?${query}` : '/shop';
	}

	const filtered = $derived.by(() => {
		let list = [...products];
		const query = q.trim().toLowerCase();
		if (query) {
			list = list.filter(
				(p) =>
					p.name.toLowerCase().includes(query) ||
					p.description.toLowerCase().includes(query) ||
					p.category.toLowerCase().includes(query)
			);
		}
		// 'gifts' = gift-tagged pieces; 'collections' = pieces in any curated
		// collection; otherwise match the product's own category.
		if (category === 'gifts') list = list.filter((p) => p.gift);
		else if (category === 'collections') list = list.filter((p) => inAnyCollection(p.slug));
		else if (category !== 'all') list = list.filter((p) => p.category === category);
		if (priceFilter === 'under-75') list = list.filter((p) => p.price < 75);
		if (priceFilter === '75-125') list = list.filter((p) => p.price >= 75 && p.price <= 125);
		if (priceFilter === 'over-125') list = list.filter((p) => p.price > 125);
		if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
		if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
		if (sort === 'rating') list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
		if (sort === 'reviews') list.sort((a, b) => b.reviews - a.reviews);
		return list;
	});

	const priceOptions: { id: PriceKey; label: string }[] = [
		{ id: 'all', label: 'All prices' },
		{ id: 'under-75', label: 'Under $75' },
		{ id: '75-125', label: '$75 – $125' },
		{ id: 'over-125', label: 'Over $125' }
	];

	function clearFilters() {
		sort = 'featured';
		priceFilter = 'all';
		searchText = '';
		goto('/shop', { replaceState: true });
	}
</script>

<svelte:head>
	<title>Shop Fine Jewelry — Aurel Jewels</title>
	<meta
		name="description"
		content="Shop rings, necklaces, earrings and bracelets from Aurel Jewels. Free shipping over $50 and 30-day returns."
	/>
	<link rel="canonical" href="{site.url}/shop" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Shop' }]} />

<PageHero
	eyebrow="SHOP"
	title="Fine jewelry, made to be worn"
	subtitle="Rings, necklaces, earrings and bracelets in 14k gold-plated sterling silver — free shipping over $50, 30-day returns."
/>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
	<!-- Search -->
	<form
		role="search"
		class="flex max-w-xl items-center gap-2"
		onsubmit={(e) => {
			e.preventDefault();
			updateParams({ q: searchText });
		}}
	>
		<label for="shop-search" class="sr-only">Search jewelry</label>
		<div class="relative min-w-0 flex-1">
			<Search
				size={19}
				aria-hidden="true"
				class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted"
			/>
			<input
				id="shop-search"
				type="search"
				bind:value={searchText}
				oninput={onSearchInput}
				placeholder="Search rings, necklaces, emeralds…"
				class="min-h-12 w-full rounded-full border border-line bg-white py-3 pr-14 pl-11 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none"
			/>
			{#if searchText}
				<button
					type="button"
					aria-label="Clear search"
					onclick={() => {
						searchText = '';
						updateParams({ q: '' });
					}}
					class="absolute top-1/2 right-1 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-sand hover:text-ink"
				>
					<X size={18} aria-hidden="true" />
				</button>
			{/if}
		</div>
		<button
			type="submit"
			class="min-h-12 shrink-0 rounded-full bg-emerald px-5 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
		>
			Search
		</button>
	</form>

	<!-- Category chips -->
	<div class="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
		<a
			href={chipHref('all')}
			aria-current={category === 'all' ? 'true' : undefined}
			class="inline-flex min-h-12 items-center rounded-full px-5 text-sm font-semibold transition-colors duration-150 {category ===
			'all'
				? 'bg-emerald text-white'
				: 'bg-white text-ink ring-1 ring-line hover:ring-emerald'}"
		>
			All
		</a>
		{#each categories as c (c.id)}
			<a
				href={chipHref(c.id)}
				aria-current={category === c.id ? 'true' : undefined}
				class="inline-flex min-h-12 items-center rounded-full px-5 text-sm font-semibold transition-colors duration-150 {category ===
				c.id
					? 'bg-emerald text-white'
					: 'bg-white text-ink ring-1 ring-line hover:ring-emerald'}"
			>
				{c.name}
			</a>
		{/each}
	</div>

	<!-- Sort + price filter + count -->
	<div class="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
		<label for="shop-sort" class="text-sm font-semibold text-ink">Sort by</label>
		<select
			id="shop-sort"
			bind:value={sort}
			class="min-h-12 rounded-full border border-line bg-white px-4 text-sm font-medium text-ink focus:border-emerald focus:outline-none"
		>
			<option value="featured">Featured</option>
			<option value="price-asc">Price: low to high</option>
			<option value="price-desc">Price: high to low</option>
			<option value="rating">Top rated</option>
			<option value="reviews">Most reviewed</option>
		</select>

		<div class="flex flex-wrap gap-2" role="group" aria-label="Filter by price">
			{#each priceOptions as opt (opt.id)}
				<button
					type="button"
					onclick={() => (priceFilter = opt.id)}
					aria-pressed={priceFilter === opt.id}
					class="inline-flex min-h-12 items-center rounded-full px-4 text-sm font-semibold transition-colors duration-150 {priceFilter ===
					opt.id
						? 'bg-emerald text-white'
						: 'bg-white text-ink ring-1 ring-line hover:ring-emerald'}"
				>
					{opt.label}
				</button>
			{/each}
		</div>

		<p class="ml-auto text-sm text-muted" aria-live="polite">
			{filtered.length}
			{filtered.length === 1 ? 'piece' : 'pieces'}
			{#if q.trim() || category !== 'all' || priceFilter !== 'all'}
				<span class="text-ink/60">
					{#if q.trim()}for “{q.trim()}”{/if}
					{#if category !== 'all'}
						in {categories.find((c) => c.id === category)?.name ?? category}
					{/if}
				</span>
			{/if}
		</p>
	</div>

	<!-- Results -->
	{#if filtered.length > 0}
		<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each filtered as product (product.slug)}
				<ProductCard {product} />
			{/each}
		</div>
	{:else}
		<div class="mt-8 rounded-3xl bg-white px-6 py-16 text-center ring-1 ring-line">
			<p class="font-display text-2xl font-medium text-ink">No pieces match those filters</p>
			<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
				Try a different search term, another category, or a wider price range — or start fresh and
				browse the full collection.
			</p>
			<button
				type="button"
				onclick={clearFilters}
				class="mt-8 inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
			>
				Clear filters
			</button>
		</div>
	{/if}

	<p class="mt-10 text-center text-sm text-muted">
		Prices in USD. Free shipping over $50 · 30-day free returns · No hidden fees, ever.
	</p>
</section>
