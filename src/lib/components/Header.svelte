<script lang="ts">
	import { Heart, Menu, Search, ShoppingBag, User, X } from '@lucide/svelte';
	import { nav } from '#lib/data/site.ts';
	import { cart } from '#lib/cart.svelte.ts';
	import { wishlist } from '#lib/wishlist.svelte.ts';
	import Logo from './Logo.svelte';
	import CartDrawer from './CartDrawer.svelte';

	let open = $state(false);
	let searchOpen = $state(false);
	let drawerOpen = $state(false);
	let scrolled = $state(false);
	let query = $state('');

	$effect(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 8;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<header
	class="sticky top-0 z-50 border-b border-line bg-cream/95 backdrop-blur transition-shadow duration-200 {scrolled
		? 'shadow-[0_2px_16px_rgba(11,61,46,0.08)]'
		: ''}"
>
	<div class="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-1 sm:px-6 lg:px-8">
		<a href="/" class="flex min-h-12 items-center gap-2 text-emerald" aria-label="Aurel Jewels — home">
			<Logo />
			<span class="leading-none">
				<span class="block font-display text-[1.25rem] tracking-[0.18em] text-ink">AUREL</span>
				<span class="block text-[0.6rem] tracking-[0.42em] text-muted">JEWELS</span>
			</span>
		</a>

		<nav aria-label="Primary" class="hidden items-center gap-5 xl:flex">
			{#each nav as item}
				<a
					href={item.href}
					class="min-h-12 content-center text-[0.95rem] font-medium whitespace-nowrap text-ink/80 uppercase transition-colors duration-150 hover:text-emerald"
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center">
			<button
				type="button"
				onclick={() => (searchOpen = !searchOpen)}
				aria-expanded={searchOpen}
				aria-label="Search jewelry"
				class="flex h-12 w-12 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:text-emerald"
			>
				<Search size={20} aria-hidden="true" />
			</button>
			<a
				href="/track-order"
				aria-label="My orders — track your order"
				class="hidden h-12 w-12 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:text-emerald sm:flex"
			>
				<User size={20} aria-hidden="true" />
			</a>
			<a
				href="/wishlist"
				aria-label="Wishlist, {wishlist.count} saved"
				class="relative hidden h-12 w-12 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:text-emerald sm:flex"
			>
				<Heart size={20} aria-hidden="true" />
				{#if wishlist.count > 0}
					<span class="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald text-[0.65rem] font-bold text-white">
						{wishlist.count}
					</span>
				{/if}
			</a>
			<button
				type="button"
				onclick={() => (drawerOpen = true)}
				aria-label="Shopping bag, {cart.count} items"
				class="relative flex h-12 w-12 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:text-emerald"
			>
				<ShoppingBag size={20} aria-hidden="true" />
				{#if cart.count > 0}
					<span class="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald text-[0.65rem] font-bold text-white">
						{cart.count}
					</span>
				{/if}
			</button>
			<button
				type="button"
				class="flex h-12 w-12 items-center justify-center rounded-full text-ink xl:hidden"
				aria-expanded={open}
				aria-controls="mobile-menu"
				aria-label={open ? 'Close menu' : 'Open menu'}
				onclick={() => (open = !open)}
			>
				{#if open}<X size={24} aria-hidden="true" />{:else}<Menu size={24} aria-hidden="true" />{/if}
			</button>
		</div>
	</div>

	{#if searchOpen}
		<div class="border-t border-line bg-cream px-4 py-3 sm:px-6">
			<form
				role="search"
				action="/shop"
				method="get"
				class="mx-auto flex max-w-2xl items-center gap-2"
				onsubmit={() => (searchOpen = false)}
			>
				<label for="site-search" class="sr-only">Search jewelry</label>
				<input
					id="site-search"
					name="q"
					type="search"
					bind:value={query}
					placeholder="Search rings, necklaces, emeralds…"
					class="min-h-12 flex-1 rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted"
				/>
				<button
					type="submit"
					class="flex min-h-12 items-center rounded-full bg-emerald px-6 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
				>
					Search
				</button>
			</form>
		</div>
	{/if}

	{#if open}
		<nav id="mobile-menu" aria-label="Mobile" data-lenis-prevent class="border-t border-line bg-cream px-4 pt-2 pb-4 xl:hidden">
			{#each nav as item}
				<a
					href={item.href}
					class="block min-h-12 content-center border-b border-line/60 py-2 text-base font-medium text-ink uppercase"
					onclick={() => (open = false)}
				>
					{item.label}
				</a>
			{/each}
			<div class="mt-4 flex gap-3">
				<a
					href="/wishlist"
					class="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line text-sm font-bold text-ink"
					onclick={() => (open = false)}
				>
					<Heart size={17} aria-hidden="true" /> Wishlist ({wishlist.count})
				</a>
				<a
					href="/shop"
					class="flex min-h-12 flex-1 items-center justify-center rounded-full bg-emerald text-sm font-bold text-white uppercase"
					onclick={() => (open = false)}
				>
					Shop now
				</a>
			</div>
		</nav>
	{/if}
</header>

<CartDrawer bind:open={drawerOpen} />
