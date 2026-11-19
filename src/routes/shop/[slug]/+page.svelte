<script lang="ts">
	import { Check, ChevronLeft, ChevronRight, Heart, Minus, Plus, ShoppingBag, Truck, X, ZoomIn } from '@lucide/svelte';
	import { categories, instalment, products, reviewsFor, site, sourcingLine, usd } from '#lib/data/site.ts';
	import { addToCart } from '#lib/cart.svelte.ts';
	import { toggleWishlist, wishlist } from '#lib/wishlist.svelte.ts';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import TrustStrip from '#lib/components/TrustStrip.svelte';

	let { data }: { data: { product: (typeof products)[number]; hasAlt: boolean } } = $props();
	const product = $derived(data.product);

	const category = $derived(categories.find((c) => c.id === product.category));
	const reviews = $derived(reviewsFor(product.slug));
	const related = $derived(
		products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4)
	);

	// Gallery: the product image plus the alternate-angle image — only when
	// that image was actually generated + converted (hasAlt from the server
	// load). Never the category image.
	const gallery = $derived(
		[
			{ name: product.image, alt: product.imageAlt },
			...(data.hasAlt
				? [{ name: product.altImage, alt: `${product.imageAlt} — alternate angle` }]
				: [])
		]
	);
	let selectedImage = $state(0);
	const activeImage = $derived(gallery[Math.min(selectedImage, gallery.length - 1)] ?? gallery[0]);

	let metal = $state('Yellow Gold');
	let size = $state('One size');
	let qty = $state(1);
	let added = $state(false);

	// Engraving (rings, bracelets, necklaces only): +$15, max 20 chars,
	// stored in the cart line option. Engraved pieces are final sale.
	const engravable = $derived(['rings', 'bracelets', 'necklaces'].includes(product.category));
	const engravingFee = 15;
	const engravingMax = 20;
	let engraving = $state('');
	const hasEngraving = $derived(engraving.trim().length > 0);
	const unitPrice = $derived(product.price + (hasEngraving ? engravingFee : 0));

	// Reset selections when navigating between products client-side.
	$effect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		product.slug;
		selectedImage = 0;
		metal = product.metals[0] ?? 'Yellow Gold';
		size = product.sizes[0] ?? 'One size';
		qty = 1;
		added = false;
		engraving = '';
	});

	const sizeLabel = $derived(/^\d+$/.test(size) ? `Size ${size}` : size);
	const option = $derived(
		`${metal} · ${sizeLabel}${hasEngraving ? ` · Engraving “${engraving.trim()}” (+$15)` : ''}`
	);
	const instalmentAmount = $derived(instalment(unitPrice));

	function onAdd() {
		addToCart(product.slug, option, qty, unitPrice);
		added = true;
		window.setTimeout(() => (added = false), 2000);
	}

	// ─── Lightbox ───
	let lightboxOpen = $state(false);
	let lastFocused = $state<HTMLElement | null>(null);

	function openLightbox() {
		lastFocused = document.activeElement as HTMLElement | null;
		lightboxOpen = true;
		document.body.style.overflow = 'hidden';
		window.requestAnimationFrame(() => document.getElementById('lightbox-close')?.focus());
	}

	function closeLightbox() {
		lightboxOpen = false;
		document.body.style.overflow = '';
		lastFocused?.focus();
	}

	function stepImage(dir: 1 | -1) {
		selectedImage = (selectedImage + dir + gallery.length) % gallery.length;
	}

	// Esc closes, arrows step, Tab stays inside the dialog.
	$effect(() => {
		if (!lightboxOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeLightbox();
			else if (e.key === 'ArrowRight') stepImage(1);
			else if (e.key === 'ArrowLeft') stepImage(-1);
			else if (e.key === 'Tab') {
				const dialog = document.getElementById('lightbox');
				if (!dialog) return;
				const focusables = [...dialog.querySelectorAll<HTMLElement>('button, [href], input, [tabindex]:not([tabindex="-1"])')].filter(
					(el) => !el.hasAttribute('disabled')
				);
				if (focusables.length === 0) return;
				const first = focusables[0];
				const last = focusables[focusables.length - 1];
				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault();
					last.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});

	// ─── Sticky mobile add-to-cart bar ───
	// Shows once the buy box has scrolled out of view; hidden on desktop.
	// scroll-padding keeps keyboard focus from sliding underneath it.
	let buyBoxVisible = $state(true);
	$effect(() => {
		const el = document.getElementById('buy-box');
		if (!el) return;
		const io = new IntersectionObserver(([entry]) => (buyBoxVisible = entry.isIntersecting), {
			threshold: 0.1
		});
		io.observe(el);
		return () => io.disconnect();
	});
	$effect(() => {
		document.documentElement.style.scrollPaddingBottom = '8rem';
		return () => {
			document.documentElement.style.scrollPaddingBottom = '';
		};
	});

	const jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Product',
			name: product.name,
			image: `${site.url}/images/${product.image}-800.jpg`,
			description: product.description,
			offers: {
				'@type': 'Offer',
				price: product.price,
				priceCurrency: 'USD',
				availability: 'https://schema.org/InStock'
			}
		})
	);
</script>

<svelte:head>
	<title>{product.name} — Aurel Jewels</title>
	<meta name="description" content={product.description} />
	<link rel="canonical" href="{site.url}/shop/{product.slug}" />
	<meta property="og:image" content="{site.url}/images/{product.image}-1200.jpg" />
	<meta property="og:image:alt" content={product.imageAlt} />
	<meta name="twitter:image" content="{site.url}/images/{product.image}-1200.jpg" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<Breadcrumbs
	items={[
		{ label: 'Home', href: '/' },
		{ label: 'Shop', href: '/shop' },
		...(category ? [{ label: category.name, href: `/shop?category=${category.id}` }] : []),
		{ label: product.name }
	]}
/>
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<a
		href="/shop"
		class="inline-flex min-h-12 items-center gap-1 text-sm font-semibold text-emerald hover:text-emerald-deep"
	>
		<ChevronLeft size={18} aria-hidden="true" /> Back to shop
	</a>
</div>

<section class="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-2 lg:gap-14">
		<!-- Gallery -->
		<div class="min-w-0">
			<button
				type="button"
				onclick={openLightbox}
				aria-label="View {product.name} larger"
				class="group relative block w-full cursor-zoom-in overflow-hidden rounded-3xl bg-sand text-left ring-1 ring-line focus:outline-none"
			>
				<Picture
					name={activeImage.name}
					alt={activeImage.alt}
					width={1200}
					height={1200}
					sizes="(min-width: 1024px) 50vw, 100vw"
					eager
					imgClass="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
					pictureClass="block"
				/>
				<span
					class="pointer-events-none absolute right-4 bottom-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white/95 px-4 text-xs font-bold text-ink shadow-sm"
				>
					<ZoomIn size={15} aria-hidden="true" /> Tap to zoom
				</span>
			</button>
			{#if gallery.length > 1}
				<div class="mt-4 flex gap-3" role="group" aria-label="Product images">
					{#each gallery as image, i (image.name)}
						<button
							type="button"
							onclick={() => (selectedImage = i)}
							aria-label="View image {i + 1}{i === 1 ? ' (alternate angle)' : ''}"
							aria-pressed={selectedImage === i}
							class="h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-2 transition-all duration-150 {selectedImage ===
							i
								? 'ring-emerald'
								: 'ring-line hover:ring-gold-dark'}"
						>
							<Picture
								name={image.name}
								alt=""
								width={160}
								height={160}
								sizes="80px"
								imgClass="aspect-square h-full w-full object-cover"
								pictureClass="block h-full"
							/>
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Buy box -->
		<div class="min-w-0">
			{#if product.badge}
				<span
					class="inline-block rounded-full bg-emerald px-3 py-1 text-xs font-bold tracking-wide text-white uppercase"
				>
					{product.badge}
				</span>
			{/if}
			<h1 class="mt-3 font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-tight font-medium text-ink">
				{product.name}
			</h1>
			<div class="mt-3 flex flex-wrap items-center gap-2">
				<Stars rating={product.rating} reviews={product.reviews} />
				<a href="#reviews" class="text-sm font-medium text-emerald underline-offset-2 hover:underline">
					{product.reviews} reviews
				</a>
			</div>
			<p class="mt-4 flex flex-wrap items-baseline gap-3">
				<span class="text-3xl font-bold text-ink">{usd(unitPrice)}</span>
				{#if product.compareAt && !hasEngraving}
					<span class="text-lg text-muted line-through">{usd(product.compareAt)}</span>
					<span class="rounded-full bg-emerald-soft px-3 py-1 text-xs font-bold text-emerald">
						Save {usd(product.compareAt - product.price)}
					</span>
				{/if}
			</p>
			<p class="mt-2 text-sm text-muted">
				or 4 interest-free payments of {instalmentAmount} with Klarna — subject to approval ·
				<a href="/financing" class="font-semibold text-emerald underline underline-offset-2">How financing works</a>
			</p>
			<details class="group mt-2 max-w-xl rounded-2xl bg-white ring-1 ring-line">
				<summary
					class="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm font-semibold text-ink"
				>
					How does Klarna work?
					<ChevronRight
						size={17}
						aria-hidden="true"
						class="shrink-0 text-muted transition-transform duration-200 group-open:rotate-90"
					/>
				</summary>
				<p class="px-4 pb-4 text-sm leading-relaxed text-muted">
					Split your order into 4 interest-free payments: the first is taken at checkout and the
					rest every 2 weeks. No interest, no fees when you pay on time. Subject to approval —
					Klarna checks eligibility at checkout (demo only: no real credit check happens here).
				</p>
			</details>
			<p class="mt-4 leading-relaxed text-muted">{product.description}</p>
			<p class="mt-3 text-sm leading-relaxed text-muted">
				{sourcingLine}
				<a href="/sustainability" class="font-semibold text-emerald underline underline-offset-2">How we source</a>
			</p>

			<!-- Metal -->
			<div class="mt-8">
				<p class="text-sm font-bold text-ink">
					Metal: <span class="font-medium text-muted">{metal}</span>
				</p>
				<div class="mt-3 flex flex-wrap gap-2" role="group" aria-label="Choose a metal">
					{#each product.metals as m (m)}
						<button
							type="button"
							onclick={() => (metal = m)}
							aria-pressed={metal === m}
							class="min-h-12 rounded-full px-5 text-sm font-semibold transition-colors duration-150 {metal ===
							m
								? 'bg-emerald text-white'
								: 'bg-white text-ink ring-1 ring-line hover:ring-emerald'}"
						>
							{m}
						</button>
					{/each}
				</div>
			</div>

			<!-- Size -->
			<div class="mt-6">
				<p class="text-sm font-bold text-ink">
					Size: <span class="font-medium text-muted">{sizeLabel}</span>
				</p>
				<div class="mt-3 flex flex-wrap gap-2" role="group" aria-label="Choose a size">
					{#each product.sizes as s (s)}
						<button
							type="button"
							onclick={() => (size = s)}
							aria-pressed={size === s}
							class="min-h-12 min-w-12 rounded-full px-4 text-sm font-semibold transition-colors duration-150 {size ===
							s
								? 'bg-emerald text-white'
								: 'bg-white text-ink ring-1 ring-line hover:ring-emerald'}"
						>
							{s}
						</button>
					{/each}
				</div>
			</div>

			<!-- Engraving -->
			{#if engravable}
				<div class="mt-6">
					<label for="engraving" class="text-sm font-bold text-ink">
						Add engraving <span class="font-medium text-muted">(+$15, optional)</span>
					</label>
					<input
						id="engraving"
						type="text"
						bind:value={engraving}
						maxlength={engravingMax}
						placeholder="e.g. Always &amp; Forever"
						aria-describedby="engraving-help engraving-preview"
						class="mt-3 min-h-12 w-full max-w-md rounded-2xl border border-line bg-white px-4 text-base text-ink placeholder:text-muted focus:border-emerald focus:outline-none"
					/>
					<p id="engraving-help" class="mt-2 text-xs leading-relaxed text-muted">
						{engraving.trim().length}/{engravingMax} characters. Engraved pieces are final sale —
						they can’t be returned. See our <a
							href="/returns"
							class="font-semibold text-emerald underline underline-offset-2">returns policy</a
						>.
					</p>
					<p
						id="engraving-preview"
						class="mt-3 max-w-md rounded-2xl bg-sand px-4 py-3 text-center font-display text-lg italic {hasEngraving
							? 'text-ink'
							: 'text-muted'}"
						aria-live="polite"
					>
						{hasEngraving ? `“${engraving.trim()}”` : 'Your words, engraved here'}
					</p>
				</div>
			{/if}

			<!-- Qty + add to cart (stacks cleanly on mobile: qty + heart, then full-width button) -->
			<div id="buy-box" class="mt-8 flex flex-wrap items-center gap-3">
				<div class="order-1 flex items-center rounded-full bg-white ring-1 ring-line" role="group" aria-label="Quantity">
					<button
						type="button"
						aria-label="Decrease quantity"
						disabled={qty <= 1}
						onclick={() => (qty = Math.max(1, qty - 1))}
						class="flex h-12 w-12 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-sand disabled:opacity-40"
					>
						<Minus size={18} aria-hidden="true" />
					</button>
					<span class="w-8 text-center text-base font-bold text-ink" aria-live="polite">{qty}</span>
					<button
						type="button"
						aria-label="Increase quantity"
						onclick={() => (qty = Math.min(9, qty + 1))}
						class="flex h-12 w-12 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-sand"
					>
						<Plus size={18} aria-hidden="true" />
					</button>
				</div>
				<button
					type="button"
					onclick={onAdd}
					aria-live="polite"
					class="order-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 sm:order-2 sm:w-auto sm:flex-1 {added
						? 'bg-emerald-light'
						: 'bg-emerald hover:bg-emerald-deep'}"
				>
					{#if added}
						<Check size={18} aria-hidden="true" /> Added to cart
					{:else}
						<ShoppingBag size={18} aria-hidden="true" /> Add to cart — {usd(unitPrice * qty)}
					{/if}
				</button>
				<button
					type="button"
					onclick={() => toggleWishlist(product.slug)}
					aria-label={wishlist.has(product.slug)
						? `Remove ${product.name} from wishlist`
						: `Save ${product.name} to wishlist`}
					aria-pressed={wishlist.has(product.slug)}
					class="order-2 ml-auto flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-line transition-colors duration-150 sm:order-3 sm:ml-0 {wishlist.has(
						product.slug
					)
						? 'text-emerald ring-emerald'
						: 'text-ink/60 hover:text-emerald'}"
				>
					<Heart
						size={20}
						aria-hidden="true"
						class={wishlist.has(product.slug) ? 'fill-emerald text-emerald' : ''}
					/>
				</button>
			</div>

			<p class="mt-4 flex items-center gap-2 text-sm text-muted">
				<Truck size={17} aria-hidden="true" class="shrink-0 text-emerald" />
				Free shipping over $50 · Ships in 1–2 business days · 30-day free returns
			</p>

			<div class="mt-6">
				<TrustStrip />
			</div>

			<!-- Materials -->
			<div class="mt-8 rounded-3xl bg-white p-6 ring-1 ring-line">
				<h2 class="font-display text-xl font-semibold text-ink">Materials &amp; details</h2>
				<ul class="mt-4 space-y-2 text-[0.95rem] text-ink/85">
					{#each product.materials as material (material)}
						<li class="flex gap-2">
							<span aria-hidden="true" class="text-gold-dark">◆</span>
							<span class="min-w-0">{material}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>

	<!-- Long description -->
	<div class="mx-auto mt-14 max-w-3xl">
		<h2 class="font-display text-[clamp(1.6rem,3.5vw,2.2rem)] font-medium text-ink">About this piece</h2>
		{#each product.long as paragraph (paragraph.slice(0, 40))}
			<p class="mt-4 leading-relaxed text-muted">{paragraph}</p>
		{/each}
	</div>

	<!-- Reviews -->
	<div id="reviews" class="mx-auto mt-14 max-w-3xl scroll-mt-24">
		<h2 class="font-display text-[clamp(1.6rem,3.5vw,2.2rem)] font-medium text-ink">
			What customers say
		</h2>
		<p class="mt-2 flex items-center gap-2 text-muted">
			<Stars rating={product.rating} /> {product.rating} out of 5 · {product.reviews} reviews
		</p>
		<div class="mt-6 space-y-4">
			{#each reviews as review (review.name + review.title)}
				<article class="rounded-3xl bg-white p-6 ring-1 ring-line">
					<div class="flex flex-wrap items-center justify-between gap-2">
						<Stars rating={review.rating} />
						<span class="text-sm text-muted">{review.date}</span>
					</div>
					<h3 class="mt-3 font-semibold text-ink">{review.title}</h3>
					<p class="mt-2 leading-relaxed text-muted">{review.body}</p>
					<p class="mt-3 text-sm font-medium text-ink">
						{review.name} <span class="font-normal text-muted">· Verified buyer</span>
					</p>
				</article>
			{/each}
		</div>
	</div>

	<!-- Related -->
	{#if related.length > 0}
		<div class="mt-16">
			<h2 class="font-display text-[clamp(1.6rem,3.5vw,2.2rem)] font-medium text-ink">
				You may also like
			</h2>
			<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each related as item (item.slug)}
					<ProductCard product={item} />
				{/each}
			</div>
		</div>
	{/if}

	<!-- Lightbox -->
	{#if lightboxOpen}
		<div
			id="lightbox"
			class="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-sm"
			role="dialog"
			aria-modal="true"
			aria-label="{product.name} — enlarged view"
		>
			<div class="flex min-h-14 items-center justify-between gap-3 px-4 text-white">
				<p class="min-w-0 truncate text-sm font-semibold">
					{product.name} · {selectedImage + 1} of {gallery.length}
				</p>
				<button
					id="lightbox-close"
					type="button"
					onclick={closeLightbox}
					aria-label="Close enlarged view"
					class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-150 hover:bg-white/15"
				>
					<X size={24} aria-hidden="true" />
				</button>
			</div>
			<div class="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-16">
				<Picture
					name={activeImage.name}
					alt={activeImage.alt}
					width={1200}
					height={1200}
					sizes="100vw"
					eager
					imgClass="max-h-[calc(100dvh-10rem)] w-auto max-w-full rounded-2xl object-contain"
					pictureClass="block"
				/>
				{#if gallery.length > 1}
					<button
						type="button"
						onclick={() => stepImage(-1)}
						aria-label="Previous image"
						class="absolute top-1/2 left-2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink shadow-lg transition-colors duration-150 hover:bg-white sm:left-4"
					>
						<ChevronLeft size={24} aria-hidden="true" />
					</button>
					<button
						type="button"
						onclick={() => stepImage(1)}
						aria-label="Next image"
						class="absolute top-1/2 right-2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink shadow-lg transition-colors duration-150 hover:bg-white sm:right-4"
					>
						<ChevronRight size={24} aria-hidden="true" />
					</button>
				{/if}
			</div>
			<p class="pb-5 text-center text-xs text-white/70">
				Use ← → to browse · Esc to close · Pinch to zoom on touch
			</p>
		</div>
	{/if}

	<!-- Sticky mobile add-to-cart bar (appears after the buy box scrolls away) -->
	{#if !buyBoxVisible && !lightboxOpen}
		<div
			class="fixed inset-x-0 bottom-14 z-40 border-t border-line bg-white/95 shadow-[0_-4px_20px_rgba(11,61,46,0.10)] backdrop-blur lg:hidden"
		>
			<div class="flex min-h-16 items-center gap-3 px-4 py-2">
				<span class="min-w-0 flex-1">
					<span class="block truncate text-sm font-bold text-ink">{product.name}</span>
					<span class="block text-sm font-semibold text-emerald">{usd(unitPrice)}</span>
				</span>
				<button
					type="button"
					onclick={onAdd}
					aria-live="polite"
					class="flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-emerald px-5 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
				>
					{#if added}
						<Check size={17} aria-hidden="true" /> Added
					{:else}
						<ShoppingBag size={17} aria-hidden="true" /> Add to bag
					{/if}
				</button>
			</div>
		</div>
	{/if}
</section>
