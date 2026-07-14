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
    name: "Pure Orthodox Green Tea",
    slug: "pure-orthodox-green-tea",
    description:
      "A premium orthodox green tea from the Kenyan highlands. Light, refreshing, and packed with natural antioxidants.",
    ingredients: "100% premium Kenyan green tea leaves",
    weight: "80g",
    price: 1800,
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
      "A fragrant blend of premium green tea and aromatic shell ginger with subtle floral notes.",
    ingredients: "Kenyan green tea, shell ginger",
    weight: "80g",
    price: 2200,
    image: U("1564890369478-c89ca6d9cde9"),
    category: "Green Tea",
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: "3",
    name: "Pure Green Tea",
    slug: "pure-green-tea",
    description:
      "A clean, pure green tea from the Kenyan highlands with bright, vegetal notes.",
    ingredients: "100% premium Kenyan green tea leaves",
    weight: "100g",
    price: 1500,
    image: U("1556679343-c7306c1976bc"),
    category: "Green Tea",
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "4",
    name: "Pure Orthodox Purple Tea",
    slug: "pure-orthodox-purple-tea",
    description:
      "A rare orthodox purple tea rich in anthocyanins. Smooth, slightly sweet, and uniquely Kenyan.",
    ingredients: "100% Kenyan purple tea leaves",
    weight: "75g",
    price: 2800,
    comparePrice: 3200,
    image: U("1594631252845-29fc4cc8cde9"),
    category: "Purple Tea",
    isFeatured: true,
    isBestSeller: true,
  },
  {
    id: "5",
    name: "Purple Tea with Lemon Verbena",
    slug: "purple-tea-with-lemon-verbena",
    description:
      "A vibrant blend of purple tea and lemon verbena. Citrusy, refreshing, and uplifting.",
    ingredients: "Kenyan purple tea, lemon verbena",
    weight: "75g",
    price: 2600,
    image: U("1556881286-fc6915169721"),
    category: "Purple Tea",
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "6",
    name: "Chamomile with Peppermint",
    slug: "chamomile-with-peppermint",
    description:
      "A calming caffeine-free blend of chamomile and cooling peppermint. Perfect for evening relaxation.",
    ingredients: "Chamomile flowers, peppermint leaves",
    weight: "80g",
    price: 2000,
    image: U("1556881286-fc6915169721"),
    category: "Herbal Infusion",
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: "7",
    name: "Hibiscus with Lemongrass",
    slug: "hibiscus-with-lemongrass",
    description:
      "A vibrant, tangy herbal infusion with hibiscus and lemongrass. Rich in vitamin C.",
    ingredients: "Hibiscus flowers, lemongrass",
    weight: "80g",
    price: 1900,
    image: U("1563911892437-1feda0179e1b"),
    category: "Herbal Infusion",
    isFeatured: false,
    isBestSeller: false,
  },
  {
    id: "8",
    name: "Turmeric with Baobab",
    slug: "turmeric-with-baobab",
    description:
      "A warming golden blend of turmeric and vitamin-rich baobab. Naturally caffeine-free.",
    ingredients: "Turmeric, baobab powder, ginger, black pepper",
    weight: "100g",
    price: 2400,
    image: U("1563911892437-1feda0179e1b"),
    category: "Herbal Infusion",
    isFeatured: true,
    isBestSeller: false,
  },
  {
    id: "9",
    name: "Pure Honey",
    slug: "pure-honey",
    description:
      "Pure raw Kenyan honey. Naturally sweet, rich in flavor, and packed with natural enzymes.",
    ingredients: "100% pure raw Kenyan honey",
    weight: "250g",
    price: 1200,
    comparePrice: 1500,
    image: U("1556881286-fc6915169721"),
    category: "Honey",
    isFeatured: false,
    isBestSeller: false,
  },
]

export const featuredProducts = products.filter((p) => p.isFeatured)
export const bestSellers = products.filter((p) => p.isBestSeller)
