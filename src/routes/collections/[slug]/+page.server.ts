import { error } from '@sveltejs/kit';
import { collections } from '#lib/data/site.ts';
import type { PageServerLoad } from './$types';

export const prerender = true;

export function entries() {
	return collections.map((c) => ({ slug: c.slug }));
}

export const load: PageServerLoad = ({ params }) => {
	const collection = collections.find((c) => c.slug === params.slug);
	if (!collection) error(404, 'Collection not found');
	return { collection };
};
