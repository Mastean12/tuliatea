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

const img = "/images/"

export const products: Product[] = [
  {
    id: "1",
    name: "Pure Orthodox Green Tea",
    slug: "pure-orthodox-green-tea",
    description:
      "A premium orthodox green tea from the Kenyan highlands. Light, refreshing, and packed with natural antioxidants.",
    ingredients: "Pure Orthodox Green Tea",
    weight: "30g",
    price: 500,
    image: U("1556679343-c7306c1976bc"),
    category: "Green Tea",
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "2",
    name: "Green Tea with Shell Ginger",
    slug: "green-tea-with-shell-ginger",
    description:
      "A fragrant blend of Kenyan green tea with shell ginger, peppermint, dried lemon and cayenne.",
    ingredients:
      "Green Tea, Shell Ginger, Peppermint, Dried Lemon, Cayenne, Citric Acid",
    weight: "50g",
    price: 350,
    image: `${img}Green tea with Shell ginger.jpg`,
    category: "Green Tea",
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: "3",
    name: "Pure Green Tea (Loose)",
    slug: "pure-green-tea-loose",
    description:
      "A clean, pure green tea from the Kenyan highlands. Bright, vegetal notes with a smooth finish.",
    ingredients: "Pure Orthodox Green Tea",
    weight: "50g",
    price: 350,
    image: U("1556679343-c7306c1976bc"),
    category: "Green Tea",
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "4",
    name: "Pure Orthodox Purple Tea",
    slug: "pure-orthodox-purple-tea",
    description:
      "A rare and exquisite purple tea from Kenya. Naturally rich in anthocyanins. Smooth, slightly sweet.",
    ingredients: "Pure Orthodox Tea",
    weight: "30g",
    price: 700,
    comparePrice: 800,
    image: `${img}Pure orthodox Purple tea (pyramid).jpg`,
    category: "Purple Tea",
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "5",
    name: "Pure Orthodox Purple Tea (Loose)",
    slug: "pure-orthodox-purple-tea-loose",
    description:
      "The same premium purple tea in loose leaf form. Naturally rich in anthocyanins with a smooth, slightly sweet flavor.",
    ingredients: "Pure Orthodox Tea",
    weight: "50g",
    price: 500,
    image: `${img}Pure orthodox Purple tea (loose).jpg`,
    category: "Purple Tea",
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: "6",
    name: "Purple Tea with Lemon Verbena",
    slug: "purple-tea-with-lemon-verbena",
    description:
      "A vibrant blend of rare Kenyan purple tea with lemon verbena, hibiscus, and ginger.",
    ingredients:
      "Purple Tea, Lemon Verbena, Hibiscus, Ginger, Cayenne, Citric Acid",
    weight: "50g",
    price: 500,
    image: U("1556881286-fc6915169721"),
    category: "Purple Tea",
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: "7",
    name: "Chamomile with Peppermint",
    slug: "chamomile-with-peppermint",
    description:
      "A calming caffeine-free herbal blend of chamomile and peppermint with rosemary, geranium and dandelion.",
    ingredients: "Chamomile, Peppermint, Rosemary, Geranium, Dandelion",
    weight: "50g",
    price: 600,
    image: `${img}chamomile with pepoermint.jpg`,
    category: "Herbal Infusion",
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: "8",
    name: "Hibiscus with Lemongrass",
    slug: "hibiscus-with-lemongrass-bags",
    description:
      "A vibrant, tangy herbal infusion of hibiscus and lemongrass with peppermint, thyme and fennel.",
    ingredients: "Hibiscus, Lemongrass, Peppermint, Thyme, Fennel",
    weight: "50g",
    price: 350,
    image: `${img}Hibiscus with lemongrass.jpg`,
    category: "Herbal Infusion",
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "9",
    name: "Hibiscus & Lemongrass",
    slug: "hibiscus-lemongrass-pyramid",
    description:
      "A pure, vibrant blend of hibiscus petals and lemongrass in premium pyramid tea bags.",
    ingredients: "Hibiscus, Lemongrass",
    weight: "30g",
    price: 500,
    image: `${img}Hibiscus with lemongrass.jpg`,
    category: "Herbal Infusion",
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: "10",
    name: "Hibiscus with Lemongrass (Jar)",
    slug: "hibiscus-with-lemongrass-jar",
    description:
      "A vibrant loose herbal blend of hibiscus and lemongrass with peppermint and thyme in a premium jar.",
    ingredients: "Hibiscus, Lemongrass, Peppermint, Thyme",
    weight: "50g",
    price: 600,
    image: `${img}Hibiscus with lemongrass.jpg`,
    category: "Herbal Infusion",
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "11",
    name: "Turmeric with Baobab",
    slug: "turmeric-with-baobab",
    description:
      "A warming golden blend of turmeric, baobab, ashwagandha, star anise and cinnamon.",
    ingredients: "Turmeric, Baobab, Ashwagandha, Star Anise, Cinnamon",
    weight: "100g",
    price: 600,
    image: U("1563911892437-1feda0179e1b"),
    category: "Herbal Infusion",
    isFeatured: true,
    isBestSeller: false,
  },
]

export const featuredProducts = products.filter((p) => p.isFeatured)
export const bestSellers = products.filter((p) => p.isBestSeller)
