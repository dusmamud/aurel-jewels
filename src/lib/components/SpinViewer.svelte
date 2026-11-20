<script lang="ts">
	// 360° spin viewer (drag-to-rotate). When `frames` is given (8 generated
	// turntable stills — Eternal Spark Ring first), dragging / the slider /
	// the buttons step through the real frames, wrapping all the way round.
	// Without frames the viewer falls back to rotating the product photograph
	// in 3D (perspective rotateY). Buttons + slider are always present as
	// tap/keyboard alternatives, so dragging is never the only way to move it
	// (WCAG 2.5.7). The zoom lightbox is unchanged and stays available.
	import { RotateCw } from '@lucide/svelte';
	import Picture from './Picture.svelte';

	let {
		name,
		alt,
		frames = []
	}: { name: string; alt: string; frames?: string[] } = $props();

	const hasFrames = $derived(frames.length > 0);
	const frameCount = $derived(frames.length);
	let frame = $state(0); // 0..frameCount-1 in frame mode
	let angle = $state(0); // -45..45 degrees in fallback mode
	let dragging = $state(false);
	let startX = $state(0);
	let startFrame = $state(0);
	let startAngle = $state(0);

	// Preload the frame stills once, so dragging through them is instant.
	$effect(() => {
		if (!hasFrames) return;
		for (const f of frames) {
			const img = new Image();
			img.src = `/images/${f}-800.jpg`;
		}
	});

	function onPointerDown(e: PointerEvent) {
		dragging = true;
		startX = e.clientX;
		startFrame = frame;
		startAngle = angle;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}
	function onPointerMove(e: PointerEvent) {
		if (!dragging) return;
		if (hasFrames) {
			const steps = Math.round((e.clientX - startX) / 28);
			frame = (((startFrame + steps) % frameCount) + frameCount) % frameCount;
		} else {
			angle = Math.max(-45, Math.min(45, startAngle + (e.clientX - startX) / 4));
		}
	}
	function onPointerUp() {
		dragging = false;
	}
	function step(dir: 1 | -1) {
		if (hasFrames) {
			frame = (((frame + dir) % frameCount) + frameCount) % frameCount;
		} else {
			angle = Math.max(-45, Math.min(45, angle + dir * 15));
		}
	}

	const shownDegrees = $derived(
		hasFrames ? Math.round((frame / frameCount) * 360) : Math.round(angle)
	);
</script>

<div class="mt-4 rounded-3xl bg-white p-4 ring-1 ring-line sm:p-5">
	<div class="flex items-center justify-between gap-3">
		<p class="flex items-center gap-2 text-sm font-bold text-ink">
			<RotateCw size={17} aria-hidden="true" class="text-emerald" /> 360° view — drag to rotate
		</p>
		<span class="text-xs font-semibold text-muted" aria-live="polite">
			{shownDegrees}°{#if hasFrames}
				· {frame + 1} of {frameCount}{/if}
		</span>
	</div>
	<div
		class="mt-3 touch-none overflow-hidden rounded-2xl bg-sand select-none"
		role="application"
		aria-label="360 degree product viewer. Drag to rotate, or use the buttons below."
		style="perspective: 900px;"
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onpointercancel={onPointerUp}
	>
		{#if hasFrames}
			<img
				src="/images/{frames[frame]}-800.jpg"
				srcset="/images/{frames[frame]}-480.jpg 480w, /images/{frames[frame]}-800.jpg 800w, /images/{frames[frame]}-1200.jpg 1200w"
				sizes="(min-width: 1024px) 50vw, 100vw"
				{alt}
				width={1200}
				height={1200}
				decoding="async"
				draggable="false"
				class="aspect-square w-full object-cover"
			/>
		{:else}
			<div
				class="transition-transform duration-150 ease-out {dragging ? 'transition-none' : ''}"
				style="transform: rotateY({angle}deg) scale({1 + Math.abs(angle) / 450});"
			>
				<Picture
					{name}
					{alt}
					width={1200}
					height={1200}
					sizes="(min-width: 1024px) 50vw, 100vw"
					imgClass="aspect-square w-full object-cover"
					pictureClass="block"
				/>
			</div>
		{/if}
	</div>
	<div class="mt-3 flex items-center gap-3">
		<button
			type="button"
			onclick={() => step(-1)}
			aria-label="Rotate left"
			class="flex h-12 min-w-12 items-center justify-center rounded-full bg-white px-4 text-sm font-bold text-ink ring-1 ring-line transition-colors duration-150 hover:ring-emerald"
		>
			‹ Rotate
		</button>
		{#if hasFrames}
			<input
				type="range"
				min="0"
				max={frameCount - 1}
				step="1"
				bind:value={frame}
				aria-label="Rotation angle"
				class="min-h-12 flex-1 accent-emerald"
			/>
		{:else}
			<input
				type="range"
				min="-45"
				max="45"
				step="1"
				bind:value={angle}
				aria-label="Rotation angle"
				class="min-h-12 flex-1 accent-emerald"
			/>
		{/if}
		<button
			type="button"
			onclick={() => step(1)}
			aria-label="Rotate right"
			class="flex h-12 min-w-12 items-center justify-center rounded-full bg-white px-4 text-sm font-bold text-ink ring-1 ring-line transition-colors duration-150 hover:ring-emerald"
		>
			Rotate ›
		</button>
	</div>
	<p class="mt-2 text-xs leading-relaxed text-muted">
		{#if hasFrames}
			Drag the photo, use the slider, or tap the buttons — all three turn the piece through
			{frameCount} studio angles. The zoom view is unchanged.
		{:else}
			Drag the photo, use the slider, or tap the buttons — all three rotate the piece.
			Multi-angle studio stills are coming for this piece; the zoom view is unchanged.
		{/if}
	</p>
</div>
