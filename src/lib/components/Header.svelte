<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from '@lucide/svelte';
	import { categories, collections, nav, products, usd } from '#lib/data/site.ts';
	import { cart } from '#lib/cart.svelte.ts';
	import { wishlist } from '#lib/wishlist.svelte.ts';
	import Logo from './Logo.svelte';
	import CartDrawer from './CartDrawer.svelte';
	import Picture from './Picture.svelte';

	let open = $state(false);
	let searchOpen = $state(false);
	let drawerOpen = $state(false);
	let scrolled = $state(false);
	let query = $state('');
	let activeIndex = $state(-1);
	let megaOpen = $state<'shop' | 'collections' | null>(null);

	$effect(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 8;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	// Keep the header search box in sync with the shop results page
	// (back/forward, or a search typed in the shop itself).
	$effect(() => {
		if (!browser) return;
		if (page.url.pathname !== '/shop') return;
		const urlQ = page.url.searchParams.get('q') ?? '';
		if (urlQ !== query) {
			query = urlQ;
			activeIndex = -1;
		}
	});

	// ─── Search autocomplete (from 2 chars) ───
	const suggestions = $derived.by(() => {
		const q = query.trim().toLowerCase();
		if (q.length < 2) return { products: [], categories: [] };
		return {
			products: products
				.filter(
					(p) =>
						p.name.toLowerCase().includes(q) ||
						p.description.toLowerCase().includes(q) ||
						p.category.toLowerCase().includes(q)
				)
				.slice(0, 5),
			categories: categories.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 3)
		};
	});
	const flatSuggestions = $derived([
		...suggestions.products.map((p) => ({ kind: 'product' as const, label: p.name, href: `/shop/${p.slug}` })),
		...suggestions.categories.map((c) => ({
			kind: 'category' as const,
			label: c.name,
			href: c.id === 'collections' ? '/collections' : c.id === 'gifts' ? '/collections/gifts' : `/shop?category=${c.id}`
		}))
	]);
	const showSuggestions = $derived(searchOpen && query.trim().length >= 2 && flatSuggestions.length > 0);
	const activeId = $derived(
		activeIndex >= 0 && activeIndex < flatSuggestions.length ? `search-option-${activeIndex}` : undefined
	);

	function closeSearch() {
		searchOpen = false;
		activeIndex = -1;
	}

	function submitSearch() {
		const q = query.trim();
		closeSearch();
		goto(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
	}

	function onSearchKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (flatSuggestions.length === 0) return;
			activeIndex = (activeIndex + 1) % flatSuggestions.length;
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (flatSuggestions.length === 0) return;
			activeIndex = (activeIndex - 1 + flatSuggestions.length) % flatSuggestions.length;
		} else if (e.key === 'Enter') {
			if (activeIndex >= 0 && activeIndex < flatSuggestions.length) {
				e.preventDefault();
				const target = flatSuggestions[activeIndex];
				closeSearch();
				goto(target.href);
			}
			// Otherwise the form submits normally (submitSearch).
		} else if (e.key === 'Escape') {
			e.preventDefault();
			closeSearch();
		}
	}

	function onSearchInput() {
		activeIndex = -1;
	}

	// Escape closes any open mega-menu from anywhere on the page (keyboard).
	$effect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				megaOpen = null;
				if (searchOpen) closeSearch();
			}
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});

	const shopCategories = categories.filter((c) => !['collections', 'gifts'].includes(c.id));
	const featuredCollections = collections.slice(0, 3);
</script>

<!-- Announcement bar: first-order offer (from site data) + shipping/returns -->
<div class="bg-emerald px-4 py-2 text-center text-xs leading-relaxed font-semibold text-white sm:text-sm">
	First order 10% off — <a href="#newsletter" class="underline underline-offset-2 hover:text-gold-light">join the newsletter</a>
	<span class="mx-2 text-white/50" aria-hidden="true">·</span> Complimentary shipping on orders over $50
	<span class="mx-2 text-white/50" aria-hidden="true">·</span> 30-day returns
</div>

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
			<a
				href="/"
				class="flex min-h-12 items-center text-[0.95rem] font-medium whitespace-nowrap text-ink/80 uppercase transition-colors duration-150 hover:text-emerald"
			>
				Home
			</a>

			<!-- Shop mega-menu -->
			<div class="group relative">
				<button
					id="nav-shop-btn"
					type="button"
					aria-expanded={megaOpen === 'shop'}
					aria-haspopup="true"
					aria-controls="mega-shop"
					onclick={() => (megaOpen = megaOpen === 'shop' ? null : 'shop')}
					onkeydown={(e) => {
						if (e.key === 'Escape') megaOpen = null;
						else if (e.key === 'ArrowDown') {
							e.preventDefault();
							megaOpen = 'shop';
						}
					}}
					class="flex min-h-12 items-center gap-1 text-[0.95rem] font-medium whitespace-nowrap text-ink/80 uppercase transition-colors duration-150 hover:text-emerald"
				>
					Shop <ChevronDown
						size={15}
						aria-hidden="true"
						class="transition-transform duration-200 {megaOpen === 'shop' ? 'rotate-180' : ''}"
					/>
				</button>
				<div
					id="mega-shop"
					class="invisible absolute top-full left-0 w-[40rem] pt-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 {megaOpen ===
					'shop'
						? 'visible opacity-100'
						: ''}"
				>
					<div class="rounded-3xl bg-white p-6 shadow-[0_16px_40px_rgba(11,61,46,0.16)] ring-1 ring-line">
						<div class="grid grid-cols-2 gap-5">
							<div>
								<p class="text-xs font-bold tracking-[0.2em] text-muted uppercase">Shop by category</p>
								<ul class="mt-3 space-y-1">
									{#each shopCategories as c (c.id)}
										<li>
											<a
												href="/shop?category={c.id}"
												onclick={() => (megaOpen = null)}
												class="flex min-h-12 items-center gap-3 rounded-2xl px-2 py-1 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-sand hover:text-emerald"
											>
												<span class="block h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-sand">
													<Picture
														name={c.image}
														alt=""
														width={80}
														height={80}
														sizes="40px"
														imgClass="aspect-square h-full w-full object-cover"
														pictureClass="block h-full"
													/>
												</span>
												<span class="min-w-0">
													<span class="block">{c.name}</span>
													<span class="block truncate text-xs font-normal text-muted">{c.blurb}</span>
												</span>
											</a>
										</li>
									{/each}
									<li>
										<a
											href="/shop?category=gifts"
											onclick={() => (megaOpen = null)}
											class="flex min-h-12 items-center gap-3 rounded-2xl px-2 py-1 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-sand hover:text-emerald"
										>
											<span class="block h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-sand">
												<Picture
													name="cat-gifts"
													alt=""
													width={80}
													height={80}
													sizes="40px"
													imgClass="aspect-square h-full w-full object-cover"
													pictureClass="block h-full"
												/>
											</span>
											<span class="min-w-0">
												<span class="block">Gifts</span>
												<span class="block truncate text-xs font-normal text-muted">Ready-to-give, beautifully boxed</span>
											</span>
										</a>
									</li>
								</ul>
							</div>
							<div>
								<p class="text-xs font-bold tracking-[0.2em] text-muted uppercase">Featured collections</p>
								<ul class="mt-3 space-y-1">
									{#each featuredCollections as col (col.slug)}
										<li>
											<a
												href="/collections/{col.slug}"
												onclick={() => (megaOpen = null)}
												class="block min-h-12 rounded-2xl px-3 py-2 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-sand hover:text-emerald"
											>
												{col.name}
												<span class="block text-xs font-normal text-muted">{col.tagline}</span>
											</a>
										</li>
									{/each}
								</ul>
								<a
									href="/guides"
									onclick={() => (megaOpen = null)}
									class="mt-3 inline-flex min-h-12 items-center rounded-full px-4 text-sm font-bold text-emerald transition-colors duration-150 hover:bg-emerald-soft"
								>
									Jewellery guides →
								</a>
								<a
									href="/bespoke"
									onclick={() => (megaOpen = null)}
									class="mt-1 inline-flex min-h-12 items-center rounded-full px-4 text-sm font-bold text-emerald transition-colors duration-150 hover:bg-emerald-soft"
								>
									Bespoke &amp; custom →
								</a>
								<a
									href="/occasions"
									onclick={() => (megaOpen = null)}
									class="mt-1 inline-flex min-h-12 items-center rounded-full px-4 text-sm font-bold text-emerald transition-colors duration-150 hover:bg-emerald-soft"
								>
									Shop by occasion →
								</a>
								<a
									href="/gifts-under-100"
									onclick={() => (megaOpen = null)}
									class="mt-1 inline-flex min-h-12 items-center rounded-full px-4 text-sm font-bold text-emerald transition-colors duration-150 hover:bg-emerald-soft"
								>
									Gifts under $100 →
								</a>
								<a
									href="/new-arrivals"
									onclick={() => (megaOpen = null)}
									class="mt-1 inline-flex min-h-12 items-center rounded-full px-4 text-sm font-bold text-emerald transition-colors duration-150 hover:bg-emerald-soft"
								>
									New arrivals →
								</a>
								<a
									href="/best-sellers"
									onclick={() => (megaOpen = null)}
									class="mt-1 inline-flex min-h-12 items-center rounded-full px-4 text-sm font-bold text-emerald transition-colors duration-150 hover:bg-emerald-soft"
								>
									Best sellers →
								</a>
							</div>
						</div>
						<a
							href="/shop"
							onclick={() => (megaOpen = null)}
							class="mt-4 flex min-h-12 items-center justify-center rounded-full bg-emerald text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
						>
							Shop all jewelry
						</a>
					</div>
				</div>
			</div>

			<!-- Collections mega-menu -->
			<div class="group relative">
				<button
					id="nav-collections-btn"
					type="button"
					aria-expanded={megaOpen === 'collections'}
					aria-haspopup="true"
					aria-controls="mega-collections"
					onclick={() => (megaOpen = megaOpen === 'collections' ? null : 'collections')}
					onkeydown={(e) => {
						if (e.key === 'Escape') megaOpen = null;
						else if (e.key === 'ArrowDown') {
							e.preventDefault();
							megaOpen = 'collections';
						}
					}}
					class="flex min-h-12 items-center gap-1 text-[0.95rem] font-medium whitespace-nowrap text-ink/80 uppercase transition-colors duration-150 hover:text-emerald"
				>
					Collections <ChevronDown
						size={15}
						aria-hidden="true"
						class="transition-transform duration-200 {megaOpen === 'collections' ? 'rotate-180' : ''}"
					/>
				</button>
				<div
					id="mega-collections"
					class="invisible absolute top-full left-0 w-[40rem] pt-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 {megaOpen ===
					'collections'
						? 'visible opacity-100'
						: ''}"
				>
					<div class="rounded-3xl bg-white p-6 shadow-[0_16px_40px_rgba(11,61,46,0.16)] ring-1 ring-line">
						<div class="grid grid-cols-2 gap-5">
							<div>
								<p class="text-xs font-bold tracking-[0.2em] text-muted uppercase">Curated collections</p>
								<ul class="mt-3 space-y-1">
									{#each collections as col (col.slug)}
										<li>
											<a
												href="/collections/{col.slug}"
												onclick={() => (megaOpen = null)}
												class="block min-h-12 rounded-2xl px-3 py-2 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-sand hover:text-emerald"
											>
												{col.name}
												<span class="block text-xs font-normal text-muted">{col.tagline}</span>
											</a>
										</li>
									{/each}
								</ul>
							</div>
							<div>
								<p class="text-xs font-bold tracking-[0.2em] text-muted uppercase">Gift-ready</p>
								<a
									href="/collections/gifts"
									onclick={() => (megaOpen = null)}
									class="mt-3 block overflow-hidden rounded-2xl bg-sand ring-1 ring-line transition-shadow duration-200 hover:shadow-[0_8px_30px_rgba(11,61,46,0.10)]"
								>
									<Picture
										name="gift-box"
										alt="Cream gift box with a deep emerald green satin ribbon"
										width={800}
										height={600}
										sizes="300px"
										imgClass="aspect-[4/3] w-full object-cover"
										pictureClass="block"
									/>
									<span class="block p-4">
										<span class="block text-sm font-bold text-ink">The Gift Collection</span>
										<span class="mt-0.5 block text-xs text-muted">Ready to give, beautifully boxed</span>
									</span>
								</a>
								<a
									href="/guides"
									onclick={() => (megaOpen = null)}
									class="mt-3 inline-flex min-h-12 items-center rounded-full px-4 text-sm font-bold text-emerald transition-colors duration-150 hover:bg-emerald-soft"
								>
									Jewellery guides →
								</a>
								<a
									href="/gift-finder"
									onclick={() => (megaOpen = null)}
									class="mt-1 inline-flex min-h-12 items-center rounded-full px-4 text-sm font-bold text-emerald transition-colors duration-150 hover:bg-emerald-soft"
								>
									Gift Finder →
								</a>
							</div>
						</div>
						<a
							href="/collections"
							onclick={() => (megaOpen = null)}
							class="mt-4 flex min-h-12 items-center justify-center rounded-full bg-emerald text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
						>
							All collections
						</a>
					</div>
				</div>
			</div>

			<a
				href="/bespoke"
				class="flex min-h-12 items-center text-[0.95rem] font-medium whitespace-nowrap text-ink/80 uppercase transition-colors duration-150 hover:text-emerald"
			>
				Bespoke
			</a>
			<a
				href="/guides"
				class="flex min-h-12 items-center text-[0.95rem] font-medium whitespace-nowrap text-ink/80 uppercase transition-colors duration-150 hover:text-emerald"
			>
				Guides
			</a>
			<a
				href="/about"
				class="flex min-h-12 items-center text-[0.95rem] font-medium whitespace-nowrap text-ink/80 uppercase transition-colors duration-150 hover:text-emerald"
			>
				About Us
			</a>
			<a
				href="/blog"
				class="flex min-h-12 items-center text-[0.95rem] font-medium whitespace-nowrap text-ink/80 uppercase transition-colors duration-150 hover:text-emerald"
			>
				Blog
			</a>
			<a
				href="/contact"
				class="flex min-h-12 items-center text-[0.95rem] font-medium whitespace-nowrap text-ink/80 uppercase transition-colors duration-150 hover:text-emerald"
			>
				Contact Us
			</a>
		</nav>

		<div class="flex items-center">
			<button
				type="button"
				onclick={() => {
					searchOpen = !searchOpen;
					if (!searchOpen) activeIndex = -1;
				}}
				aria-expanded={searchOpen}
				aria-label="Search jewelry"
				class="flex h-12 w-12 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:text-emerald"
			>
				<Search size={20} aria-hidden="true" />
			</button>
			<a
				href="/account"
				aria-label="My account"
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
		<div class="relative border-t border-line bg-cream px-4 py-3 sm:px-6">
			<form
				role="search"
				action="/shop"
				method="get"
				class="mx-auto max-w-2xl"
				onsubmit={(e) => {
					e.preventDefault();
					submitSearch();
				}}
			>
				<div class="flex items-center gap-2">
					<label for="site-search" class="sr-only">Search jewelry</label>
					<input
						id="site-search"
						name="q"
						type="search"
						role="combobox"
						aria-expanded={showSuggestions}
						aria-controls="search-suggestions"
						aria-activedescendant={activeId}
						aria-autocomplete="list"
						bind:value={query}
						oninput={onSearchInput}
						onkeydown={onSearchKeydown}
						placeholder="Search jewelry"
						class="min-h-12 flex-1 rounded-full border border-line bg-white px-5 text-base text-ink placeholder:text-muted"
						autocomplete="off"
					/>
					<button
						type="submit"
						class="flex min-h-12 items-center rounded-full bg-emerald px-6 text-sm font-bold text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
					>
						Search
					</button>
				</div>
			</form>
			{#if showSuggestions}
				<div
					id="search-suggestions"
					role="listbox"
					aria-label="Search suggestions"
					class="absolute right-4 left-4 z-50 mx-auto mt-2 max-w-2xl overflow-hidden rounded-3xl bg-white shadow-[0_16px_40px_rgba(11,61,46,0.16)] ring-1 ring-line sm:right-6 sm:left-6"
				>
					{#if suggestions.products.length > 0}
						<p class="px-5 pt-4 pb-1 text-xs font-bold tracking-[0.2em] text-muted uppercase">Products</p>
						<ul>
							{#each suggestions.products as p, i (p.slug)}
								<li role="option" id="search-option-{i}" aria-selected={activeIndex === i}>
									<a
										href="/shop/{p.slug}"
										onclick={(e) => {
											e.preventDefault();
											closeSearch();
											goto(`/shop/${p.slug}`);
										}}
										onmouseenter={() => (activeIndex = i)}
										class="flex min-h-14 items-center gap-3 px-5 py-2 text-sm font-semibold text-ink transition-colors duration-150 {activeIndex ===
										i
											? 'bg-emerald-soft'
											: 'hover:bg-sand'}"
									>
										<span class="block h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-sand">
											<Picture
												name={p.image}
												alt=""
												width={96}
												height={96}
												sizes="44px"
												imgClass="aspect-square h-full w-full object-cover"
												pictureClass="block h-full"
											/>
										</span>
										<span class="min-w-0 flex-1 truncate">{p.name}</span>
										<span class="shrink-0 font-bold text-emerald">{usd(p.price)}</span>
									</a>
								</li>
							{/each}
						</ul>
					{/if}
					{#if suggestions.categories.length > 0}
						<p class="px-5 pt-3 pb-1 text-xs font-bold tracking-[0.2em] text-muted uppercase">Categories</p>
						<ul class="pb-2">
							{#each suggestions.categories as c, j (c.id)}
								{@const idx = suggestions.products.length + j}
								<li role="option" id="search-option-{idx}" aria-selected={activeIndex === idx}>
									<a
										href={c.id === 'collections'
											? '/collections'
											: c.id === 'gifts'
												? '/collections/gifts'
												: `/shop?category=${c.id}`}
										onclick={(e) => {
											e.preventDefault();
											const href =
												c.id === 'collections'
													? '/collections'
													: c.id === 'gifts'
														? '/collections/gifts'
														: `/shop?category=${c.id}`;
											closeSearch();
											goto(href);
										}}
										onmouseenter={() => (activeIndex = idx)}
										class="flex min-h-12 items-center gap-3 px-5 py-1.5 text-sm font-semibold text-ink transition-colors duration-150 {activeIndex ===
										idx
											? 'bg-emerald-soft'
											: 'hover:bg-sand'}"
									>
										<Search size={16} aria-hidden="true" class="shrink-0 text-muted" />
										<span class="min-w-0 flex-1 truncate">{c.name}</span>
										<span class="shrink-0 text-xs font-normal text-muted">Category</span>
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/if}
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
			{#each [
				{ label: 'Occasions', href: '/occasions' },
				{ label: 'Gifts under $100', href: '/gifts-under-100' },
				{ label: 'New arrivals', href: '/new-arrivals' },
				{ label: 'Best sellers', href: '/best-sellers' },
				{ label: 'Compare', href: '/compare' },
				{ label: 'Visit us', href: '/visit-us' },
				{ label: 'Services', href: '/services' },
				{ label: 'Trade-in', href: '/trade-in' },
				{ label: 'My account', href: '/account' },
				{ label: 'Accessibility', href: '/accessibility' }
			] as extra}
				<a
					href={extra.href}
					class="block min-h-12 content-center border-b border-line/60 py-2 text-base font-medium text-ink uppercase"
					onclick={() => (open = false)}
				>
					{extra.label}
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
