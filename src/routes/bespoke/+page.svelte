<script lang="ts">
	import { CheckCircle2, Gem, Hammer, PencilRuler } from '@lucide/svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import {
		bespokeMetals,
		bespokeSettings,
		bespokeStones,
		site,
		usd
	} from '#lib/data/site.ts';

	// ─── 3-step mock builder: setting → stone → metal, live price ───
	let settingId = $state(bespokeSettings[0]?.id ?? 'solitaire');
	let stoneId = $state(bespokeStones[0]?.id ?? 'lab-diamond');
	let metalId = $state(bespokeMetals[0]?.id ?? 'yellow-14k');

	const setting = $derived(bespokeSettings.find((s) => s.id === settingId) ?? bespokeSettings[0]);
	const stone = $derived(bespokeStones.find((s) => s.id === stoneId) ?? bespokeStones[0]);
	const metal = $derived(bespokeMetals.find((m) => m.id === metalId) ?? bespokeMetals[0]);
	const builderPrice = $derived(
		(setting?.price ?? 0) + (stone?.price ?? 0) + (metal?.price ?? 0)
	);
	const builderSummary = $derived(
		`${setting?.name ?? ''} · ${stone?.name ?? ''} · ${metal?.name ?? ''}`
	);

	// ─── Bespoke enquiry form (mock submit → confirmation ref) ───
	let enqName = $state('');
	let enqEmail = $state('');
	let enqDetails = $state('');
	let enqError = $state('');
	let enqRef = $state('');

	function submitEnquiry() {
		if (!enqName.trim()) {
			enqError = 'Please enter your name.';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enqEmail.trim())) {
			enqError = 'Please enter a valid email address.';
			return;
		}
		enqError = '';
		enqRef = `AU-BSP-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
		if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>Custom &amp; Bespoke Jewellery — Aurel Jewels</title>
	<meta
		name="description"
		content="Design your own piece with Aurel's atelier: modify an existing design in 2–3 weeks, or create a bespoke piece from scratch in 4+ weeks with CAD visuals. Try the mock builder."
	/>
	<link rel="canonical" href="{site.url}/bespoke" />
	<meta property="og:url" content="{site.url}/bespoke" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Custom & Bespoke' }]} />

<PageHero
	eyebrow="CUSTOM & BESPOKE"
	title="Made for one person. You."
	subtitle="Modify a piece you love, or design one from nothing with our atelier. Either way, you approve CAD visuals before we make anything."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
	{#if enqRef}
		<div class="mx-auto max-w-2xl rounded-3xl bg-white px-6 py-14 text-center ring-1 ring-line sm:px-10">
			<span class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-soft text-emerald">
				<CheckCircle2 size={40} aria-hidden="true" />
			</span>
			<h2 class="mt-6 font-display text-[clamp(1.7rem,4vw,2.4rem)] font-medium text-ink">
				Thank you — your enquiry is in
			</h2>
			<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
				Our atelier will reply to {enqEmail} within 2 business days with next steps and a CAD
				consultation slot. Your design summary is below.
			</p>
			<dl class="mx-auto mt-8 max-w-md space-y-3 rounded-2xl bg-cream p-6 text-left text-[0.95rem]">
				<div class="flex justify-between gap-4">
					<dt class="text-muted">Enquiry reference</dt>
					<dd class="font-bold break-all text-ink">{enqRef}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-muted">Your design</dt>
					<dd class="text-right font-bold break-words text-ink">{builderSummary}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-muted">Estimated price</dt>
					<dd class="font-bold text-ink">{usd(builderPrice)}</dd>
				</div>
			</dl>
			<p class="mt-6 text-sm text-muted">
				This is a demo enquiry — no order was placed and no payment was taken.
			</p>
			<button
				type="button"
				onclick={() => {
					enqRef = '';
					enqName = '';
					enqEmail = '';
					enqDetails = '';
				}}
				class="mt-8 inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
			>
				Start a new enquiry
			</button>
		</div>
	{:else}
		<div class="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
			<div class="min-w-0 space-y-6">
				<div class="grid gap-6 sm:grid-cols-2">
					<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
						<span class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-soft text-emerald">
							<PencilRuler size={22} aria-hidden="true" />
						</span>
						<h2 class="mt-4 font-display text-xl font-medium text-ink">Custom — modify an existing piece</h2>
						<p class="mt-2 text-[0.95rem] leading-relaxed text-muted">
							A different stone, a different metal, an engraving, a longer chain. We adapt a piece
							you already love — ready in <strong class="text-ink">2–3 weeks</strong>.
						</p>
					</article>
					<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
						<span class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-soft text-emerald">
							<Gem size={22} aria-hidden="true" />
						</span>
						<h2 class="mt-4 font-display text-xl font-medium text-ink">Bespoke — from scratch</h2>
						<p class="mt-2 text-[0.95rem] leading-relaxed text-muted">
							A sketch, a story, a stone you inherited. We design it with you, show you CAD
							visuals to approve, then hand-make it — ready in
							<strong class="text-ink"> 4+ weeks</strong>.
						</p>
					</article>
				</div>

				<!-- 3-step builder -->
				<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
					<h2 class="font-display text-2xl font-medium text-ink">Try the builder</h2>
					<p class="mt-2 leading-relaxed text-muted">
						Three choices, one live price. This is a demo — prices are mock estimates; your final
						quote comes from the atelier.
					</p>

					<fieldset class="mt-6 min-w-0">
						<legend class="font-semibold text-ink">1 — Choose a setting</legend>
						<div class="mt-3 grid gap-3 sm:grid-cols-2">
							{#each bespokeSettings as s (s.id)}
								<button
									type="button"
									aria-pressed={settingId === s.id}
									onclick={() => (settingId = s.id)}
									class="min-h-12 rounded-2xl p-4 text-left ring-1 transition-colors duration-150 {settingId ===
									s.id
										? 'bg-emerald-soft ring-emerald'
										: 'bg-white ring-line hover:ring-emerald'}"
								>
									<span class="block font-semibold text-ink">{s.name} — {usd(s.price)}</span>
									<span class="mt-0.5 block text-sm text-muted">{s.blurb}</span>
								</button>
							{/each}
						</div>
					</fieldset>

					<fieldset class="mt-6 min-w-0">
						<legend class="font-semibold text-ink">2 — Choose a stone</legend>
						<div class="mt-3 grid gap-3 sm:grid-cols-2">
							{#each bespokeStones as s (s.id)}
								<button
									type="button"
									aria-pressed={stoneId === s.id}
									onclick={() => (stoneId = s.id)}
									class="min-h-12 rounded-2xl p-4 text-left ring-1 transition-colors duration-150 {stoneId ===
									s.id
										? 'bg-emerald-soft ring-emerald'
										: 'bg-white ring-line hover:ring-emerald'}"
								>
									<span class="block font-semibold text-ink">{s.name} — {usd(s.price)}</span>
									<span class="mt-0.5 block text-sm text-muted">{s.blurb}</span>
								</button>
							{/each}
						</div>
					</fieldset>

					<fieldset class="mt-6 min-w-0">
						<legend class="font-semibold text-ink">3 — Choose a metal</legend>
						<div class="mt-3 grid gap-3 sm:grid-cols-2">
							{#each bespokeMetals as m (m.id)}
								<button
									type="button"
									aria-pressed={metalId === m.id}
									onclick={() => (metalId = m.id)}
									class="min-h-12 rounded-2xl p-4 text-left ring-1 transition-colors duration-150 {metalId ===
									m.id
										? 'bg-emerald-soft ring-emerald'
										: 'bg-white ring-line hover:ring-emerald'}"
								>
									<span class="block font-semibold text-ink">
										{m.name}{m.price > 0 ? ` — +${usd(m.price)}` : ' — included'}
									</span>
									<span class="mt-0.5 block text-sm text-muted">{m.blurb}</span>
								</button>
							{/each}
						</div>
					</fieldset>

					<div class="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-cream p-5 ring-1 ring-line">
						<div>
							<p class="text-sm text-muted">Your design</p>
							<p class="font-semibold break-words text-ink">{builderSummary}</p>
						</div>
						<p class="text-2xl font-bold text-ink" aria-live="polite">
							{usd(builderPrice)}
						</p>
					</div>
				</article>

				<!-- Enquiry form -->
				<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
					<h2 class="flex items-center gap-2 font-display text-2xl font-medium text-ink">
						<Hammer size={22} aria-hidden="true" class="shrink-0 text-emerald" /> Tell us about your piece
					</h2>
					<p class="mt-2 leading-relaxed text-muted">
						Send your design and details — the atelier replies within 2 business days. Prefer to
						talk it through first?
						<a href="/appointments" class="font-semibold text-emerald underline underline-offset-2"
							>Book an appointment</a
						>.
					</p>
					<form
						class="mt-5 space-y-4"
						novalidate
						onsubmit={(e) => {
							e.preventDefault();
							submitEnquiry();
						}}
					>
						<div>
							<label for="bsp-name" class="mb-1.5 block text-sm font-semibold text-ink">Your name</label>
							<input
								id="bsp-name"
								type="text"
								bind:value={enqName}
								autocomplete="name"
								placeholder="Alexandra Morgan"
								class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none"
							/>
						</div>
						<div>
							<label for="bsp-email" class="mb-1.5 block text-sm font-semibold text-ink">Email</label>
							<input
								id="bsp-email"
								type="email"
								bind:value={enqEmail}
								autocomplete="email"
								placeholder="you@example.com"
								class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none"
							/>
						</div>
						<div>
							<label for="bsp-details" class="mb-1.5 block text-sm font-semibold text-ink">
								Your idea <span class="font-normal text-muted">(optional)</span>
							</label>
							<textarea
								id="bsp-details"
								bind:value={enqDetails}
								rows="4"
								maxlength="500"
								placeholder="A ring for our tenth anniversary — emerald, oval, yellow gold, with our initials engraved inside…"
								class="w-full rounded-2xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none"
							></textarea>
						</div>
						{#if enqError}
							<p class="text-sm text-red-700" role="alert">{enqError}</p>
						{/if}
						<p class="text-sm leading-relaxed text-muted">
							Custom and bespoke pieces are made for you, so they are
							<strong class="text-ink"> non-returnable</strong> — engraved and personalised pieces
							are final sale. Your design is still covered by our lifetime craftsmanship warranty;
							see <a href="/warranty" class="font-semibold text-emerald underline underline-offset-2">Warranty &amp; Authenticity</a>.
						</p>
						<button
							type="submit"
							class="inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
						>
							Send my enquiry — {usd(builderPrice)} estimate
						</button>
					</form>
				</article>
			</div>

			<aside class="min-w-0">
				<div class="overflow-hidden rounded-3xl bg-white ring-1 ring-line lg:sticky lg:top-24">
					<Picture
						name="bespoke-atelier"
						alt="A jeweller's hands setting a small gemstone into a gold ring at a workbench"
						width={1408}
						height={1760}
						sizes="(min-width: 1024px) 360px, 100vw"
						imgClass="aspect-[4/5] w-full object-cover"
					/>
					<div class="p-6">
						<h2 class="font-display text-xl font-semibold text-ink">How bespoke works</h2>
						<ol class="mt-4 space-y-3 text-sm leading-relaxed text-muted">
							<li><strong class="text-ink">1. You tell us.</strong> The enquiry above, or a consultation in store.</li>
							<li><strong class="text-ink">2. We draw it.</strong> CAD visuals for you to approve — change anything, as many times as you like.</li>
							<li><strong class="text-ink">3. We make it.</strong> Hand-finished in our atelier, hallmarked, certified and shipped insured.</li>
						</ol>
						<a
							href="/appointments"
							class="mt-5 flex min-h-12 items-center justify-center rounded-full bg-emerald text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
						>
							Book an appointment
						</a>
					</div>
				</div>
			</aside>
		</div>
	{/if}
</section>
