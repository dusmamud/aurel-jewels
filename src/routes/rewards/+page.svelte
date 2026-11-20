<script lang="ts">
	import { Gift, Sparkles, Star } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { rewardsEarn, rewardsTiers, site } from '#lib/data/site.ts';

	const icons = [Sparkles, Gift, Star];
</script>

<svelte:head>
	<title>Aurel Circle Rewards — Aurel Jewels</title>
	<meta
		name="description"
		content="Aurel Circle rewards: earn 1 point per $1, 100 points is $5 off, plus birthday points and three tiers — Insider, Muse and Atelier."
	/>
	<link rel="canonical" href="{site.url}/rewards" />
	<meta property="og:url" content="{site.url}/rewards" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Rewards' }]} />

<PageHero
	eyebrow="AUREL CIRCLE"
	title="Rewards for coming back"
	subtitle="Every dollar earns a point, every point brings you closer to $5 off — and your birthday earns 200 points just for being yours."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
	<div class="grid gap-6 sm:grid-cols-3">
		{#each rewardsEarn as item, i (item.title)}
			{@const Icon = icons[i % icons.length]}
			<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<span class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-soft text-emerald">
					<Icon size={22} aria-hidden="true" />
				</span>
				<h2 class="mt-4 font-display text-xl font-medium text-ink">{item.title}</h2>
				<p class="mt-2 text-[0.95rem] leading-relaxed text-muted">{item.detail}</p>
			</article>
		{/each}
	</div>

	<h2 class="mt-12 font-display text-[clamp(1.6rem,4vw,2.2rem)] font-medium text-ink">Three tiers</h2>
	<p class="mt-2 max-w-2xl leading-relaxed text-muted">
		Tiers are based on what you spend in a calendar year. Move up, and your points earn faster.
	</p>
	<div class="mt-6 grid gap-6 lg:grid-cols-3">
		{#each rewardsTiers as tier (tier.name)}
			<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
				<p class="text-xs font-bold tracking-[0.2em] text-gold-dark uppercase">{tier.threshold}</p>
				<h3 class="mt-2 font-display text-2xl font-medium text-ink">{tier.name}</h3>
				<p class="mt-2 text-[0.95rem] leading-relaxed text-muted">{tier.perk}</p>
			</article>
		{/each}
	</div>

	<article class="mt-10 rounded-3xl bg-emerald p-6 text-cream sm:p-8">
		<h2 class="font-display text-2xl font-medium">Give $25, Get $25</h2>
		<p class="mt-3 max-w-2xl leading-relaxed text-cream/80">
			Share your referral link with a friend. When they place their first order, they get $25
			off — and you get $25 off your next piece. There is no limit: bring five friends, earn
			$125. Your link lives on your <a href="/account" class="font-semibold text-gold-light underline underline-offset-2">account page</a>;
			share it anywhere.
		</p>
		<p class="mt-4 flex min-h-12 max-w-xl items-center rounded-2xl bg-white/15 px-4 text-sm font-semibold break-all">
			aurel-jewels.pages.dev/rewards?ref=AUREL-FRIEND-25
		</p>
		<p class="mt-3 text-xs leading-relaxed text-cream/70">
			Demo referral: the link and the $25 rewards are illustrative — no real credit is issued.
		</p>
	</article>

	<article class="mt-10 rounded-3xl bg-emerald-soft p-6 ring-1 ring-line sm:p-8">
		<h2 class="font-display text-2xl font-medium text-ink">How it works</h2>
		<p class="mt-3 max-w-2xl leading-relaxed text-muted">
			Join free at checkout or in store — your points attach to your email automatically. Redeem
			them at checkout on any piece, any time. Points never expire while you stay a member, and
			your birthday points arrive every year with no purchase needed. This is a demo loyalty
			programme: points and tiers shown here are illustrative.
		</p>
		<a
			href="/shop"
			class="mt-5 inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
		>
			Start earning — shop now
		</a>
	</article>
</section>
