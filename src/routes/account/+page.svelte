<script lang="ts">
	import { onMount } from 'svelte';
	import { products, site, usd } from '#lib/data/site.ts';
	import { alerts, togglePriceAlert, toggleStockAlert } from '#lib/alerts.svelte.ts';
	import { loadAlerts } from '#lib/alerts.svelte.ts';
	import { loadOrders, orderHistory } from '#lib/orders.svelte.ts';
	import { loadWishlist, wishlist } from '#lib/wishlist.svelte.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Picture from '#lib/components/Picture.svelte';

	// Mock account (frontend only, localStorage). Guest checkout stays
	// guest-first — the account is offered on the thank-you page, never forced.
	let email = $state('');
	let name = $state('');
	let joined = $state(false);
	let points = $state(320);
	let referralCode = $state('AUREL-FRIEND-25');
	let saved = $state(false);

	// One-time client restore — onMount, not $effect: loadOrders/loadWishlist/
	// loadAlerts splice the same $state arrays they read, so an $effect around
	// them re-triggers itself forever (effect_update_depth_exceeded).
	onMount(() => {
		loadOrders();
		loadWishlist();
		loadAlerts();
		try {
			const raw = window.localStorage.getItem('aurel-account-v1');
			if (raw) {
				const p = JSON.parse(raw) as { name?: string; email?: string; points?: number };
				if (p.name) name = p.name;
				if (p.email) email = p.email;
				if (typeof p.points === 'number') points = p.points;
				joined = Boolean(p.email);
			}
		} catch {
			// No saved account: start as guest.
		}
	});

	function join(e: SubmitEvent) {
		e.preventDefault();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return;
		joined = true;
		saved = true;
		try {
			window.localStorage.setItem('aurel-account-v1', JSON.stringify({ name: name.trim(), email: email.trim(), points }));
		} catch {
			// Storage unavailable: the account still shows this session.
		}
	}

	const wishlistItems = $derived(
		wishlist.items
			.map((s) => products.find((p) => p.slug === s))
			.filter((p): p is (typeof products)[number] => Boolean(p))
	);
	const alertSlugs = $derived([...new Set([...alerts.stock, ...alerts.price])]);
</script>

<svelte:head>
	<title>Your Account — Aurel Jewels</title>
	<meta
		name="description"
		content="Your Aurel Jewels account (demo): order history, wishlist, Aurel Circle points, saved addresses and alert settings."
	/>
	<link rel="canonical" href="{site.url}/account" />
	<meta property="og:url" content="{site.url}/account" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Your account' }]} />

<PageHero
	eyebrow="YOUR ACCOUNT"
	title={joined ? `Welcome back${name ? `, ${name.split(' ')[0]}` : ''}` : 'Your account'}
	subtitle="Orders, wishlist, Aurel Circle points and alerts — all on this device. This is a demo account: nothing leaves your browser."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	{#if !joined}
		<form class="mx-auto max-w-xl rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8" novalidate onsubmit={join}>
			<h2 class="font-display text-2xl font-medium text-ink">Join Aurel Circle — free</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				1 point per $1, 200 birthday points, and your orders and wishlist in one place.
				Guest checkout stays available — an account is never required to buy.
			</p>
			<div class="mt-5">
				<label for="acct-name" class="mb-1.5 block text-sm font-semibold text-ink">Name</label>
				<input id="acct-name" type="text" bind:value={name} autocomplete="name" placeholder="Alexandra Morgan" class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none" />
			</div>
			<div class="mt-4">
				<label for="acct-email" class="mb-1.5 block text-sm font-semibold text-ink">Email</label>
				<input id="acct-email" type="email" bind:value={email} autocomplete="email" placeholder="you@example.com" class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none" />
			</div>
			<button type="submit" class="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-emerald px-6 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep">
				Create my account
			</button>
			<p class="mt-3 text-center text-xs text-muted">Demo only — no account is really created.</p>
		</form>
	{:else}
		{#if saved}<p class="mx-auto mb-6 max-w-xl rounded-2xl bg-emerald-soft px-4 py-3 text-center text-sm font-semibold text-emerald" role="status">Welcome to Aurel Circle — 200 birthday points are on their way to {email}.</p>{/if}
		<div class="grid gap-6 lg:grid-cols-3">
			<div class="rounded-3xl bg-emerald p-6 text-cream">
				<p class="text-sm font-bold tracking-[0.2em] text-gold-light uppercase">Aurel Circle</p>
				<p class="mt-3 font-display text-4xl font-medium">{points} points</p>
				<p class="mt-2 text-sm leading-relaxed text-cream/80">100 points = $5 off. You are an Insider — spend $500 in a year to reach Muse.</p>
				<p class="mt-4 text-sm">Your referral link</p>
				<p class="mt-1 flex min-h-12 items-center rounded-2xl bg-white/15 px-4 text-sm font-semibold break-all">aurel-jewels.pages.dev/rewards?ref={referralCode}</p>
				<p class="mt-2 text-xs leading-relaxed text-cream/70">Give $25, get $25 — when a friend buys, you both get $25 off. See <a href="/rewards" class="font-semibold text-gold-light underline underline-offset-2">Rewards</a>.</p>
			</div>
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line">
				<h2 class="font-display text-xl font-semibold text-ink">Saved addresses</h2>
				<p class="mt-3 text-sm leading-relaxed text-muted">
					<strong class="text-ink">Home</strong><br />12 Mercer Street, Apt 4<br />New York, NY 10013
				</p>
				<p class="mt-3 text-xs text-muted">Demo address — edit it at checkout and it saves here.</p>
				<a href="/shop" class="mt-5 inline-flex min-h-12 items-center rounded-full bg-emerald px-6 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep">Continue shopping</a>
			</div>
			<div class="rounded-3xl bg-white p-6 ring-1 ring-line">
				<h2 class="font-display text-xl font-semibold text-ink">Your alerts</h2>
				{#if alertSlugs.length === 0}
					<p class="mt-3 text-sm leading-relaxed text-muted">No alerts yet. Ask to be notified when an out-of-stock piece returns, or when a wishlist piece drops in price.</p>
				{:else}
					<ul class="mt-3 space-y-3">
						{#each alertSlugs as slug (slug)}
							{@const p = products.find((x) => x.slug === slug)}
							{#if p}
								<li class="flex items-center justify-between gap-3 rounded-2xl bg-cream px-4 py-3">
									<span class="min-w-0 text-sm font-semibold text-ink">{p.name}</span>
									<span class="flex shrink-0 gap-2">
										{#if alerts.wantsStock(slug)}
											<button type="button" onclick={() => toggleStockAlert(slug)} class="inline-flex min-h-11 items-center rounded-full bg-white px-3 text-xs font-bold text-ink ring-1 ring-line">Back in stock ✓</button>
										{/if}
										{#if alerts.wantsPrice(slug)}
											<button type="button" onclick={() => togglePriceAlert(slug)} class="inline-flex min-h-11 items-center rounded-full bg-white px-3 text-xs font-bold text-ink ring-1 ring-line">Price drop ✓</button>
										{/if}
									</span>
								</li>
							{/if}
						{/each}
					</ul>
					<p class="mt-3 text-xs text-muted">Tap an alert to turn it off.</p>
				{/if}
			</div>
		</div>

		<h2 class="mt-12 font-display text-2xl font-medium text-ink">Order history</h2>
		{#if orderHistory.list.length === 0}
			<p class="mt-3 max-w-2xl leading-relaxed text-muted">
				No orders yet on this device. Orders placed in the demo checkout appear here, and you
				can track any of them on the <a href="/track-order" class="font-semibold text-emerald underline underline-offset-2">track your order</a> page.
			</p>
		{:else}
			<ul class="mt-6 space-y-4">
				{#each orderHistory.list as o (o.ref)}
					<li class="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white p-5 ring-1 ring-line">
						<div class="min-w-0">
							<p class="font-bold text-ink">{o.ref} · {o.items}</p>
							<p class="mt-1 text-sm text-muted">{o.date} · {o.status} · {o.fulfilment === 'pickup' ? 'Store pickup' : 'Delivery by ' + o.eta}</p>
						</div>
						<p class="font-bold text-ink">{usd(o.total)}</p>
					</li>
				{/each}
			</ul>
		{/if}

		<h2 class="mt-12 font-display text-2xl font-medium text-ink">Your wishlist</h2>
		{#if wishlistItems.length === 0}
			<p class="mt-3 leading-relaxed text-muted">Nothing saved yet — tap the heart on any piece to keep it here.</p>
		{:else}
			<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each wishlistItems as p (p.slug)}
					<article class="overflow-hidden rounded-2xl bg-white ring-1 ring-line">
						<a href="/shop/{p.slug}" class="block bg-sand">
							<Picture name={p.image} alt={p.imageAlt} width={800} height={800} sizes="(min-width: 1024px) 25vw, 50vw" imgClass="aspect-square w-full object-cover" pictureClass="block" />
						</a>
						<div class="p-4">
							<a href="/shop/{p.slug}" class="font-display text-lg leading-snug font-medium text-ink hover:text-emerald">{p.name}</a>
							<p class="mt-1 flex items-baseline justify-between gap-2">
								<span class="font-bold text-ink">{usd(p.price)}</span>
								<button
									type="button"
									onclick={() => togglePriceAlert(p.slug)}
									aria-pressed={alerts.wantsPrice(p.slug)}
									class="inline-flex min-h-11 items-center rounded-full px-3 text-xs font-bold transition-colors duration-150 {alerts.wantsPrice(p.slug) ? 'bg-emerald text-white' : 'bg-white text-ink ring-1 ring-line hover:ring-emerald'}"
								>
									{alerts.wantsPrice(p.slug) ? 'Price alerts on ✓' : 'Notify me of price drops'}
								</button>
							</p>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	{/if}
</section>
