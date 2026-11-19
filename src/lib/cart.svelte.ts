// Real mock order state (frontend only — no checkout, no payment).
// Kept in a .svelte.ts module so Header, product cards and /cart share one
// live cart. Prices in USD; free shipping over $50, flat $6.95 below.
// Persisted to localStorage (browser only, guarded for SSR/prerender)
// so a refresh keeps the cart.
import { products } from '#lib/data/site.ts';

export type CartLine = { slug: string; name: string; price: number; image: string; option: string; qty: number };

const STORAGE_KEY = 'aurel-cart-v1';

const lines = $state<CartLine[]>([]);

export const cart = {
	get lines() {
		return lines;
	},
	get count() {
		return lines.reduce((a, l) => a + l.qty, 0);
	},
	get subtotal() {
		return lines.reduce((a, l) => a + l.qty * l.price, 0);
	},
	get shipping() {
		if (this.subtotal === 0) return 0;
		return this.subtotal >= 50 ? 0 : 6.95;
	},
	get total() {
		return this.subtotal + this.shipping;
	}
};

function isValidLine(value: unknown): value is CartLine {
	if (typeof value !== 'object' || value === null) return false;
	const line = value as Record<string, unknown>;
	return (
		typeof line.slug === 'string' &&
		typeof line.name === 'string' &&
		typeof line.price === 'number' &&
		Number.isFinite(line.price) &&
		typeof line.image === 'string' &&
		typeof line.option === 'string' &&
		typeof line.qty === 'number' &&
		Number.isInteger(line.qty) &&
		line.qty > 0
	);
}

/** Load the saved cart. Browser-only — call from a client $effect (see +layout). */
export function loadCart() {
	if (typeof window === 'undefined') return;
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return;
		const parsed: unknown = JSON.parse(raw);
		if (!Array.isArray(parsed)) return;
		const valid = parsed.filter(isValidLine);
		lines.splice(0, lines.length, ...valid);
	} catch {
		// Corrupt saved cart: start empty rather than breaking the page.
	}
}

function saveCart() {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify($state.snapshot(lines)));
	} catch {
		// Storage full or unavailable (private mode): cart still works in memory.
	}
}

export function addToCart(slug: string, option = '', qty = 1, unitPrice?: number) {
	const product = products.find((p) => p.slug === slug);
	if (!product) return;
	const price = unitPrice ?? product.price;
	const key = `${slug}::${option}`;
	const line = lines.find((l) => `${l.slug}::${l.option}` === key);
	if (line) line.qty += qty;
	else lines.push({ slug, name: product.name, price, image: product.image, option, qty });
	saveCart();
}

export function setQty(slug: string, option: string, qty: number) {
	const line = lines.find((l) => l.slug === slug && l.option === option);
	if (!line) return;
	if (qty <= 0) lines.splice(lines.indexOf(line), 1);
	else line.qty = qty;
	saveCart();
}

export function removeLine(slug: string, option: string) {
	const i = lines.findIndex((l) => l.slug === slug && l.option === option);
	if (i >= 0) lines.splice(i, 1);
	saveCart();
}

export function clearCart() {
	lines.splice(0, lines.length);
	saveCart();
}
