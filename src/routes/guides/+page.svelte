<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { guides, site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Jewellery Guides — Aurel Jewels</title>
	<meta
		name="description"
		content="Plain-English jewellery guides from Aurel Jewels: how to choose an engagement ring, metals and gemstones, finding your ring size, and layering necklaces."
	/>
	<link rel="canonical" href="{site.url}/guides" />
</svelte:head>

<PageHero
	eyebrow="GUIDES"
	title="Learn before you choose"
	subtitle="No jargon, no pressure — just the things a good jeweller would tell you in the shop, written down so you can read them at home."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each guides as guide (guide.slug)}
			<article class="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line transition-shadow duration-200 hover:shadow-[0_8px_30px_rgba(11,61,46,0.10)]">
				<a href={guide.href} class="block bg-sand" aria-label={guide.title}>
					<Picture
						name={guide.image}
						alt={guide.imageAlt}
						width={1408}
						height={1760}
						sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
						imgClass="aspect-[4/5] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
					/>
				</a>
				<div class="flex flex-1 flex-col p-5 sm:p-6">
					<p class="text-xs font-bold tracking-[0.2em] text-gold-dark uppercase">{guide.readTime}</p>
					<h2 class="mt-2 font-display text-xl font-medium text-ink">
						<a href={guide.href} class="hover:text-emerald">{guide.title}</a>
					</h2>
					<p class="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">{guide.blurb}</p>
					<a
						href={guide.href}
						class="mt-4 inline-flex min-h-12 items-center gap-1 text-sm font-bold text-emerald hover:text-emerald-deep"
					>
						{guide.slug === 'layering' ? 'Shop necklaces' : 'Read the guide'} →
					</a>
				</div>
			</article>
		{/each}
	</div>

	<div class="mt-10 rounded-3xl bg-emerald-soft p-6 ring-1 ring-line sm:p-8">
		<h2 class="font-display text-2xl font-medium text-ink">Still not sure? Ask us.</h2>
		<p class="mt-3 max-w-2xl leading-relaxed text-muted">
			Guides can only go so far — a five-minute conversation goes further. Book a free virtual or
			in-store consultation and we will talk through your piece, your budget and your timeline.
		</p>
		<a
			href="/appointments"
			class="mt-5 inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
		>
			Book an appointment
		</a>
	</div>
</section>
