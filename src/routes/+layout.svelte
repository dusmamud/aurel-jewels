<script lang="ts">
	import '@fontsource/playfair-display/400.css';
	import '@fontsource/playfair-display/500.css';
	import '@fontsource/playfair-display/600.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	import '../app.css';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import Lenis from 'lenis';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Newsletter from '#lib/components/Newsletter.svelte';
	import WhatsAppIcon from '#lib/components/WhatsAppIcon.svelte';
	import BottomNav from '#lib/components/BottomNav.svelte';
	import CookieBanner from '#lib/components/CookieBanner.svelte';
	import AskExpert from '#lib/components/AskExpert.svelte';
	import { site } from '#lib/data/site.ts';
	import { loadCart } from '#lib/cart.svelte.ts';
	import { loadWishlist } from '#lib/wishlist.svelte.ts';
	import { loadRecentlyViewed } from '#lib/recentlyViewed.svelte.ts';
	import { loadCompare } from '#lib/compare.svelte.ts';
	import { loadAlerts } from '#lib/alerts.svelte.ts';
	import { loadOrders } from '#lib/orders.svelte.ts';

	let { children } = $props();

	// View Transitions between pages (SvelteKit onNavigate). Skipped when the
	// browser has no View Transitions API or the user prefers reduced motion.
	onNavigate((navigation) => {
		if (!('startViewTransition' in document)) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'JewelryStore',
		name: site.name,
		description:
			'Fine jewelry for a brighter you — timeless rings, necklaces, earrings and bracelets, ethically sourced and crafted to last.',
		telephone: site.phoneDisplay,
		email: site.email,
		address: {
			'@type': 'PostalAddress',
			streetAddress: '12 Mercer Street, SoHo',
			addressLocality: 'New York',
			addressRegion: 'NY',
			postalCode: '10013',
			addressCountry: 'US'
		},
		geo: { '@type': 'GeoCoordinates', latitude: 40.7227, longitude: -73.9986 },
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			opens: '10:00',
			closes: '19:00'
		},
		priceRange: '$$',
		url: site.url,
		sameAs: [site.social.instagram, site.social.facebook, site.social.x]
	};

	// Restore persisted cart, wishlist, recently-viewed, compare, alerts and
	// orders once, on the client only (onMount never runs during SSR/prerender
	// and, unlike $effect, tracks no dependencies — the load*() calls splice
	// the same $state arrays they read, so an $effect around them re-triggers
	// itself forever: effect_update_depth_exceeded).
	onMount(() => {
		loadCart();
		loadWishlist();
		loadRecentlyViewed();
		loadCompare();
		loadAlerts();
		loadOrders();
	});

	// Smooth scroll (Lenis) + GSAP ScrollTrigger, one rAF loop, reduced-motion gated.
	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		gsap.registerPlugin(ScrollTrigger);
		const lenis = new Lenis({
			autoRaf: false,
			lerp: 0.1,
			smoothWheel: true,
			syncTouch: false // native inertia on touch devices
		});
		lenis.on('scroll', ScrollTrigger.update);
		gsap.ticker.add((time) => lenis.raf(time * 1000));
		gsap.ticker.lagSmoothing(0);
		// Emerald scroll-progress bar (transform only).
		const progress = document.getElementById('scroll-progress');
		if (progress) {
			gsap.to(progress, {
				scaleX: 1,
				ease: 'none',
				scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
			});
		}
		const onLoad = () => ScrollTrigger.refresh();
		window.addEventListener('load', onLoad);
		return () => {
			window.removeEventListener('load', onLoad);
			lenis.destroy();
		};
	});

	// Reveal-on-scroll: transform + opacity only, 300ms, respects reduced motion via CSS.
	$effect(() => {
		const els = document.querySelectorAll('.reveal');
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) e.target.classList.add('is-visible');
			},
			{ threshold: 0.12 }
		);
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	});
</script>

<svelte:head>
	<title>Aurel Jewels — Fine Jewelry for a Brighter You</title>
	<meta
		name="description"
		content="Timeless jewelry crafted for your everyday moments and life's most special ones. Rings, necklaces, earrings and bracelets — free shipping over $50."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Aurel Jewels — Fine Jewelry for a Brighter You" />
	<meta
		property="og:description"
		content="Every detail, a little extraordinary. Timeless jewelry, ethically sourced and crafted to last."
	/>
	<meta property="og:image" content="{site.url}/images/hero-1200.jpg" />
	<meta
		property="og:image:alt"
		content="Gold necklace with a large oval emerald pendant and a matching emerald ring on beige stone pedestals"
	/>
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="{site.url}/images/hero-1200.jpg" />
	<meta
		name="twitter:image:alt"
		content="Gold necklace with a large oval emerald pendant and a matching emerald ring on beige stone pedestals"
	/>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-emerald focus:px-5 focus:py-3 focus:text-white"
>
	Skip to main content
</a>

<!-- Scroll progress (emerald line, transform only) -->
<div
	id="scroll-progress"
	class="fixed top-0 left-0 z-[55] h-[3px] w-full origin-left scale-x-0 bg-emerald"
	aria-hidden="true"
></div>

<Header />
<main id="main">{@render children()}</main>
<Newsletter />
<Footer />

<!-- Floating WhatsApp (desktop/tablet) -->
<a
	href={site.whatsappHref}
	target="_blank"
	rel="noopener"
	aria-label="Chat with Aurel Jewels on WhatsApp"
	class="fixed right-5 bottom-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform duration-200 hover:scale-105 md:flex"
>
	<WhatsAppIcon size={26} />
</a>

<!-- Mobile bottom navigation: Home / Shop / Search / Saved / Bag (one bottom system) -->
<BottomNav />

<!-- Ask an expert (PDP / cart / checkout only) + cookie consent -->
<AskExpert />
<CookieBanner />
