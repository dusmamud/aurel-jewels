// Mock order history (frontend only). Checkout saves a snapshot of each
// mock order here so /account can show order history. Nothing is sent
// anywhere; it lives in localStorage (browser only, guarded for SSR).
export type MockOrder = {
	ref: string;
	date: string;
	total: number;
	count: number;
	items: string;
	giftWrap: boolean;
	giftMessage: string;
	eta: string;
	fulfilment: 'shipping' | 'pickup';
	status: string;
};

const STORAGE_KEY = 'aurel-orders-v1';
const MAX = 20;

const orders = $state<MockOrder[]>([]);

export const orderHistory = {
	get list() {
		return orders;
	}
};

export function loadOrders() {
	if (typeof window === 'undefined') return;
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return;
		const parsed: unknown = JSON.parse(raw);
		if (!Array.isArray(parsed)) return;
		const valid = parsed.filter(
			(o): o is MockOrder =>
				typeof o === 'object' && o !== null && typeof (o as MockOrder).ref === 'string'
		);
		orders.splice(0, orders.length, ...valid.slice(0, MAX));
	} catch {
		// Corrupt saved orders: start empty.
	}
}

export function saveOrder(order: MockOrder) {
	orders.unshift(order);
	if (orders.length > MAX) orders.length = MAX;
	if (typeof window === 'undefined') return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify($state.snapshot(orders)));
	} catch {
		// Storage unavailable: the order still shows this session.
	}
}
