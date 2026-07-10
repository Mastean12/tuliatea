export type Product = {
  id: string
  name: string
  slug: string
  description: string
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
    name: "Serenity Green",
    slug: "serenity-green",
    description:
      "A calming blend of premium Kenyan green tea leaves with hints of chamomile and lavender.",
    price: 1800,
    image: "serenity-green",
    category: "Green Tea",
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Golden Turmeric",
    slug: "golden-turmeric",
    description:
      "Warming turmeric and ginger infusion blended with Kenyan black tea and a touch of honey.",
    price: 2200,
    comparePrice: 2600,
    image: "golden-turmeric",
    category: "Herbal Infusion",
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "3",
    name: "Moringa Bliss",
    slug: "moringa-bliss",
    description:
      "Pure Kenyan moringa leaf tea packed with antioxidants and natural energy.",
    price: 1600,
    image: "moringa-bliss",
    category: "Herbal Infusion",
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: "4",
    name: "Rift Valley Breakfast",
    slug: "rift-valley-breakfast",
    description:
      "Bold full-bodied black tea from the Great Rift Valley. A perfect morning brew.",
    price: 1500,
    image: "rift-valley-breakfast",
    category: "Black Tea",
    isFeatured: false,
    isBestSeller: true,
  },
  {
    id: "5",
    name: "Lemongrass Zest",
    slug: "lemongrass-zest",
    description:
      "Refreshing lemongrass and lemon verbena blend grown in the Kenyan highlands.",
    price: 1900,
    image: "lemongrass-zest",
    category: "Herbal Infusion",
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: "6",
    name: "Earl Grey Lavender",
    slug: "earl-grey-lavender",
    description:
      "Classic Earl Grey with a twist of Kenyan lavender. Bergamot notes meet floral elegance.",
    price: 2100,
    image: "earl-grey-lavender",
    category: "Black Tea",
    isFeatured: false,
    isBestSeller: true,
  },
]

export const featuredProducts = products.filter((p) => p.isFeatured)
export const bestSellers = products.filter((p) => p.isBestSeller)
