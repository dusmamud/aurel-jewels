<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import { site, usd } from '#lib/data/site.ts';
</script>

<svelte:head>
	<title>Shipping Policy — Aurel Jewels</title>
	<meta
		name="description"
		content="Free standard shipping on US orders over $50. Orders ship in 1–2 business days from New York, with express and Canada delivery options."
	/>
	<link rel="canonical" href="{site.url}/shipping" />
</svelte:head>

<PageHero
	eyebrow="SHIPPING"
	title="Shipping, simple and fast"
	subtitle="Every order is packed by hand in our signature emerald gift box, ships from our SoHo boutique in New York, and is fully tracked from our door to yours."
/>

<section class="mx-auto max-w-3xl px-4 py-14 sm:px-6">
	<div class="space-y-6">
		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Processing time</h2>
			<p class="mt-3 leading-relaxed text-muted">
				Orders are processed and shipped within <strong class="text-ink">1–2 business days</strong>
				(Monday–Saturday, excluding US public holidays). Orders placed after 2:00 PM ET ship the
				next business day. You will receive a confirmation email when your order ships, with a
				tracking number.
			</p>
		</article>

		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">US shipping options</h2>
			<div class="mt-4 overflow-x-auto">
				<table class="w-full min-w-[420px] text-left text-[0.95rem]">
					<thead>
						<tr class="border-b border-line text-sm text-muted">
							<th scope="col" class="py-2 pr-4 font-semibold">Method</th>
							<th scope="col" class="py-2 pr-4 font-semibold">Delivery time</th>
							<th scope="col" class="py-2 font-semibold">Cost</th>
						</tr>
					</thead>
					<tbody class="text-ink/85">
						<tr class="border-b border-line">
							<td class="py-3 pr-4">Standard shipping</td>
							<td class="py-3 pr-4">3–5 business days</td>
							<td class="py-3">Free over {usd(site.freeShippingOver)} · otherwise {usd(site.shippingFlat)}</td>
						</tr>
						<tr>
							<td class="py-3 pr-4">Express shipping</td>
							<td class="py-3 pr-4">1–2 business days</td>
							<td class="py-3">{usd(14.95)}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p class="mt-4 leading-relaxed text-muted">
				Standard shipping is <strong class="text-ink">free on all US orders over {usd(site.freeShippingOver)}</strong>.
				Orders under that amount ship for {usd(site.shippingFlat)}.
			</p>
		</article>

		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">International shipping</h2>
			<p class="mt-3 leading-relaxed text-muted">
				We ship to the <strong class="text-ink">United States and Canada</strong>. Orders to Canada
				take 7–12 business days and cost a flat $19.95. Duties and taxes for Canadian orders are
				calculated at checkout, so there are no surprise fees at the door.
			</p>
			<p class="mt-3 leading-relaxed text-muted">
				We do not currently ship to other countries — join the newsletter and we will let you know
				when we do.
			</p>
		</article>

		<article class="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">Tracking your order</h2>
			<p class="mt-3 leading-relaxed text-muted">
				Every order gets a tracking number by email as soon as it ships. You can check the status
				any time on our <a href="/track-order" class="font-semibold text-gold-dark underline underline-offset-4">Track Your Order</a> page
				using your order number and email address. If tracking has not updated within 48 hours of
				shipping, <a href="/contact" class="font-semibold text-gold-dark underline underline-offset-4">contact us</a> and we will look into it.
			</p>
		</article>

		<article class="rounded-3xl bg-emerald-soft p-6 ring-1 ring-line sm:p-8">
			<h2 class="font-display text-2xl font-medium text-ink">A note on delivery</h2>
			<p class="mt-3 leading-relaxed text-muted">
				Orders over $150 require a signature on delivery. If you will be away, consider shipping
				to your workplace or choosing in-store pickup at our SoHo boutique — it is free, and your
				order is usually ready the next business day.
			</p>
		</article>
	</div>
</section>
