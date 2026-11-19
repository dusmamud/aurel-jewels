<script lang="ts">
	import FaqAccordion from '#lib/components/FaqAccordion.svelte';
	import PageHero from '#lib/components/PageHero.svelte';
	import { faqs, site } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Frequently Asked Questions — Aurel Jewels</title>
	<meta
		name="description"
		content="Shipping, returns, sizing, payments and care — every question customers ask about Aurel Jewels, answered plainly."
	/>
	<link rel="canonical" href="{site.url}/faq" />
</svelte:head>

<PageHero
	eyebrow="FAQ"
	title="Questions, answered plainly"
	subtitle="Shipping, returns, sizing, payments, care — if it is not here, message us and we will answer within one business day."
/>

<section class="mx-auto max-w-3xl px-4 py-14 sm:px-6">
	<FaqAccordion items={faqs} idPrefix="faq-page" />
	<p class="mt-10 text-center leading-relaxed text-muted">
		Still curious?
		<a href="/contact" class="font-semibold text-gold-dark underline underline-offset-4">Contact us →</a>
		or
		<a
			href={site.whatsappHref}
			target="_blank"
			rel="noopener"
			class="font-semibold text-gold-dark underline underline-offset-4">ask on WhatsApp →</a
		>
	</p>
</section>
