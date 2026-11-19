<script lang="ts">
	// Real breadcrumb trail. Renders an ordered list for users and a
	// BreadcrumbList JSON-LD block for search (no aggregateRating/FAQPage).
	import { site } from '#lib/data/site.ts';

	let { items }: { items: { label: string; href?: string }[] } = $props();

	const jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: items.map((item, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: item.label,
				...(item.href ? { item: `${site.url}${item.href}` } : {})
			}))
		})
	);
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<nav aria-label="Breadcrumb" class="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
	<ol class="flex min-h-12 flex-wrap items-center gap-1.5 text-sm">
		{#each items as item, i (item.label + (item.href ?? ''))}
			<li class="flex min-w-0 items-center gap-1.5">
				{#if i > 0}<span aria-hidden="true" class="text-muted">/</span>{/if}
				{#if item.href && i < items.length - 1}
					<a href={item.href} class="font-semibold text-emerald hover:text-emerald-deep">{item.label}</a>
				{:else}
					<span aria-current="page" class="min-w-0 truncate font-medium text-muted">{item.label}</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
