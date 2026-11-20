<script lang="ts">
	import { CalendarCheck, CheckCircle2, MapPin, Video } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { appointmentPurposes, appointmentSlots, site } from '#lib/data/site.ts';

	let kind = $state<'in-store' | 'virtual'>('in-store');
	let purpose = $state(appointmentPurposes[0] ?? 'Engagement ring consultation');
	let date = $state('');
	let slot = $state('');
	let name = $state('');
	let email = $state('');
	let error = $state('');
	let ref = $state('');
	let confirmedDate = $state('');
	let confirmedSlot = $state('');

	// Deterministic mock availability (like Kanigiri reservations): the same
	// date always shows the same booked slots. ~1 in 4 slots is taken.
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

	const dateLabel = $derived.by(() => {
		if (!date) return '';
		const d = new Date(`${date}T12:00:00`);
		return Number.isNaN(d.getTime())
			? ''
			: d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
	});

	function submit() {
		if (kind === 'in-store' && !date) {
			error = 'Please pick a date for your visit.';
			return;
		}
		if (kind === 'in-store' && !slot) {
			error = 'Please pick a time slot.';
			return;
		}
		if (!name.trim()) {
			error = 'Please enter your name.';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			error = 'Please enter a valid email address.';
			return;
		}
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		if (date && new Date(`${date}T12:00:00`) < today) {
			error = 'Please pick today or a future date.';
			return;
		}
		error = '';
		confirmedDate = kind === 'virtual' ? 'Virtual — we will email you a link' : dateLabel;
		confirmedSlot = kind === 'virtual' ? 'Within 2 business days' : slot;
		ref = `AU-APT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
		if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>Book an Appointment — Aurel Jewels</title>
	<meta
		name="description"
		content="Book a free jewellery consultation at Aurel Jewels: in store at our SoHo boutique or virtual by video call. Pick a date and time — engagement rings, bespoke, gifts and repairs."
	/>
	<link rel="canonical" href="{site.url}/appointments" />
	<meta property="og:url" content="{site.url}/appointments" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Book an Appointment' }]} />

<PageHero
	eyebrow="APPOINTMENTS"
	title="Book an appointment"
	subtitle="Free, no pressure, and genuinely useful — thirty minutes with someone who knows jewellery, in our SoHo boutique or on a video call."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
	{#if ref}
		<div class="mx-auto max-w-2xl rounded-3xl bg-white px-6 py-14 text-center ring-1 ring-line sm:px-10">
			<span class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-soft text-emerald">
				<CheckCircle2 size={40} aria-hidden="true" />
			</span>
			<h2 class="mt-6 font-display text-[clamp(1.7rem,4vw,2.4rem)] font-medium text-ink">
				You are booked in
			</h2>
			<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
				A confirmation email is on its way to {email}. We look forward to seeing you, {name}.
			</p>
			<dl class="mx-auto mt-8 max-w-md space-y-3 rounded-2xl bg-cream p-6 text-left text-[0.95rem]">
				<div class="flex justify-between gap-4">
					<dt class="text-muted">Reference</dt>
					<dd class="font-bold break-all text-ink">{ref}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-muted">What</dt>
					<dd class="text-right font-bold break-words text-ink">{purpose}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-muted">Where</dt>
					<dd class="text-right font-bold break-words text-ink">
						{kind === 'in-store' ? `In store — ${site.addressShort}` : 'Virtual video call'}
					</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-muted">When</dt>
					<dd class="text-right font-bold break-words text-ink">{confirmedDate} · {confirmedSlot}</dd>
				</div>
			</dl>
			<p class="mt-6 text-sm text-muted">
				This is a demo booking — no real appointment was made. Need to change it? Email
				<a href="mailto:{site.email}" class="font-semibold break-all text-emerald underline underline-offset-2">{site.email}</a>
				with your reference.
			</p>
			<button
				type="button"
				onclick={() => {
					ref = '';
					date = '';
					slot = '';
					name = '';
					email = '';
				}}
				class="mt-8 inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
			>
				Book another appointment
			</button>
		</div>
	{:else}
		<div class="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
			<form
				class="min-w-0 space-y-6"
				novalidate
				onsubmit={(e) => {
					e.preventDefault();
					submit();
				}}
			>
				<div role="group" aria-label="How would you like to meet?" class="min-w-0 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
					<h2 class="font-display text-lg font-semibold text-ink">How would you like to meet?</h2>
					<div class="mt-4 grid gap-3 sm:grid-cols-2">
						<button
							type="button"
							aria-pressed={kind === 'in-store'}
							onclick={() => (kind = 'in-store')}
							class="min-h-12 rounded-2xl p-4 text-left ring-1 transition-colors duration-150 {kind ===
							'in-store'
								? 'bg-emerald-soft ring-emerald'
								: 'bg-white ring-line hover:ring-emerald'}"
						>
							<span class="flex items-center gap-2 font-semibold text-ink">
								<MapPin size={18} aria-hidden="true" class="text-emerald" /> In store
							</span>
							<span class="mt-1 block text-sm text-muted">
								{site.addressShort} · {site.hoursShort}
							</span>
						</button>
						<button
							type="button"
							aria-pressed={kind === 'virtual'}
							onclick={() => (kind = 'virtual')}
							class="min-h-12 rounded-2xl p-4 text-left ring-1 transition-colors duration-150 {kind ===
							'virtual'
								? 'bg-emerald-soft ring-emerald'
								: 'bg-white ring-line hover:ring-emerald'}"
						>
							<span class="flex items-center gap-2 font-semibold text-ink">
								<Video size={18} aria-hidden="true" class="text-emerald" /> Virtual
							</span>
							<span class="mt-1 block text-sm text-muted">
								Video call, 30 minutes — we email you the link
							</span>
						</button>
					</div>
				</div>

				<div role="group" aria-label="What is it about?" class="min-w-0 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
					<h2 class="font-display text-lg font-semibold text-ink">What is it about?</h2>
					<label for="apt-purpose" class="sr-only">Purpose of your appointment</label>
					<select
						id="apt-purpose"
						bind:value={purpose}
						class="mt-4 min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink focus:border-emerald focus:outline-none"
					>
						{#each appointmentPurposes as p (p)}
							<option value={p}>{p}</option>
						{/each}
					</select>
				</div>

				{#if kind === 'in-store'}
					<div role="group" aria-label="Pick a date and time" class="min-w-0 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
						<h2 class="flex items-center gap-2 font-display text-lg font-semibold text-ink">
							<CalendarCheck size={20} aria-hidden="true" class="text-emerald" /> Pick a date &amp; time
						</h2>
						<label for="apt-date" class="mt-4 mb-1.5 block text-sm font-semibold text-ink">Date</label>
						<input
							id="apt-date"
							type="date"
							bind:value={date}
							onchange={() => (slot = '')}
							class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink focus:border-emerald focus:outline-none"
						/>
						{#if date}
							<p class="mt-5 text-sm font-semibold text-ink">
								Available times — {dateLabel}
							</p>
							<div class="mt-3 grid grid-cols-3 gap-2" role="group" aria-label="Available time slots">
								{#each appointmentSlots as s, i (s)}
									<button
										type="button"
										disabled={taken.has(i)}
										aria-pressed={slot === s}
										onclick={() => (slot = s)}
										class="flex min-h-12 items-center justify-center rounded-full px-2 text-sm font-semibold transition-colors duration-150 {slot ===
										s
											? 'bg-emerald text-white'
											: taken.has(i)
												? 'bg-sand text-muted/50 line-through'
												: 'bg-white text-ink ring-1 ring-line hover:ring-emerald'}"
									>
										{s}
									</button>
								{/each}
							</div>
							<p class="mt-3 text-xs text-muted">
								Struck-through times are already booked (demo availability — the same date always
								shows the same slots).
							</p>
						{:else}
							<p class="mt-3 text-sm text-muted">Pick a date to see available times.</p>
						{/if}
					</div>
				{:else}
					<div class="rounded-3xl bg-emerald-soft p-6 ring-1 ring-line sm:p-8">
						<h2 class="font-display text-lg font-semibold text-ink">Virtual consultations</h2>
						<p class="mt-2 text-[0.95rem] leading-relaxed text-muted">
							No date to pick — tell us who you are below and we will email you a video-call link
							within 2 business days, at a time that suits you.
						</p>
					</div>
				{/if}

				<div role="group" aria-label="Your details" class="min-w-0 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
					<h2 class="font-display text-lg font-semibold text-ink">Your details</h2>
					<div class="mt-4 grid gap-4 sm:grid-cols-2">
						<div>
							<label for="apt-name" class="mb-1.5 block text-sm font-semibold text-ink">Your name</label>
							<input
								id="apt-name"
								type="text"
								bind:value={name}
								autocomplete="name"
								placeholder="Alexandra Morgan"
								class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none"
							/>
						</div>
						<div>
							<label for="apt-email" class="mb-1.5 block text-sm font-semibold text-ink">Email</label>
							<input
								id="apt-email"
								type="email"
								bind:value={email}
								autocomplete="email"
								placeholder="you@example.com"
								class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none"
							/>
						</div>
					</div>
					{#if error}
						<p class="mt-4 text-sm text-red-700" role="alert">{error}</p>
					{/if}
					<button
						type="submit"
						class="mt-6 inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
					>
						Confirm appointment
					</button>
				</div>
			</form>

			<aside class="min-w-0">
				<div class="overflow-hidden rounded-3xl bg-white ring-1 ring-line lg:sticky lg:top-24">
					<Picture
						name="appointment-consult"
						alt="A jewellery consultant showing a gold ring to a customer across a boutique counter"
						width={1408}
						height={1760}
						sizes="(min-width: 1024px) 360px, 100vw"
						imgClass="aspect-[4/5] w-full object-cover"
					/>
					<div class="p-6">
						<h2 class="font-display text-xl font-semibold text-ink">What to expect</h2>
						<ul class="mt-3 space-y-2 text-sm leading-relaxed text-muted">
							<li>· Thirty minutes, one-to-one, with a jewellery specialist.</li>
							<li>· Try pieces on, compare metals, and see stones in daylight.</li>
							<li>· No obligation — and no hard sell, ever.</li>
							<li>· In store: {site.address}. Virtual: a link by email.</li>
						</ul>
						<p class="mt-4 text-sm leading-relaxed text-muted">
							Coming in for a repair or a clean instead? Book a
							<a href="/services" class="font-semibold text-emerald underline underline-offset-2">cleaning, polishing &amp; repair slot</a>.
						</p>
					</div>
				</div>
			</aside>
		</div>
	{/if}
</section>
