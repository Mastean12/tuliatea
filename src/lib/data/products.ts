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

const img = "/images/"

export const products: Product[] = [
  {
    id: "1",
    name: "Green Tea with Shell Ginger",
    slug: "green-tea-with-shell-ginger",
    description:
      "A fragrant blend of Kenyan green tea with shell ginger, peppermint, dried lemon and cayenne.",
    ingredients:
      "Green Tea, Shell Ginger, Peppermint, Dried Lemon, Cayenne, Citric Acid",
    weight: "50g",
    price: 350,
    image: `${img}green-tea-shell-ginger.jpg`,
    category: "Green Tea",
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: "2",
    name: "Pure Orthodox Purple Tea",
    slug: "pure-orthodox-purple-tea",
    description:
      "A rare and exquisite purple tea from Kenya. Naturally rich in anthocyanins. Smooth, slightly sweet.",
    ingredients: "Pure Orthodox Tea",
    weight: "30g",
    price: 700,
    image: `${img}purple-tea-pyramid.jpg`,
    category: "Purple Tea",
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "3",
    name: "Chamomile with Peppermint",
    slug: "chamomile-with-peppermint",
    description:
      "A calming caffeine-free herbal blend of chamomile and peppermint with rosemary, geranium and dandelion.",
    ingredients: "Chamomile, Peppermint, Rosemary, Geranium, Dandelion",
    weight: "50g",
    price: 600,
    image: `${img}chamomile-peppermint.jpg`,
    category: "Herbal Infusion",
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: "4",
    name: "Hibiscus with Lemongrass",
    slug: "hibiscus-with-lemongrass",
    description:
      "A vibrant, tangy herbal infusion of hibiscus and lemongrass with peppermint, thyme and fennel.",
    ingredients: "Hibiscus, Lemongrass, Peppermint, Thyme, Fennel",
    weight: "50g",
    price: 350,
    image: `${img}hibiscus-lemongrass.jpg`,
    category: "Herbal Infusion",
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: "5",
    name: "Hibiscus & Lemongrass",
    slug: "hibiscus-lemongrass-pyramid",
    description:
      "A pure, vibrant blend of hibiscus petals and lemongrass in premium pyramid tea bags.",
    ingredients: "Hibiscus, Lemongrass",
    weight: "30g",
    price: 500,
    image: `${img}hibiscus-lemongrass.jpg`,
    category: "Herbal Infusion",
    isFeatured: true,
    isBestSeller: false,
  },
]

export const featuredProducts = products.filter((p) => p.isFeatured)
export const bestSellers = products.filter((p) => p.isBestSeller)
