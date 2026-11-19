<script lang="ts">
	import { Check, ChevronLeft, Heart, Minus, Plus, ShoppingBag, Truck } from '@lucide/svelte';
	import { categories, products, reviewsFor, site, usd } from '#lib/data/site.ts';
	import { addToCart } from '#lib/cart.svelte.ts';
	import { toggleWishlist, wishlist } from '#lib/wishlist.svelte.ts';
	import Picture from '#lib/components/Picture.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import Stars from '#lib/components/Stars.svelte';

	let { data }: { data: { product: (typeof products)[number] } } = $props();
	const product = $derived(data.product);

	const category = $derived(categories.find((c) => c.id === product.category));
	const reviews = $derived(reviewsFor(product.slug));
	const related = $derived(
		products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4)
	);

	// Gallery: the product image plus the category image as a second view.
	const gallery = $derived(
		[
			{ name: product.image, alt: product.imageAlt },
			...(category && category.image !== product.image
				? [{ name: category.image, alt: category.imageAlt }]
				: [])
		]
	);
	let selectedImage = $state(0);
	const activeImage = $derived(gallery[Math.min(selectedImage, gallery.length - 1)] ?? gallery[0]);

	let metal = $state('Yellow Gold');
	let size = $state('One size');
	let qty = $state(1);
	let added = $state(false);

	// Reset selections when navigating between products client-side.
	$effect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		product.slug;
		selectedImage = 0;
		metal = product.metals[0] ?? 'Yellow Gold';
		size = product.sizes[0] ?? 'One size';
		qty = 1;
		added = false;
	});

	const sizeLabel = $derived(/^\d+$/.test(size) ? `Size ${size}` : size);
	const option = $derived(`${metal} · ${sizeLabel}`);

	function onAdd() {
		addToCart(product.slug, option, qty);
		added = true;
		window.setTimeout(() => (added = false), 2000);
	}

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
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<nav aria-label="Breadcrumb" class="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
	<a
		href="/shop"
		class="inline-flex min-h-12 items-center gap-1 text-sm font-semibold text-emerald hover:text-emerald-deep"
	>
		<ChevronLeft size={18} aria-hidden="true" /> Back to shop
	</a>
</nav>

<section class="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
	<div class="grid gap-10 lg:grid-cols-2 lg:gap-14">
		<!-- Gallery -->
		<div class="min-w-0">
			<div class="overflow-hidden rounded-3xl bg-sand ring-1 ring-line">
				<Picture
					name={activeImage.name}
					alt={activeImage.alt}
					width={1200}
					height={1200}
					sizes="(min-width: 1024px) 50vw, 100vw"
					eager
					imgClass="aspect-square w-full object-cover"
					pictureClass="block"
				/>
			</div>
			{#if gallery.length > 1}
				<div class="mt-4 flex gap-3" role="group" aria-label="Product images">
					{#each gallery as image, i (image.name)}
						<button
							type="button"
							onclick={() => (selectedImage = i)}
							aria-label="View image {i + 1}"
							aria-pressed={selectedImage === i}
							class="h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-2 transition-all duration-150 {selectedImage ===
							i
								? 'ring-emerald'
								: 'ring-line hover:ring-gold'}"
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
				<span class="text-3xl font-bold text-ink">{usd(product.price)}</span>
				{#if product.compareAt}
					<span class="text-lg text-muted line-through">{usd(product.compareAt)}</span>
					<span class="rounded-full bg-emerald-soft px-3 py-1 text-xs font-bold text-emerald">
						Save {usd(product.compareAt - product.price)}
					</span>
				{/if}
			</p>
			<p class="mt-4 leading-relaxed text-muted">{product.description}</p>

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

			<!-- Qty + add to cart -->
			<div class="mt-8 flex flex-wrap items-center gap-3">
				<div class="flex items-center rounded-full bg-white ring-1 ring-line" role="group" aria-label="Quantity">
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
					class="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 {added
						? 'bg-emerald-light'
						: 'bg-emerald hover:bg-emerald-deep'}"
				>
					{#if added}
						<Check size={18} aria-hidden="true" /> Added to cart
					{:else}
						<ShoppingBag size={18} aria-hidden="true" /> Add to cart — {usd(product.price * qty)}
					{/if}
				</button>
				<button
					type="button"
					onclick={() => toggleWishlist(product.slug)}
					aria-label={wishlist.has(product.slug)
						? `Remove ${product.name} from wishlist`
						: `Save ${product.name} to wishlist`}
					aria-pressed={wishlist.has(product.slug)}
					class="flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-line transition-colors duration-150 {wishlist.has(
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
</section>
