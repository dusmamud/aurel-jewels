<script lang="ts">
	import { CheckCircle2 } from '@lucide/svelte';
	import { appointmentSlots, site } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';

	// Cleaning, polishing & repair bookings reuse the deterministic slot
	// system from appointments: the same date always shows the same slots.
	const services = [
		{ id: 'cleaning', name: 'Cleaning & inspection', price: 'Complimentary', detail: 'Ultrasonic clean (except emerald — hand-cleaned), prong check and polish. Free for every Aurel piece, forever.', time: '30 minutes' },
		{ id: 'polishing', name: 'Polishing & re-plating', price: 'From $25', detail: 'A fresh polish brings back the shine; re-plating restores the gold finish on well-loved pieces.', time: '3–5 business days' },
		{ id: 'resizing', name: 'Ring resizing', price: 'From $15', detail: 'Up or down up to two sizes. First resize within 30 days of purchase is free.', time: '5–7 business days' },
		{ id: 'repair', name: 'Repair — clasp, chain or stone', price: 'From $35', detail: 'Broken clasps, snapped chains, loose stones re-seated. Quoted before we start — no surprises.', time: '5–10 business days' }
	];

	let service = $state(services[0]?.id ?? 'cleaning');
	let date = $state('');
	let slot = $state('');
	let name = $state('');
	let email = $state('');
	let error = $state('');
	let ref = $state('');

	const taken = $derived.by(() => {
		if (!date) return new Set<number>();
		let hash = 0;
		for (const ch of date) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
		const out = new Set<number>();
		appointmentSlots.forEach((_, i) => {
			if ((hash + i * 7) % 4 === 0) out.add(i);
		});
		return out;
	});

	function submit(e: SubmitEvent) {
		e.preventDefault();
		if (!date) { error = 'Please pick a date.'; return; }
		if (!slot) { error = 'Please pick a time slot.'; return; }
		if (!name.trim()) { error = 'Please enter your name.'; return; }
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { error = 'Please enter a valid email address.'; return; }
		error = '';
		ref = `AU-SVC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
		if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	const chosen = $derived(services.find((s) => s.id === service));
</script>

<svelte:head>
	<title>Cleaning, Polishing &amp; Repair — Aurel Jewels</title>
	<meta
		name="description"
		content="Book jewellery cleaning, polishing, ring resizing or repair at Aurel Jewels — complimentary cleaning for every Aurel piece."
	/>
	<link rel="canonical" href="{site.url}/services" />
	<meta property="og:url" content="{site.url}/services" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />

<PageHero
	eyebrow="SERVICES"
	title="Looked after, for life"
	subtitle="Cleaning is always free for Aurel pieces. Polishing, resizing and repairs are quoted before we start — book a slot below."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	{#if ref}
		<div class="mx-auto max-w-2xl rounded-3xl bg-white px-6 py-14 text-center ring-1 ring-line sm:px-10">
			<span class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-soft text-emerald">
				<CheckCircle2 size={40} aria-hidden="true" />
			</span>
			<h2 class="mt-6 font-display text-[clamp(1.7rem,4vw,2.4rem)] font-medium text-ink">You are booked in</h2>
			<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
				{chosen?.name} on {date} at {slot}. A confirmation is on its way to {email}.
			</p>
			<p class="mt-4 font-bold text-ink">Reference: {ref}</p>
			<p class="mt-4 text-sm text-muted">This is a demo booking — no real appointment was made.</p>
			<button
				type="button"
				onclick={() => { ref = ''; date = ''; slot = ''; }}
				class="mt-8 inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
			>
				Book another service
			</button>
		</div>
	{:else}
		<div class="grid gap-10 lg:grid-cols-[1fr_380px]">
			<div class="min-w-0">
				<h2 class="font-display text-2xl font-medium text-ink">What we do</h2>
				<div class="mt-6 grid gap-4 sm:grid-cols-2">
					{#each services as s (s.id)}
						<button
							type="button"
							onclick={() => (service = s.id)}
							aria-pressed={service === s.id}
							class="min-w-0 rounded-3xl p-5 text-left ring-1 transition-colors duration-150 {service === s.id ? 'bg-emerald-soft ring-emerald' : 'bg-white ring-line hover:ring-emerald'}"
						>
							<span class="flex items-baseline justify-between gap-2">
								<span class="font-display text-lg font-semibold text-ink">{s.name}</span>
								<span class="shrink-0 text-sm font-bold text-emerald">{s.price}</span>
							</span>
							<span class="mt-2 block text-sm leading-relaxed text-muted">{s.detail}</span>
							<span class="mt-2 block text-xs font-semibold text-muted">Typical turnaround: {s.time}</span>
						</button>
					{/each}
				</div>
				<p class="mt-6 text-sm leading-relaxed text-muted">
					Repairs are covered by our <a href="/warranty" class="font-semibold text-emerald underline underline-offset-2">lifetime craftsmanship warranty</a>
					when the fault is in the making — a loose prong, a faulty clasp, a weak link. Bring any
					piece in for a free assessment, or start with the
					<a href="/care" class="font-semibold text-emerald underline underline-offset-2">care guide</a> for at-home cleaning.
				</p>
			</div>
			<form class="h-fit rounded-3xl bg-white p-6 ring-1 ring-line lg:sticky lg:top-24" novalidate onsubmit={submit}>
				<h2 class="font-display text-xl font-semibold text-ink">Book a slot</h2>
				<p class="mt-1 text-sm text-muted">In store, {site.addressShort} · {site.hoursShort}</p>
				<div class="mt-5">
					<label for="svc-date" class="mb-1.5 block text-sm font-semibold text-ink">Date</label>
					<input id="svc-date" type="date" bind:value={date} onchange={() => (slot = '')} class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink focus:border-emerald focus:outline-none" />
				</div>
				{#if date}
					<p class="mt-5 text-sm font-semibold text-ink">Available times</p>
					<div class="mt-3 grid grid-cols-3 gap-2" role="group" aria-label="Available time slots">
						{#each appointmentSlots as s, i (s)}
							<button
								type="button"
								disabled={taken.has(i)}
								aria-pressed={slot === s}
								onclick={() => (slot = s)}
								class="flex min-h-12 items-center justify-center rounded-full px-2 text-sm font-semibold transition-colors duration-150 {slot === s ? 'bg-emerald text-white' : taken.has(i) ? 'bg-sand text-muted/50 line-through' : 'bg-white text-ink ring-1 ring-line hover:ring-emerald'}"
							>
								{s}
							</button>
						{/each}
					</div>
				{/if}
				<div class="mt-5">
					<label for="svc-name" class="mb-1.5 block text-sm font-semibold text-ink">Your name</label>
					<input id="svc-name" type="text" bind:value={name} autocomplete="name" placeholder="Alexandra Morgan" class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none" />
				</div>
				<div class="mt-4">
					<label for="svc-email" class="mb-1.5 block text-sm font-semibold text-ink">Email</label>
					<input id="svc-email" type="email" bind:value={email} autocomplete="email" placeholder="you@example.com" class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none" />
				</div>
				{#if error}<p class="mt-4 text-sm text-red-700" role="alert">{error}</p>{/if}
				<button type="submit" class="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-emerald px-6 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep">
					Confirm booking
				</button>
			</form>
		</div>
	{/if}
</section>
