<script lang="ts">
	import { site } from '#lib/data/site.ts';
	import PageHero from '#lib/components/PageHero.svelte';
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import Picture from '#lib/components/Picture.svelte';

	const services = [
		{ title: 'Try pieces on', detail: 'Every piece in the shop, in daylight, with a mirror and no rush.' },
		{ title: 'Free cleaning', detail: 'Bring any Aurel piece in — cleaned and inspected while you wait.' },
		{ title: 'Resizing on site', detail: 'Most ring resizes measured and booked in store, first one free within 30 days.' },
		{ title: 'Order pickup', detail: 'Order online, pick up in store — free, ready in 2 hours (demo).' },
		{ title: 'Bespoke consultations', detail: 'Sit with a designer and sketch your piece. Book ahead for a full hour.' },
		{ title: 'Repairs & assessments', detail: 'Free assessment for any repair — quoted before we start.' }
	];
</script>

<svelte:head>
	<title>Visit Us — Aurel Jewels, SoHo, New York</title>
	<meta
		name="description"
		content="Visit the Aurel Jewels boutique at 12 Mercer Street, SoHo, New York — hours, directions, in-store services and free 2-hour order pickup."
	/>
	<link rel="canonical" href="{site.url}/visit-us" />
	<meta property="og:url" content="{site.url}/visit-us" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Visit us' }]} />

<PageHero
	eyebrow="VISIT US"
	title="The SoHo boutique"
	subtitle="Walk-ins welcome, appointments never required. Come and try everything on — that is what the shop is for."
/>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<div class="grid items-start gap-10 lg:grid-cols-2">
		<div class="min-w-0 overflow-hidden rounded-3xl ring-1 ring-line">
			<Picture
				name="map-soho"
				alt="Map showing Aurel Jewels at 12 Mercer Street, SoHo, New York, near the Spring Street subway"
				width={1200}
				height={900}
				sizes="(min-width: 1024px) 50vw, 100vw"
				eager
				imgClass="aspect-[4/3] w-full object-cover"
				pictureClass="block"
			/>
			<div class="bg-white p-6">
				<p class="font-display text-xl font-semibold text-ink">{site.address}</p>
				<p class="mt-2 text-muted">{site.hours}</p>
				<a
					href="https://maps.google.com/?q=12+Mercer+Street,+SoHo,+New+York,+NY+10013"
					target="_blank"
					rel="noopener"
					class="mt-4 inline-flex min-h-12 items-center rounded-full bg-emerald px-6 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
				>
					Open in Google Maps →
				</a>
			</div>
		</div>
		<div class="min-w-0">
			<h2 class="font-display text-2xl font-medium text-ink">In-store services</h2>
			<ul class="mt-6 space-y-4">
				{#each services as s (s.title)}
					<li class="rounded-3xl bg-white p-5 ring-1 ring-line">
						<p class="font-semibold text-ink">{s.title}</p>
						<p class="mt-1 text-sm leading-relaxed text-muted">{s.detail}</p>
					</li>
				{/each}
			</ul>
			<div class="mt-6 flex flex-wrap gap-3">
				<a
					href="/appointments"
					class="inline-flex min-h-12 items-center rounded-full bg-emerald px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors duration-200 hover:bg-emerald-deep"
				>
					Book an appointment
				</a>
				<a
					href="/services"
					class="inline-flex min-h-12 items-center rounded-full bg-white px-7 text-sm font-bold tracking-wide text-ink uppercase ring-1 ring-line transition-colors duration-150 hover:ring-emerald"
				>
					Cleaning &amp; repairs
				</a>
			</div>
			<p class="mt-6 text-sm leading-relaxed text-muted">
				Getting here: Spring St station (4/6) is two minutes away; Prince St (R/W) is five.
				The boutique is step-free from the street.
			</p>
		</div>
	</div>
</section>
