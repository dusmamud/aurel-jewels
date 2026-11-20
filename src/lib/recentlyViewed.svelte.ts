// Recently-viewed products (frontend only, mock). The shopper's own history,
// no account needed. Persisted to localStorage (browser only, guarded for
// SSR/prerender) so a refresh keeps the rail.
import { products } from '#lib/data/site.ts';

const STORAGE_KEY = 'aurel-recently-viewed-v1';
const MAX = 8;

const slugs = $state<string[]>([]);

export const recentlyViewed = {
	get slugs() {
		return slugs;
	},
	get items() {
		return slugs
			.map((s) => products.find((p) => p.slug === s))
			.filter((p): p is (typeof products)[number] => Boolean(p));
	}
};

export function loadRecentlyViewed() {
	if (typeof window === 'undefined') return;
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return;
		const parsed: unknown = JSON.parse(raw);
		if (!Array.isArray(parsed)) return;
		const valid = parsed.filter((s): s is string => typeof s === 'string');
		slugs.splice(0, slugs.length, ...valid.slice(0, MAX));
	} catch {
		// Corrupt saved list: start empty rather than breaking the page.
	}
}

function save() {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify($state.snapshot(slugs)));
	} catch {
		// Storage unavailable: history still works in memory.
	}
}

export function recordView(slug: string) {
	// Already the most recent view: don't mutate, so effects that call this
	// never re-trigger themselves on the same slug.
	if (slugs[0] === slug) return;
	const i = slugs.indexOf(slug);
	if (i >= 0) slugs.splice(i, 1);
	slugs.unshift(slug);
	if (slugs.length > MAX) slugs.length = MAX;
	save();
}
