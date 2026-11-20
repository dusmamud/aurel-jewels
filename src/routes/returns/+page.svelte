<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Returns &amp; Refunds — Aurel Jewels</title>
	<meta
		name="description"
		content="30-day returns on unworn Aurel pieces, with a free return label and refunds in 5–10 business days. Exchanges, resizing and non-returnable items explained."
	/>
	<link rel="canonical" href="{site.url}/returns" />
	<meta property="og:url" content="{site.url}/returns" />
</svelte:head>

<PageHero
	eyebrow="RETURNS &amp; REFUNDS"
	title="Changed your mind? No problem."
	subtitle="You have 30 days to return any unworn piece for a full refund — with a free return label and no questions that feel like an interrogation."
/>

<section class="mx-auto max-w-3xl px-4 py-14 sm:px-6">
	<div class="space-y-6">
		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">30-day returns</h2>
			<p class="mt-3 leading-relaxed text-muted">
				You have <strong class="text-ink">30 days</strong> from the delivery date to return any
				piece for a full refund. The piece must be <strong class="text-ink">unworn, undamaged and
				in its original packaging</strong> — including the gift box, pouch and any certificates.
			</p>
			<ol class="mt-4 list-decimal space-y-2 pl-5 leading-relaxed text-muted">
				<li>Find the return label in your order confirmation email (or ask us for a new one).</li>
				<li>Pack the piece in its original box and drop it at any USPS location.</li>
				<li>We email you when the return arrives, and again when your refund is processed.</li>
			</ol>
		</article>

		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Free return label</h2>
			<p class="mt-3 leading-relaxed text-muted">
				Return shipping is <strong class="text-ink">free</strong> — every order includes a prepaid
				return label. If you have lost yours, email
				<a href="mailto:{site.email}" class="font-semibold break-all text-gold-dark underline underline-offset-4">{site.email}</a>
				with your order number and we will send a new one within one business day.
			</p>
		</article>

		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Refund timing</h2>
			<p class="mt-3 leading-relaxed text-muted">
				Refunds are issued to your original payment method within <strong class="text-ink">5–10
				business days</strong> of the return arriving at our boutique. Your bank or card issuer may
				take a few extra days to show the refund on your statement. Shipping charges from the
				original order are not refunded unless the return is due to our error or a faulty piece.
			</p>
		</article>

		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Exchanges</h2>
			<p class="mt-3 leading-relaxed text-muted">
				Want a different size, metal or piece instead? Exchanges are free within 30 days — tell us
				what you would like and we will send the replacement as soon as your return is scanned by
				the carrier, so you are not left waiting. If the replacement costs more, you only pay the
				difference; if it costs less, we refund the difference.
			</p>
			<p class="mt-3 leading-relaxed text-muted">
				Your first ring resize within 30 days is also free — see our
				<a href="/size-guide" class="font-semibold text-gold-dark underline underline-offset-4">Size Guide</a>
				for measuring help.
			</p>
		</article>

		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Non-returnable items</h2>
			<p class="mt-3 leading-relaxed text-muted">
				For hygiene and personalisation reasons, the following cannot be returned:
			</p>
			<ul class="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted">
				<li><strong class="text-ink">Final sale items</strong> — pieces marked "Final Sale" at checkout.</li>
				<li><strong class="text-ink">Engraved or personalised pieces</strong> — anything made to order with your engraving or customisation.</li>
				<li><strong class="text-ink">Earrings</strong> — for hygiene reasons, unless faulty or the wrong item was sent.</li>
			</ul>
			<p class="mt-4 leading-relaxed text-muted">
				If a piece arrives damaged or faulty, or we sent the wrong item, none of the above applies —
				contact us within 14 days and we will replace it or refund you in full, including shipping.
			</p>
		</article>

		<p class="text-center leading-relaxed text-muted">
			Questions about a return?
			<a href="/contact" class="font-semibold text-gold-dark underline underline-offset-4">Contact us →</a>
		</p>
	</div>
</section>
