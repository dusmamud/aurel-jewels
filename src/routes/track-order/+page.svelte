<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { site } from '#lib/data/site.ts';

	let orderNumber = $state('');
	let email = $state('');
	let error = $state('');
	let searched = $state(false);

	const steps = [
		{ label: 'Order placed', detail: 'We received your order and are preparing it in the atelier.' },
		{ label: 'Shipped', detail: 'Your order left our SoHo boutique and is on its way to you.' },
		{ label: 'Out for delivery', detail: 'Your package is with the local courier and will arrive today.' },
		{ label: 'Delivered', detail: 'Enjoy your piece — and thank you for choosing Aurel.' }
	];

	// Demo: any valid input shows the "Shipped" state.
	const currentStep = 1;

	function submit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		if (orderNumber.trim().length < 4) {
			error = 'Please enter your order number, e.g. AU-123456.';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			error = 'Please enter the email address used for the order.';
			return;
		}
		searched = true;
	}
</script>

<svelte:head>
	<title>Track Your Order — Aurel Jewels</title>
	<meta
		name="description"
		content="Check the status of your Aurel Jewels order with your order number and email address."
	/>
	<link rel="canonical" href="{site.url}/track-order" />
</svelte:head>

<PageHero
	eyebrow="TRACK YOUR ORDER"
	title="Where is my order?"
	subtitle="Enter your order number and the email address you used at checkout. Orders ship within 1–2 business days from New York."
/>

<section class="mx-auto max-w-3xl px-4 py-14 sm:px-6">
	<div class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
		{#if !searched}
			<h2 class="font-display text-2xl font-medium text-ink">Find your order</h2>
			<p class="mt-2 text-sm leading-relaxed text-muted">
				Your order number looks like <strong class="text-ink">AU-123456</strong> and is in your
				order confirmation email. This is a demo tracker — any order number and email will show
				the demo status below.
			</p>
			<form class="mt-6 space-y-5" onsubmit={submit} novalidate>
				<div>
					<label for="track-order-number" class="mb-1.5 block text-sm font-semibold text-ink">Order number</label>
					<input
						id="track-order-number"
						type="text"
						bind:value={orderNumber}
						placeholder="AU-123456"
						class="min-h-12 w-full rounded-xl border border-line bg-cream px-4 text-ink placeholder:text-muted/60 focus:border-gold-dark focus:outline-none"
					/>
				</div>
				<div>
					<label for="track-email" class="mb-1.5 block text-sm font-semibold text-ink">Email address</label>
					<input
						id="track-email"
						type="email"
						bind:value={email}
						autocomplete="email"
						placeholder="you@example.com"
						class="min-h-12 w-full rounded-xl border border-line bg-cream px-4 text-ink placeholder:text-muted/60 focus:border-gold-dark focus:outline-none"
					/>
				</div>
				{#if error}
					<p class="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">{error}</p>
				{/if}
				<button
					type="submit"
					class="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-emerald px-7 text-base font-semibold text-white transition-colors duration-200 hover:bg-emerald-deep sm:w-auto"
				>
					Track my order
				</button>
			</form>
		{:else}
			<div role="status">
				<div class="flex flex-wrap items-center justify-between gap-3">
					<div class="min-w-0">
						<p class="text-sm text-muted">Order</p>
						<p class="font-display text-2xl font-medium break-all text-ink">{orderNumber.trim().toUpperCase()}</p>
					</div>
					<span class="inline-flex min-h-12 items-center rounded-full bg-emerald-soft px-5 text-sm font-semibold text-emerald">
						Shipped
					</span>
				</div>
				<p class="mt-3 text-sm leading-relaxed text-muted">
					Demo status: this tracker shows a sample "Shipped" order. In the live store, this page
					would show your real tracking number, carrier and delivery date.
				</p>
				<ol class="mt-8 space-y-0">
					{#each steps as step, i}
						<li class="relative flex gap-4 pb-8 last:pb-0">
							{#if i < steps.length - 1}
								<span
									class="absolute top-8 left-[15px] h-[calc(100%-2rem)] w-0.5 {i < currentStep
										? 'bg-gold-dark'
										: 'bg-line'}"
									aria-hidden="true"
								></span>
							{/if}
							<span
								class="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold {i <
								currentStep
									? 'bg-gold-dark text-white'
									: i === currentStep
										? 'bg-emerald text-white'
										: 'bg-sand text-muted'}"
								aria-hidden="true"
							>
								{i < currentStep ? '✓' : i + 1}
							</span>
							<div class="min-w-0 pt-0.5">
								<p class="font-semibold {i <= currentStep ? 'text-ink' : 'text-muted'}">
									{step.label}
									{#if i === currentStep}
										<span class="ml-2 rounded-full bg-emerald-soft px-2.5 py-0.5 text-xs font-semibold text-emerald">Current</span>
									{/if}
								</p>
								<p class="mt-1 text-sm leading-relaxed text-muted">{step.detail}</p>
							</div>
						</li>
					{/each}
				</ol>
				<div class="mt-8 flex flex-wrap gap-3">
					<button
						type="button"
						class="inline-flex min-h-12 items-center rounded-full bg-emerald px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-deep"
						onclick={() => {
							searched = false;
							orderNumber = '';
							email = '';
						}}
					>
						Track another order
					</button>
					<a
						href="/contact"
						class="inline-flex min-h-12 items-center rounded-full border border-gold/50 px-6 text-sm font-semibold text-gold-dark transition-colors duration-200 hover:border-gold-dark"
					>
						Need help? Contact us
					</a>
				</div>
			</div>
		{/if}
	</div>
	<p class="mt-6 text-center text-sm leading-relaxed text-muted">
		Tracking not updated within 48 hours of shipping? Email
		<a href="mailto:{site.email}" class="font-semibold break-all text-gold-dark underline underline-offset-4">{site.email}</a>
		or call <a href={site.phoneHref} class="font-semibold text-gold-dark underline underline-offset-4">{site.phoneDisplay}</a>.
	</p>
</section>
