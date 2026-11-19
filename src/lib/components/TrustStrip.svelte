<script lang="ts">
	// One consistent trust strip, used in the PDP buy box, cart and checkout:
	// lifetime warranty · 30-day returns · insured free shipping over $50 ·
	// GIA/IGI-certified stones. (Returns window matches /returns; 30 days.)
	import { Gem, RotateCcw, ShieldCheck, Truck } from '@lucide/svelte';

	const items = [
		{ icon: ShieldCheck, title: 'Lifetime warranty', detail: 'Craftsmanship, covered for life' },
		{ icon: RotateCcw, title: '30-day returns', detail: 'Free return label included' },
		{ icon: Truck, title: 'Insured free shipping', detail: 'Free over $50, tracked' },
		{ icon: Gem, title: 'GIA/IGI-certified stones', detail: 'Lab-created, ethically sourced' }
	];
</script>

<ul class="grid grid-cols-1 gap-3 sm:grid-cols-2" aria-label="Our promises">
	{#each items as item}
		<li class="flex items-start gap-2.5 rounded-2xl bg-white px-4 py-3 ring-1 ring-line">
			<item.icon size={19} class="mt-0.5 shrink-0 text-emerald" aria-hidden="true" />
			<span class="min-w-0">
				<span class="block text-sm font-bold text-ink">{item.title}</span>
				<span class="block text-xs leading-snug text-muted">{item.detail}</span>
			</span>
		</li>
	{/each}
</ul>
