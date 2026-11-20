<script lang="ts">
	// Cookie consent (frontend only, mock). Accept / decline / preferences,
	// stored in localStorage. No real tracking runs on this demo site either
	// way — the banner records the visitor's choice, nothing else.
	import { Cookie } from '@lucide/svelte';

	const STORAGE_KEY = 'aurel-cookie-consent-v1';
	type Choice = 'accepted' | 'declined' | 'custom';
	let visible = $state(false);
	let prefsOpen = $state(false);
	let analytics = $state(false);
	let marketing = $state(false);

	$effect(() => {
		try {
			if (!window.localStorage.getItem(STORAGE_KEY)) visible = true;
		} catch {
			visible = true;
		}
		// "Privacy Choices" in the footer re-opens the banner.
		const reopen = () => {
			prefsOpen = true;
			visible = true;
		};
		window.addEventListener('aurel:cookie-preferences', reopen);
		return () => window.removeEventListener('aurel:cookie-preferences', reopen);
	});

	function save(choice: Choice) {
		try {
			window.localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({ choice, analytics, marketing, at: new Date().toISOString() })
			);
		} catch {
			// Storage unavailable: the banner just hides for this session.
		}
		visible = false;
		prefsOpen = false;
	}
</script>

{#if visible}
	<div
		class="fixed inset-x-0 bottom-14 z-[70] px-4 pb-3 lg:bottom-0"
		role="dialog"
		aria-label="Cookie preferences"
		aria-live="polite"
	>
		<div class="mx-auto max-w-2xl rounded-3xl bg-ink p-5 text-cream shadow-[0_16px_40px_rgba(0,0,0,0.35)] sm:p-6">
			<p class="flex items-center gap-2 font-display text-lg font-semibold">
				<Cookie size={20} aria-hidden="true" class="text-gold-light" /> Cookies, your call
			</p>
			<p class="mt-2 text-sm leading-relaxed text-cream/80">
				We use cookies to remember your bag, wishlist and preferences on this device. No
				advertising trackers run on this demo site. Choose what you are happy with —
				<a href="/privacy" class="font-semibold text-gold-light underline underline-offset-2">privacy policy</a>.
			</p>
			{#if prefsOpen}
				<div class="mt-4 space-y-3 rounded-2xl bg-white/10 p-4">
					<label class="flex min-h-12 cursor-pointer items-center justify-between gap-3 text-sm font-semibold">
						<span>Strictly necessary <span class="block text-xs font-normal text-cream/70">Bag, wishlist, checkout — always on.</span></span>
						<input type="checkbox" checked disabled class="h-5 w-5 shrink-0 accent-emerald" aria-label="Strictly necessary cookies (always on)" />
					</label>
					<label class="flex min-h-12 cursor-pointer items-center justify-between gap-3 text-sm font-semibold">
						<span>Analytics <span class="block text-xs font-normal text-cream/70">Anonymous visit counts, so we know which pages help.</span></span>
						<input type="checkbox" bind:checked={analytics} class="h-5 w-5 shrink-0 accent-emerald" />
					</label>
					<label class="flex min-h-12 cursor-pointer items-center justify-between gap-3 text-sm font-semibold">
						<span>Marketing <span class="block text-xs font-normal text-cream/70">Reminders about pieces you looked at.</span></span>
						<input type="checkbox" bind:checked={marketing} class="h-5 w-5 shrink-0 accent-emerald" />
					</label>
				</div>
			{/if}
			<div class="mt-4 flex flex-wrap gap-2">
				<button
					type="button"
					onclick={() => save(prefsOpen ? 'custom' : 'accepted')}
					class="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-emerald px-5 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-light"
				>
					{prefsOpen ? 'Save preferences' : 'Accept all'}
				</button>
				<button
					type="button"
					onclick={() => save('declined')}
					class="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-white/15 px-5 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-white/25"
				>
					Decline
				</button>
				<button
					type="button"
					onclick={() => (prefsOpen = !prefsOpen)}
					aria-expanded={prefsOpen}
					class="inline-flex min-h-12 items-center justify-center rounded-full px-4 text-sm font-semibold text-gold-light underline underline-offset-2"
				>
					{prefsOpen ? 'Hide preferences' : 'Preferences'}
				</button>
			</div>
		</div>
	</div>
{/if}
