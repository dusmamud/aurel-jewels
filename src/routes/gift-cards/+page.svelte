<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { giftCardHowItWorks, giftCardValidity, giftCards, site, usd } from '#lib/data/site.ts';

	let selected = $state(100);
	let purchased = $state(false);
	let recipient = $state('');
	let giftMessage = $state('');
	let formError = $state('');

	function buy() {
		formError = '';
		if (!recipient.trim()) {
			formError = 'Please add a recipient name for the gift card.';
			return;
		}
		purchased = true;
	}
</script>

<svelte:head>
	<title>Gift Cards — Aurel Jewels</title>
	<meta
		name="description"
		content="Give an Aurel Jewels gift card from $50 — valid 12 months on any piece. Digital delivery by email or a printed card, with your message included."
	/>
	<link rel="canonical" href="{site.url}/gift-cards" />
</svelte:head>

<PageHero
	eyebrow="GIFT CARDS"
	title="Give them something that sparkles"
	subtitle="A gift card that works on any piece in the store. Pick an amount, add your message, and let them choose the piece they will actually wear."
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
	<div class="grid items-start gap-10 lg:grid-cols-2">
		<!-- Amounts + mock purchase -->
		<div class="min-w-0">
			<h2 class="font-display text-2xl font-medium text-ink">Choose an amount</h2>
			<div class="mt-5 grid gap-4 sm:grid-cols-2" role="radiogroup" aria-label="Gift card amount">
				{#each giftCards as card}
					<button
						type="button"
						role="radio"
						aria-checked={selected === card.amount}
						class="min-h-12 rounded-3xl bg-white p-6 text-left ring-1 transition-colors duration-200 {selected ===
						card.amount
							? 'ring-2 ring-gold-dark'
							: 'ring-line hover:ring-gold-dark/60'}"
						onclick={() => {
							selected = card.amount;
							purchased = false;
						}}
					>
						<p class="font-display text-3xl font-medium text-gold-dark">{usd(card.amount)}</p>
						<p class="mt-2 font-semibold text-ink">{card.label}</p>
						<p class="mt-1 text-[0.95rem] leading-relaxed text-muted">{card.note}</p>
						{#if selected === card.amount}
							<p class="mt-3 text-sm font-semibold text-emerald">Selected ✓</p>
						{/if}
					</button>
				{/each}
			</div>

			{#if purchased}
				<div class="mt-6 rounded-3xl bg-emerald-soft p-6 ring-1 ring-line" role="status">
					<p class="font-display text-xl font-medium text-ink">Gift card ready for {recipient.trim()}!</p>
					<p class="mt-2 leading-relaxed text-muted">
						Your {usd(selected)} Aurel gift card has been prepared (demo only — no payment was taken and
						no card was sent). In the live store, it would arrive by email the same day with your
						message included.
					</p>
					<button
						type="button"
						class="mt-4 inline-flex min-h-12 items-center rounded-full bg-emerald px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-deep"
						onclick={() => {
							purchased = false;
							recipient = '';
							giftMessage = '';
						}}
					>
						Create another gift card
					</button>
				</div>
			{:else}
				<div class="mt-6 rounded-3xl bg-white p-6 ring-1 ring-line">
					<h3 class="font-semibold text-ink">Make it theirs</h3>
					<div class="mt-4 space-y-4">
						<div>
							<label for="gc-recipient" class="mb-1.5 block text-sm font-semibold text-ink">Recipient name</label>
							<input
								id="gc-recipient"
								type="text"
								bind:value={recipient}
								placeholder="Who is it for?"
								class="min-h-12 w-full rounded-xl border border-line bg-cream px-4 text-ink placeholder:text-muted/60 focus:border-gold-dark focus:outline-none"
							/>
						</div>
						<div>
							<label for="gc-message" class="mb-1.5 block text-sm font-semibold text-ink">
								Gift message <span class="font-normal text-muted">(optional)</span>
							</label>
							<textarea
								id="gc-message"
								bind:value={giftMessage}
								rows="3"
								placeholder="Happy birthday — pick something beautiful."
								class="w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink placeholder:text-muted/60 focus:border-gold-dark focus:outline-none"
							></textarea>
						</div>
						{#if formError}
							<p class="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">{formError}</p>
						{/if}
						<button
							type="button"
							class="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-emerald px-7 text-base font-semibold text-white transition-colors duration-200 hover:bg-emerald-deep sm:w-auto"
							onclick={buy}
						>
							Purchase {usd(selected)} gift card
						</button>
						<p class="text-xs leading-relaxed text-muted">
							Demo only — no payment is taken on this site. Prefer to buy in person? Visit the
							SoHo boutique or call {site.phoneDisplay}.
						</p>
					</div>
				</div>
			{/if}
		</div>

		<div class="min-w-0 overflow-hidden rounded-3xl border border-line">
			<Picture
				name="gift-box"
				alt="Cream gift box with a deep emerald green satin ribbon"
				width={900}
				height={700}
				sizes="(max-width: 1024px) 90vw, 560px"
				imgClass="aspect-[9/7] h-auto w-full object-cover"
				pictureClass="block"
			/>
		</div>
	</div>

	<h2 class="mt-14 font-display text-2xl font-medium text-ink">How it works</h2>
	<ol class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each giftCardHowItWorks as step, i}
			<li class="rounded-3xl bg-white p-6 ring-1 ring-line">
				<span
					class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sand font-display text-lg font-semibold text-gold-dark"
					aria-hidden="true"
				>
					{i + 1}
				</span>
				<h3 class="mt-3 font-semibold text-ink">{step.title}</h3>
				<p class="mt-1 text-[0.95rem] leading-relaxed text-muted">{step.detail}</p>
			</li>
		{/each}
	</ol>

	<div class="mt-10 rounded-3xl bg-sand/60 p-6 ring-1 ring-line sm:p-8">
		<h2 class="font-display text-2xl font-medium text-ink">Good to know</h2>
		<p class="mt-2 max-w-3xl text-[0.95rem] leading-relaxed text-muted">{giftCardValidity}</p>
		<p class="mt-3 max-w-3xl text-[0.95rem] leading-relaxed text-muted">
			Gift cards cannot be redeemed for cash. If an order total is less than the card value, the
			remaining balance stays on the card for the next order.
		</p>
	</div>
</section>
