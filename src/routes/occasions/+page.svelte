<script lang="ts">
	import { categories, products, site } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';

	const occasions = [
		{ id: 'anniversary', name: 'Anniversary', blurb: 'Ten years or ten months — mark it with something that lasts as long as the memory.', image: 'cat-rings', alt: 'Gold diamond solitaire ring on a beige stone pedestal', slugs: ['eternal-spark-ring', 'emerald-grace-necklace', 'aurora-solitaire-ring', 'radiant-tennis-bracelet'] },
		{ id: 'birthday', name: 'Birthday', blurb: 'A little sparkle for their day — no sizing guesswork needed for most picks.', image: 'cat-bracelets', alt: 'Gold diamond tennis bracelet on a beige stone', slugs: ['infinity-charm-bracelet', 'pearl-drop-earrings', 'golden-clover-pendant', 'luminous-hoop-earrings'] },
		{ id: 'graduation', name: 'Graduation', blurb: 'A first piece of fine jewellery for a new chapter — classic, wearable, hers for years.', image: 'cat-necklaces', alt: 'Gold necklace with an emerald pendant on a beige stone', slugs: ['emerald-grace-necklace', 'celestial-tennis-necklace', 'pearl-drop-earrings', 'golden-clover-pendant'] },
		{ id: 'valentines', name: "Valentine's Day", blurb: 'The classics, done properly: solitaires, emeralds and a box worth opening slowly.', image: 'cat-collections', alt: 'Curated set of emerald necklace, gold ring and bracelet on beige stones', slugs: ['eternal-spark-ring', 'emerald-halo-ring', 'emerald-stud-earrings', 'radiant-tennis-bracelet'] },
		{ id: 'mothers-day', name: "Mother's Day", blurb: 'For the woman who has everything — except a piece chosen just for her.', image: 'cat-earrings', alt: 'Pair of gold diamond hoop earrings on a beige stone pedestal', slugs: ['pearl-drop-earrings', 'emerald-grace-necklace', 'infinity-charm-bracelet', 'emerald-stud-earrings'] }
	];
	const bySlug = (slug: string) => products.find((p) => p.slug === slug);
</script>

<svelte:head>
	<title>Shop by Occasion — Aurel Jewels</title>
	<meta
		name="description"
		content="Jewellery for anniversaries, birthdays, graduations, Valentine's Day and Mother's Day — gift-ready in our signature emerald box."
	/>
	<link rel="canonical" href="{site.url}/occasions" />
	<meta property="og:url" content="{site.url}/occasions" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Occasions' }]} />

<PageHero
	eyebrow="OCCASIONS"
	title="The right piece for the moment"
	subtitle="Anniversary, birthday, graduation, Valentine's or Mother's Day — start with the occasion and we will narrow it down. Every piece arrives gift-ready."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	{#each occasions as o (o.id)}
		<div id={o.id} class="scroll-mt-28 border-t border-line py-10 first:border-t-0 first:pt-0">
			<div class="grid items-center gap-6 md:grid-cols-[240px_1fr]">
				<Picture
					name={o.image}
					alt={o.alt}
					width={800}
					height={800}
					sizes="(min-width: 768px) 240px, 100vw"
					imgClass="aspect-square w-full rounded-3xl object-cover"
					pictureClass="block"
				/>
				<div>
					<h2 class="font-display text-[clamp(1.6rem,3.5vw,2.2rem)] font-medium text-ink">{o.name}</h2>
					<p class="mt-2 max-w-2xl leading-relaxed text-muted">{o.blurb}</p>
					<p class="mt-3 text-sm text-muted">
						Not sure? <a href="/gift-finder" class="font-semibold text-emerald underline underline-offset-2">Take the 60-second gift finder quiz</a> — or
						<a href="/appointments" class="font-semibold text-emerald underline underline-offset-2">book a free consultation</a>.
					</p>
				</div>
			</div>
			<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each o.slugs as slug (slug)}
					{@const p = bySlug(slug)}
					{#if p}<ProductCard product={p} />{/if}
				{/each}
			</div>
		</div>
	{/each}
	<p class="mt-4 text-center text-sm text-muted">
		Looking for something else? <a href="/shop" class="font-semibold text-emerald underline underline-offset-2">Browse the full shop</a>
		or <a href="/bespoke" class="font-semibold text-emerald underline underline-offset-2">design a bespoke piece</a>.
	</p>
</section>
