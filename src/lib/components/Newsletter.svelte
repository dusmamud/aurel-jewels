<script lang="ts">
	import { Check, Mail } from '@lucide/svelte';

	let email = $state('');
	let pending = $state(false);
	let done = $state(false);
	let error = $state('');

	function subscribe(event: Event) {
		event.preventDefault();
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			error = 'Please enter a valid email address.';
			return;
		}
		error = '';
		// Double opt-in (demo): a confirmation step stands in for the email
		// the subscriber would receive — nothing is really sent.
		pending = true;
	}

	function confirm() {
		pending = false;
		done = true;
	}
</script>

<section id="newsletter" class="scroll-mt-24 border-y border-line bg-sand" aria-label="Subscribe to our newsletter">
	<div class="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
		<div class="flex items-start gap-3">
			<Mail size={26} class="mt-1 shrink-0 text-emerald" aria-hidden="true" />
			<div>
				<h2 class="font-display text-2xl font-medium text-ink">Subscribe to our newsletter</h2>
				<p class="mt-1 text-muted">Be the first to know about new collections, special offers and more. Get 10% off your first order.</p>
			</div>
		</div>
		{#if done}
			<p class="flex min-h-12 flex-wrap items-center gap-2 rounded-full bg-emerald-soft px-6 font-semibold text-emerald" role="status">
				<Check size={19} aria-hidden="true" /> You are subscribed — welcome to Aurel! Your 10% code is <strong>AUREL10</strong>.
			</p>
		{:else if pending}
			<div class="w-full max-w-lg rounded-3xl bg-white p-5 ring-1 ring-line" role="status">
				<p class="font-semibold text-ink">Almost there — check your inbox</p>
				<p class="mt-1 text-sm leading-relaxed text-muted">
					We sent a confirmation email to <strong class="text-ink">{email.trim()}</strong> (demo — no
					email was really sent). Confirm below to finish subscribing and unlock 10% off your
					first order.
				</p>
				<div class="mt-4 flex flex-wrap gap-2">
					<button
						type="button"
						onclick={confirm}
						class="inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
					>
						Confirm my subscription
					</button>
					<button
						type="button"
						onclick={() => (pending = false)}
						class="inline-flex min-h-12 items-center rounded-full bg-white px-6 text-sm font-bold text-ink ring-1 ring-line transition-colors duration-150 hover:ring-emerald"
					>
						Change email
					</button>
				</div>
			</div>
		{:else}
			<form class="flex w-full max-w-lg flex-col gap-2 sm:flex-row" onsubmit={subscribe} novalidate>
				<label for="newsletter-email" class="sr-only">Email address</label>
				<input
					id="newsletter-email"
					type="email"
					bind:value={email}
					placeholder="Enter your email address"
					aria-invalid={error ? 'true' : undefined}
					aria-describedby={error ? 'newsletter-error' : undefined}
					class="min-h-12 flex-1 rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted"
				/>
				<button
					type="submit"
					class="flex min-h-12 items-center justify-center rounded-full bg-emerald px-8 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
				>
					Subscribe
				</button>
			</form>
			{#if error}<p id="newsletter-error" role="alert" class="text-sm font-semibold text-red-800">{error}</p>{/if}
		{/if}
	</div>
</section>
