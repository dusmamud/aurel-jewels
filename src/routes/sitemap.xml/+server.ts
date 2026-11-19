import { blogPosts, collections, products, site } from '#lib/data/site.ts';

export const prerender = true;

const staticPages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/shop', priority: '0.9', changefreq: 'weekly' },
	{ path: '/collections', priority: '0.9', changefreq: 'weekly' },
	{ path: '/about', priority: '0.8', changefreq: 'monthly' },
	{ path: '/blog', priority: '0.8', changefreq: 'weekly' },
	{ path: '/contact', priority: '0.8', changefreq: 'monthly' },
	{ path: '/cart', priority: '0.5', changefreq: 'monthly' },
	{ path: '/checkout', priority: '0.5', changefreq: 'monthly' },
	{ path: '/gift-cards', priority: '0.7', changefreq: 'monthly' },
	{ path: '/faq', priority: '0.7', changefreq: 'monthly' },
	{ path: '/shipping', priority: '0.5', changefreq: 'monthly' },
	{ path: '/returns', priority: '0.5', changefreq: 'monthly' },
	{ path: '/size-guide', priority: '0.5', changefreq: 'monthly' },
	{ path: '/care', priority: '0.5', changefreq: 'monthly' },
	{ path: '/track-order', priority: '0.5', changefreq: 'monthly' },
	{ path: '/wishlist', priority: '0.5', changefreq: 'monthly' },
	{ path: '/guides', priority: '0.7', changefreq: 'monthly' },
	{ path: '/guides/engagement-ring-guide', priority: '0.7', changefreq: 'monthly' },
	{ path: '/guides/metals-gemstones', priority: '0.7', changefreq: 'monthly' },
	{ path: '/guides/ring-size-finder', priority: '0.7', changefreq: 'monthly' },
	{ path: '/warranty', priority: '0.5', changefreq: 'monthly' },
	{ path: '/sustainability', priority: '0.6', changefreq: 'monthly' },
	{ path: '/bespoke', priority: '0.8', changefreq: 'monthly' },
	{ path: '/appointments', priority: '0.7', changefreq: 'monthly' },
	{ path: '/gift-finder', priority: '0.7', changefreq: 'monthly' },
	{ path: '/lookbook', priority: '0.7', changefreq: 'monthly' },
	{ path: '/rewards', priority: '0.6', changefreq: 'monthly' },
	{ path: '/financing', priority: '0.5', changefreq: 'monthly' },
	{ path: '/privacy', priority: '0.3', changefreq: 'yearly' },
	{ path: '/terms', priority: '0.3', changefreq: 'yearly' }
];

export function GET() {
	const urls = [
		...staticPages.map(
			(p) =>
				`  <url><loc>${site.url}${p.path}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`
		),
		...products.map(
			(p) => `  <url><loc>${site.url}/shop/${p.slug}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`
		),
		...collections.map(
			(c) => `  <url><loc>${site.url}/collections/${c.slug}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`
		),
		...blogPosts.map(
			(b) => `  <url><loc>${site.url}/blog/${b.slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`
		)
	];
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
