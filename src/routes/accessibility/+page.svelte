<script lang="ts">
	import { site } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
</script>

<svelte:head>
	<title>Accessibility — Aurel Jewels</title>
	<meta
		name="description"
		content="Aurel Jewels aims for WCAG 2.2 AA across the whole store: keyboard access, 48px tap targets, clear focus, and a way to report any barrier."
	/>
	<link rel="canonical" href="{site.url}/accessibility" />
	<meta property="og:url" content="{site.url}/accessibility" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Accessibility' }]} />

<PageHero
	eyebrow="ACCESSIBILITY"
	title="Jewellery for everyone"
	subtitle="We aim for WCAG 2.2 Level AA across the whole store — so everyone can browse, choose and buy with confidence."
/>

<section class="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="space-y-6 text-[1.05rem] leading-relaxed text-muted">
		<p>
			Aurel Jewels is committed to making this website usable by as many people as possible.
			Our standard is the <strong class="text-ink">Web Content Accessibility Guidelines (WCAG) 2.2,
			Level AA</strong>, and we check new pages against it before they go live.
		</p>
	</div>

	<h2 class="mt-12 font-display text-2xl font-medium text-ink">What we have done</h2>
	<ul class="mt-4 space-y-3 text-[1.05rem] leading-relaxed text-muted">
		<li class="flex gap-2"><span aria-hidden="true" class="text-gold-dark">◆</span><span><strong class="text-ink">Keyboard access everywhere.</strong> Every menu, filter, gallery, modal and checkout step works with Tab, Enter, Space, arrows and Escape — including the mega-menu, which closes with Escape.</span></li>
		<li class="flex gap-2"><span aria-hidden="true" class="text-gold-dark">◆</span><span><strong class="text-ink">Visible focus, never hidden.</strong> Focused elements get a clear 2px outline, and sticky bars (the mobile bottom navigation, the add-to-cart bar, the cookie banner) are kept clear of keyboard focus with scroll padding, so a focused control is never covered.</span></li>
		<li class="flex gap-2"><span aria-hidden="true" class="text-gold-dark">◆</span><span><strong class="text-ink">Tap targets of 48px.</strong> Links, buttons, filter chips, swatches and gallery controls are at least 48×48px on touch screens (WCAG 2.5.8 asks for 24×24px minimum — we aim higher).</span></li>
		<li class="flex gap-2"><span aria-hidden="true" class="text-gold-dark">◆</span><span><strong class="text-ink">No drag-only controls.</strong> The 360° viewer and the before/after sliders can be driven by buttons and sliders as well as dragging (WCAG 2.5.7).</span></li>
		<li class="flex gap-2"><span aria-hidden="true" class="text-gold-dark">◆</span><span><strong class="text-ink">Consistent help.</strong> The same help links — Contact, FAQs, Track your order — appear in the footer and the help widget on every page (WCAG 3.2.6).</span></li>
		<li class="flex gap-2"><span aria-hidden="true" class="text-gold-dark">◆</span><span><strong class="text-ink">Skip to main content.</strong> A skip link is the first focusable element on every page.</span></li>
		<li class="flex gap-2"><span aria-hidden="true" class="text-gold-dark">◆</span><span><strong class="text-ink">Contrast and text.</strong> Body text meets 4.5:1 contrast, body copy is 16px or larger, and the layout reflows without horizontal scrolling down to 320px wide.</span></li>
		<li class="flex gap-2"><span aria-hidden="true" class="text-gold-dark">◆</span><span><strong class="text-ink">Reduced motion respected.</strong> If your system asks for reduced motion, animations and smooth scrolling switch off.</span></li>
	</ul>

	<h2 class="mt-12 font-display text-2xl font-medium text-ink">What we are still working on</h2>
	<p class="mt-4 text-[1.05rem] leading-relaxed text-muted">
		Some older product photography has short alt text rather than full descriptions, and our
		360° viewer has true multi-angle stills for the Eternal Spark Ring so far — other pieces
		still use a photographic rotation. Both are on our list. If a page does not work for you,
		we want to know — see below.
	</p>

	<h2 class="mt-12 font-display text-2xl font-medium text-ink">Report a barrier</h2>
	<p class="mt-4 text-[1.05rem] leading-relaxed text-muted">
		Found something that does not work with your keyboard, screen reader or other assistive
		technology? Tell us which page, what you were trying to do, and what happened. We aim to
		reply within two business days.
	</p>
	<div class="mt-6 flex flex-wrap gap-3">
		<a
			href="mailto:{site.email}?subject=Accessibility%20barrier%20on%20aurel-jewels.pages.dev"
			class="inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
		>
			Email {site.email}
		</a>
		<a
			href="/contact"
			class="inline-flex min-h-12 items-center rounded-full bg-white px-7 text-sm font-bold tracking-wide text-ink uppercase ring-1 ring-line transition-colors duration-150 hover:ring-emerald"
		>
			Contact form
		</a>
	</div>
	<p class="mt-6 text-sm leading-relaxed text-muted">
		You can also call the boutique at <a href={site.phoneHref} class="font-semibold text-emerald underline underline-offset-2">{site.phoneDisplay}</a>
		({site.hours}) and a member of staff will help you order by phone.
	</p>
</section>
