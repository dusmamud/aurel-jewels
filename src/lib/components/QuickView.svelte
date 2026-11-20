<script lang="ts">
	// Quick view: tap-first modal on product cards (image, price, metal/size
	// picker, add to cart). Never hover-only — the trigger is a real button
	// on every card, so it works on mobile.
	import { Check, Heart, ShoppingBag, X } from '@lucide/svelte';
	import type { Product } from '#lib/data/site.ts';
	import { defaultOption, usd } from '#lib/data/site.ts';
	import { addToCart } from '#lib/cart.svelte.ts';
	import { toggleWishlist, wishlist } from '#lib/wishlist.svelte.ts';
	import Picture from './Picture.svelte';
	import Stars from './Stars.svelte';

	let { product, open, onClose }: { product: Product; open: boolean; onClose: () => void } = $props();
	// Defaults here; the $effect below sets the real metal/size from the
	// product on mount and whenever a different product opens (reading the
	// prop inside $state(...) would only capture its initial value).
	let metal = $state('Yellow Gold');
	let size = $state('One size');
	let added = $state(false);

	$effect(() => {
		// Reset when a different product opens.
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		product.slug;
		metal = product.metals[0] ?? 'Yellow Gold';
		size = product.sizes[0] ?? 'One size';
		added = false;
	});

	$effect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', onKey);
		document.body.style.overflow = 'hidden';
		return () => {
			window.removeEventListener('keydown', onKey);
			document.body.style.overflow = '';
		};
	});

	const sizeLabel = $derived(/^\d+$/.test(size) ? `Size ${size}` : size);
	function onAdd() {
		addToCart(product.slug, `${metal} · ${sizeLabel}`, 1);
		added = true;
		window.setTimeout(() => (added = false), 1500);
	}
</script>

{#if open}
	<div
		class="fixed inset-0 z-[80] flex items-end justify-center bg-ink/60 p-4 sm:items-center"
		role="dialog"
		aria-modal="true"
		aria-label="Quick view — {product.name}"
	>
		<div class="max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-cream shadow-xl">
			<div class="grid gap-0 sm:grid-cols-2">
				<div class="relative bg-sand">
					<Picture
						name={product.image}
						alt={product.imageAlt}
						width={800}
						height={800}
						sizes="(min-width: 640px) 50vw, 100vw"
						eager
						imgClass="aspect-square w-full object-cover sm:aspect-auto sm:h-full"
						pictureClass="block h-full"
					/>
				</div>
				<div class="min-w-0 p-6">
					<div class="flex items-start justify-between gap-3">
						<div class="min-w-0">
							<h2 class="font-display text-2xl leading-tight font-medium text-ink">{product.name}</h2>
							<p class="mt-2"><Stars rating={product.rating} reviews={product.reviews} /></p>
						</div>
						<button
							type="button"
							onclick={onClose}
							aria-label="Close quick view"
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-ink/60 hover:bg-sand"
						>
							<X size={22} aria-hidden="true" />
						</button>
					</div>
					<p class="mt-3 flex items-baseline gap-2">
						<span class="text-2xl font-bold text-ink">{usd(product.price)}</span>
						{#if product.compareAt}
							<span class="text-base text-muted line-through">{usd(product.compareAt)}</span>
						{/if}
					</p>
					<p class="mt-3 text-sm leading-relaxed text-muted">{product.description}</p>
					<div class="mt-5">
						<p class="text-sm font-bold text-ink">Metal: <span class="font-medium text-muted">{metal}</span></p>
						<div class="mt-2 flex flex-wrap gap-2" role="group" aria-label="Choose a metal">
							{#each product.metals as m (m)}
								<button
									type="button"
									onclick={() => (metal = m)}
									aria-pressed={metal === m}
									class="min-h-12 rounded-full px-4 text-sm font-semibold transition-colors duration-150 {metal === m
										? 'bg-emerald text-white'
										: 'bg-white text-ink ring-1 ring-line hover:ring-emerald'}"
								>
									{m}
								</button>
							{/each}
						</div>
					</div>
					<div class="mt-4">
						<p class="text-sm font-bold text-ink">Size: <span class="font-medium text-muted">{sizeLabel}</span></p>
						<div class="mt-2 flex flex-wrap gap-2" role="group" aria-label="Choose a size">
							{#each product.sizes as s (s)}
								<button
									type="button"
									onclick={() => (size = s)}
									aria-pressed={size === s}
									class="flex min-h-12 min-w-12 items-center justify-center rounded-full px-4 text-sm font-semibold transition-colors duration-150 {size === s
										? 'bg-emerald text-white'
										: 'bg-white text-ink ring-1 ring-line hover:ring-emerald'}"
								>
									{s}
								</button>
							{/each}
						</div>
					</div>
					<div class="mt-6 flex gap-3">
						<button
							type="button"
							onclick={onAdd}
							aria-live="polite"
							class="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-emerald px-5 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
						>
							{#if added}<Check size={17} aria-hidden="true" /> Added{:else}<ShoppingBag size={17} aria-hidden="true" /> Add to bag — {usd(product.price)}{/if}
						</button>
						<button
							type="button"
							onclick={() => toggleWishlist(product.slug)}
							aria-label={wishlist.has(product.slug) ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
							aria-pressed={wishlist.has(product.slug)}
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-line {wishlist.has(product.slug) ? 'text-emerald ring-emerald' : 'text-ink/60 hover:text-emerald'}"
						>
							<Heart size={20} aria-hidden="true" class={wishlist.has(product.slug) ? 'fill-emerald text-emerald' : ''} />
						</button>
					</div>
					<a
						href="/shop/{product.slug}"
						class="mt-4 inline-flex min-h-12 items-center text-sm font-semibold text-emerald hover:text-emerald-deep"
					>
						Full details, engraving &amp; reviews →
					</a>
				</div>
			</div>
		</div>
	</div>
{/if}
