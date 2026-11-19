<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { site, usd } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Terms of Service — Aurel Jewels</title>
	<meta
		name="description"
		content="Terms for shopping with Aurel Jewels: orders, prices, shipping, returns, and the content rules for this website."
	/>
	<link rel="canonical" href="{site.url}/terms" />
</svelte:head>

<PageHero
	eyebrow="TERMS"
	title="Terms of service"
	subtitle="The boring-but-fair bit. How orders, prices, returns and content work on this website."
/>

<section class="mx-auto max-w-3xl px-4 py-14 sm:px-6">
	<p class="text-sm font-semibold text-muted">Last updated: November 2026</p>
	<div class="mt-6 space-y-8 leading-relaxed text-muted">
		<section>
			<h2 class="font-display text-2xl font-medium text-ink">About these terms</h2>
			<p class="mt-3">
				These terms apply to your use of aureljewels.com and to any order you place with Aurel
				Jewels, 12 Mercer Street, SoHo, New York, NY 10013, United States. By using this website
				or placing an order, you agree to these terms. If you do not agree, please do not use the
				site.
			</p>
		</section>

		<section>
			<h2 class="font-display text-2xl font-medium text-ink">Orders</h2>
			<p class="mt-3">
				When you place an order, you will receive a confirmation email. That email is our
				acceptance of your order and forms the contract between us. We may cancel an order if a
				piece is out of stock, if a price was shown incorrectly, or if we suspect fraud — in which
				case you will be refunded in full and told why.
			</p>
			<p class="mt-3">
				Orders are processed and shipped within 1–2 business days. Delivery times are estimates,
				not guarantees. See our <a href="/shipping" class="font-semibold text-gold-dark underline underline-offset-4">Shipping Policy</a> for details.
			</p>
		</section>

		<section>
			<h2 class="font-display text-2xl font-medium text-ink">Prices and payment</h2>
			<p class="mt-3">
				All prices are in US dollars (USD) and include applicable taxes where required. Shipping
				costs are shown at checkout: standard shipping is free on US orders over
				{usd(site.freeShippingOver)}, otherwise {usd(site.shippingFlat)}. Prices may change, but
				the price confirmed at checkout is the price you pay.
			</p>
			<p class="mt-3">
				We accept Visa, Mastercard, American Express, Discover, PayPal, Apple Pay and Google Pay.
				Payment is taken when you place your order. All payments are processed over an encrypted,
				PCI-compliant checkout.
			</p>
		</section>

		<section>
			<h2 class="font-display text-2xl font-medium text-ink">Returns and refunds</h2>
			<p class="mt-3">
				You have 30 days from delivery to return any unworn piece in its original packaging for a
				full refund, with a free return label. Refunds are issued to your original payment method
				within 5–10 business days of the return arriving. Final sale items, engraved pieces and —
				for hygiene reasons — earrings cannot be returned unless faulty or sent in error. Full
				details are on our <a href="/returns" class="font-semibold text-gold-dark underline underline-offset-4">Returns &amp; Refunds</a> page.
			</p>
		</section>

		<section>
			<h2 class="font-display text-2xl font-medium text-ink">Our pieces</h2>
			<p class="mt-3">
				All Aurel pieces are 14k gold-plated sterling silver with lab-created stones, nickel-free
				and hypoallergenic. Product photos are as accurate as possible, but colour and size may
				look slightly different on your screen. Minor variations in hand-finished pieces are part
				of their character, not a fault.
			</p>
		</section>

		<section>
			<h2 class="font-display text-2xl font-medium text-ink">Intellectual property</h2>
			<p class="mt-3">
				Photos, text, designs, the Aurel name and the look of this website belong to Aurel Jewels
				and are protected by copyright and trademark law. You may browse and share links to our
				pages, but please do not copy, reproduce or reuse our images or text without asking.
			</p>
		</section>

		<section>
			<h2 class="font-display text-2xl font-medium text-ink">Acceptable use</h2>
			<p class="mt-3">
				Please use this website lawfully and honestly: do not attempt to interfere with it, scrape
				it at scale, place fraudulent orders, or use it to harass anyone. We may suspend access
				for misuse.
			</p>
		</section>

		<section>
			<h2 class="font-display text-2xl font-medium text-ink">Limitation of liability</h2>
			<p class="mt-3">
				We are not liable for losses that are indirect or unforeseeable, for delays caused by
				shipping carriers, or for damage caused by improper care of a piece. Nothing in these
				terms limits your statutory consumer rights, or our liability for fraud, or for death or
				personal injury caused by our negligence.
			</p>
		</section>

		<section>
			<h2 class="font-display text-2xl font-medium text-ink">Governing law</h2>
			<p class="mt-3">
				These terms are governed by the laws of the State of New York, United States. If you have
				a complaint, please contact us first — most issues are resolved with one email to
				<a href="mailto:{site.email}" class="font-semibold break-all text-gold-dark underline underline-offset-4">{site.email}</a>.
			</p>
		</section>
	</div>
</section>
