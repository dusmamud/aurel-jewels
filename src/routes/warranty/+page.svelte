<script lang="ts">
	import { Check, ShieldCheck, X } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import {
		authenticityPoints,
		site,
		warrantyClaimSteps,
		warrantyCovers,
		warrantyExcludes,
		warrantyPromise
	} from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Warranty &amp; Authenticity — Aurel Jewels</title>
	<meta
		name="description"
		content="Lifetime warranty — craftsmanship, covered for life. What Aurel's warranty covers and excludes, GIA/IGI certification, hallmarking, insured shipping and how to claim."
	/>
	<link rel="canonical" href="{site.url}/warranty" />
	<meta property="og:url" content="{site.url}/warranty" />
</svelte:head>

<Breadcrumbs
	items={[{ label: 'Home', href: '/' }, { label: 'Warranty & Authenticity' }]}
/>

<PageHero
	eyebrow="WARRANTY & AUTHENTICITY"
	title="Lifetime warranty — craftsmanship, covered for life"
	subtitle="The same promise on every product page, in full. If our making ever fails you, we fix it — free, for as long as you own the piece."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
	<div class="grid gap-6 lg:grid-cols-2">
		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="flex items-center gap-2 font-display text-2xl font-medium text-ink">
				<ShieldCheck size={24} aria-hidden="true" class="shrink-0 text-emerald" /> What the warranty covers
			</h2>
			<ul class="mt-5 space-y-3">
				{#each warrantyCovers as item}
					<li class="flex items-start gap-3 leading-relaxed text-muted">
						<Check size={19} aria-hidden="true" class="mt-0.5 shrink-0 text-emerald" />
						<span>{item}</span>
					</li>
				{/each}
			</ul>
		</article>

		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">What it does not cover</h2>
			<ul class="mt-5 space-y-3">
				{#each warrantyExcludes as item}
					<li class="flex items-start gap-3 leading-relaxed text-muted">
						<X size={19} aria-hidden="true" class="mt-0.5 shrink-0 text-muted" />
						<span>{item}</span>
					</li>
				{/each}
			</ul>
			<p class="mt-5 text-sm leading-relaxed text-muted">
				The 30-day return policy is separate from the warranty: any unworn piece in its original
				packaging can be returned within 30 days for a full refund — except final sale items and
				engraved or personalised pieces, which cannot be returned. See <a
					href="/returns"
					class="font-semibold text-emerald underline underline-offset-2">Returns &amp; Refunds</a
				>.
			</p>
		</article>
	</div>

	<div class="mt-6 grid gap-6 lg:grid-cols-3">
		{#each authenticityPoints as point (point.title)}
			<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-xl font-medium text-ink">{point.title}</h2>
				<p class="mt-3 text-[0.95rem] leading-relaxed text-muted">{point.detail}</p>
			</article>
		{/each}
	</div>

	<article class="mt-6 rounded-3xl bg-emerald-soft p-6 ring-1 ring-line sm:p-8">
		<h2 class="font-display text-2xl font-medium text-ink">How to make a claim</h2>
		<ol class="mt-5 grid gap-5 sm:grid-cols-3">
			{#each warrantyClaimSteps as step, i (step.title)}
				<li class="rounded-2xl bg-white p-5 ring-1 ring-line">
					<p
						class="flex h-9 w-9 items-center justify-center rounded-full bg-emerald text-sm font-bold text-white"
					>
						{i + 1}
					</p>
					<h3 class="mt-3 font-semibold text-ink">{step.title}</h3>
					<p class="mt-1 text-sm leading-relaxed text-muted">{step.detail}</p>
				</li>
			{/each}
		</ol>
		<p class="mt-5 leading-relaxed text-muted">
			{warrantyPromise} Questions? Email
			<a href="mailto:{site.email}" class="font-semibold break-all text-emerald underline underline-offset-2">{site.email}</a>
			or call
			<a href={site.phoneHref} class="font-semibold text-emerald underline underline-offset-2">{site.phoneDisplay}</a>.
		</p>
	</article>
</section>
