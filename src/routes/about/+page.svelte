<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Our Story — Aurel Jewels</title>
	<meta
		name="description"
		content="Aurel Jewels began in a small SoHo atelier with a simple idea: fine jewellery, honestly made, for everyday brilliance. Meet the makers behind the pieces."
	/>
	<link rel="canonical" href="{site.url}/about" />
	<meta property="og:url" content="{site.url}/about" />
</svelte:head>

<PageHero
	eyebrow="OUR STORY"
	title="Fine jewellery, honestly made"
	subtitle="Aurel began in a small SoHo atelier with a simple idea: beautiful pieces should not be reserved for special occasions. They should be worn, loved and lived in — every day."
/>

<!-- Story -->
<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
	<div class="grid items-center gap-10 lg:grid-cols-2">
		<div class="min-w-0 overflow-hidden rounded-3xl border border-line">
			<Picture
				name="atelier"
				alt="Inside the Aurel Jewels atelier in SoHo, New York"
				width={1000}
				height={750}
				sizes="(max-width: 1024px) 90vw, 560px"
				imgClass="aspect-[4/3] h-auto w-full object-cover"
				pictureClass="block"
			/>
		</div>
		<div class="min-w-0">
			<p class="text-xs font-bold tracking-[0.3em] text-gold-dark">HOW IT STARTED</p>
			<h2 class="mt-3 font-display text-[clamp(1.7rem,3.5vw,2.3rem)] font-medium text-ink">
				A small atelier with a big standard
			</h2>
			<p class="mt-4 leading-relaxed text-muted">
				Aurel was founded by jewellers who had spent years making pieces for other brands — and who
				kept hearing the same thing from customers: why does fine jewellery have to feel so
				unapproachable? We decided to build the shop we wanted to walk into.
			</p>
			<p class="mt-4 leading-relaxed text-muted">
				Today our SoHo boutique at {site.addressShort} is both a shop and a workshop. You can try a
				ring on, watch a setter at work, and ask anything — about stones, metals, sizing or care —
				without a sales pitch attached.
			</p>
			<p class="mt-4 leading-relaxed text-muted">
				Every piece is designed in-house, made to be worn daily, and checked by hand before it is
				boxed. If it is not something we would give to someone we love, it does not leave the
				atelier.
			</p>
		</div>
	</div>
</section>

<!-- Stats -->
<section class="border-y border-line bg-sand/60">
	<div class="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-center sm:grid-cols-3 sm:px-6 lg:px-8">
		<div>
			<p class="font-display text-4xl font-medium text-emerald">12k+</p>
			<p class="mt-1 text-sm font-semibold tracking-wide text-muted">happy customers</p>
		</div>
		<div>
			<p class="font-display text-4xl font-medium text-emerald">4.9</p>
			<p class="mt-1 text-sm font-semibold tracking-wide text-muted">average customer rating</p>
		</div>
		<div>
			<p class="font-display text-4xl font-medium text-emerald">25+</p>
			<p class="mt-1 text-sm font-semibold tracking-wide text-muted">artisans &amp; makers</p>
		</div>
	</div>
</section>

<!-- Craft -->
<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
	<div class="grid items-center gap-10 lg:grid-cols-2">
		<div class="min-w-0 order-2 lg:order-1">
			<p class="text-xs font-bold tracking-[0.3em] text-gold-dark">THE CRAFT</p>
			<h2 class="mt-3 font-display text-[clamp(1.7rem,3.5vw,2.3rem)] font-medium text-ink">
				Made slowly, worn daily
			</h2>
			<p class="mt-4 leading-relaxed text-muted">
				Good jewellery is mostly invisible work: a prong set exactly right, a clasp that clicks
				shut the same way on day one and day one thousand, a finish that stays bright through
				real life. Our makers obsess over those details so you never have to think about them.
			</p>
			<p class="mt-4 leading-relaxed text-muted">
				Each piece passes through several hands — designer, setter, polisher, checker — before it
				is placed in our signature emerald gift box. It is a slower way to work, and we would not
				have it any other way.
			</p>
		</div>
		<div class="min-w-0 order-1 overflow-hidden rounded-3xl border border-line lg:order-2">
			<Picture
				name="craft-hands"
				alt="A jeweller's hands setting a stone in the Aurel atelier"
				width={1000}
				height={750}
				sizes="(max-width: 1024px) 90vw, 560px"
				imgClass="aspect-[4/3] h-auto w-full object-cover"
				pictureClass="block"
			/>
		</div>
	</div>
</section>

<!-- Values -->
<section class="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
	<div class="text-center">
		<p class="text-xs font-bold tracking-[0.3em] text-gold-dark">OUR VALUES</p>
		<h2 class="mt-3 font-display text-[clamp(1.9rem,4vw,2.6rem)] font-medium text-ink">
			What we will not compromise on
		</h2>
	</div>
	<div class="mt-10 grid gap-6 md:grid-cols-3">
		<article class="rounded-3xl bg-white p-6 ring-1 ring-line">
			<h3 class="font-display text-xl font-semibold text-ink">Premium Materials</h3>
			<p class="mt-3 leading-relaxed text-muted">
				14k gold-plated sterling silver, lab-created emeralds and cubic zirconia cut to catch
				light — chosen for beauty first, and for how they hold up to everyday wear.
			</p>
		</article>
		<article class="rounded-3xl bg-white p-6 ring-1 ring-line">
			<h3 class="font-display text-xl font-semibold text-ink">Expert Craftsmanship</h3>
			<p class="mt-3 leading-relaxed text-muted">
				Every piece is finished and inspected by hand in our atelier. Secure clasps, comfortable
				fits and settings built to keep their stones exactly where they belong.
			</p>
		</article>
		<article class="rounded-3xl bg-white p-6 ring-1 ring-line">
			<h3 class="font-display text-xl font-semibold text-ink">Timeless Designs</h3>
			<p class="mt-3 leading-relaxed text-muted">
				We design for decades, not seasons. Classic solitaires, tennis lines and emerald halos
				that look as right in ten years as they do today.
			</p>
		</article>
	</div>
</section>

<!-- Materials -->
<section id="materials" class="mx-auto max-w-7xl scroll-mt-24 px-4 pb-14 sm:px-6 lg:px-8">
	<div class="rounded-3xl bg-emerald-soft p-6 ring-1 ring-line sm:p-10">
		<h2 class="font-display text-[clamp(1.7rem,3.5vw,2.3rem)] font-medium text-ink">Our materials</h2>
		<p class="mt-4 max-w-3xl leading-relaxed text-muted">
			We use 14k gold-plated sterling silver for our bands and chains — solid silver beneath a
			thick layer of gold, so pieces keep their colour and weight. Our centre stones are
			lab-created emeralds and cubic zirconia: real sparkle and real green, without the mining
			footprint or the price tag of mined stones. Every piece is nickel-free and hypoallergenic.
		</p>
		<ul class="mt-6 grid gap-3 text-[0.95rem] text-ink/85 sm:grid-cols-2">
			<li>• 14k gold-plated sterling silver, tarnish-resistant coated</li>
			<li>• Lab-created emeralds and cubic zirconia</li>
			<li>• Nickel-free and hypoallergenic, always</li>
			<li>• Recycled gold used wherever possible</li>
		</ul>
	</div>
</section>

<!-- Sustainability -->
<section id="sustainability" class="mx-auto max-w-7xl scroll-mt-24 px-4 pb-14 sm:px-6 lg:px-8">
	<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-10">
		<h2 class="font-display text-[clamp(1.7rem,3.5vw,2.3rem)] font-medium text-ink">Sustainability</h2>
		<p class="mt-4 max-w-3xl leading-relaxed text-muted">
			Jewellery should not cost the earth. We use lab-created stones instead of mined ones, recycle
			gold where we can, and audit every workshop partner for fair labour practices. Our packaging
			is plastic-free and recyclable, and our gift boxes are made to be kept — not thrown away.
		</p>
		<p class="mt-4 max-w-3xl leading-relaxed text-muted">
			We also believe the most sustainable piece is the one you keep. That is why we offer free
			resizing within 30 days, free repairs advice, and care guidance for every piece we sell —
			so the jewellery you buy today is still with you in ten years.
		</p>
	</div>
</section>

<!-- CTA -->
<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
	<div class="rounded-3xl bg-emerald p-8 text-center sm:p-12">
		<h2 class="font-display text-[clamp(1.7rem,3.5vw,2.3rem)] font-medium text-white">
			See what the atelier made
		</h2>
		<p class="mx-auto mt-3 max-w-xl leading-relaxed text-white/80">
			Browse the collection — every piece arrives in our signature emerald gift box, ready to give
			or to keep.
		</p>
		<a
			href="/shop"
			class="mt-6 inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-base font-semibold text-white transition-colors duration-200 hover:bg-emerald-deep"
		>
			Shop the collection →
		</a>
	</div>
</section>
