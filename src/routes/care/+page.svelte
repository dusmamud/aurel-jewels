<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Jewellery Care — Aurel Jewels</title>
	<meta
		name="description"
		content="How to clean, store and care for your Aurel jewellery — including emerald-specific care, what to avoid, and when to bring a piece in for a check."
	/>
	<link rel="canonical" href="{site.url}/care" />
	<meta property="og:url" content="{site.url}/care" />
</svelte:head>

<PageHero
	eyebrow="JEWELLERY CARE"
	title="Keep it brilliant for years"
	subtitle="Fine jewellery is made to be worn every day — and a two-minute routine is all it takes to keep it looking like the day it arrived."
/>

<section class="mx-auto max-w-3xl px-4 py-14 sm:px-6">
	<div class="space-y-6">
		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Cleaning</h2>
			<p class="mt-3 leading-relaxed text-muted">
				Clean your pieces regularly with <strong class="text-ink">lukewarm water and a drop of mild
				soap</strong>. Soak for a few minutes, brush gently with a soft toothbrush, rinse, and pat
				dry with a soft, lint-free cloth. Finish with a jewellery polishing cloth for extra shine.
			</p>
			<p class="mt-3 leading-relaxed text-muted">
				Do not use toothpaste, baking soda or abrasive cleaners — they scratch gold plating. And
				never use ultrasonic cleaners or steam on emerald pieces (see below).
			</p>
		</article>

		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Storage</h2>
			<ul class="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-muted">
				<li>Store each piece separately in its soft pouch or a lined jewellery box — stones scratch each other.</li>
				<li>Keep pieces in a cool, dry place, away from direct sunlight and humidity.</li>
				<li>Fasten chains and clasps before storing, so they do not tangle.</li>
				<li>Your Aurel gift box is made for storage, not just for giving — keep using it.</li>
			</ul>
		</article>

		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">What to avoid</h2>
			<ul class="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-muted">
				<li><strong class="text-ink">Perfume, hairspray and lotions</strong> — put your jewellery on last, after everything else, and let products dry first.</li>
				<li><strong class="text-ink">Water</strong> — take pieces off before swimming, showering or bathing. Chlorine and salt water are especially harsh on plating.</li>
				<li><strong class="text-ink">Harsh chemicals</strong> — household cleaners, bleach and acetone can damage plating and stones. Wear gloves, or take rings off.</li>
				<li><strong class="text-ink">Hard knocks</strong> — take rings off for the gym, gardening and heavy housework.</li>
			</ul>
		</article>

		<article class="rounded-3xl bg-emerald-soft p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Emerald-specific care</h2>
			<p class="mt-3 leading-relaxed text-muted">
				Emerald is softer than diamond and is traditionally oiled to enhance its colour — so it
				needs a gentler hand. Clean emerald pieces only with lukewarm water, mild soap and a soft
				brush. <strong class="text-ink">Never use ultrasonic cleaners, steam cleaners or harsh
				chemicals</strong> on emerald — they can strip the oil and dull the stone.
			</p>
			<p class="mt-3 leading-relaxed text-muted">
				Store emerald pieces separately from harder stones (diamonds and cubic zirconia can scratch
				them), and take emerald rings off before any activity where they might be knocked.
			</p>
		</article>

		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Professional check, once a year</h2>
			<p class="mt-3 leading-relaxed text-muted">
				Bring your pieces in for a <strong class="text-ink">professional check once a year</strong> —
				prongs loosen slowly, clasps wear, and catching it early is a five-minute fix instead of a
				lost stone. Visit the SoHo boutique any time during opening hours, or email
				<a href="mailto:{site.email}" class="font-semibold break-all text-gold-dark underline underline-offset-4">{site.email}</a>
				to book a check. Treated well, your Aurel pieces will only get more beautiful with time.
			</p>
			<p class="mt-4">
				<a href="/services" class="inline-flex min-h-12 items-center rounded-full bg-emerald px-6 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep">
					Book cleaning, polishing &amp; repairs →
				</a>
			</p>
		</article>

		<p class="text-center leading-relaxed text-muted">
			Not sure how to care for a specific piece?
			<a href="/contact" class="font-semibold text-gold-dark underline underline-offset-4">Ask us →</a>
		</p>
	</div>
</section>
