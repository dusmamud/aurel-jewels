// Wishlist state (frontend only, mock). Shared by Header and ProductCard.
// Persisted to localStorage (browser only, guarded for SSR/prerender)
// so a refresh keeps saved pieces.
const STORAGE_KEY = 'aurel-wishlist-v1';

const items = $state<string[]>([]);

export const wishlist = {
	get items() {
		return items;
	},
	get count() {
		return items.length;
	},
	has(slug: string) {
		return items.includes(slug);
	}
};

/** Load the saved wishlist. Browser-only — call from a client $effect (see +layout). */
export function loadWishlist() {
	if (typeof window === 'undefined') return;
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return;
		const parsed: unknown = JSON.parse(raw);
		if (!Array.isArray(parsed)) return;
		const valid = parsed.filter((s): s is string => typeof s === 'string');
		items.splice(0, items.length, ...valid);
	} catch {
		// Corrupt saved wishlist: start empty rather than breaking the page.
	}
}

function saveWishlist() {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify($state.snapshot(items)));
	} catch {
		// Storage full or unavailable (private mode): wishlist still works in memory.
	}
}

export function toggleWishlist(slug: string) {
	const i = items.indexOf(slug);
	if (i >= 0) items.splice(i, 1);
	else items.push(slug);
	saveWishlist();
}
