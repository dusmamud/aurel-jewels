<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import { lookbookLooks, products, site } from '#lib/data/site.ts';

	let filter = $state('all');

	const looks = $derived(
		filter === 'all' ? lookbookLooks : lookbookLooks.filter((l) => l.id === filter)
	);

	function lookProducts(slugList: string[]) {
		return slugList
			.map((slug) => products.find((p) => p.slug === slug))
			.filter((p): p is NonNullable<typeof p> => p !== undefined);
	}
</script>

<svelte:head>
	<title>Lookbook — Aurel Jewels</title>
	<meta
		name="description"
		content="Shoppable looks from Aurel Jewels: bridal, evening, everyday and gifts — four styled edits, each with the exact pieces to shop the look."
	/>
	<link rel="canonical" href="{site.url}/lookbook" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Lookbook' }]} />

<PageHero
	eyebrow="LOOKBOOK"
	title="Four ways to wear it"
	subtitle="Styled edits, not a catalogue. Pick an occasion, find the look, and shop the exact pieces in it."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
	<div class="flex flex-wrap gap-2" role="group" aria-label="Filter looks by occasion">
		{#each [{ id: 'all', label: 'All looks' }, ...lookbookLooks.map((l) => ({ id: l.id, label: l.name }))] as opt (opt.id)}
			<button
				type="button"
				aria-pressed={filter === opt.id}
				onclick={() => (filter = opt.id)}
				class="flex min-h-12 items-center rounded-full px-5 text-sm font-bold transition-colors duration-150 {filter ===
				opt.id
					? 'bg-emerald text-white'
					: 'bg-white text-ink ring-1 ring-line hover:ring-emerald'}"
			>
				{opt.label}
			</button>
		{/each}
	</div>

	<div class="mt-10 space-y-14">
		{#each looks as look (look.id)}
			<article>
				<div class="grid gap-6 lg:grid-cols-[420px_1fr] lg:gap-10">
					<div class="overflow-hidden rounded-3xl bg-white ring-1 ring-line">
						<Picture
							name={look.image}
							alt={look.imageAlt}
							width={1408}
							height={1760}
							sizes="(min-width: 1024px) 420px, 100vw"
							imgClass="aspect-[4/5] w-full object-cover"
						/>
					</div>
					<div class="min-w-0">
						<p class="text-xs font-bold tracking-[0.3em] text-gold-dark uppercase">The {look.name} look</p>
						<h2 class="mt-2 font-display text-[clamp(1.6rem,4vw,2.2rem)] font-medium text-ink">
							{look.name}
						</h2>
						<p class="mt-3 max-w-2xl leading-relaxed text-muted">{look.blurb}</p>
						<h3 class="mt-6 font-display text-lg font-semibold text-ink">Shop the look</h3>
						<div class="mt-4 grid gap-4 sm:grid-cols-2">
							{#each lookProducts(look.productSlugs) as product (product.slug)}
								<ProductCard {product} />
							{/each}
						</div>
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>
