import { existsSync } from 'node:fs';
import { join } from 'node:path';
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
	// Second gallery view only when the alternate-angle image was actually
	// generated + converted. Otherwise the gallery is a single image —
	// never the category image.
	const hasAlt = existsSync(join(process.cwd(), 'static', 'images', `${product.altImage}-800.jpg`));
	return { product, hasAlt };
};
