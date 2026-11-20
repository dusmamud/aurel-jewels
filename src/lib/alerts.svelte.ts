// Back-in-stock + price-drop alerts (frontend only, mock). The shopper opts
// in with an email; nothing is sent anywhere — the preference is stored
// locally and managed later on /account.
const STORAGE_KEY = 'aurel-alerts-v1';

type AlertState = { stock: string[]; price: string[] };

const state = $state<AlertState>({ stock: [], price: [] });

export const alerts = {
	get stock() {
		return state.stock;
	},
	get price() {
		return state.price;
	},
	wantsStock(slug: string) {
		return state.stock.includes(slug);
	},
	wantsPrice(slug: string) {
		return state.price.includes(slug);
	}
};

export function loadAlerts() {
	if (typeof window === 'undefined') return;
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return;
		const parsed: unknown = JSON.parse(raw);
		if (typeof parsed !== 'object' || parsed === null) return;
		const p = parsed as Record<string, unknown>;
		if (Array.isArray(p.stock))
			state.stock.splice(0, state.stock.length, ...p.stock.filter((s): s is string => typeof s === 'string'));
		if (Array.isArray(p.price))
			state.price.splice(0, state.price.length, ...p.price.filter((s): s is string => typeof s === 'string'));
	} catch {
		// Corrupt saved alerts: start empty.
	}
}

function save() {
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify($state.snapshot(state)));
	} catch {
		// Storage unavailable: alerts still work in memory.
	}
}

export function toggleStockAlert(slug: string) {
	const i = state.stock.indexOf(slug);
	if (i >= 0) state.stock.splice(i, 1);
	else state.stock.push(slug);
	save();
}

export function togglePriceAlert(slug: string) {
	const i = state.price.indexOf(slug);
	if (i >= 0) state.price.splice(i, 1);
	else state.price.push(slug);
	save();
}
