<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import { collections, site } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
</script>

<svelte:head>
	<title>Collections — Aurel Jewels</title>
	<meta
		name="description"
		content="Curated jewelry collections from Aurel Jewels: bridal, emerald, everyday elegance and gifts — each piece ready to give, beautifully boxed."
	/>
	<link rel="canonical" href="{site.url}/collections" />
</svelte:head>

<PageHero
	eyebrow="COLLECTIONS"
	title="Curated edits for every occasion"
	subtitle="Four collections, one promise: pieces made to be worn, gifted and remembered — each arriving in our signature emerald gift box."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
	<div class="grid gap-6 sm:grid-cols-2">
		{#each collections as collection (collection.slug)}
			<article
				class="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line transition-shadow duration-200 hover:shadow-[0_8px_30px_rgba(11,61,46,0.10)]"
			>
				<a
					href="/collections/{collection.slug}"
					class="relative block bg-sand"
					aria-label={collection.name}
				>
					<Picture
						name={collection.image}
						alt={collection.imageAlt}
						width={1200}
						height={900}
						sizes="(min-width: 640px) 50vw, 100vw"
						imgClass="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
					/>
				</a>
				<div class="flex flex-1 flex-col gap-2 p-6 sm:p-7">
					<p class="text-xs font-bold tracking-[0.25em] text-gold-dark uppercase">
						{collection.productSlugs.length}
						{collection.productSlugs.length === 1 ? 'piece' : 'pieces'}
					</p>
					<h2 class="font-display text-2xl leading-snug font-medium text-ink">
						<a href="/collections/{collection.slug}" class="hover:text-emerald">
							{collection.name}
						</a>
					</h2>
					<p class="leading-relaxed text-muted">{collection.tagline}</p>
					<p class="mt-1 text-sm leading-relaxed text-muted">{collection.description}</p>
					<a
						href="/collections/{collection.slug}"
						class="mt-4 inline-flex min-h-12 items-center gap-2 self-start text-sm font-bold tracking-wide text-emerald uppercase transition-colors duration-150 hover:text-emerald-deep"
					>
						Shop the collection <ArrowRight size={17} aria-hidden="true" />
					</a>
				</div>
			</article>
		{/each}
	</div>
</section>
