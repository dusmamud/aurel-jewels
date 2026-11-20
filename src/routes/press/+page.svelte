<script lang="ts">
	import { site } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';

	const mentions = [
		{ outlet: 'The Jewellery Edit', quote: 'Aurel’s emerald pieces are the quiet luxury story of the year — considered, well-made, and priced like the brand means it.', date: 'November 2026' },
		{ outlet: 'SoHo Style', quote: 'The little boutique on Mercer Street is doing what the big houses forgot: letting you try everything on, with someone who actually knows jewellery.', date: 'October 2026' },
		{ outlet: 'The Modern Bride', quote: 'The Eternal Spark Ring is our most-recommended solitaire under $100 — and the box it arrives in is half the proposal.', date: 'September 2026' },
		{ outlet: 'Ethical Luxury Review', quote: '100% recycled gold and lab-created stones, with the receipts to prove it. Aurel is the rare brand whose sustainability page survives a fact-check.', date: 'August 2026' }
	];
</script>

<svelte:head>
	<title>Press — Aurel Jewels</title>
	<meta
		name="description"
		content="Press coverage and media enquiries for Aurel Jewels — what the press says, and how to reach us."
	/>
	<link rel="canonical" href="{site.url}/press" />
	<meta property="og:url" content="{site.url}/press" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Press' }]} />

<PageHero
	eyebrow="PRESS"
	title="In the press"
	subtitle="What journalists and editors have said about Aurel Jewels — and how to reach us for a story, a shoot or a sample."
/>

<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="space-y-6">
		{#each mentions as m (m.outlet)}
			<blockquote class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<p class="font-display text-xl leading-relaxed font-medium text-ink">“{m.quote}”</p>
				<footer class="mt-4 text-sm text-muted">— {m.outlet}, {m.date}</footer>
			</blockquote>
		{/each}
	</div>
	<div class="mt-10 rounded-3xl bg-emerald-soft p-6 ring-1 ring-line sm:p-8">
		<h2 class="font-display text-xl font-semibold text-ink">Media enquiries</h2>
		<p class="mt-2 leading-relaxed text-muted">
			For press samples, photography, founder interviews or comment on sustainable jewellery,
			write to <a href="mailto:{site.email}" class="font-semibold text-emerald underline underline-offset-2">{site.email}</a>
			with “Press” in the subject line. We reply within two business days.
		</p>
		<p class="mt-3 text-sm leading-relaxed text-muted">
			Quotes above are mock press lines written for this demo site — they are not real coverage.
		</p>
	</div>
</section>
