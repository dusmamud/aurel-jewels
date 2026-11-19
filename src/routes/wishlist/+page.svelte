<script lang="ts">
	import { Heart, X } from '@lucide/svelte';
	import { products, site } from '#lib/data/site.ts';
	import { toggleWishlist, wishlist } from '#lib/wishlist.svelte.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';

	const saved = $derived(
		wishlist.items
			.map((slug) => products.find((p) => p.slug === slug))
			.filter((p): p is (typeof products)[number] => p !== undefined)
	);
</script>

<svelte:head>
	<title>Wishlist — Aurel Jewels</title>
	<meta
		name="description"
		content="Your saved pieces at Aurel Jewels. Keep the ones you love in one place and add them to your cart when you are ready."
	/>
	<link rel="canonical" href="{site.url}/wishlist" />
</svelte:head>

<PageHero
	eyebrow="WISHLIST"
	title="Pieces you love"
	subtitle="Everything you have saved, in one place. Add a piece to your cart whenever you are ready — it will wait for you here."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
	{#if saved.length > 0}
		<p class="text-sm text-muted" aria-live="polite">
			{saved.length}
			{saved.length === 1 ? 'piece' : 'pieces'} saved
		</p>
		<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each saved as product (product.slug)}
				<div class="relative flex flex-col">
					<ProductCard {product} />
					<button
						type="button"
						onclick={() => toggleWishlist(product.slug)}
						class="mt-3 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold text-ink ring-1 ring-line transition-colors duration-150 hover:text-emerald hover:ring-emerald"
						aria-label="Remove {product.name} from wishlist"
					>
						<X size={17} aria-hidden="true" /> Remove from wishlist
					</button>
				</div>
			{/each}
		</div>
	{:else}
		<div class="rounded-3xl bg-white px-6 py-16 text-center ring-1 ring-line">
			<span
				class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-soft text-emerald"
			>
				<Heart size={28} aria-hidden="true" />
			</span>
			<p class="mt-6 font-display text-2xl font-medium text-ink">Your wishlist is empty</p>
			<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
				Tap the heart on any piece to save it here — for later, for a birthday, or for the one
				you keep thinking about.
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
