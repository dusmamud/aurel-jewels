import type { PageServerLoad } from './$types';
import { site } from '#lib/data/site.ts';

// Thin load function: mock data lives in one file (#lib/data/site.ts)
// so real data can replace it later without touching components.
export const load: PageServerLoad = () => {
	return { site };
};
