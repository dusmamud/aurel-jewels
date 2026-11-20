<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { site } from '#lib/data/site.ts';

	const ringSizes = [
		{ us: '5', circumference: '49.3', diameter: '15.7' },
		{ us: '5½', circumference: '50.6', diameter: '16.1' },
		{ us: '6', circumference: '51.9', diameter: '16.5' },
		{ us: '6½', circumference: '53.1', diameter: '16.9' },
		{ us: '7', circumference: '54.4', diameter: '17.3' },
		{ us: '7½', circumference: '55.7', diameter: '17.7' },
		{ us: '8', circumference: '57.0', diameter: '18.2' },
		{ us: '8½', circumference: '58.3', diameter: '18.6' },
		{ us: '9', circumference: '59.5', diameter: '18.9' }
	];
</script>

<svelte:head>
	<title>Size Guide — Aurel Jewels</title>
	<meta
		name="description"
		content="US ring sizes 5–9 with circumference and diameter, how to measure your ring size at home with a paper strip, and bracelet and necklace lengths."
	/>
	<link rel="canonical" href="{site.url}/size-guide" />
	<meta property="og:url" content="{site.url}/size-guide" />
</svelte:head>

<PageHero
	eyebrow="SIZE GUIDE"
	title="Find your perfect fit"
	subtitle="Rings, bracelets and necklaces, measured once and worn comfortably for years. If you are between sizes, size up — and remember, your first resize within 30 days is free."
/>

<section class="mx-auto max-w-3xl px-4 py-14 sm:px-6">
	<div class="space-y-6">
		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Ring size chart (US)</h2>
			<p class="mt-3 leading-relaxed text-muted">
				All Aurel rings are sold in US sizes 5–9, including half sizes. Find your size below by
				circumference (the length around your finger) or by the inside diameter of a ring that
				already fits.
			</p>
			<div class="mt-5 overflow-x-auto">
				<table class="w-full min-w-[420px] text-left text-[0.95rem]">
					<thead>
						<tr class="border-b border-line text-sm text-muted">
							<th scope="col" class="py-2 pr-4 font-semibold">US size</th>
							<th scope="col" class="py-2 pr-4 font-semibold">Circumference (mm)</th>
							<th scope="col" class="py-2 font-semibold">Diameter (mm)</th>
						</tr>
					</thead>
					<tbody class="text-ink/85">
						{#each ringSizes as row}
							<tr class="border-b border-line last:border-0">
								<td class="py-2.5 pr-4 font-semibold">{row.us}</td>
								<td class="py-2.5 pr-4">{row.circumference}</td>
								<td class="py-2.5">{row.diameter}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</article>

		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">How to measure at home</h2>
			<p class="mt-3 leading-relaxed text-muted">
				All you need is a strip of paper, a pen and a ruler. Measure in the evening, when your
				fingers are at their largest, and measure the exact finger you will wear the ring on.
			</p>
			<ol class="mt-4 list-decimal space-y-3 pl-5 leading-relaxed text-muted">
				<li>
					<strong class="text-ink">Wrap the strip.</strong> Wrap a thin strip of paper snugly around
					the base of your finger, where the ring will sit. Mark where the paper overlaps.
				</li>
				<li>
					<strong class="text-ink">Measure the length.</strong> Lay the paper flat and measure from
					the end to the mark in millimetres. That is your finger's circumference.
				</li>
				<li>
					<strong class="text-ink">Find your size.</strong> Match the measurement to the chart above.
					If you fall between two sizes, choose the larger one — a ring should slide on with a
					little resistance and come off with a gentle twist.
				</li>
			</ol>
			<p class="mt-4 leading-relaxed text-muted">
				Tip: if your knuckle is noticeably wider than the base of your finger, measure both and
				pick the size that fits over the knuckle comfortably.
			</p>
		</article>

		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Bracelet &amp; necklace lengths</h2>
			<div class="mt-4 space-y-4 leading-relaxed text-muted">
				<div>
					<h3 class="font-semibold text-ink">Bracelets</h3>
					<p class="mt-1">
						Our bracelets come in 6.5 in (snug), 7 in (standard, fits most wrists) and 7.5 in
						(relaxed). Measure your wrist snugly with a tape and add 0.5 in for a comfortable fit.
					</p>
				</div>
				<div>
					<h3 class="font-semibold text-ink">Necklaces</h3>
					<p class="mt-1">
						Most Aurel necklaces are adjustable 16–18 in: 16 in sits at the collarbone, 18 in
						sits just below it. Longer chains (20–22 in) are available on selected pieces and
						layer beautifully over the shorter lengths.
					</p>
				</div>
			</div>
		</article>

		<article class="rounded-3xl bg-emerald-soft p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Free first resize</h2>
			<p class="mt-3 leading-relaxed text-muted">
				Your <strong class="text-ink">first resize within 30 days of purchase is free</strong>.
				Email
				<a href="mailto:{site.email}" class="font-semibold break-all text-gold-dark underline underline-offset-4">{site.email}</a>
				with your order number and we will send a prepaid label. Resizes after 30 days, or
				additional resizes, cost $15 plus shipping.
			</p>
		</article>
	</div>
</section>
