<script lang="ts">
	import { site } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';

	const roles = [
		{ title: 'Jewellery Stylist — SoHo boutique', type: 'Full-time · In store', detail: 'Help customers find the right piece, run appointments and keep the boutique beautiful. Jewellery knowledge welcome, curiosity essential.' },
		{ title: 'Bench Jeweller — Atelier', type: 'Full-time · Workshop', detail: 'Resizing, repairs and bespoke making alongside our senior jeweller. Two years’ bench experience or a recognised qualification.' },
		{ title: 'E-commerce Assistant', type: 'Part-time · Hybrid', detail: 'Product pages, photography prep and customer messages. An eye for detail and a steady hand with words.' },
		{ title: 'Weekend Sales Associate', type: 'Part-time · In store', detail: 'Saturdays in the boutique — the busiest, happiest day of the week. Great for students of design or gemmology.' }
	];
</script>

<svelte:head>
	<title>Careers — Aurel Jewels</title>
	<meta
		name="description"
		content="Work at Aurel Jewels — open roles in the SoHo boutique, the atelier and e-commerce."
	/>
	<link rel="canonical" href="{site.url}/careers" />
	<meta property="og:url" content="{site.url}/careers" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Careers' }]} />

<PageHero
	eyebrow="CAREERS"
	title="Come and make beautiful things"
	subtitle="A small team, a SoHo boutique and an atelier that still does things by hand. These are the roles open right now."
/>

<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="space-y-4">
		{#each roles as r (r.title)}
			<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<div class="flex flex-wrap items-baseline justify-between gap-2">
					<h2 class="font-display text-xl font-semibold text-ink">{r.title}</h2>
					<span class="text-sm font-semibold text-emerald">{r.type}</span>
				</div>
				<p class="mt-2 leading-relaxed text-muted">{r.detail}</p>
				<a
					href="mailto:{site.email}?subject=Application — {encodeURIComponent(r.title)}"
					class="mt-4 inline-flex min-h-12 items-center rounded-full bg-emerald px-6 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
				>
					Apply by email
				</a>
			</article>
		{/each}
	</div>
	<p class="mt-8 text-sm leading-relaxed text-muted">
		Nothing that fits? Write to <a href="mailto:{site.email}" class="font-semibold text-emerald underline underline-offset-2">{site.email}</a>
		with what you do best — we keep good speculative applications on file for six months.
		Roles listed here are mock postings for this demo site.
	</p>
</section>
