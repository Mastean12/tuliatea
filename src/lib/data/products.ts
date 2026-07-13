const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop&auto=format`

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  ingredients: string
  weight: string
  price: number
  comparePrice?: number
  image: string
  category: string
  isFeatured: boolean
  isBestSeller: boolean
}

export const products: Product[] = [
  {
    id: "1",
    name: "Kenyan Sunrise Black Tea",
    slug: "kenyan-sunrise-black-tea",
    description:
      "A bold, full-bodied black tea from the highlands of Kenya. Rich in flavor with a bright copper liquor and smooth finish.",
    ingredients: "100% premium Kenyan black tea leaves",
    weight: "100g",
    price: 1500,
    image: U("1571939228382-b2f2b585ce15"),
    category: "Black Tea",
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Serenity Green Tea",
    slug: "serenity-green-tea",
    description:
      "A delicate, soothing green tea with grassy notes and a clean finish. Sourced from the finest tea gardens in Kenya.",
    ingredients: "100% premium Kenyan green tea leaves",
    weight: "80g",
    price: 1800,
    comparePrice: 2200,
    image: U("1556679343-c7306c1976bc"),
    category: "Green Tea",
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "3",
    name: "Golden Turmeric Infusion",
    slug: "golden-turmeric-infusion",
    description:
      "A warming, golden blend of turmeric, ginger, and lemongrass. Naturally caffeine-free and perfect for any time of day.",
    ingredients: "Turmeric, ginger, lemongrass, black pepper, cinnamon",
    weight: "100g",
    price: 2200,
    image: U("1563911892437-1feda0179e1b"),
    category: "Herbal Infusion",
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: "4",
    name: "Moringa Wellness Tea",
    slug: "moringa-wellness-tea",
    description:
      "Pure Kenyan moringa leaf tea packed with natural antioxidants and nutrients. A vibrant green infusion that supports daily wellness.",
    ingredients: "100% organic Kenyan moringa leaves",
    weight: "75g",
    price: 1600,
    image: U("1594631252845-29fc4cc8cde9"),
    category: "Herbal Infusion",
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: "5",
    name: "Rift Valley Breakfast",
    slug: "rift-valley-breakfast",
    description:
      "A robust, full-bodied breakfast blend from the Great Rift Valley. Malty notes with a satisfying finish — the perfect start to your day.",
    ingredients: "100% premium Kenyan black tea leaves",
    weight: "120g",
    price: 1800,
    image: U("1556679343-c7306c1976bc"),
    category: "Black Tea",
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: "6",
    name: "Lemongrass & Ginger Zest",
    slug: "lemongrass-ginger-zest",
    description:
      "A refreshing, zesty herbal infusion made from Kenyan-grown lemongrass and ginger. Naturally caffeine-free and invigorating.",
    ingredients: "Lemongrass, ginger, lemon verbena",
    weight: "80g",
    price: 1900,
    image: U("1556881286-fc6915169721"),
    category: "Herbal Infusion",
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: "7",
    name: "Earl Grey Lavender",
    slug: "earl-grey-lavender",
    description:
      "Classic Earl Grey with a twist of Kenyan lavender. Bergamot notes meet floral elegance for a truly premium cup.",
    ingredients: "Kenyan black tea, bergamot oil, lavender flowers",
    weight: "100g",
    price: 2100,
    image: U("1571939228382-b2f2b585ce15"),
    category: "Black Tea",
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "8",
    name: "Chamomile & Honeybush",
    slug: "chamomile-honeybush",
    description:
      "A calming, caffeine-free blend of chamomile and honeybush. Sweet, floral, and perfect for evening relaxation.",
    ingredients: "Chamomile flowers, honeybush, natural flavor",
    weight: "75g",
    price: 2000,
    image: U("1564890369478-c89ca6d9cde9"),
    category: "Herbal Infusion",
    isFeatured: true,
    isBestSeller: false,
  },
]

export const featuredProducts = products.filter((p) => p.isFeatured)
export const bestSellers = products.filter((p) => p.isBestSeller)
