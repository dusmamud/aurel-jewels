<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { financingOptions, instalment, products, site, usd } from '#lib/data/site.ts';

	const example = products.find((p) => p.slug === 'eternal-spark-ring') ?? products[0];
</script>

<svelte:head>
	<title>Financing — Aurel Jewels</title>
	<meta
		name="description"
		content="Pay for your Aurel piece over time: 4 interest-free payments with Klarna or Afterpay, or monthly payments with Affirm. Subject to approval — your terms are shown at checkout."
	/>
	<link rel="canonical" href="{site.url}/financing" />
	<meta property="og:url" content="{site.url}/financing" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Financing' }]} />

<PageHero
	eyebrow="FINANCING"
	title="Split it. No interest, no drama."
	subtitle="Four interest-free payments, or monthly payments for larger pieces. Your exact terms are shown at checkout before you commit — nothing is charged until you agree."
/>

<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-14">
	<div class="space-y-6">
		{#each financingOptions as option (option.name)}
			<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-medium text-ink">{option.name}</h2>
				<p class="mt-3 leading-relaxed text-muted">{option.detail}</p>
			</article>
		{/each}

		{#if example}
			<article class="rounded-3xl bg-emerald-soft p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-medium text-ink">What it looks like</h2>
				<p class="mt-3 leading-relaxed text-muted">
					Take the {example.name} at {usd(example.price)}: with Pay in 4, that is
					<strong class="text-ink"> 4 payments of {instalment(example.price)}</strong> — the first
					at checkout, then one every two weeks. No interest, no fees when you pay on time.
				</p>
				<a
					href="/shop/{example.slug}"
					class="mt-5 inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
				>
					View the {example.name}
				</a>
			</article>
		{/if}

		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Good to know</h2>
			<ul class="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-muted">
				<li>
					Pay in 4 is interest-free. Monthly financing terms depend on your purchase and your
					eligibility — the provider shows your exact terms at checkout before you commit.
				</li>
				<li>
					Financing is subject to approval. The provider — not Aurel — checks eligibility at
					checkout. This demo site runs no real credit check.
				</li>
				<li>
					Late or missed payments can incur fees from the provider and may affect your standing
					with them. If a payment will be late, contact the provider first.
				</li>
				<li>
					Your piece is still covered by our lifetime craftsmanship warranty and 30-day returns,
					however you pay for it.
				</li>
			</ul>
			<p class="mt-5 text-sm leading-relaxed text-muted">
				Questions? See our <a href="/faq" class="font-semibold text-emerald underline underline-offset-2">FAQs</a>
				or email
				<a href="mailto:{site.email}" class="font-semibold break-all text-emerald underline underline-offset-2">{site.email}</a>.
			</p>
		</article>
	</div>
</section>
