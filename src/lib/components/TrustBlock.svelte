<script lang="ts">
	// PDP trust block: deterministic delivery estimate, certificate of
	// authenticity badge + mock certificate modal, and the per-variant
	// ready-to-ship / made-to-order lead time — stated before payment.
	// Delivery estimate is deterministic: order before 2 PM ET ships today,
	// otherwise tomorrow; delivery is 5 days after shipping.
	import { Award, ShieldCheck, Truck, X } from '@lucide/svelte';
	import type { Product } from '#lib/data/site.ts';

	let { product }: { product: Product } = $props();
	let certOpen = $state(false);

	const delivery = $derived.by(() => {
		const now = new Date();
		const cutoff = new Date(now);
		cutoff.setHours(14, 0, 0, 0);
		const shipDays = now <= cutoff ? 0 : 1;
		const ship = new Date(now);
		ship.setDate(ship.getDate() + shipDays);
		const arrive = new Date(ship);
		arrive.setDate(arrive.getDate() + 5);
		const fmt = (d: Date) =>
			d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
		return {
			shipLabel: shipDays === 0 ? 'today' : 'tomorrow',
			arriveLabel: fmt(arrive),
			hoursLeft: Math.max(0, Math.floor((cutoff.getTime() - now.getTime()) / 3_600_000))
		};
	});

	const leadTime = $derived(
		product.leadTime ?? (product.readyToShip === false ? 'Made to order — ships in 7–10 business days' : 'Ready to ship — leaves our studio in 1–2 business days')
	);
</script>

<div class="mt-6 space-y-3">
	<p class="flex items-start gap-2.5 rounded-2xl bg-emerald-soft px-4 py-3 text-sm leading-relaxed text-ink">
		<Truck size={18} aria-hidden="true" class="mt-0.5 shrink-0 text-emerald" />
		<span>
			Order in the next {delivery.hoursLeft} hrs for delivery by
			<strong> {delivery.arriveLabel}</strong> — ships {delivery.shipLabel}, free over $50.
		</span>
	</p>
	<p class="flex items-start gap-2.5 rounded-2xl bg-white px-4 py-3 text-sm leading-relaxed text-ink ring-1 ring-line">
		<ShieldCheck size={18} aria-hidden="true" class="mt-0.5 shrink-0 text-emerald" />
		<span>
			<strong>{leadTime}.</strong> 30-day free returns · Lifetime craftsmanship warranty.
		</span>
	</p>
	<button
		type="button"
		onclick={() => (certOpen = true)}
		class="flex min-h-12 w-full items-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-left text-sm leading-relaxed text-ink ring-1 ring-line transition-colors duration-150 hover:ring-emerald"
	>
		<Award size={18} aria-hidden="true" class="shrink-0 text-gold-dark" />
		<span>
			<strong>Certificate of authenticity included</strong>
			<span class="block text-muted">Every piece ships with its own certificate — tap to see a sample.</span>
		</span>
	</button>
</div>

{#if certOpen}
	<div
		class="fixed inset-0 z-[85] flex items-end justify-center bg-ink/60 p-4 sm:items-center"
		role="dialog"
		aria-modal="true"
		aria-label="Sample certificate of authenticity"
	>
		<div class="w-full max-w-md rounded-3xl bg-cream p-6 shadow-xl sm:p-8">
			<div class="flex items-start justify-between gap-3">
				<p class="font-display text-xl font-semibold text-ink">Certificate of Authenticity</p>
				<button
					type="button"
					onclick={() => (certOpen = false)}
					aria-label="Close certificate preview"
					class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink/60 hover:bg-sand"
				>
					<X size={20} aria-hidden="true" />
				</button>
			</div>
			<div class="mt-4 rounded-2xl border-2 border-gold/50 bg-white p-5 text-center">
				<p class="text-xs font-bold tracking-[0.3em] text-gold-dark uppercase">Aurel Jewels</p>
				<p class="mt-2 font-display text-lg font-medium text-ink">{product.name}</p>
				<p class="mt-1 text-sm text-muted">14k gold-plated sterling silver · lab-created stone</p>
				<p class="mt-3 text-xs leading-relaxed text-muted">
					This certifies that the piece above was crafted by Aurel Jewels from 100%
					recycled gold and a lab-created stone, and inspected by hand before shipping.
				</p>
				<p class="mt-4 text-xs font-semibold text-ink">Sample certificate — your piece ships with its own, matching certificate.</p>
			</div>
			<p class="mt-4 text-xs leading-relaxed text-muted">
				We do not claim GIA or IGI grading for pieces under 0.5 ct. Larger lab diamonds
				ship with their grading report — see our
				<a href="/warranty" class="font-semibold text-emerald underline underline-offset-2">warranty &amp; authenticity</a>
				page.
			</p>
		</div>
	</div>
{/if}
