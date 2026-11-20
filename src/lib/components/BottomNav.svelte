<script lang="ts">
	// Mobile bottom navigation (mobile only, below lg). Replaces the old
	// Call / WhatsApp / Shop bar so there is exactly one bottom system:
	// Home / Shop / Search / Wishlist / Cart, 48px targets, cart badge,
	// safe-area padding. The sticky mobile add-to-cart bar sits above it.
	import { Heart, Home, Search, ShoppingBag, Store } from '@lucide/svelte';
	import { page } from '$app/state';
	import { cart } from '#lib/cart.svelte.ts';
	import { wishlist } from '#lib/wishlist.svelte.ts';

	const path = $derived(page.url.pathname);
	const isActive = (href: string) =>
		href === '/' ? path === '/' : path === href || path.startsWith(href + '/');
</script>

<nav
	aria-label="Mobile navigation"
	class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
>
	<a
		href="/"
		aria-current={isActive('/') ? 'page' : undefined}
		class="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold {isActive('/')
			? 'text-emerald'
			: 'text-ink/70'}"
	>
		<Home size={21} aria-hidden="true" /> Home
	</a>
	<a
		href="/shop"
		aria-current={isActive('/shop') ? 'page' : undefined}
		class="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold {isActive('/shop')
			? 'text-emerald'
			: 'text-ink/70'}"
	>
		<Store size={21} aria-hidden="true" /> Shop
	</a>
	<a
		href="/shop"
		class="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink/70"
		aria-label="Search jewelry"
	>
		<Search size={21} aria-hidden="true" /> Search
	</a>
	<a
		href="/wishlist"
		aria-current={isActive('/wishlist') ? 'page' : undefined}
		class="relative flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold {isActive('/wishlist')
			? 'text-emerald'
			: 'text-ink/70'}"
	>
		<span class="relative">
			<Heart size={21} aria-hidden="true" />
			{#if wishlist.count > 0}
				<span class="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald px-1 text-[0.65rem] font-bold text-white">
					{wishlist.count}
				</span>
			{/if}
		</span>
		Saved
	</a>
	<a
		href="/cart"
		aria-current={isActive('/cart') ? 'page' : undefined}
		class="relative flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-semibold {isActive('/cart')
			? 'text-emerald'
			: 'text-ink/70'}"
	>
		<span class="relative">
			<ShoppingBag size={21} aria-hidden="true" />
			{#if cart.count > 0}
				<span class="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald px-1 text-[0.65rem] font-bold text-white">
					{cart.count}
				</span>
			{/if}
		</span>
		Bag
	</a>
</nav>
<!-- Spacer so the bottom nav never covers footer content on mobile -->
<div class="h-14 lg:hidden" aria-hidden="true"></div>
