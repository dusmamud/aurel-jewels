<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { products, site } from '#lib/data/site.ts';

	const rings = products.filter((p) => p.category === 'rings').slice(0, 3);
</script>

<svelte:head>
	<title>The Engagement Ring Guide — Aurel Jewels</title>
	<meta
		name="description"
		content="How to choose an engagement ring: the 4Cs, stone shapes, settings, ring size and a realistic budget — plus the rings our customers propose with most."
	/>
	<link rel="canonical" href="{site.url}/guides/engagement-ring-guide" />
</svelte:head>

<Breadcrumbs
	items={[
		{ label: 'Home', href: '/' },
		{ label: 'Guides', href: '/guides' },
		{ label: 'Engagement Ring Guide' }
	]}
/>

<PageHero
	eyebrow="GUIDES · ENGAGEMENT"
	title="How to choose an engagement ring"
	subtitle="Five decisions, in order. Get these right and the rest — the moment, the question, the yes — takes care of itself."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
		<div class="min-w-0 space-y-6">
			<article class="overflow-hidden rounded-3xl bg-white ring-1 ring-line">
				<Picture
					name="guide-engagement"
					alt="Gold solitaire engagement ring in its open emerald gift box on a cream background"
					width={1408}
					height={1760}
					sizes="(min-width: 1024px) 50vw, 100vw"
					imgClass="aspect-[4/5] w-full object-cover sm:aspect-[16/10]"
				/>
				<div class="p-6 sm:p-8">
					<h2 class="font-display text-2xl font-medium text-ink">1. Start with her style, not the catalogue</h2>
					<p class="mt-3 leading-relaxed text-muted">
						Look at the jewellery she already wears. Yellow gold or white? Bold or delicate? A ring
						she wears every day tells you more than any quiz. If she wears silver-toned pieces,
						white gold will feel familiar; if everything is warm gold, stay warm.
					</p>
				</div>
			</article>

			<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-medium text-ink">2. The 4Cs — what actually matters</h2>
				<div class="mt-4 space-y-4 leading-relaxed text-muted">
					<p>
						<strong class="text-ink">Cut</strong> — how well the stone is shaped and faceted. Cut
						drives sparkle more than anything else; a well-cut smaller stone outshines a poorly
						cut larger one.
					</p>
					<p>
						<strong class="text-ink">Colour</strong> — graded from D (colourless) to Z (tinted).
						Near-colourless (G–J) looks white in a setting and costs far less than D–F.
					</p>
					<p>
						<strong class="text-ink">Clarity</strong> — tiny inclusions, invisible to the naked eye
						in most stones. VS1–VS2 is the sweet spot: clean to the eye, sensible on price.
					</p>
					<p>
						<strong class="text-ink">Carat</strong> — weight, not size. An oval or elongated stone
						looks larger than a round stone of the same carat weight.
					</p>
				</div>
				<p class="mt-4 leading-relaxed text-muted">
					Our honest advice: spend on cut first, then carat. Colour and clarity can sit one grade
					below perfect and no one — including her — will ever know.
				</p>
			</article>

			<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-medium text-ink">3. Shape and setting</h2>
				<div class="mt-4 space-y-4 leading-relaxed text-muted">
					<p>
						<strong class="text-ink">Round</strong> is the classic and the brightest. <strong class="text-ink">Oval</strong>
						looks larger and flatters longer fingers. <strong class="text-ink">Emerald cut</strong> is
						quiet and architectural; <strong class="text-ink">cushion</strong> is soft and romantic.
					</p>
					<p>
						<strong class="text-ink">Solitaire</strong> shows off one stone. <strong class="text-ink">Halo</strong>
						rings a small-stone frame around it, making the centre look bigger. <strong class="text-ink">Pavé</strong>
						adds sparkle all the way around the band.
					</p>
				</div>
			</article>

			<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-medium text-ink">4. Budget — the honest version</h2>
				<p class="mt-3 leading-relaxed text-muted">
					Forget the old "two months' salary" rule — it was invented by a diamond company. A
					realistic budget is one you can afford without debt: many of our customers spend between
					$90 and $180 on a ring that looks and feels like a luxury piece, because our stones are
					lab-created and our gold is recycled. Spend what feels right, not what a rule tells you.
					And if the budget is tight, split it into 4 interest-free payments — see our <a
						href="/financing"
						class="font-semibold text-emerald underline underline-offset-2">financing page</a
					>.
				</p>
			</article>

			<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-medium text-ink">5. Get the size right</h2>
				<p class="mt-3 leading-relaxed text-muted">
					Borrow a ring she wears on the same finger and match it against our printable sizer, or
					measure her finger with a paper strip in the evening, when fingers are at their largest.
					If you are between sizes, size up — and remember, your first resize within 30 days is
					free. Full instructions are on our <a
						href="/guides/ring-size-finder"
						class="font-semibold text-emerald underline underline-offset-2">ring size finder</a
					>.
				</p>
			</article>
		</div>

		<aside class="min-w-0">
			<div class="space-y-6 lg:sticky lg:top-24">
				<div class="rounded-3xl bg-white p-6 ring-1 ring-line">
					<h2 class="font-display text-xl font-semibold text-ink">Rings to propose with</h2>
					<ul class="mt-4 space-y-4">
						{#each rings as ring (ring.slug)}
							<li>
								<a href="/shop/{ring.slug}" class="flex items-center gap-3">
									<span class="block h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-sand">
										<Picture
											name={ring.image}
											alt=""
											width={160}
											height={160}
											sizes="64px"
											imgClass="aspect-square h-full w-full object-cover"
											pictureClass="block h-full"
										/>
									</span>
									<span class="min-w-0">
										<span class="block truncate font-semibold text-ink">{ring.name}</span>
										<span class="block text-sm text-muted">From ${ring.price}</span>
									</span>
								</a>
							</li>
						{/each}
					</ul>
					<a
						href="/shop?category=rings"
						class="mt-5 flex min-h-12 items-center justify-center rounded-full bg-emerald text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
					>
						Shop all rings
					</a>
				</div>
				<div class="rounded-3xl bg-emerald-soft p-6 ring-1 ring-line">
					<h2 class="font-display text-xl font-semibold text-ink">Want it made just for her?</h2>
					<p class="mt-2 text-sm leading-relaxed text-muted">
						Modify an existing ring, or design one from scratch with our atelier — CAD visuals
						before we make anything.
					</p>
					<a
						href="/bespoke"
						class="mt-4 inline-flex min-h-12 items-center rounded-full bg-emerald px-6 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
					>
						Design a bespoke ring
					</a>
				</div>
			</div>
		</aside>
	</div>
</section>
