<script lang="ts">
	// "Ask an expert" — lightweight mock help widget. FAQ-first panel, with a
	// path into appointments/contact for a stylist chat. Pinned bottom-right,
	// docked ABOVE the mobile bottom nav, collapsible, and never covering the
	// sticky add-to-cart bar (it hides while the lightbox is open is handled
	// by the PDP; here it simply sits above the nav).
	import { HelpCircle, MessageCircle, X } from '@lucide/svelte';
	import { page } from '$app/state';

	let open = $state(false);
	const faqs = [
		{ q: 'How do I find my ring size?', a: 'Use our printable ring sizer on the size guide, or order a free sizer — most people fall between sizes 6 and 8.' },
		{ q: 'Is shipping free?', a: 'Yes, on every order over $50. Orders under $50 ship for a flat $6.95.' },
		{ q: 'Can I return a piece?', a: 'Any unworn piece within 30 days, free. Engraved pieces are final sale.' },
		{ q: 'Are the stones real?', a: 'Our stones are lab-created — chemically identical to mined stones, conflict-free by design. Pieces over 0.5 ct ship with a certificate of authenticity.' }
	];
	const show = $derived(['/cart', '/checkout'].includes(page.url.pathname) || page.url.pathname.startsWith('/shop/'));
</script>

{#if show}
	<div class="fixed right-4 bottom-[4.75rem] z-[65] lg:bottom-24">
		{#if open}
			<div class="mb-3 w-[calc(100vw-2rem)] max-w-sm rounded-3xl bg-white p-5 shadow-[0_16px_40px_rgba(11,61,46,0.20)] ring-1 ring-line" role="dialog" aria-label="Ask an expert">
				<div class="flex items-start justify-between gap-3">
					<div>
						<p class="font-display text-lg font-semibold text-ink">Ask an expert</p>
						<p class="mt-1 text-xs leading-relaxed text-muted">
							Stylists are here Mon–Sat, 10 AM–7 PM ET (demo hours). Answers below are instant.
						</p>
					</div>
					<button
						type="button"
						onclick={() => (open = false)}
						aria-label="Close help panel"
						class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink/60 hover:bg-sand"
					>
						<X size={20} aria-hidden="true" />
					</button>
				</div>
				<ul class="mt-4 space-y-2">
					{#each faqs as f (f.q)}
						<li>
							<details class="group rounded-2xl bg-cream ring-1 ring-line">
								<summary class="flex min-h-12 cursor-pointer list-none items-center px-4 text-sm font-semibold text-ink">
									{f.q}
								</summary>
								<p class="px-4 pb-4 text-sm leading-relaxed text-muted">{f.a}</p>
							</details>
						</li>
					{/each}
				</ul>
				<a
					href="/appointments"
					class="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald px-5 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
				>
					<MessageCircle size={17} aria-hidden="true" /> Chat with a stylist — book a slot
				</a>
				<p class="mt-3 text-center text-xs text-muted">
					Prefer email? <a href="/contact" class="font-semibold text-emerald underline underline-offset-2">Contact us</a>
				</p>
			</div>
		{/if}
		<button
			type="button"
			onclick={() => (open = !open)}
			aria-expanded={open}
			aria-label={open ? 'Close help' : 'Ask an expert'}
			class="ml-auto flex h-14 min-h-14 w-14 items-center justify-center rounded-full bg-emerald text-white shadow-lg transition-transform duration-200 hover:scale-105"
		>
			{#if open}<X size={24} aria-hidden="true" />{:else}<HelpCircle size={24} aria-hidden="true" />{/if}
		</button>
	</div>
{/if}
