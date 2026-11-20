<script lang="ts">
	import { CheckCircle2 } from '@lucide/svelte';
	import { site } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';

	let name = $state('');
	let email = $state('');
	let metal = $state('Gold');
	let detail = $state('');
	let sent = $state(false);
	let ref = $state('');
	let error = $state('');

	function submit(e: SubmitEvent) {
		e.preventDefault();
		if (!name.trim()) { error = 'Please enter your name.'; return; }
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { error = 'Please enter a valid email address.'; return; }
		error = '';
		ref = `AU-TRADE-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
		sent = true;
		if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>Trade-In Programme — Aurel Jewels</title>
	<meta
		name="description"
		content="Trade in your old gold and silver jewellery for Aurel credit — a free mail-in kit, an honest valuation, and credit towards a new piece."
	/>
	<link rel="canonical" href="{site.url}/trade-in" />
	<meta property="og:url" content="{site.url}/trade-in" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Trade-in' }]} />

<PageHero
	eyebrow="TRADE-IN"
	title="Old gold, new sparkle"
	subtitle="Send us the gold and silver you no longer wear. We value it honestly, refine it, and give you credit towards a piece you will wear."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	{#if sent}
		<div class="mx-auto max-w-2xl rounded-3xl bg-white px-6 py-14 text-center ring-1 ring-line sm:px-10">
			<span class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-soft text-emerald">
				<CheckCircle2 size={40} aria-hidden="true" />
			</span>
			<h2 class="mt-6 font-display text-[clamp(1.7rem,4vw,2.4rem)] font-medium text-ink">Your kit is on its way</h2>
			<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
				A free, insured trade-in kit is on its way to {email}. Pack your {metal.toLowerCase()} pieces,
				send them back with the prepaid label, and we will email your valuation within 5 business days.
			</p>
			<p class="mt-4 font-bold text-ink">Reference: {ref}</p>
			<p class="mt-4 text-sm text-muted">This is a demo — no kit is really sent.</p>
		</div>
	{:else}
		<div class="grid gap-10 lg:grid-cols-2">
			<div class="min-w-0">
				<h2 class="font-display text-2xl font-medium text-ink">How it works</h2>
				<ol class="mt-6 space-y-4">
					{#each [
						{ t: '1. Request a kit', d: 'Free, insured, and posted to you. It holds a padded mailer, a prepaid tracked label and a valuation form.' },
						{ t: '2. Send your pieces', d: 'Any gold or silver jewellery — broken chains, single earrings, pieces you never wear. Photograph them first for your records.' },
						{ t: '3. We value it', d: 'We weigh and assay every piece and email your valuation within 5 business days, based on the day’s metal price.' },
						{ t: '4. Take the credit', d: 'Accept and the value becomes Aurel credit (plus a 10% trade-in bonus) towards any piece. Decline and we return everything, free.' }
					] as step (step.t)}
						<li class="rounded-3xl bg-white p-5 ring-1 ring-line">
							<p class="font-semibold text-ink">{step.t}</p>
							<p class="mt-1 text-sm leading-relaxed text-muted">{step.d}</p>
						</li>
					{/each}
				</ol>
				<p class="mt-6 text-sm leading-relaxed text-muted">
					Your old pieces are refined and the metal returns to the supply chain — which is why
					100% of the gold in new Aurel pieces is recycled. Read more on
					<a href="/sustainability" class="font-semibold text-emerald underline underline-offset-2">sustainability</a>.
				</p>
			</div>
			<form class="h-fit rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8 lg:sticky lg:top-24" novalidate onsubmit={submit}>
				<h2 class="font-display text-xl font-semibold text-ink">Request your free kit</h2>
				<div class="mt-5">
					<label for="trade-name" class="mb-1.5 block text-sm font-semibold text-ink">Your name</label>
					<input id="trade-name" type="text" bind:value={name} autocomplete="name" placeholder="Alexandra Morgan" class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none" />
				</div>
				<div class="mt-4">
					<label for="trade-email" class="mb-1.5 block text-sm font-semibold text-ink">Email</label>
					<input id="trade-email" type="email" bind:value={email} autocomplete="email" placeholder="you@example.com" class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none" />
				</div>
				<div class="mt-4">
					<label for="trade-metal" class="mb-1.5 block text-sm font-semibold text-ink">Mainly what metal?</label>
					<select id="trade-metal" bind:value={metal} class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink focus:border-emerald focus:outline-none">
						<option>Gold</option>
						<option>Silver</option>
						<option>A mix of both</option>
					</select>
				</div>
				<div class="mt-4">
					<label for="trade-detail" class="mb-1.5 block text-sm font-semibold text-ink">What are you sending? <span class="font-normal text-muted">(optional)</span></label>
					<textarea id="trade-detail" bind:value={detail} rows="3" placeholder="e.g. Two broken gold chains, one silver bangle…" class="w-full rounded-2xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none"></textarea>
				</div>
				{#if error}<p class="mt-4 text-sm text-red-700" role="alert">{error}</p>{/if}
				<button type="submit" class="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-emerald px-6 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep">
					Request my free kit
				</button>
				<p class="mt-3 text-center text-xs text-muted">Demo only — no kit is really sent and no valuation happens.</p>
			</form>
		</div>
	{/if}
</section>
