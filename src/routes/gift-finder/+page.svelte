<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import { collections, products, site, type Product } from '#lib/data/site.ts';

	type Answer = string | null;

	const questions = [
		{
			id: 'recipient',
			ask: 'Who is the gift for?',
			options: [
				{ value: 'partner', label: 'My partner' },
				{ value: 'friend', label: 'A friend' },
				{ value: 'family', label: 'Family' },
				{ value: 'myself', label: 'Myself' }
			]
		},
		{
			id: 'occasion',
			ask: 'What is the occasion?',
			options: [
				{ value: 'birthday', label: 'Birthday' },
				{ value: 'anniversary', label: 'Anniversary' },
				{ value: 'graduation', label: 'Graduation' },
				{ value: 'wedding', label: 'Wedding' },
				{ value: 'just-because', label: 'Just because' }
			]
		},
		{
			id: 'budget',
			ask: 'What is your budget?',
			options: [
				{ value: 'under-75', label: 'Under $75' },
				{ value: '75-120', label: '$75 – $120' },
				{ value: 'over-120', label: 'Over $120' }
			]
		},
		{
			id: 'style',
			ask: 'What is their style?',
			options: [
				{ value: 'classic', label: 'Classic & timeless' },
				{ value: 'bold', label: 'Bold & bright' },
				{ value: 'delicate', label: 'Delicate & everyday' }
			]
		}
	] as const;

	let step = $state(0);
	let answers = $state<Record<string, Answer>>({ recipient: null, occasion: null, budget: null, style: null });
	let showResults = $state(false);

	const bridalSlugs = new Set(collections.find((c) => c.slug === 'bridal')?.productSlugs ?? []);
	const emeraldSlugs = new Set(collections.find((c) => c.slug === 'emerald')?.productSlugs ?? []);

	const results = $derived.by((): { list: Product[]; relaxed: boolean } => {
		if (!showResults) return { list: [], relaxed: false };
		let list = [...products];
		const recipient = answers.recipient;
		if (recipient === 'partner') list = list.filter((p) => ['rings', 'necklaces'].includes(p.category));
		else if (recipient === 'friend') list = list.filter((p) => ['earrings', 'bracelets'].includes(p.category));
		else if (recipient === 'family') list = list.filter((p) => p.gift);
		const occasion = answers.occasion;
		if (occasion === 'wedding') list = list.filter((p) => bridalSlugs.has(p.slug));
		else if (occasion === 'anniversary') list = list.filter((p) => emeraldSlugs.has(p.slug));
		else if (occasion === 'birthday' || occasion === 'graduation')
			list = list.filter((p) => p.gift);
		const budget = answers.budget;
		if (budget === 'under-75') list = list.filter((p) => p.price < 75);
		else if (budget === '75-120') list = list.filter((p) => p.price >= 75 && p.price <= 120);
		else if (budget === 'over-120') list = list.filter((p) => p.price > 120);
		const style = answers.style;
		if (style === 'classic')
			list = list.filter((p) => ['necklaces', 'earrings'].includes(p.category));
		else if (style === 'bold')
			list = list.filter((p) => emeraldSlugs.has(p.slug) || p.slug === 'celestial-tennis-necklace');
		else if (style === 'delicate')
			list = list.filter((p) => ['bracelets', 'earrings'].includes(p.category) || p.slug === 'vintage-gold-band');
		if (list.length > 0) return { list: list.slice(0, 6), relaxed: false };
		// No exact match: fall back to our most-gifted pieces rather than an empty page.
		return { list: products.filter((p) => p.gift).slice(0, 6), relaxed: true };
	});

	function pick(value: string) {
		const q = questions[step];
		if (!q) return;
		answers = { ...answers, [q.id]: value };
		if (step < questions.length - 1) step += 1;
		else showResults = true;
	}

	function startOver() {
		answers = { recipient: null, occasion: null, budget: null, style: null };
		step = 0;
		showResults = false;
	}
</script>

<svelte:head>
	<title>Gift Finder — Aurel Jewels</title>
	<meta
		name="description"
		content="Not sure what to give? Answer four quick questions — who it is for, the occasion, your budget and their style — and we will match pieces from the Aurel shop."
	/>
	<link rel="canonical" href="{site.url}/gift-finder" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Gift Finder' }]} />

<PageHero
	eyebrow="GIFT FINDER"
	title="Find the gift they will keep"
	subtitle="Four questions, thirty seconds, and a shortlist of pieces that fit the person, the occasion and your budget."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
	{#if !showResults}
		{@const q = questions[step]}
		<div class="mx-auto max-w-2xl">
			<ol class="flex items-center gap-2" aria-label="Quiz progress">
				{#each questions as item, i (item.id)}
					<li class="flex min-h-12 flex-1 items-center gap-2">
						<span
							class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold {i <=
							step
								? 'bg-emerald text-white'
								: 'bg-white text-muted ring-1 ring-line'}"
							aria-current={i === step ? 'step' : undefined}
						>
							{i + 1}
						</span>
						{#if i < questions.length - 1}
							<span aria-hidden="true" class="h-px flex-1 bg-line"></span>
						{/if}
					</li>
				{/each}
			</ol>
			{#if q}
				<h2 class="mt-8 font-display text-[clamp(1.6rem,4vw,2.2rem)] font-medium text-ink">
					{q.ask}
				</h2>
				<div class="mt-6 grid gap-3 sm:grid-cols-2">
					{#each q.options as opt (opt.value)}
						<button
							type="button"
							onclick={() => pick(opt.value)}
							class="flex min-h-14 items-center justify-center rounded-2xl bg-white px-5 py-4 text-base font-semibold text-ink ring-1 ring-line transition-colors duration-150 hover:bg-emerald-soft hover:ring-emerald"
						>
							{opt.label}
						</button>
					{/each}
				</div>
				{#if step > 0}
					<button
						type="button"
						onclick={() => (step -= 1)}
						class="mt-6 inline-flex min-h-12 items-center rounded-full px-6 text-sm font-bold text-emerald ring-1 ring-line transition-colors duration-150 hover:ring-emerald"
					>
						← Back
					</button>
				{/if}
			{/if}
		</div>
	{:else}
		<div class="flex flex-wrap items-center justify-between gap-4">
			<div>
				<h2 class="font-display text-[clamp(1.6rem,4vw,2.2rem)] font-medium text-ink">
					Your matches
				</h2>
				<p class="mt-2 text-muted">
					{results.relaxed
						? 'No piece matched every answer, so here are our most-gifted pieces instead — every one arrives in the signature emerald gift box.'
						: `${results.list.length} ${results.list.length === 1 ? 'piece' : 'pieces'} that fit your answers.`}
				</p>
			</div>
			<button
				type="button"
				onclick={startOver}
				class="inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
			>
				Start over
			</button>
		</div>
		<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each results.list as product (product.slug)}
				<ProductCard {product} />
			{/each}
		</div>
		<div class="mt-10 rounded-3xl bg-emerald-soft p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Not quite right? Give them the choice.</h2>
			<p class="mt-3 max-w-2xl leading-relaxed text-muted">
				A gift card lets them pick their own piece — $50 to $250, delivered by email the same day
				or as a printed card, with your message inside.
			</p>
			<a
				href="/gift-cards"
				class="mt-5 inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
			>
				Shop gift cards
			</a>
		</div>
	{/if}
</section>
