<script lang="ts">
	import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, Truck } from '@lucide/svelte';
	import { site, usd } from '#lib/data/site.ts';
	import { cart, removeLine, setQty } from '#lib/cart.svelte.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';

	const freeOver = site.freeShippingOver;
	const remaining = $derived(Math.max(0, freeOver - cart.subtotal));
	const progress = $derived(cart.subtotal <= 0 ? 0 : Math.min(100, (cart.subtotal / freeOver) * 100));
</script>

<svelte:head>
	<title>Your Cart — Aurel Jewels</title>
	<meta
		name="description"
		content="Review your Aurel Jewels cart. Free shipping over $50 and 30-day free returns on every order."
	/>
	<link rel="canonical" href="{site.url}/cart" />
</svelte:head>

<PageHero
	eyebrow="YOUR CART"
	title="Review your pieces"
	subtitle="Free shipping over $50 · 30-day free returns · Every order arrives in our signature emerald gift box."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
	{#if cart.lines.length > 0}
		<div class="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
			<!-- Line items -->
			<div class="min-w-0">
				<!-- Free shipping progress -->
				<div class="rounded-3xl bg-white p-5 ring-1 ring-line sm:p-6">
					<p class="flex items-center gap-2 text-sm font-semibold text-ink">
						<Truck size={18} aria-hidden="true" class="shrink-0 text-emerald" />
						{#if remaining > 0}
							<span>
								Add <strong>{usd(remaining)}</strong> more for free shipping
							</span>
						{:else}
							<span>You have unlocked free shipping</span>
						{/if}
					</p>
					<div
						class="mt-3 h-2 overflow-hidden rounded-full bg-sand"
						role="progressbar"
						aria-valuenow={Math.round(progress)}
						aria-valuemin={0}
						aria-valuemax={100}
						aria-label="Progress toward free shipping"
					>
						<div
							class="h-full rounded-full bg-emerald transition-all duration-300"
							style="width: {progress}%"
						></div>
					</div>
				</div>

				<ul class="mt-6 space-y-4">
					{#each cart.lines as line (line.slug + '::' + line.option)}
						<li class="flex gap-4 rounded-3xl bg-white p-4 ring-1 ring-line sm:p-5">
							<a
								href="/shop/{line.slug}"
								class="block h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-sand sm:h-28 sm:w-28"
								aria-label={line.name}
							>
								<Picture
									name={line.image}
									alt={line.name}
									width={224}
									height={224}
									sizes="112px"
									imgClass="aspect-square h-full w-full object-cover"
									pictureClass="block h-full"
								/>
							</a>
							<div class="min-w-0 flex-1">
								<div class="flex items-start justify-between gap-3">
									<div class="min-w-0">
										<a
											href="/shop/{line.slug}"
											class="block truncate font-display text-lg leading-snug font-medium text-ink hover:text-emerald"
										>
											{line.name}
										</a>
										{#if line.option}
											<p class="mt-1 text-sm break-words text-muted">{line.option}</p>
										{/if}
										<p class="mt-1 text-sm font-semibold text-ink">{usd(line.price)} each</p>
									</div>
									<p class="shrink-0 text-base font-bold text-ink">
										{usd(line.price * line.qty)}
									</p>
								</div>
								<div class="mt-3 flex flex-wrap items-center gap-3">
									<div
										class="flex items-center rounded-full ring-1 ring-line"
										role="group"
										aria-label="Quantity for {line.name}"
									>
										<button
											type="button"
											aria-label="Decrease quantity of {line.name}"
											onclick={() => setQty(line.slug, line.option, line.qty - 1)}
											class="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-sand"
										>
											<Minus size={17} aria-hidden="true" />
										</button>
										<span class="w-7 text-center text-sm font-bold text-ink" aria-live="polite">
											{line.qty}
										</span>
										<button
											type="button"
											aria-label="Increase quantity of {line.name}"
											onclick={() => setQty(line.slug, line.option, line.qty + 1)}
											class="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-sand"
										>
											<Plus size={17} aria-hidden="true" />
										</button>
									</div>
									<button
										type="button"
										onclick={() => removeLine(line.slug, line.option)}
										class="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-muted transition-colors duration-150 hover:bg-sand hover:text-ink"
										aria-label="Remove {line.name} from cart"
									>
										<Trash2 size={16} aria-hidden="true" /> Remove
									</button>
								</div>
							</div>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Summary -->
			<aside class="h-fit rounded-3xl bg-white p-6 ring-1 ring-line lg:sticky lg:top-24">
				<h2 class="font-display text-xl font-semibold text-ink">Order summary</h2>
				<dl class="mt-5 space-y-3 text-[0.95rem]">
					<div class="flex justify-between gap-4">
						<dt class="text-muted">Subtotal ({cart.count} {cart.count === 1 ? 'item' : 'items'})</dt>
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
				<a
					href="/checkout"
					class="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
				>
					Checkout <ArrowRight size={17} aria-hidden="true" />
				</a>
				<a
					href="/shop"
					class="mt-3 flex min-h-12 items-center justify-center rounded-full text-sm font-bold tracking-wide text-emerald uppercase ring-1 ring-line transition-colors duration-150 hover:ring-emerald"
				>
					Continue shopping
				</a>
				<p class="mt-4 text-center text-xs leading-relaxed text-muted">
					Mock checkout — no payment is taken. 30-day free returns on every order.
				</p>
			</aside>
		</div>
	{:else}
		<div class="rounded-3xl bg-white px-6 py-16 text-center ring-1 ring-line">
			<span
				class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-soft text-emerald"
			>
				<ShoppingBag size={28} aria-hidden="true" />
			</span>
			<p class="mt-6 font-display text-2xl font-medium text-ink">Your cart is empty</p>
			<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
				Nothing here yet — but the shop is full of rings, necklaces, earrings and bracelets waiting
				to be found.
			</p>
			<a
				href="/shop"
				class="mt-8 inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
			>
				Browse the shop
			</a>
		</div>
	{/if}
</section>
