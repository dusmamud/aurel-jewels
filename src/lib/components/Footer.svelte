<script lang="ts">
	import { Mail, MapPin, Phone } from '@lucide/svelte';
	import { site } from '#lib/data/site.ts';
	import Logo from './Logo.svelte';
	import SocialIcon from './SocialIcon.svelte';

	const shopLinks = [
		{ label: 'All Jewelry', href: '/shop' },
		{ label: 'Rings', href: '/shop?category=rings' },
		{ label: 'Necklaces', href: '/shop?category=necklaces' },
		{ label: 'Earrings', href: '/shop?category=earrings' },
		{ label: 'Bracelets', href: '/shop?category=bracelets' },
		{ label: 'Gift Collection', href: '/collections/gifts' },
		{ label: 'Lookbook', href: '/lookbook' },
		{ label: 'Gift Finder', href: '/gift-finder' }
	];
	const careLinks = [
		{ label: 'FAQs', href: '/faq' },
		{ label: 'Shipping Policy', href: '/shipping' },
		{ label: 'Returns & Refunds', href: '/returns' },
		{ label: 'Size Guide', href: '/size-guide' },
		{ label: 'Care Instructions', href: '/care' },
		{ label: 'Track Your Order', href: '/track-order' },
		{ label: 'Warranty & Authenticity', href: '/warranty' },
		{ label: 'Financing', href: '/financing' },
		{ label: 'Rewards', href: '/rewards' }
	];
	const aboutLinks = [
		{ label: 'Our Story', href: '/about' },
		{ label: 'Our Materials', href: '/about#materials' },
		{ label: 'Sustainability', href: '/sustainability' },
		{ label: 'Bespoke & Custom', href: '/bespoke' },
		{ label: 'Book an Appointment', href: '/appointments' },
		{ label: 'Guides', href: '/guides' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'Contact Us', href: '/contact' }
	];
</script>

<footer class="bg-emerald text-cream">
	<div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
		<div>
			<a href="/" class="flex items-center gap-2 text-gold-light" aria-label="Aurel Jewels — home">
				<Logo />
				<span class="leading-none">
					<span class="block font-display text-[1.25rem] tracking-[0.18em] text-white">AUREL</span>
					<span class="block text-[0.6rem] tracking-[0.42em] text-cream/70">JEWELS</span>
				</span>
			</a>
			<p class="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-cream/80">
				Timeless jewelry for everyday moments and life’s most special ones.
			</p>
			<p class="mt-4 flex items-start gap-2 text-sm leading-relaxed text-cream/70">
				<MapPin size={16} class="mt-0.5 shrink-0 text-gold-light" aria-hidden="true" />
				{site.address}
			</p>
			<p class="mt-2 flex items-center gap-2 text-sm text-cream/70">
				<Phone size={15} class="shrink-0 text-gold-light" aria-hidden="true" />
				<a href={site.phoneHref} class="hover:text-white">{site.phoneDisplay}</a>
			</p>
			<p class="mt-2 flex items-center gap-2 text-sm text-cream/70">
				<Mail size={15} class="shrink-0 text-gold-light" aria-hidden="true" />
				<a href="mailto:{site.email}" class="hover:text-white">{site.email}</a>
			</p>
		</div>
		<nav aria-label="Shop">
			<h3 class="text-sm font-bold tracking-[0.2em] text-gold-light uppercase">Shop</h3>
			<ul class="mt-4 space-y-1">
				{#each shopLinks as link}
					<li><a href={link.href} class="inline-flex min-h-11 items-center text-[0.95rem] text-cream/80 hover:text-white">{link.label}</a></li>
				{/each}
			</ul>
		</nav>
		<nav aria-label="Customer care">
			<h3 class="text-sm font-bold tracking-[0.2em] text-gold-light uppercase">Customer Care</h3>
			<ul class="mt-4 space-y-1">
				{#each careLinks as link}
					<li><a href={link.href} class="inline-flex min-h-11 items-center text-[0.95rem] text-cream/80 hover:text-white">{link.label}</a></li>
				{/each}
			</ul>
		</nav>
		<div>
			<nav aria-label="About">
				<h3 class="text-sm font-bold tracking-[0.2em] text-gold-light uppercase">About</h3>
				<ul class="mt-4 space-y-1">
					{#each aboutLinks as link}
						<li><a href={link.href} class="inline-flex min-h-11 items-center text-[0.95rem] text-cream/80 hover:text-white">{link.label}</a></li>
					{/each}
				</ul>
			</nav>
			<h3 class="mt-6 text-sm font-bold tracking-[0.2em] text-gold-light uppercase">Follow Us</h3>
			<div class="mt-3 flex gap-3">
				{#each [{ label: 'Instagram', name: 'instagram', href: site.social.instagram }, { label: 'Facebook', name: 'facebook', href: site.social.facebook }, { label: 'X', name: 'x', href: site.social.x }] as s}
					<a
						href={s.href}
						target="_blank"
						rel="noopener"
						aria-label="Aurel Jewels on {s.label}"
						class="flex h-12 w-12 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors duration-150 hover:border-gold-light hover:text-gold-light"
					>
						<SocialIcon name={s.name as 'facebook' | 'instagram' | 'x'} size={18} />
					</a>
				{/each}
			</div>
			<p class="mt-3 text-sm text-cream/70">Join our community for inspiration and exclusive offers.</p>
		</div>
	</div>
	<div class="border-t border-cream/15 py-5 text-center text-sm text-cream/70">
		<p class="flex flex-wrap justify-center gap-x-5 gap-y-2 px-4">
			<a href="/privacy" class="min-h-11 content-center hover:text-white">Privacy Policy</a>
			<a href="/terms" class="min-h-11 content-center hover:text-white">Terms of Service</a>
			<a href="/faq" class="min-h-11 content-center hover:text-white">FAQ</a>
			<a href="/sitemap.xml" class="min-h-11 content-center hover:text-white">Sitemap</a>
		</p>
		<p class="mt-2 px-4">© 2026 Aurel Jewels. All rights reserved. · Mock website — content for design approval.</p>
	</div>
</footer>
