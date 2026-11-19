<script lang="ts">
	import { blogPosts, site } from '#lib/data/site.ts';
	import Picture from '#lib/components/Picture.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const post = $derived(data.post);
	const related = $derived(blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2));
</script>

<svelte:head>
	<title>{post.title} — Aurel Jewels</title>
	<meta name="description" content={post.excerpt} />
	<link rel="canonical" href="{site.url}/blog/{post.slug}" />
</svelte:head>

<article class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
	<p class="text-xs font-bold tracking-[0.3em] text-gold-dark">{post.category} · {post.date}</p>
	<h1 class="mt-3 font-display text-[clamp(1.8rem,4.5vw,2.8rem)] leading-tight font-medium text-ink">
		{post.title}
	</h1>
	<p class="mt-4 text-lg leading-relaxed text-muted">{post.excerpt}</p>
	<div class="mt-8 overflow-hidden rounded-3xl border border-line">
		<Picture
			name={post.image}
			alt={post.alt}
			width={1000}
			height={640}
			sizes="(max-width: 768px) 90vw, 720px"
			eager={true}
			imgClass="aspect-[16/10] h-auto w-full object-cover"
			pictureClass="block"
		/>
	</div>
	<div class="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-ink/85">
		{#each post.body as para}
			<p>{para}</p>
		{/each}
	</div>
	<div class="mt-10 rounded-3xl bg-sand/60 p-6 text-center ring-1 ring-line">
		<p class="font-display text-xl font-medium text-ink">Like what you read?</p>
		<p class="mt-2 text-muted">
			Every piece mentioned here is in the shop — and arrives in our signature emerald gift box.
		</p>
		<a
			href="/shop"
			class="mt-4 inline-flex min-h-12 items-center rounded-full bg-gold px-7 text-base font-semibold text-white transition-colors duration-200 hover:bg-gold-dark"
		>
			Shop the collection →
		</a>
	</div>
	<p class="mt-10">
		<a
			href="/blog"
			class="inline-flex min-h-12 items-center text-sm font-semibold text-gold-dark underline underline-offset-4"
		>
			← Back to the journal
		</a>
	</p>
</article>

<section class="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
	<h2 class="font-display text-2xl font-medium text-ink">Keep reading</h2>
	<div class="mt-6 grid gap-6 md:grid-cols-2">
		{#each related as r}
			<article class="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line">
				<a href="/blog/{r.slug}" class="block overflow-hidden" aria-label="Read: {r.title}">
					<Picture
						name={r.image}
						alt={r.alt}
						width={800}
						height={520}
						sizes="(max-width: 768px) 90vw, 560px"
						imgClass="aspect-[16/10] h-auto w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
						pictureClass="block"
					/>
				</a>
				<div class="flex flex-1 flex-col p-5">
					<p class="text-xs font-bold tracking-wider text-gold-dark">{r.category} · {r.date}</p>
					<h3 class="mt-2 font-display text-lg leading-snug font-semibold text-ink">
						<a href="/blog/{r.slug}" class="hover:text-gold-dark">{r.title}</a>
					</h3>
					<p class="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">{r.excerpt}</p>
					<a
						href="/blog/{r.slug}"
						class="mt-4 inline-flex min-h-12 items-center text-sm font-semibold text-gold-dark underline underline-offset-4"
					>
						Read article →
					</a>
				</div>
			</article>
		{/each}
	</div>
</section>
