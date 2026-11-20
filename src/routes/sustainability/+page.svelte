<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { site, sourcingLine, sustainabilityClaims } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Sustainability &amp; Ethics — Aurel Jewels</title>
	<meta
		name="description"
		content="How Aurel Jewels sources: 100% recycled gold, 100% lab-created stones, zero conflict stones and plastic-free packaging — specific claims, no vague promises."
	/>
	<link rel="canonical" href="{site.url}/sustainability" />
	<meta property="og:url" content="{site.url}/sustainability" />
</svelte:head>

<Breadcrumbs
	items={[{ label: 'Home', href: '/' }, { label: 'Sustainability & Ethics' }]}
/>

<PageHero
	eyebrow="SUSTAINABILITY & ETHICS"
	title="Beautiful should not cost the earth"
	subtitle="Four specific claims — each one measurable, each one true of every piece we sell. If we cannot prove it, we do not print it."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
		<div class="min-w-0">
			<div class="grid gap-6 sm:grid-cols-2">
				{#each sustainabilityClaims as claim (claim.label)}
					<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
						<p class="font-display text-4xl font-medium text-emerald">{claim.stat}</p>
						<h2 class="mt-2 font-display text-xl font-medium text-ink">{claim.label}</h2>
						<p class="mt-2 text-[0.95rem] leading-relaxed text-muted">{claim.detail}</p>
					</article>
				{/each}
			</div>

			<article class="mt-6 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-medium text-ink">What that means, piece by piece</h2>
				<div class="mt-4 space-y-4 leading-relaxed text-muted">
					<p>
						<strong class="text-ink">Recycled gold.</strong> Every gram of gold in an Aurel piece is
						recycled 14k gold, refined from old jewellery and electronics — no newly mined gold in
						any piece, ever.
					</p>
					<p>
						<strong class="text-ink">Lab-created stones.</strong> Our diamonds and emeralds are grown
						in a laboratory, identical in crystal, hardness and sparkle to mined stones, and graded
						by GIA or IGI on the same 4Cs. No mine, no tailings, no conflict.
					</p>
					<p>
						<strong class="text-ink">Fair workshops.</strong> Every workshop partner is audited
						annually for fair labour practices — safe conditions, fair pay, no child labour. If a
						partner fails an audit, we stop working with them.
					</p>
					<p>
						<strong class="text-ink">Packaging.</strong> FSC-certified recycled paper, a reusable
						pouch and our signature emerald gift box — plastic-free from the atelier to your door.
					</p>
				</div>
			</article>

			<article class="mt-6 rounded-3xl bg-emerald-soft p-6 ring-1 ring-line sm:p-8">
				<h2 class="font-display text-2xl font-medium text-ink">The line on every piece</h2>
				<p class="mt-3 leading-relaxed text-muted">
					Every product page carries the same one-line sourcing promise, so you never have to hunt
					for it:
				</p>
				<blockquote class="mt-4 rounded-2xl bg-white p-5 text-[0.95rem] leading-relaxed font-medium text-ink ring-1 ring-line">
					“{sourcingLine}”
				</blockquote>
			</article>
		</div>

		<aside class="min-w-0">
			<div class="overflow-hidden rounded-3xl bg-white ring-1 ring-line lg:sticky lg:top-24">
				<Picture
					name="sustainability"
					alt="Hands holding a gold ring above recycled gold and a small green gemstone on natural linen"
					width={1408}
					height={1760}
					sizes="(min-width: 1024px) 360px, 100vw"
					imgClass="aspect-[4/5] w-full object-cover"
				/>
				<div class="p-6">
					<h2 class="font-display text-xl font-semibold text-ink">Shop the proof</h2>
					<p class="mt-2 text-sm leading-relaxed text-muted">
						Every piece in the shop is made the same way — recycled gold, lab-created stones,
						plastic-free box.
					</p>
					<a
						href="/shop"
						class="mt-4 flex min-h-12 items-center justify-center rounded-full bg-emerald text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
					>
						Shop all jewelry
					</a>
					<a
						href="/trade-in"
						class="mt-3 flex min-h-12 items-center justify-center rounded-full bg-white text-sm font-bold tracking-wide text-ink uppercase ring-1 ring-line transition-colors duration-150 hover:ring-emerald"
					>
						Trade in old gold for credit →
					</a>
				</div>
			</div>
		</aside>
	</div>
</section>
