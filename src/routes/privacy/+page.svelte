<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Privacy Policy — Aurel Jewels</title>
	<meta
		name="description"
		content="How Aurel Jewels collects, uses and protects your personal information — and the rights you have over it."
	/>
	<link rel="canonical" href="{site.url}/privacy" />
</svelte:head>

<PageHero
	eyebrow="PRIVACY"
	title="Privacy policy"
	subtitle="Short version: we only ask for what your order needs, we never sell your details, and you can ask us to delete them at any time."
/>

<section class="mx-auto max-w-3xl px-4 py-14 sm:px-6">
	<p class="text-sm font-semibold text-muted">Last updated: November 2026</p>
	<div class="mt-6 space-y-8 leading-relaxed text-muted">
		<section>
			<h2 class="font-display text-2xl font-medium text-ink">What we collect</h2>
			<p class="mt-3">
				When you shop with Aurel Jewels, we collect the information needed to complete your order:
				your name, email address, phone number, shipping and billing addresses, and payment details
				(which are processed by our payment provider — we never store full card numbers ourselves).
			</p>
			<p class="mt-3">
				If you contact us, join the newsletter, or leave a review, we keep the details you share
				so we can reply and improve the store. If you visit the boutique, we do not collect
				anything unless you choose to share it.
			</p>
		</section>

		<section>
			<h2 class="font-display text-2xl font-medium text-ink">How we use it</h2>
			<p class="mt-3">
				We use your information to process and deliver orders, arrange returns and exchanges,
				answer your questions, and — only if you have opted in — send you news and offers. We do
				not use your data for any other purpose, and we do not profile you for advertising.
			</p>
		</section>

		<section>
			<h2 class="font-display text-2xl font-medium text-ink">Who we share it with</h2>
			<p class="mt-3">
				We share only what is necessary with the services that make the store work: our payment
				processor, our shipping carriers, and our email provider. We never sell, rent or trade
				your personal information. We may disclose information if required by law.
			</p>
		</section>

		<section>
			<h2 class="font-display text-2xl font-medium text-ink">Cookies</h2>
			<p class="mt-3">
				This website uses a small number of cookies to keep your cart and wishlist working and to
				remember your preferences. We do not use third-party advertising cookies. The map on the
				contact page is loaded from Google Maps when you open that page, and Google may set its
				own cookies there.
			</p>
		</section>

		<section>
			<h2 class="font-display text-2xl font-medium text-ink">How long we keep it</h2>
			<p class="mt-3">
				Order records are kept for as long as needed for accounting, tax and warranty purposes,
				and then deleted. Newsletter subscriptions are kept until you unsubscribe. Messages to our
				support inbox are kept for 12 months.
			</p>
		</section>

		<section>
			<h2 class="font-display text-2xl font-medium text-ink">Your rights</h2>
			<p class="mt-3">
				You can ask us at any time to see the personal information we hold about you, correct it,
				or delete it. You can also unsubscribe from marketing emails with one click in any email
				we send. To make a request, email
				<a href="mailto:{site.email}" class="font-semibold break-all text-gold-dark underline underline-offset-4">{site.email}</a>
				or write to us at {site.address}. We will respond within 30 days.
			</p>
		</section>

		<section>
			<h2 class="font-display text-2xl font-medium text-ink">Security</h2>
			<p class="mt-3">
				Payments are processed over encrypted, PCI-compliant checkout, and access to customer data
				is limited to the small team that needs it to run the store. No system is perfect — if you
				believe your account or an order has been compromised, contact us immediately.
			</p>
		</section>

		<section>
			<h2 class="font-display text-2xl font-medium text-ink">Changes to this policy</h2>
			<p class="mt-3">
				If we change this policy, we will update the date above and, for significant changes, let
				you know by email. The version on this page is always the current one.
			</p>
		</section>
	</div>
</section>
