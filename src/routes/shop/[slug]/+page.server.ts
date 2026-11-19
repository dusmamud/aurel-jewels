import { error } from '@sveltejs/kit';
import { products } from '#lib/data/site.ts';
import type { PageServerLoad } from './$types';

export const prerender = true;

export function entries() {
	return products.map((p) => ({ slug: p.slug }));
}

export const load: PageServerLoad = ({ params }) => {
	const product = products.find((p) => p.slug === params.slug);
	if (!product) error(404, 'Product not found');
	return { product };
};
