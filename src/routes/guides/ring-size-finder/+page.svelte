<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { ringSizerSizes, site } from '#lib/data/site.ts';

	function printSizer() {
		window.print();
	}
</script>

<svelte:head>
	<title>Ring Size Finder — Aurel Jewels</title>
	<meta
		name="description"
		content="Find your ring size at home: print our ring sizer, match a ring you already own to a true-size circle, and read our measuring tips and between-sizes advice."
	/>
	<link rel="canonical" href="{site.url}/guides/ring-size-finder" />
</svelte:head>

<Breadcrumbs
	items={[
		{ label: 'Home', href: '/' },
		{ label: 'Guides', href: '/guides' },
		{ label: 'Ring Size Finder' }
	]}
/>

<PageHero
	eyebrow="GUIDES · SIZING"
	title="Ring size finder"
	subtitle="Print the sizer below, match a ring you already own — or measure your finger with a paper strip. Two minutes, no guesswork."
/>

<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-14">
	<div class="space-y-6">
		<article id="print-sizer" class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Printable ring sizer</h2>
			<p class="mt-3 leading-relaxed text-muted">
				Print this page at 100% scale (not "fit to page"). Place a ring you already own — on the
				same finger — over the circles below. The right circle matches the <em>inside</em> edge of
				your ring exactly.
			</p>
			<p class="mt-3 text-sm leading-relaxed text-muted">
				Check your print scale first: a standard credit card is 85.6 mm wide. If the line below
				measures 85.6 mm with a ruler, your sizer is true to size.
			</p>
			<div class="mt-4">
				<div class="h-1 w-[85.6mm] max-w-full bg-ink" aria-hidden="true"></div>
				<p class="mt-1 text-xs text-muted">This line must measure 85.6 mm — the width of a credit card.</p>
			</div>
			<div class="mt-8 flex flex-wrap items-end gap-5">
				{#each ringSizerSizes as size (size.us)}
					<div class="flex flex-col items-center gap-2">
						<div
							class="flex items-center justify-center rounded-full border-2 border-emerald bg-cream"
							style="width: {size.diameter}mm; height: {size.diameter}mm;"
							aria-label="US size {size.us}, {size.diameter} millimetres inside diameter"
						>
							<span class="text-xs font-bold text-emerald">{size.us}</span>
						</div>
						<p class="text-center text-xs text-muted">
							US {size.us}<br />{size.diameter} mm
						</p>
					</div>
				{/each}
			</div>
			<button
				type="button"
				onclick={printSizer}
				class="mt-8 inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep print:hidden"
			>
				Print the sizer
			</button>
		</article>

		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">How to measure at home</h2>
			<ol class="mt-4 list-decimal space-y-3 pl-5 leading-relaxed text-muted">
				<li>
					<strong class="text-ink">Wrap a paper strip.</strong> Wrap a thin strip of paper snugly around
					the base of the exact finger you will wear the ring on. Mark where the paper overlaps.
				</li>
				<li>
					<strong class="text-ink">Measure in millimetres.</strong> Lay the paper flat and measure from
					the end to the mark. That is your finger's circumference.
				</li>
				<li>
					<strong class="text-ink">Match the chart.</strong> Compare your measurement to the full
					size chart on our <a
						href="/size-guide"
						class="font-semibold text-emerald underline underline-offset-2">size guide page</a
					> — it lists every US size from 5 to 9 with circumference and diameter.
				</li>
			</ol>
			<p class="mt-4 leading-relaxed text-muted">
				Measure in the evening, when your fingers are at their largest, and when your hands are
				warm — cold fingers measure a half size smaller.
			</p>
		</article>

		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Between sizes? Size up.</h2>
			<p class="mt-3 leading-relaxed text-muted">
				If you fall between two sizes, choose the larger one — a ring should slide on with a
				little resistance and come off with a gentle twist. If your knuckle is noticeably wider
				than the base of your finger, measure both and pick the size that fits over the knuckle
				comfortably. And if it still is not right: your <strong class="text-ink"
					>first resize within 30 days is free</strong
				> — email us your order number and we will send a prepaid label.
			</p>
			<p class="mt-4 leading-relaxed text-muted">
				Buying a surprise? A size 7 fits the average woman's ring finger, and a size 9 fits the
				average man's — but the free resize means a good guess is good enough.
			</p>
			<a
				href="/shop?category=rings"
				class="mt-5 inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
			>
				Shop rings
			</a>
		</article>
	</div>
</section>

<style>
	/* Print only the sizer: hide the site chrome and the rest of the page. */
	@media print {
		:global(body *) {
			visibility: hidden;
		}
		:global(#print-sizer),
		:global(#print-sizer *) {
			visibility: visible;
		}
		:global(#print-sizer) {
			position: absolute;
			inset: 0;
			width: 100%;
			border: none;
			box-shadow: none;
		}
	}
</style>
