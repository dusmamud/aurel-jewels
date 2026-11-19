<script lang="ts">
	import { Check, Heart, ShoppingBag } from '@lucide/svelte';
	import type { Product } from '#lib/data/site.ts';
	import { defaultOption, usd } from '#lib/data/site.ts';
	import { addToCart } from '#lib/cart.svelte.ts';
	import { toggleWishlist, wishlist } from '#lib/wishlist.svelte.ts';
	import Picture from './Picture.svelte';
	import Stars from './Stars.svelte';

	let { product }: { product: Product } = $props();
	let added = $state(false);

	function onAdd() {
		// Quick-add records the sensible default variant (first metal +
		// default size) so the cart line shows metal/size, not an empty option.
		addToCart(product.slug, defaultOption(product));
		added = true;
		window.setTimeout(() => (added = false), 1500);
	}
</script>

<article class="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line transition-shadow duration-200 hover:shadow-[0_8px_30px_rgba(11,61,46,0.10)]">
	<a href="/shop/{product.slug}" class="relative block bg-sand" aria-label={product.name}>
		<Picture
			name={product.image}
			alt={product.imageAlt}
			width={800}
			height={800}
			sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
			imgClass="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
		/>
		{#if product.badge}
			<span class="absolute top-3 left-3 rounded-full bg-emerald px-3 py-1 text-xs font-bold tracking-wide text-white uppercase">
				{product.badge}
			</span>
		{/if}
		<button
			type="button"
			onclick={(e) => {
				e.preventDefault();
				toggleWishlist(product.slug);
			}}
			aria-label={wishlist.has(product.slug) ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
			aria-pressed={wishlist.has(product.slug)}
			class="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-sm transition-colors duration-150 {wishlist.has(
				product.slug
			)
				? 'text-emerald'
				: 'text-ink/60 hover:text-emerald'}"
		>
			<Heart size={19} aria-hidden="true" class={wishlist.has(product.slug) ? 'fill-emerald text-emerald' : ''} />
		</button>
	</a>
	<div class="flex flex-1 flex-col gap-2 p-4 sm:p-5">
		<div class="flex items-start justify-between gap-2">
			<a href="/shop/{product.slug}" class="min-w-0 font-display text-lg leading-snug font-medium text-ink hover:text-emerald">
				{product.name}
			</a>
		</div>
		<Stars rating={product.rating} reviews={product.reviews} />
		<p class="flex items-baseline gap-2">
			<span class="text-lg font-bold text-ink">{usd(product.price)}</span>
			{#if product.compareAt}
				<span class="text-sm text-muted line-through">{usd(product.compareAt)}</span>
			{/if}
		</p>
		<button
			type="button"
			onclick={onAdd}
			class="mt-auto flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep {added
				? 'bg-emerald-light'
				: ''}"
			aria-live="polite"
		>
			{#if added}
				<Check size={17} aria-hidden="true" /> Added to cart
			{:else}
				<ShoppingBag size={17} aria-hidden="true" /> Add to cart
			{/if}
		</button>
	</div>
</article>
