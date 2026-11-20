<script lang="ts">
	import { ArrowRight, Diamond, Gem, Heart, Leaf, RotateCcw, ShieldCheck, ShoppingBag, Truck, X } from '@lucide/svelte';
	import { bestsellers, blogPosts, categories, collections, products, site, testimonials } from '#lib/data/site.ts';
	import { cart } from '#lib/cart.svelte.ts';
	import Picture from '#lib/components/Picture.svelte';
	import ProductCard from '#lib/components/ProductCard.svelte';
	import RecentlyViewed from '#lib/components/RecentlyViewed.svelte';
	import Stars from '#lib/components/Stars.svelte';

	const trustItems = [
		{ icon: Truck, title: 'Free Shipping', detail: 'On orders over $50' },
		{ icon: RotateCcw, title: 'Easy Returns', detail: '30-day return policy' },
		{ icon: ShieldCheck, title: 'Secure Payment', detail: '100% secure checkout' },
		{ icon: Gem, title: 'Premium Quality', detail: 'Ethically sourced materials' }
	];

	// Cart-reminder nudge: on a return visit (a previous visit is recorded
	// in localStorage), remind the shopper what they left in their bag.
	let showCartReminder = $state(false);
	$effect(() => {
		try {
			const returning = window.localStorage.getItem('aurel-return-visit-v1') === '1';
			const dismissed = window.localStorage.getItem('aurel-cart-reminder-dismissed-v1') === '1';
			showCartReminder = returning && !dismissed && cart.count > 0;
			window.localStorage.setItem('aurel-return-visit-v1', '1');
		} catch {
			showCartReminder = false;
		}
	});
	function dismissReminder() {
		showCartReminder = false;
		try {
			window.localStorage.setItem('aurel-cart-reminder-dismissed-v1', '1');
		} catch {
			// Storage unavailable — the banner just hides for this session.
		}
	}
</script>

<svelte:head>
	<title>Aurel Jewels — Fine Jewelry for a Brighter You</title>
	<meta
		name="description"
		content="Timeless fine jewelry crafted for everyday moments and life's most special ones — rings, necklaces, earrings and bracelets, free shipping over $50 and 30-day returns."
	/>
	<link rel="canonical" href={site.url} />
	<meta property="og:url" content={site.url} />
</svelte:head>

<!-- ─── Hero ─── -->
<section class="relative overflow-hidden bg-cream">
	<div class="mx-auto grid max-w-7xl items-center gap-8 px-4 pt-10 pb-12 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pt-16 lg:pb-20">
		<div class="reveal is-visible">
			<p class="text-xs font-bold tracking-[0.3em] text-gold-dark uppercase">Fine Jewelry for a Brighter You</p>
			<h1 class="mt-4 font-display text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.08] font-medium text-ink">
				Every detail,<br />a little extraordinary.
			</h1>
			<p class="mt-5 max-w-lg text-lg leading-relaxed text-muted">
				Timeless jewelry crafted for your everyday moments and life’s most special ones.
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<a
					href="/shop"
					class="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
				>
					Shop Now <ArrowRight size={17} aria-hidden="true" />
				</a>
				<a
					href="/collections"
					class="inline-flex min-h-12 items-center gap-2 rounded-full border border-emerald px-7 text-sm font-bold tracking-wide text-emerald uppercase transition-colors duration-200 hover:bg-emerald-soft"
				>
					Explore Collections
				</a>
			</div>
			<!-- Trust badges -->
			<ul class="mt-10 grid grid-cols-2 gap-4 border-t border-line pt-6 sm:grid-cols-4">
				{#each trustItems as item}
					<li class="flex items-start gap-2.5">
						<item.icon size={22} class="mt-0.5 shrink-0 text-emerald" aria-hidden="true" />
						<span class="min-w-0">
							<span class="block text-[0.8rem] font-bold tracking-wide text-ink uppercase">{item.title}</span>
							<span class="block text-xs leading-snug text-muted">{item.detail}</span>
						</span>
					</li>
				{/each}
			</ul>
		</div>
		<div class="reveal is-visible">
			<Picture
				name="hero"
				alt="Gold necklace with a large oval emerald pendant and a matching emerald ring on beige stone pedestals"
				width={1600}
				height={1200}
				sizes="(min-width: 1024px) 50vw, 100vw"
				eager={true}
				imgClass="aspect-[4/3] w-full rounded-3xl object-cover"
			/>
		</div>
	</div>
</section>

<!-- ─── Browse by category ─── -->
{#if showCartReminder}
	<div class="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8" role="status">
		<div class="flex flex-wrap items-center gap-3 rounded-3xl bg-emerald-soft px-5 py-4 ring-1 ring-line">
			<ShoppingBag size={20} aria-hidden="true" class="shrink-0 text-emerald" />
			<p class="min-w-0 flex-1 text-[0.95rem] leading-relaxed text-ink">
				Welcome back — you left <strong>{cart.count} {cart.count === 1 ? 'piece' : 'pieces'}</strong> in
				your bag.
				<a href="/cart" class="font-semibold text-emerald underline underline-offset-2">Pick up where you left off →</a>
			</p>
			<button
				type="button"
				onclick={dismissReminder}
				aria-label="Dismiss cart reminder"
				class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted transition-colors duration-150 hover:bg-white hover:text-ink"
			>
				<X size={18} aria-hidden="true" />
			</button>
		</div>
	</div>
{/if}
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="categories-heading">
	<h2 id="categories-heading" class="reveal text-center text-xs font-bold tracking-[0.3em] text-ink uppercase">Browse by Category</h2>
	<div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
		{#each categories as cat}
			<a
				href={cat.id === 'collections' ? '/collections' : cat.id === 'gifts' ? '/collections/gifts' : `/shop?category=${cat.id}`}
				class="reveal group overflow-hidden rounded-2xl bg-white ring-1 ring-line transition-shadow duration-200 hover:shadow-[0_8px_30px_rgba(11,61,46,0.10)]"
			>
				<div class="overflow-hidden bg-sand">
					<Picture
						name={cat.image}
						alt={cat.imageAlt}
						width={800}
						height={800}
						sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
						imgClass="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
					/>
				</div>
				<p class="px-3 py-3 text-center text-sm font-bold text-ink group-hover:text-emerald">{cat.name}</p>
			</a>
		{/each}
	</div>
</section>

<!-- ─── Bestselling jewelry ─── -->
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="bestsellers-heading">
	<div class="reveal flex items-end justify-between gap-4">
		<h2 id="bestsellers-heading" class="min-w-0 font-display text-[clamp(1.6rem,3.5vw,2.2rem)] font-medium text-ink">Bestselling Jewelry</h2>
		<a href="/shop" class="inline-flex min-h-12 shrink-0 items-center gap-1.5 text-sm font-bold tracking-wide whitespace-nowrap text-emerald uppercase hover:text-emerald-deep">
			View all <ArrowRight size={16} aria-hidden="true" />
		</a>
	</div>
	<div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
		{#each bestsellers as product}
			<ProductCard {product} />
		{/each}
	</div>
</section>

<RecentlyViewed />

<!-- ─── Gift banner ─── -->
<section class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" aria-labelledby="gift-heading">
	<div class="reveal relative overflow-hidden rounded-3xl bg-emerald">
		<div class="grid items-center gap-6 p-8 sm:p-12 lg:grid-cols-2">
			<div>
				<p class="text-xs font-bold tracking-[0.3em] text-gold-light uppercase">A Meaningful Gift</p>
				<h2 id="gift-heading" class="mt-3 font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-tight font-medium text-white">
					Jewelry for life’s special moments.
				</h2>
				<p class="mt-4 max-w-md leading-relaxed text-cream/85">
					Every piece arrives in our signature emerald gift box, with a hand-written message option — ready to give the moment it arrives.
				</p>
				<a
					href="/collections/gifts"
					class="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-bold tracking-wide text-emerald uppercase transition-colors duration-200 hover:bg-sand"
				>
					Shop Gift Collection <ArrowRight size={17} aria-hidden="true" />
				</a>
			</div>
			<Picture
				name="gift-box"
				alt="Cream gift box with a deep emerald green satin ribbon on dark green silk with white flowers"
				width={1600}
				height={1200}
				sizes="(min-width: 1024px) 45vw, 100vw"
				imgClass="aspect-[4/3] w-full rounded-2xl object-cover"
			/>
		</div>
	</div>
</section>

<!-- ─── Craftsmanship ─── -->
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="craft-heading">
	<div class="grid items-center gap-10 lg:grid-cols-2">
		<div class="reveal">
			<Picture
				name="craft-hands"
				alt="A jeweller’s hands crafting a gold diamond ring with fine tweezers at a workbench"
				width={1600}
				height={1200}
				sizes="(min-width: 1024px) 50vw, 100vw"
				imgClass="aspect-[4/3] w-full rounded-3xl object-cover"
			/>
		</div>
		<div class="reveal">
			<p class="text-xs font-bold tracking-[0.3em] text-gold-dark uppercase">Our Craftsmanship</p>
			<h2 id="craft-heading" class="mt-3 font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-tight font-medium text-ink">
				Thoughtfully crafted.<br />Made to last.
			</h2>
			<p class="mt-4 max-w-lg leading-relaxed text-muted">
				Each piece is designed with care, using premium materials and time-honored techniques for enduring beauty.
			</p>
			<ul class="mt-8 space-y-6">
				<li class="flex items-start gap-4">
					<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-soft text-emerald"><Diamond size={22} aria-hidden="true" /></span>
					<span>
						<span class="block font-bold text-ink">Premium Materials</span>
						<span class="mt-1 block text-muted">Ethically sourced, crafted to last.</span>
					</span>
				</li>
				<li class="flex items-start gap-4">
					<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-soft text-emerald"><Gem size={22} aria-hidden="true" /></span>
					<span>
						<span class="block font-bold text-ink">Expert Craftsmanship</span>
						<span class="mt-1 block text-muted">Attention to every detail.</span>
					</span>
				</li>
				<li class="flex items-start gap-4">
					<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-soft text-emerald"><Heart size={22} aria-hidden="true" /></span>
					<span>
						<span class="block font-bold text-ink">Timeless Designs</span>
						<span class="mt-1 block text-muted">Jewelry for every chapter of life.</span>
					</span>
				</li>
			</ul>
			<a href="/about" class="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-emerald px-7 text-sm font-bold tracking-wide text-emerald uppercase transition-colors duration-200 hover:bg-emerald-soft">
				Our story <ArrowRight size={17} aria-hidden="true" />
			</a>
		</div>
	</div>
</section>

<!-- ─── Collections preview ─── -->
<section class="bg-sand" aria-labelledby="collections-heading">
	<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
		<div class="reveal flex items-end justify-between gap-4">
			<div>
				<p class="text-xs font-bold tracking-[0.3em] text-gold-dark uppercase">Curated for you</p>
				<h2 id="collections-heading" class="mt-2 font-display text-[clamp(1.6rem,3.5vw,2.2rem)] font-medium text-ink">Shop by Collection</h2>
			</div>
			<a href="/collections" class="hidden min-h-12 shrink-0 items-center gap-1.5 text-sm font-bold tracking-wide whitespace-nowrap text-emerald uppercase hover:text-emerald-deep sm:inline-flex">
				All collections <ArrowRight size={16} aria-hidden="true" />
			</a>
		</div>
		<div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each collections as col}
				<a href="/collections/{col.slug}" class="reveal group overflow-hidden rounded-2xl bg-white ring-1 ring-line transition-shadow duration-200 hover:shadow-[0_8px_30px_rgba(11,61,46,0.10)]">
					<div class="overflow-hidden bg-cream">
						<Picture
							name={col.image}
							alt={col.imageAlt}
							width={800}
							height={800}
							sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
							imgClass="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
						/>
					</div>
					<div class="p-5">
						<h3 class="font-display text-xl font-medium text-ink group-hover:text-emerald">{col.name}</h3>
						<p class="mt-1 text-sm text-muted">{col.tagline}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- ─── More to love ─── -->
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="more-heading">
	<h2 id="more-heading" class="reveal font-display text-[clamp(1.6rem,3.5vw,2.2rem)] font-medium text-ink">More to love</h2>
	<div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
		{#each products.filter((p) => !p.badge).slice(0, 4) as product}
			<ProductCard {product} />
		{/each}
	</div>
</section>

<!-- ─── Testimonials ─── -->
<section class="bg-emerald" aria-labelledby="reviews-heading">
	<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
		<p class="reveal text-center text-xs font-bold tracking-[0.3em] text-gold-light uppercase">Loved by thousands</p>
		<h2 id="reviews-heading" class="reveal mt-2 text-center font-display text-[clamp(1.6rem,3.5vw,2.2rem)] font-medium text-white">
			What our customers say
		</h2>
		<div class="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
			{#each testimonials.slice(0, 3) as t}
				<figure class="reveal rounded-2xl bg-white/95 p-6">
					<Stars rating={t.rating} />
					<blockquote class="mt-4 leading-relaxed text-ink">“{t.quote}”</blockquote>
					<figcaption class="mt-4 text-sm font-bold text-ink">{t.name} <span class="block font-normal text-muted">{t.role}</span></figcaption>
				</figure>
			{/each}
		</div>
	</div>
</section>

<!-- ─── Journal preview ─── -->
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="journal-heading">
	<div class="reveal flex items-end justify-between gap-4">
		<h2 id="journal-heading" class="font-display text-[clamp(1.6rem,3.5vw,2.2rem)] font-medium text-ink">From the Journal</h2>
		<a href="/blog" class="inline-flex min-h-12 shrink-0 items-center gap-1.5 text-sm font-bold tracking-wide whitespace-nowrap text-emerald uppercase hover:text-emerald-deep">
			All stories <ArrowRight size={16} aria-hidden="true" />
		</a>
	</div>
	<div class="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
		{#each blogPosts as post}
			<a href="/blog/{post.slug}" class="reveal group overflow-hidden rounded-2xl bg-white ring-1 ring-line transition-shadow duration-200 hover:shadow-[0_8px_30px_rgba(11,61,46,0.10)]">
				<div class="overflow-hidden bg-sand">
					<Picture
						name={post.image}
						alt={post.alt}
						width={1200}
						height={900}
						sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
						imgClass="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
					/>
				</div>
				<div class="p-5">
					<p class="text-xs font-bold tracking-[0.2em] text-gold-dark uppercase">{post.category} · {post.date}</p>
					<h3 class="mt-2 font-display text-xl leading-snug font-medium text-ink group-hover:text-emerald">{post.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
				</div>
			</a>
		{/each}
	</div>
	<p class="reveal mt-10 flex items-center justify-center gap-2 text-center text-sm text-muted">
		<Leaf size={16} class="text-emerald" aria-hidden="true" /> Ethically sourced materials · Recycled gold where possible · Lab-created stones
	</p>
</section>
