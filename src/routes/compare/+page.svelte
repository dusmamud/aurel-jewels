<script lang="ts">
	import { products, site, usd } from '#lib/data/site.ts';
	import { clearCompare, compareList } from '#lib/compare.svelte.ts';
	import { addToCart } from '#lib/cart.svelte.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import Stars from '#lib/components/Stars.svelte';

	const items = $derived(
		compareList.slugs
			.map((s) => products.find((p) => p.slug === s))
			.filter((p): p is (typeof products)[number] => Boolean(p))
	);
	const rows: { label: string; value: (p: (typeof products)[number]) => string }[] = [
		{ label: 'Price', value: (p) => usd(p.price) },
		{ label: 'Category', value: (p) => p.category },
		{ label: 'Metals', value: (p) => p.metals.join(', ') },
		{ label: 'Sizes', value: (p) => p.sizes.join(', ') },
		{ label: 'Rating', value: (p) => `${p.rating} / 5 (${p.reviews} reviews)` },
		{ label: 'Materials', value: (p) => p.materials.join('; ') },
		{ label: 'Warranty', value: () => 'Lifetime craftsmanship warranty' },
		{ label: 'Shipping', value: () => 'Free over $50 · 30-day returns' }
	];
</script>

<svelte:head>
	<title>Compare Jewelry — Aurel Jewels</title>
	<meta
		name="description"
		content="Compare up to three Aurel Jewels pieces side by side — price, metal, stone, sizes and warranty."
	/>
	<link rel="canonical" href="{site.url}/compare" />
	<meta property="og:url" content="{site.url}/compare" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Compare' }]} />

<PageHero
	eyebrow="COMPARE"
	title="Side by side"
	subtitle="Tick “Compare” on up to three pieces in the shop and they land here — price, metal, sizes and warranty, next to each other."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	{#if items.length === 0}
		<div class="rounded-3xl bg-white px-6 py-16 text-center ring-1 ring-line">
			<p class="font-display text-2xl font-medium text-ink">Nothing to compare yet</p>
			<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
				Go to the shop, tap “Compare” on any piece, and come back — you can compare up to
				three pieces at a time.
			</p>
			<a
				href="/shop"
				class="mt-8 inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
			>
				Browse the shop
			</a>
		</div>
	{:else}
		<div class="flex flex-wrap items-center justify-between gap-3">
			<p class="text-sm text-muted">{items.length} of 3 pieces selected</p>
			<button
				type="button"
				onclick={clearCompare}
				class="inline-flex min-h-12 items-center rounded-full bg-white px-5 text-sm font-bold text-ink ring-1 ring-line transition-colors duration-150 hover:ring-emerald"
			>
				Clear comparison
			</button>
		</div>
		<div class="mt-6 overflow-x-auto rounded-3xl bg-white ring-1 ring-line">
			<table class="w-full min-w-[640px] border-collapse text-left">
				<thead>
					<tr>
						<th scope="col" class="w-36 p-4 align-bottom text-sm font-bold text-muted">Piece</th>
						{#each items as p (p.slug)}
							<th scope="col" class="min-w-56 p-4 align-top">
								<a href="/shop/{p.slug}" class="block">
									<Picture
										name={p.image}
										alt={p.imageAlt}
										width={400}
										height={400}
										sizes="224px"
										imgClass="aspect-square w-full rounded-2xl object-cover"
										pictureClass="block"
									/>
									<span class="mt-3 block font-display text-lg leading-snug font-medium text-ink hover:text-emerald">{p.name}</span>
								</a>
								<span class="mt-1 block"><Stars rating={p.rating} reviews={p.reviews} /></span>
							</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each rows as row (row.label)}
						<tr class="border-t border-line">
							<th scope="row" class="p-4 text-sm font-bold text-ink">{row.label}</th>
							{#each items as p (p.slug)}
								<td class="p-4 align-top text-sm leading-relaxed text-muted">{row.value(p)}</td>
							{/each}
						</tr>
					{/each}
					<tr class="border-t border-line">
						<th scope="row" class="p-4 text-sm font-bold text-ink">Add to bag</th>
						{#each items as p (p.slug)}
							<td class="p-4">
								<button
									type="button"
									onclick={() => addToCart(p.slug)}
									class="flex min-h-12 w-full items-center justify-center rounded-full bg-emerald px-4 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
								>
									Add — {usd(p.price)}
								</button>
							</td>
						{/each}
					</tr>
				</tbody>
			</table>
		</div>
		<p class="mt-6 text-center text-sm text-muted">
			Still deciding? <a href="/appointments" class="font-semibold text-emerald underline underline-offset-2">Book a free consultation</a>
			and compare them in person.
		</p>
	{/if}
</section>
