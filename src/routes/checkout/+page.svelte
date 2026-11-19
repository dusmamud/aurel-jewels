<script lang="ts">
	import { ArrowLeft, ArrowRight, Check, CheckCircle2, CreditCard, ShoppingBag } from '@lucide/svelte';
	import { site, usd } from '#lib/data/site.ts';
	import { cart, clearCart } from '#lib/cart.svelte.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';

	type Errors = Record<string, string>;

	let step = $state(1);
	let name = $state('');
	let email = $state('');
	let address = $state('');
	let city = $state('');
	let zip = $state('');
	let cardName = $state('');
	let cardNumber = $state('');
	let cardExpiry = $state('');
	let cardCvc = $state('');
	let errors = $state<Errors>({});

	// Snapshot taken at order time so the confirmation survives clearCart().
	let orderRef = $state('');
	let eta = $state('');
	let orderTotal = $state(0);
	let orderCount = $state(0);

	const steps = [
		{ n: 1, label: 'Cart review' },
		{ n: 2, label: 'Shipping & payment' },
		{ n: 3, label: 'Confirmation' }
	];

	function validate(): boolean {
		const next: Errors = {};
		if (!name.trim()) next.name = 'Please enter your full name.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
			next.email = 'Please enter a valid email address.';
		if (!address.trim()) next.address = 'Please enter your street address.';
		if (!city.trim()) next.city = 'Please enter your city.';
		if (!/^\d{5}(-\d{4})?$/.test(zip.trim())) next.zip = 'Please enter a valid 5-digit ZIP code.';
		if (!cardName.trim()) next.cardName = 'Please enter the name on the card.';
		if (!/^\d{13,19}$/.test(cardNumber.replace(/[\s-]/g, '')))
			next.cardNumber = 'Please enter a valid card number (13–19 digits).';
		if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry.trim()))
			next.cardExpiry = 'Use MM/YY format.';
		if (!/^\d{3,4}$/.test(cardCvc.trim())) next.cardCvc = 'Enter the 3–4 digit security code.';
		errors = next;
		return Object.keys(next).length === 0;
	}

	function placeOrder() {
		if (!validate()) return;
		orderRef = `AU-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
		const etaDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
		eta = etaDate.toLocaleDateString('en-US', {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
		orderTotal = cart.total;
		orderCount = cart.count;
		clearCart();
		step = 3;
		if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>Checkout — Aurel Jewels</title>
	<meta
		name="description"
		content="Mock checkout at Aurel Jewels. Review your cart, enter shipping details and place your order — no real payment is taken."
	/>
	<link rel="canonical" href="{site.url}/checkout" />
</svelte:head>

<PageHero
	eyebrow="CHECKOUT"
	title="Almost there"
	subtitle="This is a demo checkout — no payment is taken and no order is really placed. Your pieces are waiting below."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
	<!-- Progress indicator -->
	<ol class="flex flex-wrap items-center gap-2 sm:gap-3" aria-label="Checkout steps">
		{#each steps as s, i (s.n)}
			<li class="flex min-h-12 items-center gap-2">
				<span
					class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold {step >=
					s.n
						? 'bg-emerald text-white'
						: 'bg-white text-muted ring-1 ring-line'}"
					aria-current={step === s.n ? 'step' : undefined}
				>
					{#if step > s.n}
						<Check size={17} aria-hidden="true" />
					{:else}
						{s.n}
					{/if}
				</span>
				<span
					class="text-sm font-semibold {step === s.n ? 'text-ink' : 'text-muted'}"
					class:hidden={step !== s.n && s.n !== 1}
				>
					{s.label}
				</span>
			</li>
			{#if i < steps.length - 1}
				<li aria-hidden="true" class="h-px w-6 bg-line sm:w-10"></li>
			{/if}
		{/each}
	</ol>

	{#if step === 1}
		<!-- Step 1: Cart review -->
		<div class="mt-10 grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
			<div class="min-w-0">
				<h2 class="font-display text-2xl font-medium text-ink">Step 1 — Review your cart</h2>
				{#if cart.lines.length > 0}
					<ul class="mt-6 space-y-4">
						{#each cart.lines as line (line.slug + '::' + line.option)}
							<li class="flex items-center gap-4 rounded-3xl bg-white p-4 ring-1 ring-line">
								<span
									class="block h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-sand"
									aria-hidden="true"
								>
									<Picture
										name={line.image}
										alt=""
										width={160}
										height={160}
										sizes="80px"
										imgClass="aspect-square h-full w-full object-cover"
										pictureClass="block h-full"
									/>
								</span>
								<div class="min-w-0 flex-1">
									<p class="truncate font-display text-lg font-medium text-ink">{line.name}</p>
									{#if line.option}
										<p class="text-sm break-words text-muted">{line.option}</p>
									{/if}
									<p class="mt-1 text-sm text-muted">
										{line.qty} × {usd(line.price)}
									</p>
								</div>
								<p class="shrink-0 font-bold text-ink">{usd(line.price * line.qty)}</p>
							</li>
						{/each}
					</ul>
					<p class="mt-4">
						<a
							href="/cart"
							class="inline-flex min-h-12 items-center gap-1 text-sm font-semibold text-emerald hover:text-emerald-deep"
						>
							<ArrowLeft size={17} aria-hidden="true" /> Edit cart
						</a>
					</p>
				{:else}
					<div class="mt-6 rounded-3xl bg-white px-6 py-14 text-center ring-1 ring-line">
						<span
							class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-soft text-emerald"
						>
							<ShoppingBag size={28} aria-hidden="true" />
						</span>
						<p class="mt-5 font-display text-xl font-medium text-ink">Your cart is empty</p>
						<p class="mx-auto mt-2 max-w-sm text-muted">
							Add a piece from the shop first — then come back here to check out.
						</p>
						<a
							href="/shop"
							class="mt-6 inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
						>
							Browse the shop
						</a>
					</div>
				{/if}
			</div>
			<aside class="h-fit rounded-3xl bg-white p-6 ring-1 ring-line lg:sticky lg:top-24">
				<h3 class="font-display text-xl font-semibold text-ink">Order summary</h3>
				<dl class="mt-5 space-y-3 text-[0.95rem]">
					<div class="flex justify-between gap-4">
						<dt class="text-muted">Subtotal</dt>
						<dd class="font-semibold text-ink">{usd(cart.subtotal)}</dd>
					</div>
					<div class="flex justify-between gap-4">
						<dt class="text-muted">Shipping</dt>
						<dd class="font-semibold text-ink">
							{cart.shipping === 0 ? 'Free' : usd(cart.shipping)}
						</dd>
					</div>
					<div class="flex justify-between gap-4 border-t border-line pt-3 text-base">
						<dt class="font-bold text-ink">Total</dt>
						<dd class="font-bold text-ink">{usd(cart.total)}</dd>
					</div>
				</dl>
				<button
					type="button"
					disabled={cart.lines.length === 0}
					onclick={() => {
						step = 2;
						window.scrollTo({ top: 0, behavior: 'smooth' });
					}}
					class="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep disabled:opacity-50"
				>
					Continue to shipping <ArrowRight size={17} aria-hidden="true" />
				</button>
			</aside>
		</div>
	{:else if step === 2}
		<!-- Step 2: Shipping + payment -->
		<div class="mt-10 grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
			<form
				class="min-w-0"
				novalidate
				onsubmit={(e) => {
					e.preventDefault();
					placeOrder();
				}}
			>
				<h2 class="font-display text-2xl font-medium text-ink">Step 2 — Shipping &amp; payment</h2>

				<fieldset class="mt-6 rounded-3xl bg-white p-6 ring-1 ring-line">
					<legend class="px-2 font-display text-lg font-semibold text-ink">Shipping details</legend>
					<div class="grid gap-4 sm:grid-cols-2">
						<div class="sm:col-span-2">
							<label for="co-name" class="mb-1.5 block text-sm font-semibold text-ink">
								Full name
							</label>
							<input
								id="co-name"
								type="text"
								bind:value={name}
								autocomplete="name"
								placeholder="Alexandra Morgan"
								aria-invalid={errors.name ? 'true' : undefined}
								aria-describedby={errors.name ? 'co-name-error' : undefined}
								class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none"
							/>
							{#if errors.name}
								<p id="co-name-error" class="mt-1.5 text-sm text-red-700">{errors.name}</p>
							{/if}
						</div>
						<div class="sm:col-span-2">
							<label for="co-email" class="mb-1.5 block text-sm font-semibold text-ink">
								Email
							</label>
							<input
								id="co-email"
								type="email"
								bind:value={email}
								autocomplete="email"
								placeholder="you@example.com"
								aria-invalid={errors.email ? 'true' : undefined}
								aria-describedby={errors.email ? 'co-email-error' : undefined}
								class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none"
							/>
							{#if errors.email}
								<p id="co-email-error" class="mt-1.5 text-sm text-red-700">{errors.email}</p>
							{/if}
						</div>
						<div class="sm:col-span-2">
							<label for="co-address" class="mb-1.5 block text-sm font-semibold text-ink">
								Street address
							</label>
							<input
								id="co-address"
								type="text"
								bind:value={address}
								autocomplete="street-address"
								placeholder="12 Mercer Street, Apt 4"
								aria-invalid={errors.address ? 'true' : undefined}
								aria-describedby={errors.address ? 'co-address-error' : undefined}
								class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none"
							/>
							{#if errors.address}
								<p id="co-address-error" class="mt-1.5 text-sm text-red-700">{errors.address}</p>
							{/if}
						</div>
						<div>
							<label for="co-city" class="mb-1.5 block text-sm font-semibold text-ink">City</label>
							<input
								id="co-city"
								type="text"
								bind:value={city}
								autocomplete="address-level2"
								placeholder="New York"
								aria-invalid={errors.city ? 'true' : undefined}
								aria-describedby={errors.city ? 'co-city-error' : undefined}
								class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none"
							/>
							{#if errors.city}
								<p id="co-city-error" class="mt-1.5 text-sm text-red-700">{errors.city}</p>
							{/if}
						</div>
						<div>
							<label for="co-zip" class="mb-1.5 block text-sm font-semibold text-ink">
								ZIP code
							</label>
							<input
								id="co-zip"
								type="text"
								inputmode="numeric"
								bind:value={zip}
								autocomplete="postal-code"
								placeholder="10013"
								aria-invalid={errors.zip ? 'true' : undefined}
								aria-describedby={errors.zip ? 'co-zip-error' : undefined}
								class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none"
							/>
							{#if errors.zip}
								<p id="co-zip-error" class="mt-1.5 text-sm text-red-700">{errors.zip}</p>
							{/if}
						</div>
					</div>
				</fieldset>

				<fieldset class="mt-6 rounded-3xl bg-white p-6 ring-1 ring-line">
					<legend class="flex items-center gap-2 px-2 font-display text-lg font-semibold text-ink">
						<CreditCard size={20} aria-hidden="true" class="text-emerald" /> Payment
						<span class="text-sm font-normal text-muted">(demo — no charge)</span>
					</legend>
					<div class="grid gap-4 sm:grid-cols-2">
						<div class="sm:col-span-2">
							<label for="co-card-name" class="mb-1.5 block text-sm font-semibold text-ink">
								Name on card
							</label>
							<input
								id="co-card-name"
								type="text"
								bind:value={cardName}
								autocomplete="cc-name"
								placeholder="Alexandra Morgan"
								aria-invalid={errors.cardName ? 'true' : undefined}
								aria-describedby={errors.cardName ? 'co-card-name-error' : undefined}
								class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none"
							/>
							{#if errors.cardName}
								<p id="co-card-name-error" class="mt-1.5 text-sm text-red-700">{errors.cardName}</p>
							{/if}
						</div>
						<div class="sm:col-span-2">
							<label for="co-card-number" class="mb-1.5 block text-sm font-semibold text-ink">
								Card number
							</label>
							<input
								id="co-card-number"
								type="text"
								inputmode="numeric"
								bind:value={cardNumber}
								autocomplete="cc-number"
								placeholder="4242 4242 4242 4242"
								aria-invalid={errors.cardNumber ? 'true' : undefined}
								aria-describedby={errors.cardNumber ? 'co-card-number-error' : undefined}
								class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none"
							/>
							{#if errors.cardNumber}
								<p id="co-card-number-error" class="mt-1.5 text-sm text-red-700">
									{errors.cardNumber}
								</p>
							{/if}
						</div>
						<div>
							<label for="co-card-expiry" class="mb-1.5 block text-sm font-semibold text-ink">
								Expiry (MM/YY)
							</label>
							<input
								id="co-card-expiry"
								type="text"
								inputmode="numeric"
								bind:value={cardExpiry}
								autocomplete="cc-exp"
								placeholder="08/28"
								aria-invalid={errors.cardExpiry ? 'true' : undefined}
								aria-describedby={errors.cardExpiry ? 'co-card-expiry-error' : undefined}
								class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none"
							/>
							{#if errors.cardExpiry}
								<p id="co-card-expiry-error" class="mt-1.5 text-sm text-red-700">
									{errors.cardExpiry}
								</p>
							{/if}
						</div>
						<div>
							<label for="co-card-cvc" class="mb-1.5 block text-sm font-semibold text-ink">
								Security code (CVC)
							</label>
							<input
								id="co-card-cvc"
								type="text"
								inputmode="numeric"
								bind:value={cardCvc}
								autocomplete="cc-csc"
								placeholder="123"
								aria-invalid={errors.cardCvc ? 'true' : undefined}
								aria-describedby={errors.cardCvc ? 'co-card-cvc-error' : undefined}
								class="min-h-12 w-full rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none"
							/>
							{#if errors.cardCvc}
								<p id="co-card-cvc-error" class="mt-1.5 text-sm text-red-700">{errors.cardCvc}</p>
							{/if}
						</div>
					</div>
					<p class="mt-4 text-xs leading-relaxed text-muted">
						Demo checkout only — never enter a real card number. No payment is processed and no
						order is really placed.
					</p>
				</fieldset>

				<div class="mt-6 flex flex-wrap gap-3">
					<button
						type="button"
						onclick={() => (step = 1)}
						class="inline-flex min-h-12 items-center gap-1 rounded-full bg-white px-6 text-sm font-bold tracking-wide text-ink uppercase ring-1 ring-line transition-colors duration-150 hover:ring-emerald"
					>
						<ArrowLeft size={17} aria-hidden="true" /> Back to cart
					</button>
					<button
						type="submit"
						class="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-emerald px-6 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
					>
						Place order — {usd(cart.total)}
					</button>
				</div>
			</form>

			<aside class="h-fit rounded-3xl bg-white p-6 ring-1 ring-line lg:sticky lg:top-24">
				<h3 class="font-display text-xl font-semibold text-ink">Order summary</h3>
				<ul class="mt-4 space-y-2 text-sm text-muted">
					{#each cart.lines as line (line.slug + '::' + line.option)}
						<li class="flex justify-between gap-3">
							<span class="min-w-0 truncate">
								{line.qty} × {line.name}
							</span>
							<span class="shrink-0 font-semibold text-ink">{usd(line.price * line.qty)}</span>
						</li>
					{/each}
				</ul>
				<dl class="mt-4 space-y-3 border-t border-line pt-4 text-[0.95rem]">
					<div class="flex justify-between gap-4">
						<dt class="text-muted">Subtotal</dt>
						<dd class="font-semibold text-ink">{usd(cart.subtotal)}</dd>
					</div>
					<div class="flex justify-between gap-4">
						<dt class="text-muted">Shipping</dt>
						<dd class="font-semibold text-ink">
							{cart.shipping === 0 ? 'Free' : usd(cart.shipping)}
						</dd>
					</div>
					<div class="flex justify-between gap-4 border-t border-line pt-3 text-base">
						<dt class="font-bold text-ink">Total</dt>
						<dd class="font-bold text-ink">{usd(cart.total)}</dd>
					</div>
				</dl>
			</aside>
		</div>
	{:else}
		<!-- Step 3: Confirmation -->
		<div class="mt-10 mx-auto max-w-2xl rounded-3xl bg-white px-6 py-14 text-center ring-1 ring-line sm:px-10">
			<span
				class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-soft text-emerald"
			>
				<CheckCircle2 size={40} aria-hidden="true" />
			</span>
			<h2 class="mt-6 font-display text-[clamp(1.7rem,4vw,2.4rem)] font-medium text-ink">
				Thank you — your order is confirmed
			</h2>
			<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
				A confirmation email is on its way to {email || 'your inbox'}. Your pieces are being
				carefully packed in our signature emerald gift box.
			</p>
			<dl class="mx-auto mt-8 max-w-md space-y-3 rounded-2xl bg-cream p-6 text-left text-[0.95rem]">
				<div class="flex justify-between gap-4">
					<dt class="text-muted">Order reference</dt>
					<dd class="font-bold break-all text-ink">{orderRef}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-muted">Estimated delivery</dt>
					<dd class="font-bold text-ink">{eta}</dd>
				</div>
				<div class="flex justify-between gap-4">
					<dt class="text-muted">Items</dt>
					<dd class="font-bold text-ink">{orderCount}</dd>
				</div>
				<div class="flex justify-between gap-4 border-t border-line pt-3">
					<dt class="font-bold text-ink">Total paid</dt>
					<dd class="font-bold text-ink">{usd(orderTotal)}</dd>
				</div>
			</dl>
			<p class="mt-6 text-sm text-muted">
				This was a demo checkout — no payment was taken and no real order was placed.
			</p>
			<a
				href="/shop"
				class="mt-8 inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
			>
				Continue shopping
			</a>
		</div>
	{/if}
</section>
