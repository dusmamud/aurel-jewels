<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Metals &amp; Gemstones Guide — Aurel Jewels</title>
	<meta
		name="description"
		content="Gold explained plainly: 14k vs 18k, yellow vs white vs rose gold, vermeil vs solid vs gold-fill, and platinum — plus lab vs natural diamonds and emeralds, and the 4Cs."
	/>
	<link rel="canonical" href="{site.url}/guides/metals-gemstones" />
</svelte:head>

<Breadcrumbs
	items={[
		{ label: 'Home', href: '/' },
		{ label: 'Guides', href: '/guides' },
		{ label: 'Metals & Gemstones' }
	]}
/>

<PageHero
	eyebrow="GUIDES · MATERIALS"
	title="Metals & gemstones, explained plainly"
	subtitle="What 14k actually means, why vermeil is not solid gold, and how lab-created stones compare to mined ones. No jargon, no upsell."
/>

<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-14">
	<div class="space-y-6">
		<article class="overflow-hidden rounded-3xl bg-white ring-1 ring-line">
			<Picture
				name="guide-metals"
				alt="A row of gold, white gold and rose gold bands beside loose green and white gemstones"
				width={1408}
				height={1760}
				sizes="(min-width: 768px) 50vw, 100vw"
				imgClass="aspect-[4/5] w-full object-cover sm:aspect-[16/10]"
			/>
			<div class="p-6 sm:p-8">
				<h2 class="font-display text-2xl font-medium text-ink">Gold: 14k vs 18k</h2>
				<p class="mt-3 leading-relaxed text-muted">
					Karat tells you how much of the metal is pure gold. 14k is 58.5% gold; 18k is 75%. 18k is
					richer in colour and slightly softer; 14k is harder, more scratch-resistant and better
					for rings you wear every day. Every Aurel piece is 14k gold over recycled sterling
					silver — chosen for daily wear, not for a display case.
				</p>
			</div>
		</article>

		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Yellow, white and rose gold</h2>
			<div class="mt-4 space-y-4 leading-relaxed text-muted">
				<p>
					<strong class="text-ink">Yellow gold</strong> is the classic — warm, timeless, and the easiest
					to match with other jewellery.
				</p>
				<p>
					<strong class="text-ink">White gold</strong> is gold alloyed with white metals and plated
					with rhodium for a bright, cool finish. The plating wears over years and can be re-done.
				</p>
				<p>
					<strong class="text-ink">Rose gold</strong> gets its pink tone from copper. It is romantic,
					distinctive, and hides scratches well.
				</p>
				<p>
					There is no better or worse — only what suits the wearer's skin tone and the rest of
					their jewellery box. When in doubt, match what they already wear.
				</p>
			</div>
		</article>

		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Vermeil vs solid gold vs gold-fill</h2>
			<div class="mt-4 overflow-x-auto">
				<table class="w-full min-w-[480px] text-left text-[0.95rem]">
					<thead>
						<tr class="border-b border-line text-sm text-muted">
							<th scope="col" class="py-2 pr-4 font-semibold">Type</th>
							<th scope="col" class="py-2 pr-4 font-semibold">What it is</th>
							<th scope="col" class="py-2 font-semibold">Best for</th>
						</tr>
					</thead>
					<tbody class="text-ink/85">
						<tr class="border-b border-line">
							<td class="py-2.5 pr-4 font-semibold">Gold vermeil</td>
							<td class="py-2.5 pr-4">Thick gold plating over sterling silver</td>
							<td class="py-2.5">Everyday fine jewellery — what Aurel uses</td>
						</tr>
						<tr class="border-b border-line">
							<td class="py-2.5 pr-4 font-semibold">Solid gold</td>
							<td class="py-2.5 pr-4">Gold all the way through (14k or 18k)</td>
							<td class="py-2.5">Heirloom pieces — and a much higher price</td>
						</tr>
						<tr class="border-b border-line">
							<td class="py-2.5 pr-4 font-semibold">Gold-fill</td>
							<td class="py-2.5 pr-4">A thick bonded layer of gold over brass</td>
							<td class="py-2.5">Costume jewellery that must survive water</td>
						</tr>
						<tr>
							<td class="py-2.5 pr-4 font-semibold">Gold-plated</td>
							<td class="py-2.5 pr-4">A very thin flash of gold over base metal</td>
							<td class="py-2.5">Fashion pieces — wears off fastest</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p class="mt-4 leading-relaxed text-muted">
				Aurel pieces are 14k gold vermeil over recycled sterling silver: a thick, durable gold
				layer on a precious-metal core — the right balance of beauty, durability and price.
			</p>
		</article>

		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Platinum</h2>
			<p class="mt-3 leading-relaxed text-muted">
				Platinum is rarer and denser than gold, naturally white (no plating to wear off) and
				hypoallergenic. It is heavier on the finger and costs more — our bespoke atelier offers it
				as an upgrade. For most everyday pieces, 14k white gold gives you the same look for less.
			</p>
		</article>

		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Gemstones: lab vs natural</h2>
			<p class="mt-3 leading-relaxed text-muted">
				A lab-created diamond is a diamond — same crystal, same hardness, same sparkle — grown in a
				laboratory instead of mined from the earth. The same is true of our lab-created emeralds.
				They are graded by the same labs (GIA and IGI) on the same 4Cs: cut, colour, clarity and
				carat. The differences are origin and price: lab stones cost far less and come with no
				mining behind them. Every lab stone over 0.5 ct ships with its GIA or IGI certificate.
			</p>
			<p class="mt-3 leading-relaxed text-muted">
				Our other stones — cubic zirconia and freshwater pearls — are chosen for the same reason:
				beautiful, durable, and honestly priced.
			</p>
			<p class="mt-4 leading-relaxed text-muted">
				Read more about how we source on our <a
					href="/sustainability"
					class="font-semibold text-emerald underline underline-offset-2">sustainability page</a
				>, and about the lifetime craftsmanship warranty on our
				<a href="/warranty" class="font-semibold text-emerald underline underline-offset-2"
					>warranty page</a
				>.
			</p>
		</article>
	</div>
</section>
