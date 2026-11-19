// ─── Aurel Jewels — MOCK DATA ──────────────────────────────────────────────
// Frontend-only site. All content below is mock/placeholder data so the
// client can approve the design first. Real data replaces this file later.
// Images: only the base name is stored here; Picture.svelte builds the
// AVIF → WebP → JPG → PNG fallback chain from static/images/<name>/.
// Prices in USD ($), US store. No real orders, no real payments.
// Note: no src/env.ts in this project — SvelteKit reserves that filename
// for its explicit env variables file, so the URL lives here.

export const site = {
	name: 'Aurel Jewels',
	tagline: 'Fine Jewelry for a Brighter You.',
	phoneDisplay: '+1 (212) 555-0148',
	phoneHref: 'tel:+12125550148',
	whatsappHref: 'https://wa.me/12125550148?text=Hi%20Aurel%20Jewels%2C%20I%20have%20a%20question%20about%20a%20piece',
	email: 'hello@aureljewels.com',
	address: '12 Mercer Street, SoHo, New York, NY 10013, United States',
	addressShort: 'SoHo, New York',
	hours: 'Mon – Sat: 10:00 AM – 7:00 PM ET',
	hoursShort: 'Mon – Sat: 10:00 AM – 7:00 PM',
	url: 'https://aurel-jewels.pages.dev',
	social: {
		instagram: 'https://www.instagram.com/aureljewels',
		facebook: 'https://www.facebook.com/aureljewels',
		x: 'https://x.com/aureljewels'
	},
	mapEmbed:
		'https://maps.google.com/maps?q=Mercer%20Street%2C%20SoHo%2C%20New%20York%2C%20NY%2010013&t=&z=15&ie=UTF8&iwloc=&output=embed',
	freeShippingOver: 50,
	shippingFlat: 6.95
} as const;

export const nav = [
	{ label: 'Home', href: '/' },
	{ label: 'Shop', href: '/shop' },
	{ label: 'Collections', href: '/collections' },
	{ label: 'Bespoke', href: '/bespoke' },
	{ label: 'Guides', href: '/guides' },
	{ label: 'About Us', href: '/about' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'Contact Us', href: '/contact' }
] as const;

export type Category = {
	id: string;
	name: string;
	blurb: string;
	image: string;
	imageAlt: string;
};

export const categories: Category[] = [
	{ id: 'rings', name: 'Rings', blurb: 'Solitaires, bands & statement rings', image: 'cat-rings', imageAlt: 'Gold diamond solitaire ring on a beige stone pedestal' },
	{ id: 'necklaces', name: 'Necklaces', blurb: 'Pendants, chains & tennis necklaces', image: 'cat-necklaces', imageAlt: 'Gold necklace with an emerald pendant on a beige stone' },
	{ id: 'earrings', name: 'Earrings', blurb: 'Studs, hoops & drops', image: 'cat-earrings', imageAlt: 'Pair of gold diamond hoop earrings on a beige stone pedestal' },
	{ id: 'bracelets', name: 'Bracelets', blurb: 'Tennis, charm & bangle styles', image: 'cat-bracelets', imageAlt: 'Gold diamond tennis bracelet on a beige stone' },
	{ id: 'collections', name: 'Collections', blurb: 'Curated edits for every occasion', image: 'cat-collections', imageAlt: 'Curated set of emerald necklace, gold ring and bracelet on beige stones' },
	{ id: 'gifts', name: 'Gifts', blurb: 'Ready-to-give, beautifully boxed', image: 'cat-gifts', imageAlt: 'Cream gift box with a deep green ribbon and gold jewellery beside it' }
];

export type Product = {
	slug: string;
	name: string;
	category: string;
	price: number;
	compareAt?: number;
	rating: number;
	reviews: number;
	image: string;
	imageAlt: string;
	altImage: string;
	gift: boolean;
	badge?: 'Bestseller' | 'New' | 'Limited';
	description: string;
	long: string[];
	materials: string[];
	metals: string[];
	sizes: string[];
};

export const products: Product[] = [
	{
		slug: 'eternal-spark-ring',
		name: 'Eternal Spark Ring',
		category: 'rings',
		price: 89.99,
		compareAt: 119.99,
		rating: 4.9,
		reviews: 128,
		image: 'product-eternal-spark-ring',
		imageAlt: 'Classic gold solitaire engagement ring with a large round brilliant diamond',
		altImage: 'product-eternal-spark-ring-alt',
		gift: true,
		badge: 'Bestseller',
		description: 'A timeless solitaire — one brilliant diamond, held high on a polished gold band.',
		long: [
			'The Eternal Spark Ring is the piece our customers come back for. A single round brilliant diamond sits in a classic four-prong setting, catching light from every angle — bright in daylight, warm by candlelight.',
			'The band is polished 14k gold-plated sterling silver, comfortable enough to wear every day and refined enough for the moments that matter. It arrives in our signature emerald gift box, ready to give.',
			'Wear it alone for a clean, classic look, or stack it with a slim gold band. Either way, it is the ring that starts conversations.'
		],
		materials: ['14k gold-plated sterling silver', '1.2 ct cubic zirconia centre stone', 'Hypoallergenic, nickel-free', 'Tarnish-resistant coating'],
		metals: ['Yellow Gold', 'White Gold', 'Rose Gold'],
		sizes: ['5', '6', '7', '8', '9']
	},
	{
		slug: 'emerald-grace-necklace',
		name: 'Emerald Grace Necklace',
		category: 'necklaces',
		price: 129.99,
		rating: 4.9,
		reviews: 96,
		image: 'product-emerald-grace-necklace',
		imageAlt: 'Gold necklace with a rectangular emerald pendant surrounded by small diamonds',
		altImage: 'product-emerald-grace-necklace-alt',
		gift: true,
		badge: 'Bestseller',
		description: 'A deep green emerald, framed in a halo of sparkle, on a fine gold chain.',
		long: [
			'The Emerald Grace Necklace centres on a rich rectangular emerald, ringed by a halo of small white stones that make the green look even deeper. The pendant hangs from a fine adjustable gold chain that sits exactly where you want it.',
			'Emerald is the birthstone of May and the stone of new beginnings — which is why this necklace is our most-gifted piece, from graduations to anniversaries.',
			'Pair it with the Emerald Stud Earrings for a matched set, or wear it alone as the one piece of colour in an outfit.'
		],
		materials: ['14k gold-plated sterling silver', 'Lab-created emerald pendant', 'Halo of cubic zirconia', 'Adjustable 16–18 in chain'],
		metals: ['Yellow Gold', 'White Gold'],
		sizes: ['16–18 in']
	},
	{
		slug: 'luminous-hoop-earrings',
		name: 'Luminous Hoop Earrings',
		category: 'earrings',
		price: 79.99,
		rating: 4.8,
		reviews: 74,
		image: 'product-luminous-hoop-earrings',
		imageAlt: 'Pair of gold hoop earrings encrusted with small diamonds',
		altImage: 'product-luminous-hoop-earrings-alt',
		gift: false,
		badge: 'Bestseller',
		description: 'Everyday hoops, lined inside and out with light.',
		long: [
			'The Luminous Hoop Earrings take the classic gold hoop and line it with pavé stones, so they catch light whether you see them from the front or the side.',
			'They are light enough for all-day wear — secure latch backs, no pulling, no fuss. Dress them up for an evening out or wear them with a white shirt and jeans; they work both ways.',
			'If you own one pair of statement earrings, make it this one.'
		],
		materials: ['14k gold-plated sterling silver', 'Pavé cubic zirconia', 'Secure latch backs', 'Hypoallergenic, nickel-free'],
		metals: ['Yellow Gold', 'White Gold', 'Rose Gold'],
		sizes: ['Small (25 mm)', 'Medium (35 mm)']
	},
	{
		slug: 'radiant-tennis-bracelet',
		name: 'Radiant Tennis Bracelet',
		category: 'bracelets',
		price: 149.99,
		compareAt: 189.99,
		rating: 4.9,
		reviews: 112,
		image: 'product-radiant-tennis-bracelet',
		imageAlt: 'Gold tennis bracelet with a row of round diamonds',
		altImage: 'product-radiant-tennis-bracelet-alt',
		gift: true,
		badge: 'Bestseller',
		description: 'A continuous line of light — the classic tennis bracelet, perfected.',
		long: [
			'The Radiant Tennis Bracelet is a single unbroken line of round brilliant stones, set in polished gold. It moves with your wrist and catches light with every gesture.',
			'A secure box clasp with a safety chain keeps it exactly where it belongs, and the flexible links sit flat and comfortable all day.',
			'It is the bracelet our customers buy for themselves after a promotion, a graduation, or simply because they earned it.'
		],
		materials: ['14k gold-plated sterling silver', 'Round cubic zirconia, 3.5 ct total', 'Box clasp with safety chain', '7 in, fits most wrists'],
		metals: ['Yellow Gold', 'White Gold'],
		sizes: ['6.5 in', '7 in', '7.5 in']
	},
	{
		slug: 'aurora-solitaire-ring',
		name: 'Aurora Solitaire Ring',
		category: 'rings',
		price: 119.99,
		rating: 4.8,
		reviews: 57,
		image: 'product-aurora-solitaire-ring',
		imageAlt: 'Gold ring with an oval diamond solitaire and pavé band',
		altImage: 'product-aurora-solitaire-ring-alt',
		gift: false,
		badge: 'New',
		description: 'An oval solitaire on a pavé band — modern, elongated, quietly dramatic.',
		long: [
			'The Aurora Solitaire pairs an elongated oval centre stone with a pavé band, so the sparkle runs the whole way around the finger.',
			'The oval shape flatters longer fingers and makes the stone look larger than its carat weight — a quiet trick of proportion that jewellers have used for decades.'
		],
		materials: ['14k gold-plated sterling silver', 'Oval cubic zirconia centre stone', 'Pavé band', 'Hypoallergenic, nickel-free'],
		metals: ['Yellow Gold', 'White Gold', 'Rose Gold'],
		sizes: ['5', '6', '7', '8', '9']
	},
	{
		slug: 'golden-clover-pendant',
		name: 'Golden Clover Pendant',
		category: 'necklaces',
		price: 99.99,
		rating: 4.9,
		reviews: 83,
		image: 'product-golden-clover-pendant',
		imageAlt: 'Gold necklace with a four-leaf clover pendant in green malachite',
		altImage: 'product-golden-clover-pendant-alt',
		gift: true,
		description: 'A four-leaf clover in green stone and gold — a little luck, worn close.',
		long: [
			'The Golden Clover Pendant is our good-luck piece: a four-leaf clover in deep green stone, edged in polished gold, on a fine chain.',
			'It layers beautifully with a longer chain or stands alone as a small, bright note of colour. Customers buy it for new jobs, new homes, and new chapters.'
		],
		materials: ['14k gold-plated sterling silver', 'Green malachite-style stone', 'Adjustable 16–18 in chain', 'Tarnish-resistant coating'],
		metals: ['Yellow Gold'],
		sizes: ['16–18 in']
	},
	{
		slug: 'pearl-drop-earrings',
		name: 'Pearl Drop Earrings',
		category: 'earrings',
		price: 69.99,
		rating: 4.8,
		reviews: 61,
		image: 'product-pearl-drop-earrings',
		imageAlt: 'Pair of gold drop earrings with lustrous white pearls',
		altImage: 'product-pearl-drop-earrings-alt',
		gift: true,
		description: 'Lustrous freshwater pearls, dropped from a small gold stud.',
		long: [
			'The Pearl Drop Earrings are the quiet classic: a lustrous white pearl suspended from a small gold stud, moving gently as you move.',
			'Pearls go with everything — a wedding, a workday, a dinner out. These are light, secure, and made to be reached for often.'
		],
		materials: ['14k gold-plated sterling silver', 'Freshwater pearls, 8 mm', 'Post backs', 'Hypoallergenic, nickel-free'],
		metals: ['Yellow Gold', 'White Gold'],
		sizes: ['One size']
	},
	{
		slug: 'emerald-stud-earrings',
		name: 'Emerald Stud Earrings',
		category: 'earrings',
		price: 89.99,
		rating: 4.9,
		reviews: 45,
		image: 'product-emerald-stud-earrings',
		imageAlt: 'Pair of gold stud earrings with round emeralds surrounded by tiny diamonds',
		altImage: 'product-emerald-stud-earrings-alt',
		gift: false,
		badge: 'New',
		description: 'Round emeralds with a diamond halo — small, bright, unmistakably green.',
		long: [
			'The Emerald Stud Earrings are the everyday way to wear emerald: a round green stone in a halo of tiny white stones, set in polished gold.',
			'They are the natural match for the Emerald Grace Necklace, and the pair customers buy when they want one set that does everything.'
		],
		materials: ['14k gold-plated sterling silver', 'Lab-created emerald studs', 'Halo of cubic zirconia', 'Post backs'],
		metals: ['Yellow Gold', 'White Gold'],
		sizes: ['One size']
	},
	{
		slug: 'celestial-tennis-necklace',
		name: 'Celestial Tennis Necklace',
		category: 'necklaces',
		price: 179.99,
		compareAt: 229.99,
		rating: 5.0,
		reviews: 39,
		image: 'product-celestial-tennis-necklace',
		imageAlt: 'Gold tennis necklace with a row of sparkling diamonds',
		altImage: 'product-celestial-tennis-necklace-alt',
		gift: false,
		description: 'A river of light for the neckline — our most dramatic necklace.',
		long: [
			'The Celestial Tennis Necklace is a continuous line of brilliant stones that sits along the collarbone and catches light with every turn of the head.',
			'It is the piece for weddings, galas, and the evenings you dress up for — and the one that gets asked about most.'
		],
		materials: ['14k gold-plated sterling silver', 'Round cubic zirconia, 6 ct total', 'Box clasp with safety chain', 'Adjustable 16–18 in'],
		metals: ['Yellow Gold', 'White Gold'],
		sizes: ['16–18 in']
	},
	{
		slug: 'vintage-gold-band',
		name: 'Vintage Gold Band',
		category: 'rings',
		price: 59.99,
		rating: 4.7,
		reviews: 52,
		image: 'product-vintage-gold-band',
		imageAlt: 'Vintage-inspired gold band ring with intricate milgrain engraving and small diamonds',
		altImage: 'product-vintage-gold-band-alt',
		gift: false,
		description: 'Milgrain edges and a hand-engraved feel — old soul, new ring.',
		long: [
			'The Vintage Gold Band takes its cues from rings made a century ago: milgrain edges, fine engraving, and a row of small stones set low into the band.',
			'It is a favourite wedding band and a favourite stacking ring — slim, comfortable, and full of character.'
		],
		materials: ['14k gold-plated sterling silver', 'Milgrain edge detail', 'Small cubic zirconia accents', 'Comfort-fit band'],
		metals: ['Yellow Gold', 'White Gold', 'Rose Gold'],
		sizes: ['5', '6', '7', '8', '9']
	},
	{
		slug: 'infinity-charm-bracelet',
		name: 'Infinity Charm Bracelet',
		category: 'bracelets',
		price: 109.99,
		rating: 4.8,
		reviews: 48,
		image: 'product-infinity-charm-bracelet',
		imageAlt: 'Delicate gold charm bracelet with a small infinity charm and tiny diamonds',
		altImage: 'product-infinity-charm-bracelet-alt',
		gift: true,
		description: 'A delicate chain, an infinity charm, and room for the charms that follow.',
		long: [
			'The Infinity Charm Bracelet starts with a fine gold chain and a small pavé infinity charm — and leaves room for the charms you add over the years.',
			'It is our most-gifted bracelet for birthdays and graduations: a piece that grows with the person wearing it.'
		],
		materials: ['14k gold-plated sterling silver', 'Infinity charm with cubic zirconia', 'Adjustable 6.5–7.5 in', 'Lobster clasp'],
		metals: ['Yellow Gold', 'Rose Gold'],
		sizes: ['6.5–7.5 in']
	},
	{
		slug: 'emerald-halo-ring',
		name: 'Emerald Halo Ring',
		category: 'rings',
		price: 159.99,
		rating: 4.9,
		reviews: 66,
		image: 'product-emerald-halo-ring',
		imageAlt: 'Gold ring with an oval emerald centre stone surrounded by a halo of small diamonds',
		altImage: 'product-emerald-halo-ring-alt',
		gift: false,
		description: 'An oval emerald in a halo of diamonds — green, gold, and unmistakable.',
		long: [
			'The Emerald Halo Ring centres an oval emerald in a halo of small white stones, on a polished gold band. The halo makes the emerald look larger and brighter — green framed in light.',
			'It is the ring for May birthdays, emerald anniversaries, and anyone who has ever loved green.'
		],
		materials: ['14k gold-plated sterling silver', 'Oval lab-created emerald', 'Halo of cubic zirconia', 'Hypoallergenic, nickel-free'],
		metals: ['Yellow Gold', 'White Gold'],
		sizes: ['5', '6', '7', '8', '9']
	}
];

export const bestsellers = products.filter((p) => p.badge === 'Bestseller');

export type Collection = {
	slug: string;
	name: string;
	tagline: string;
	description: string;
	image: string;
	imageAlt: string;
	productSlugs: string[];
};

export const collections: Collection[] = [
	{
		slug: 'bridal',
		name: 'The Bridal Collection',
		tagline: 'For the day you will remember forever',
		description:
			'Solitaires, tennis necklaces and halo rings chosen for weddings — pieces that photograph beautifully and are comfortable from the first look to the last dance.',
		image: 'product-aurora-solitaire-ring',
		imageAlt: 'Gold ring with an oval diamond solitaire and pavé band',
		productSlugs: ['eternal-spark-ring', 'aurora-solitaire-ring', 'celestial-tennis-necklace', 'radiant-tennis-bracelet']
	},
	{
		slug: 'emerald',
		name: 'The Emerald Collection',
		tagline: 'Deep green, framed in gold',
		description:
			'Our signature stone. Lab-created emeralds in necklaces, rings and earrings — the green that made Aurel famous, in pieces made to be worn every day.',
		image: 'product-emerald-grace-necklace',
		imageAlt: 'Gold necklace with a rectangular emerald pendant surrounded by small diamonds',
		productSlugs: ['emerald-grace-necklace', 'emerald-halo-ring', 'emerald-stud-earrings', 'golden-clover-pendant']
	},
	{
		slug: 'everyday-elegance',
		name: 'Everyday Elegance',
		tagline: 'Quiet pieces for every day',
		description:
			'Hoops, studs, slim bands and delicate chains — the pieces you reach for in the morning and forget you are wearing by noon.',
		image: 'product-luminous-hoop-earrings',
		imageAlt: 'Pair of gold hoop earrings encrusted with small diamonds',
		productSlugs: ['luminous-hoop-earrings', 'pearl-drop-earrings', 'vintage-gold-band', 'infinity-charm-bracelet']
	},
	{
		slug: 'gifts',
		name: 'The Gift Collection',
		tagline: 'Ready to give, beautifully boxed',
		description:
			'Every piece in this collection arrives in our signature emerald gift box with a hand-written card option — so the gift is ready the moment it arrives.',
		image: 'gift-box',
		imageAlt: 'Cream gift box with a deep emerald green satin ribbon on dark green silk',
		productSlugs: ['emerald-grace-necklace', 'pearl-drop-earrings', 'infinity-charm-bracelet', 'golden-clover-pendant']
	}
];

export type Review = { name: string; rating: number; date: string; title: string; body: string };

export const productReviews: Record<string, Review[]> = {
	'eternal-spark-ring': [
		{ name: 'Sophia M.', rating: 5, date: 'Nov 2026', title: 'More beautiful in person', body: 'I was nervous buying a ring online, but it is even prettier in person. The stone catches light all day and the band is so comfortable I forget I am wearing it.' },
		{ name: 'Daniel R.', rating: 5, date: 'Oct 2026', title: 'She said yes', body: 'Bought this for the proposal and she has not taken it off since. The box it came in made the moment feel even more special.' },
		{ name: 'Grace L.', rating: 4, date: 'Sep 2026', title: 'Lovely, runs slightly small', body: 'Beautiful ring and great sparkle. I would suggest sizing up half a size — mine fits snug.' }
	],
	'emerald-grace-necklace': [
		{ name: 'Amelia K.', rating: 5, date: 'Nov 2026', title: 'My most complimented piece', body: 'The green is so rich and the chain sits perfectly. I get asked about it every time I wear it out.' },
		{ name: 'Priya S.', rating: 5, date: 'Oct 2026', title: 'Perfect anniversary gift', body: 'My husband bought this for our anniversary. The packaging alone felt luxurious, and the necklace is stunning.' }
	],
	'luminous-hoop-earrings': [
		{ name: 'Chloe T.', rating: 5, date: 'Nov 2026', title: 'Everyday favourites', body: 'Light, sparkly, and they stay put all day. I wear them to work and out — they go with everything.' },
		{ name: 'Maya D.', rating: 4, date: 'Sep 2026', title: 'Beautiful, slightly larger than expected', body: 'Gorgeous earrings. The medium size is a real statement — I reach for the small pair most days.' }
	],
	'radiant-tennis-bracelet': [
		{ name: 'Elena V.', rating: 5, date: 'Nov 2026', title: 'Worth every penny', body: 'I bought this for myself after a promotion. The clasp feels secure, the stones are bright, and it looks far more expensive than it was.' },
		{ name: 'Hannah W.', rating: 5, date: 'Oct 2026', title: 'Stunning', body: 'Bought as a gift for my mother. She cried when she opened it. Enough said.' }
	]
};

export const defaultReviews: Review[] = [
	{ name: 'Verified buyer', rating: 5, date: 'Nov 2026', title: 'Beautiful quality', body: 'Lovely piece, beautifully boxed, and it arrived faster than expected. Would buy from Aurel again.' },
	{ name: 'Verified buyer', rating: 5, date: 'Oct 2026', title: 'Exactly as pictured', body: 'The photos do not do it justice — it is even prettier in person and very comfortable to wear.' }
];

export function reviewsFor(slug: string): Review[] {
	return productReviews[slug] ?? defaultReviews;
}

export type Testimonial = { name: string; role: string; quote: string; rating: number };

export const testimonials: Testimonial[] = [
	{
		name: 'Sophia Martinez',
		role: 'Bride, New York',
		quote:
			'My engagement ring came from Aurel and I have never taken it off. It still looks brand new a year later, and every time the light hits it, someone asks where it is from.',
		rating: 5
	},
	{
		name: 'Amelia Chen',
		role: 'Anniversary gift, Boston',
		quote:
			'My husband surprised me with the Emerald Grace Necklace for our tenth anniversary. The box, the note, the necklace — the whole thing felt like a luxury boutique experience.',
		rating: 5
	},
	{
		name: 'Grace Thompson',
		role: 'Regular customer, Chicago',
		quote:
			'I have bought four pieces now and the quality is consistently excellent. Shipping is fast, returns are painless, and the pieces look far more expensive than they are.',
		rating: 5
	},
	{
		name: 'Elena Vasquez',
		role: 'Self-gift, Austin',
		quote:
			'The tennis bracelet was my treat to myself after a big promotion. It is the first thing I put on every morning and the last thing I take off at night.',
		rating: 5
	},
	{
		name: 'Hannah Wright',
		role: 'Gift buyer, Seattle',
		quote:
			'I have gifted Aurel pieces three times now. Every recipient has loved them, and the gift box means I never have to wrap anything myself.',
		rating: 5
	},
	{
		name: 'Maya Patel',
		role: 'Bridesmaid, San Francisco',
		quote:
			'Our whole bridal party wore the pearl drop earrings. They photographed beautifully and were comfortable through a very long wedding day.',
		rating: 5
	}
];

export type BlogPost = {
	slug: string;
	title: string;
	category: string;
	date: string;
	excerpt: string;
	image: string;
	alt: string;
	body: string[];
};

export const blogPosts: BlogPost[] = [
	{
		slug: 'how-to-choose-engagement-ring',
		title: 'How to Choose an Engagement Ring She Will Love',
		category: 'Guides',
		date: '12 Nov 2026',
		excerpt: 'Stone shape, metal, setting and size — the five decisions that matter, and how to make each one without stress.',
		image: 'blog-3',
		alt: 'A bride’s hand wearing a gold diamond ring, holding a small white bouquet',
		body: [
			'Choosing an engagement ring is one of the few purchases that is really a question. It deserves a little thought — but not stress. Start with her style, not the catalogue.',
			'First, look at the jewellery she already wears. Yellow gold or white? Bold or delicate? A ring she wears every day tells you more than any quiz.',
			'Second, pick the stone shape. Round is the classic and the brightest; oval looks larger and flatters longer fingers; emerald cuts are quiet and architectural. There is no wrong answer — only her answer.',
			'Third, think about the setting. A solitaire shows off one stone; a halo makes it look bigger; a pavé band adds sparkle all the way around.',
			'Fourth, get the size right. Borrow a ring she wears on the same finger, or ask a friend. A good jeweller resizes for free — Aurel does, within 30 days.',
			'Finally, remember that the ring is the start of the story, not the whole of it. The proposal, the moment, the life after — that is what she will remember. The ring just has to be there, shining, when it happens.'
		]
	},
	{
		slug: 'emerald-care-guide',
		title: 'Emerald Care: How to Keep Your Green Brilliant',
		category: 'Care',
		date: '28 Oct 2026',
		excerpt: 'Emeralds are softer than diamonds and need a gentler routine. Here is the simple version that keeps them bright for decades.',
		image: 'blog-2',
		alt: 'Close-up of an emerald gemstone held in tweezers over a gold setting',
		body: [
			'Emerald is a softer stone than diamond, and it rewards gentle care. The good news: the routine is simple, and it takes about two minutes.',
			'Clean your emerald jewellery with lukewarm water, a drop of mild soap, and a soft brush. Never use ultrasonic cleaners or steam — emeralds are traditionally oiled, and harsh cleaning strips that finish.',
			'Store emerald pieces separately, in a soft pouch or a lined box, so harder stones cannot scratch them. Keep them away from perfumes and hairspray — put your jewellery on last, after everything else.',
			'Take emerald rings off for the gym, gardening and housework. A knock on a hard surface can chip a stone that would otherwise last a lifetime.',
			'Once a year, bring your piece in for a professional check — prongs loosen slowly, and catching it early is a five-minute fix. Treated well, an emerald only gets more beautiful with time.'
		]
	},
	{
		slug: 'jewellery-gift-guide',
		title: 'The Jewellery Gift Guide: A Piece for Every Person',
		category: 'Gifting',
		date: '10 Oct 2026',
		excerpt: 'Birthdays, anniversaries, graduations — which piece suits which person, and how to pick without knowing their size.',
		image: 'blog-1',
		alt: 'Flat lay of gold and emerald jewellery pieces arranged on cream linen with eucalyptus sprigs',
		body: [
			'Jewellery is the gift that outlasts the occasion. The trick is matching the piece to the person — and when in doubt, choosing the piece that needs no sizing.',
			'For a partner, an emerald pendant or a tennis bracelet says this mattered. For a friend, pearl drop earrings or a charm bracelet say I know you. For a graduate, a clover pendant says good luck — and means it.',
			'If you do not know their ring size, skip rings entirely. Necklaces, earrings and bracelets fit almost everyone, and every Aurel piece can be exchanged within 30 days.',
			'Add the gift message. A short, honest note in the box turns a beautiful object into a memory — and it costs nothing.',
			'And remember: the box matters. Every Aurel piece arrives in our signature emerald gift box, so the gift is ready the moment it arrives.'
		]
	}
];

export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
	{
		q: 'How long does shipping take?',
		a: 'Orders ship within 1–2 business days from New York. Standard shipping (free over $50) takes 3–5 business days; express shipping takes 1–2 business days at checkout.'
	},
	{
		q: 'What is your return policy?',
		a: 'You have 30 days to return any unworn piece in its original packaging for a full refund. Return shipping is free — print the label from your order confirmation email.'
	},
	{
		q: 'Are your pieces hypoallergenic?',
		a: 'Yes. All Aurel pieces are nickel-free and hypoallergenic, made from 14k gold-plated sterling silver with lab-created stones.'
	},
	{
		q: 'Do you offer ring resizing?',
		a: 'Yes — the first resize within 30 days of purchase is free. Contact us with your order number and we will send a prepaid label.'
	},
	{
		q: 'What payment methods do you accept?',
		a: 'Visa, Mastercard, American Express, Discover, PayPal, Apple Pay and Google Pay. All payments are processed over an encrypted, PCI-compliant checkout.'
	},
	{
		q: 'Can I track my order?',
		a: 'Yes. Every order gets a tracking number by email as soon as it ships. You can also check the status any time on our Track Your Order page with your order number.'
	},
	{
		q: 'Do you offer gift wrapping?',
		a: 'Every order arrives in our signature emerald gift box at no extra cost, and you can add a hand-written gift message at checkout.'
	},
	{
		q: 'Are your materials ethically sourced?',
		a: 'Yes. Our gold is recycled where possible, our stones are lab-created, and every workshop partner is audited for fair labour practices.'
	},
	{
		q: 'How do I care for my jewellery?',
		a: 'Store pieces separately in a soft pouch, keep them away from perfume and water, and clean gently with a soft cloth. Full care instructions are on our Jewellery Care page.'
	},
	{
		q: 'Do you have a physical store?',
		a: 'Yes — our SoHo boutique at 12 Mercer Street, New York, is open Monday to Saturday, 10:00 AM – 7:00 PM ET. You can also pick up online orders in store.'
	}
];

export type GiftCard = { amount: number; label: string; note: string };

export const giftCards: GiftCard[] = [
	{ amount: 50, label: 'A little sparkle', note: 'Covers a pair of studs, or part of any piece.' },
	{ amount: 100, label: 'The classic gift', note: 'A pendant, a pair of hoops, or a pearl drop.' },
	{ amount: 150, label: 'The showstopper', note: 'A tennis bracelet or an emerald necklace.' },
	{ amount: 250, label: 'The grand gesture', note: 'Any piece in the store — their pick, entirely.' }
];

export const giftCardHowItWorks = [
	{ title: 'Pick an amount', detail: '$50, $100, $150 or $250 — or any amount in between.' },
	{ title: 'Add a message', detail: 'Write a gift message and choose email delivery or a printed card.' },
	{ title: 'We send it', detail: 'Digital cards arrive by email the same day; printed cards ship free.' },
	{ title: 'They choose', detail: 'The recipient shops any piece and applies the card at checkout.' }
];

export const giftCardValidity =
	'Valid for 12 months from purchase, on any piece, for anyone. The card is transferable once, and any unused balance stays on the card for the next order.';

export const offers = [
	{ title: 'Free shipping over $50', detail: 'Every order over $50 ships free, anywhere in the US.', tag: 'Shipping' },
	{ title: '30-day returns', detail: 'Changed your mind? Return any unworn piece within 30 days, free.', tag: 'Returns' },
	{ title: 'First order 10% off', detail: 'Join the newsletter and get 10% off your first order.', tag: 'New customers' }
];

export function usd(amount: number): string {
	return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

// Products featured in at least one curated collection (see `collections`).
const collectionProductSlugs = new Set(collections.flatMap((c) => c.productSlugs));

export function inAnyCollection(slug: string): boolean {
	return collectionProductSlugs.has(slug);
}

// Sensible default variant for quick-add: first metal + default size,
// formatted the same way the product page shows it (e.g. "Size 7").
export function defaultOption(product: Product): string {
	const metal = product.metals[0] ?? 'Yellow Gold';
	const size = product.sizes[0] ?? 'One size';
	const sizeLabel = /^\d+$/.test(size) ? `Size ${size}` : size;
	return `${metal} · ${sizeLabel}`;
}

// 4 interest-free instalments (Klarna-style BNPL line, mock — no real credit).
export function instalment(amount: number): string {
	return usd(amount / 4);
}

// ─── Workstream B — new pages data (appended; existing data untouched) ───

// Gift wrap at checkout: flat mock fee, added to the order total there.
export const giftWrapFee = 5;

// One reusable sourcing line, shown on every product page and the
// sustainability page — the same words everywhere, so claims stay consistent.
export const sourcingLine =
	'Crafted with 100% recycled gold and a lab-created stone — conflict-free by design.';

// ─── Guides ────────────────────────────────────────────────────────────────
export type Guide = {
	slug: string;
	title: string;
	blurb: string;
	image: string;
	imageAlt: string;
	href: string;
	readTime: string;
};

export const guides: Guide[] = [
	{
		slug: 'engagement-ring-guide',
		title: 'The Engagement Ring Guide',
		blurb: 'The 4Cs, shapes, settings and a realistic budget — everything you need before you ask the question.',
		image: 'guide-engagement',
		imageAlt: 'Gold solitaire engagement ring in its open emerald gift box on a cream background',
		href: '/guides/engagement-ring-guide',
		readTime: '8 min read'
	},
	{
		slug: 'metals-gemstones',
		title: 'Metals & Gemstones',
		blurb: '14k and 18k gold, vermeil vs solid vs gold-fill, platinum — and lab vs natural stones, explained plainly.',
		image: 'guide-metals',
		imageAlt: 'A row of gold, white gold and rose gold bands beside loose green and white gemstones',
		href: '/guides/metals-gemstones',
		readTime: '7 min read'
	},
	{
		slug: 'ring-size-finder',
		title: 'Ring Size Finder',
		blurb: 'A printable ring sizer, measuring tips and what to do when you fall between two sizes.',
		image: 'guide-engagement',
		imageAlt: 'Gold solitaire engagement ring in its open emerald gift box on a cream background',
		href: '/guides/ring-size-finder',
		readTime: '4 min read'
	},
	{
		slug: 'layering',
		title: 'The Layering Guide',
		blurb: 'How to stack necklaces, mix metals and layer chains without tangling — shoppable, straight from the shop.',
		image: 'guide-metals',
		imageAlt: 'A row of gold, white gold and rose gold bands beside loose green and white gemstones',
		href: '/shop?category=necklaces',
		readTime: 'Shop the look'
	}
];

// Printable ring sizer: inside diameter (mm) of each US size, matching the
// size-guide chart — the finder draws these circles at true size.
export const ringSizerSizes = [
	{ us: '5', diameter: 15.7 },
	{ us: '5½', diameter: 16.1 },
	{ us: '6', diameter: 16.5 },
	{ us: '6½', diameter: 16.9 },
	{ us: '7', diameter: 17.3 },
	{ us: '7½', diameter: 17.7 },
	{ us: '8', diameter: 18.2 },
	{ us: '8½', diameter: 18.6 },
	{ us: '9', diameter: 18.9 }
];

// ─── Warranty & Authenticity ───────────────────────────────────────────────
// The promise, word for word as it appears on every product page:
// "Lifetime warranty — Craftsmanship, covered for life".
export const warrantyPromise = 'Lifetime warranty — craftsmanship, covered for life.';

export const warrantyCovers = [
	'Manufacturing defects in craftsmanship — a loose prong, a faulty clasp, a weak link — repaired or replaced free, for life.',
	'Stone security: if a stone loosens under normal wear, we re-seat it free.',
	'Complimentary cleaning and inspection once a year, in store or by mail.',
	'Free first resize within 30 days of purchase (then $15 plus shipping).'
];

export const warrantyExcludes = [
	'Normal wear: scratches, tarnish and the softening of a finish over time.',
	'Damage from accidents, misuse or harsh chemicals (including ultrasonic cleaners on emerald).',
	'Loss or theft — keep your order number and consider personal jewellery insurance.',
	'Engraved or personalised pieces are final sale and cannot be returned — but the lifetime craftsmanship warranty still covers their making.'
];

export const warrantyClaimSteps = [
	{ title: 'Email us', detail: 'Send your order number and a photo of the issue to hello@aureljewels.com.' },
	{ title: 'We assess it', detail: 'Our atelier replies within 2 business days with a prepaid label if we need the piece back.' },
	{ title: 'We repair it', detail: 'Most repairs take 5–10 business days. If a piece cannot be repaired, we replace it.' }
];

export const authenticityPoints = [
	{ title: 'GIA / IGI certification', detail: 'Every lab-created diamond over 0.5 ct ships with a GIA or IGI certificate stating its cut, colour, clarity and carat — the same grading labs used for mined stones.' },
	{ title: 'Hallmarking', detail: 'Every gold piece is stamped with its fineness (14k) and the Aurel hallmark, so what you bought is verifiable on the piece itself.' },
	{ title: 'Insured shipping', detail: 'Every order ships fully insured, tracked and signature-on-delivery for orders over $150 — if it is lost in transit, we replace it.' }
];

// ─── Sustainability & Ethics ───────────────────────────────────────────────
export const sustainabilityClaims = [
	{ stat: '100%', label: 'recycled gold', detail: 'Every gram of gold in Aurel pieces is recycled 14k gold — no newly mined gold in any piece.' },
	{ stat: '100%', label: 'lab-created stones', detail: 'Our diamonds and emeralds are grown in a lab, identical to mined stones, with no mining behind them.' },
	{ stat: '0', label: 'conflict stones', detail: 'No mined diamonds, no conflict sourcing. Our suppliers are audited annually for fair labour practices.' },
	{ stat: '100%', label: 'plastic-free packaging', detail: 'FSC-certified recycled paper, a reusable pouch and our signature emerald gift box — no plastic anywhere.' }
];

// ─── Bespoke — mock builder prices (USD) ───────────────────────────────────
export type BespokeSetting = { id: string; name: string; price: number; blurb: string };
export const bespokeSettings: BespokeSetting[] = [
	{ id: 'solitaire', name: 'Solitaire', price: 180, blurb: 'One stone, held high — the classic.' },
	{ id: 'halo', name: 'Halo', price: 320, blurb: 'A ring of small stones makes the centre look larger.' },
	{ id: 'pave', name: 'Pavé band', price: 450, blurb: 'Sparkle all the way around the band.' },
	{ id: 'three-stone', name: 'Three-stone', price: 390, blurb: 'Past, present and future in three stones.' }
];

export type BespokeStone = { id: string; name: string; price: number; blurb: string };
export const bespokeStones: BespokeStone[] = [
	{ id: 'lab-diamond', name: 'Lab diamond, 1 ct', price: 850, blurb: 'Brilliant, colourless, certified GIA / IGI.' },
	{ id: 'lab-emerald', name: 'Lab emerald, oval', price: 420, blurb: 'Deep green — our signature stone.' },
	{ id: 'lab-sapphire', name: 'Lab sapphire, round', price: 380, blurb: 'Cornflower blue, hard-wearing for every day.' },
	{ id: 'cz', name: 'Cubic zirconia', price: 90, blurb: 'All the sparkle, a fraction of the price.' },
	{ id: 'pearl', name: 'Freshwater pearl', price: 120, blurb: 'Soft lustre — a quiet classic.' }
];

export type BespokeMetal = { id: string; name: string; price: number; blurb: string };
export const bespokeMetals: BespokeMetal[] = [
	{ id: 'yellow-14k', name: '14k yellow gold', price: 0, blurb: 'Warm and classic — included in the base price.' },
	{ id: 'white-14k', name: '14k white gold', price: 0, blurb: 'Cool and modern — included in the base price.' },
	{ id: 'rose-14k', name: '14k rose gold', price: 0, blurb: 'Soft and romantic — included in the base price.' },
	{ id: 'platinum', name: 'Platinum', price: 450, blurb: 'Heavier, rarer, hypoallergenic — adds $450.' }
];

// ─── Appointments ──────────────────────────────────────────────────────────
export const appointmentPurposes = [
	'Engagement ring consultation',
	'Bespoke design',
	'Wedding bands',
	'Gift advice',
	'Repairs & resizing',
	'Just browsing'
];

export const appointmentSlots = [
	'10:00 AM',
	'11:00 AM',
	'12:00 PM',
	'1:00 PM',
	'2:00 PM',
	'3:00 PM',
	'4:00 PM',
	'5:00 PM',
	'6:00 PM'
];

// ─── Lookbook ──────────────────────────────────────────────────────────────
export type LookbookLook = {
	id: string;
	name: string;
	blurb: string;
	image: string;
	imageAlt: string;
	productSlugs: string[];
};

export const lookbookLooks: LookbookLook[] = [
	{
		id: 'bridal',
		name: 'Bridal',
		blurb: 'Solitaires, tennis necklaces and a halo ring — pieces that photograph beautifully and stay comfortable from the first look to the last dance.',
		image: 'lookbook-bridal',
		imageAlt: 'Bride wearing a gold solitaire ring, tennis necklace and bracelet',
		productSlugs: ['eternal-spark-ring', 'aurora-solitaire-ring', 'celestial-tennis-necklace', 'radiant-tennis-bracelet']
	},
	{
		id: 'evening',
		name: 'Evening',
		blurb: 'Green and gold under low light. The emerald necklace and a river of stones for the nights you dress up for.',
		image: 'lookbook-evening',
		imageAlt: 'Evening look with an emerald necklace, tennis bracelet and gold hoop earrings',
		productSlugs: ['celestial-tennis-necklace', 'emerald-grace-necklace', 'radiant-tennis-bracelet', 'luminous-hoop-earrings']
	},
	{
		id: 'everyday',
		name: 'Everyday',
		blurb: 'Hoops, a slim band, pearl drops and a charm bracelet — the pieces you reach for in the morning and forget you are wearing by noon.',
		image: 'lookbook-everyday',
		imageAlt: 'Everyday look with gold hoop earrings, a slim gold band and a charm bracelet',
		productSlugs: ['luminous-hoop-earrings', 'pearl-drop-earrings', 'vintage-gold-band', 'infinity-charm-bracelet']
	},
	{
		id: 'gifts',
		name: 'Gifts',
		blurb: 'Ready to give, beautifully boxed. An emerald pendant, pearl drops, a charm bracelet and a little luck — no sizing needed.',
		image: 'lookbook-gifts',
		imageAlt: 'Gift look with an emerald necklace, pearl earrings and a charm bracelet in the emerald gift box',
		productSlugs: ['emerald-grace-necklace', 'pearl-drop-earrings', 'infinity-charm-bracelet', 'golden-clover-pendant']
	}
];

// ─── Rewards (Aurel Circle — mock loyalty) ─────────────────────────────────
export const rewardsEarn = [
	{ title: '1 point per $1', detail: 'Every dollar you spend earns a point — automatically, on every order.' },
	{ title: '100 points = $5', detail: 'Redeem points for rewards at checkout. Points never expire while you stay a member.' },
	{ title: '200 birthday points', detail: 'A birthday gift from us, every year — no purchase needed.' }
];

export const rewardsTiers = [
	{ name: 'Insider', threshold: 'Join free', perk: '1 point per $1 · birthday points · early sale access' },
	{ name: 'Muse', threshold: '$500 spent in a year', perk: '1.25 points per $1 · free resizing · members-only previews' },
	{ name: 'Atelier', threshold: '$1,500 spent in a year', perk: '1.5 points per $1 · free resizing & cleaning · private bespoke consultations' }
];

// ─── Financing (mock — no real credit) ─────────────────────────────────────
export const financingOptions = [
	{
		name: 'Klarna — Pay in 4',
		detail: 'Split any order into 4 interest-free payments: the first at checkout, the rest every 2 weeks. No interest, no fees when you pay on time.'
	},
	{
		name: 'Afterpay — Pay in 4',
		detail: 'The same 4 interest-free payments, on the same schedule — pick whichever you already use at checkout.'
	},
	{
		name: 'Affirm — Monthly payments',
		detail: 'For larger pieces, spread the cost over 6 or 12 monthly payments. Your exact terms are shown at checkout before you commit — nothing is charged until you agree.'
	}
];
