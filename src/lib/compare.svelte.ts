// Product compare (frontend only, mock). Up to 3 products, persisted to
// localStorage (browser only, guarded for SSR/prerender).
const STORAGE_KEY = 'aurel-compare-v1';
const MAX = 3;

const slugs = $state<string[]>([]);

export const compareList = {
	get slugs() {
		return slugs;
	},
	get count() {
		return slugs.length;
	},
	has(slug: string) {
		return slugs.includes(slug);
	}
};

export function loadCompare() {
	if (typeof window === 'undefined') return;
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return;
		const parsed: unknown = JSON.parse(raw);
		if (!Array.isArray(parsed)) return;
		const valid = parsed.filter((s): s is string => typeof s === 'string');
		slugs.splice(0, slugs.length, ...valid.slice(0, MAX));
	} catch {
		// Corrupt saved list: start empty.
	}
}

function save() {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify($state.snapshot(slugs)));
	} catch {
		// Storage unavailable: compare still works in memory.
	}
}

/** Toggle a product in the compare list. Returns false when the list is full. */
export function toggleCompare(slug: string): boolean {
	const i = slugs.indexOf(slug);
	if (i >= 0) {
		slugs.splice(i, 1);
		save();
		return true;
	}
	if (slugs.length >= MAX) return false;
	slugs.push(slug);
	save();
	return true;
}

export function clearCompare() {
	slugs.splice(0, slugs.length);
	save();
}
