<script lang="ts">
	import PageHero from '#lib/components/PageHero.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { site } from '#lib/data/site.ts';

	let name = $state('');
	let email = $state('');
	let subject = $state('General question');
	let message = $state('');
	let sent = $state(false);
	let error = $state('');

	function submit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		if (name.trim().length < 2) {
			error = 'Please enter your name.';
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			error = 'Please enter a valid email address.';
			return;
		}
		if (message.trim().length < 10) {
			error = 'Please tell us a little more — at least 10 characters.';
			return;
		}
		sent = true;
	}
</script>

<svelte:head>
	<title>Contact Us — Aurel Jewels, SoHo, New York</title>
	<meta
		name="description"
		content="Visit the Aurel Jewels boutique at 12 Mercer Street, SoHo, New York — or call, email or WhatsApp us with any question about a piece."
	/>
	<link rel="canonical" href="{site.url}/contact" />
	<meta property="og:url" content="{site.url}/contact" />
</svelte:head>

<PageHero
	eyebrow="CONTACT US"
	title="We would love to hear from you"
	subtitle="Questions about a piece, sizing, an order or a gift — send us a message, call the boutique, or just walk in. We answer every message within one business day."
/>

<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
	<div class="grid items-start gap-10 lg:grid-cols-2">
		<!-- Form -->
		<div class="min-w-0 rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
			{#if sent}
				<div class="py-6 text-center" role="status">
					<p class="font-display text-2xl font-medium text-ink">Thank you, {name.trim()}!</p>
					<p class="mx-auto mt-3 max-w-md leading-relaxed text-muted">
						Your message is on its way. We will reply to <strong class="text-ink">{email.trim()}</strong
						> within one business day — usually much sooner.
					</p>
					<p class="mt-4 text-sm text-muted">
						In a hurry? Call us at <a href={site.phoneHref} class="inline-flex min-h-12 items-center font-semibold text-gold-dark underline underline-offset-4">{site.phoneDisplay}</a>.
					</p>
					<button
						type="button"
						class="mt-6 inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-base font-semibold text-white transition-colors duration-200 hover:bg-emerald-deep"
						onclick={() => {
							sent = false;
							name = '';
							email = '';
							subject = 'General question';
							message = '';
						}}
					>
						Send another message
					</button>
				</div>
			{:else}
				<h2 class="font-display text-2xl font-medium text-ink">Send us a message</h2>
				<p class="mt-2 text-sm leading-relaxed text-muted">
					This is a demo form — your message is not sent anywhere, but it shows how the real one
					will work.
				</p>
				<form class="mt-6 space-y-5" onsubmit={submit} novalidate>
					<div>
						<label for="contact-name" class="mb-1.5 block text-sm font-semibold text-ink">Name</label>
						<input
							id="contact-name"
							type="text"
							bind:value={name}
							autocomplete="name"
							placeholder="Your full name"
							class="min-h-12 w-full rounded-xl border border-line bg-cream px-4 text-ink placeholder:text-muted/60 focus:border-gold-dark focus:outline-none"
						/>
					</div>
					<div>
						<label for="contact-email" class="mb-1.5 block text-sm font-semibold text-ink">Email</label>
						<input
							id="contact-email"
							type="email"
							bind:value={email}
							autocomplete="email"
							placeholder="you@example.com"
							class="min-h-12 w-full rounded-xl border border-line bg-cream px-4 text-ink placeholder:text-muted/60 focus:border-gold-dark focus:outline-none"
						/>
					</div>
					<div>
						<label for="contact-subject" class="mb-1.5 block text-sm font-semibold text-ink">Subject</label>
						<select
							id="contact-subject"
							bind:value={subject}
							class="min-h-12 w-full rounded-xl border border-line bg-cream px-4 text-ink focus:border-gold-dark focus:outline-none"
						>
							<option>General question</option>
							<option>Order help</option>
							<option>Sizing or resizing</option>
							<option>Returns or exchanges</option>
							<option>Gift cards</option>
							<option>Visit the boutique</option>
						</select>
					</div>
					<div>
						<label for="contact-message" class="mb-1.5 block text-sm font-semibold text-ink">Message</label>
						<textarea
							id="contact-message"
							bind:value={message}
							rows="5"
							placeholder="How can we help?"
							class="w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink placeholder:text-muted/60 focus:border-gold-dark focus:outline-none"
						></textarea>
					</div>
					{#if error}
						<p class="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">{error}</p>
					{/if}
					<button
						type="submit"
						class="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-emerald px-7 text-base font-semibold text-white transition-colors duration-200 hover:bg-emerald-deep sm:w-auto"
					>
						Send message
					</button>
				</form>
			{/if}
		</div>

		<!-- Store info -->
		<div class="min-w-0 space-y-6">
			<div class="overflow-hidden rounded-3xl border border-line bg-white">
				<Picture
					name="map-soho"
					alt="Map showing Aurel Jewels at 12 Mercer Street, SoHo, New York, between Houston and Prince Streets"
					width={1200}
					height={900}
					sizes="(min-width: 1024px) 50vw, 100vw"
					eager
					imgClass="aspect-[4/3] w-full object-cover"
					pictureClass="block"
				/>
				<div class="p-5">
					<p class="font-semibold text-ink">{site.address}</p>
					<a
						href="https://maps.google.com/?q=12+Mercer+Street,+SoHo,+New+York,+NY+10013"
						target="_blank"
						rel="noopener"
						class="mt-3 inline-flex min-h-12 items-center rounded-full bg-emerald px-6 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
					>
						Open in Google Maps →
					</a>
				</div>
			</div>
			<div class="grid gap-4 sm:grid-cols-2">
				<div class="rounded-3xl bg-white p-5 ring-1 ring-line">
					<h2 class="font-semibold text-ink">Visit the boutique</h2>
					<p class="mt-2 text-sm leading-relaxed break-words text-muted">{site.address}</p>
					<p class="mt-2 text-sm leading-relaxed text-muted">{site.hours}</p>
					<a href="/visit-us" class="mt-3 inline-flex min-h-12 items-center text-sm font-semibold text-emerald underline underline-offset-2">Plan your visit →</a>
				</div>
				<div class="rounded-3xl bg-white p-5 ring-1 ring-line">
					<h2 class="font-semibold text-ink">Call or write</h2>
					<p class="mt-2 text-sm leading-relaxed text-muted">
						Phone: <a href={site.phoneHref} class="inline-flex min-h-12 items-center font-semibold text-gold-dark underline underline-offset-4">{site.phoneDisplay}</a><br />
						Email: <a href="mailto:{site.email}" class="inline-flex min-h-12 items-center font-semibold break-all text-gold-dark underline underline-offset-4">{site.email}</a>
					</p>
					<a
						href={site.whatsappHref}
						target="_blank"
						rel="noopener"
						class="mt-4 inline-flex min-h-12 items-center rounded-full bg-emerald px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-deep"
					>
						Chat on WhatsApp →
					</a>
				</div>
			</div>
			<div class="rounded-3xl bg-emerald-soft p-5 ring-1 ring-line">
				<h2 class="font-semibold text-ink">Good to know</h2>
				<ul class="mt-2 space-y-1.5 text-sm leading-relaxed text-muted">
					<li>• Walk-ins welcome; appointments never required</li>
					<li>• Online orders can be picked up in store</li>
					<li>• Free ring resizing within 30 days of purchase</li>
				</ul>
			</div>
		</div>
	</div>
</section>
