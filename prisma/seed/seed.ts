import "dotenv/config"
import { PrismaClient, ProductStatus } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
})

// Verified working Unsplash photos
const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop&auto=format`
// Local uploaded product images
const UI = (name: string) => `/images/${encodeURIComponent(name)}`

const productImages: Record<string, string[]> = {
  "pure-orthodox-green-tea": [
    U("1556679343-c7306c1976bc"),
    U("1564890369478-c89ca6d9cde9"),
  ],
  "green-tea-with-shell-ginger": [
    UI("Green tea with Shell ginger.jpg"),
    U("1564890369478-c89ca6d9cde9"),
  ],
  "pure-green-tea-loose": [
    U("1556679343-c7306c1976bc"),
    U("1564890369478-c89ca6d9cde9"),
  ],
  "pure-orthodox-purple-tea": [
    UI("Pure orthodox Purple tea (pyramid).jpg"),
    U("1594631252845-29fc4cc8cde9"),
  ],
  "pure-orthodox-purple-tea-loose": [
    UI("Pure orthodox Purple tea (loose).jpg"),
    U("1594631252845-29fc4cc8cde9"),
  ],
  "purple-tea-with-lemon-verbena": [
    U("1556881286-fc6915169721"),
    U("1594631252845-29fc4cc8cde9"),
  ],
  "chamomile-with-peppermint": [
    UI("chamomile with pepoermint.jpg"),
    U("1556881286-fc6915169721"),
  ],
  "hibiscus-with-lemongrass-bags": [
    UI("Hibiscus with lemongrass.jpg"),
    U("1563911892437-1feda0179e1b"),
  ],
  "hibiscus-lemongrass-pyramid": [
    UI("Hibiscus with lemongrass.jpg"),
    U("1563911892437-1feda0179e1b"),
  ],
  "hibiscus-with-lemongrass-jar": [
    UI("Hibiscus with lemongrass.jpg"),
    U("1563911892437-1feda0179e1b"),
  ],
  "turmeric-with-baobab": [
    U("1563911892437-1feda0179e1b"),
    U("1594631252845-29fc4cc8cde9"),
  ],
}

async function main() {
  console.log("🌱 Seeding database...\n")

  // ── Users ─────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("Admin123!", 12)
  const customerPassword = await bcrypt.hash("Customer1!", 12)

  const _admin = await prisma.user.upsert({
    where: { email: "admin@tulliatea.com" },
    update: {},
    create: {
      firstName: "Admin",
      lastName: "Tullia",
      name: "Admin Tullia",
      email: "admin@tulliatea.com",
      passwordHash: adminPassword,
      role: "ADMIN",
      phone: "+254 793 509 510",
    },
  })

  const _customer = await prisma.user.upsert({
    where: { email: "customer@test.com" },
    update: {},
    create: {
      firstName: "Jane",
      lastName: "Kamau",
      name: "Jane Kamau",
      email: "customer@test.com",
      passwordHash: customerPassword,
      role: "CUSTOMER",
      phone: "+254 712 345 678",
    },
  })

  console.log("  ✅ Users created:")
  console.log(`     Admin:    admin@tulliatea.com / Admin123!`)
  console.log(`     Customer: customer@test.com / Customer1!`)

  // ── Categories ────────────────────────────────────────
  const categoryData = [
    {
      name: "Green Tea",
      slug: "green-tea",
      description: "Premium Kenyan green teas packed with antioxidants",
      sortOrder: 1,
    },
    {
      name: "Purple Tea",
      slug: "purple-tea",
      description: "Rare antioxidant-rich purple tea from Kenya",
      sortOrder: 2,
    },
    {
      name: "Herbal Infusion",
      slug: "herbal-infusion",
      description: "Naturally caffeine-free wellness herbal blends",
      sortOrder: 3,
    },
    {
      name: "Specialty Tea",
      slug: "specialty-tea",
      description: "Premium handcrafted Kenyan specialty teas",
      sortOrder: 5,
    },
  ]

  for (const cat of categoryData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    })
  }
  console.log("  ✅ Categories created")

  // ── Get category IDs ──────────────────────────────────
  const cats = new Map<string, string>()
  for (const c of categoryData) {
    const cat = await prisma.category.findUnique({ where: { slug: c.slug } })
    if (cat) cats.set(c.slug, cat.id)
  }

  // ── Products (Official Catalogue) ────────────────────
  const products = [
    {
      name: "Pure Orthodox Green Tea",
      slug: "pure-orthodox-green-tea",
      shortDesc: "Premium orthodox green tea in pyramid tea bags",
      description:
        "A premium orthodox green tea from the Kenyan highlands. Light, refreshing, and packed with natural antioxidants.",
      ingredients: "Pure Orthodox Green Tea",
      benefits:
        "Rich in antioxidants. Improves focus. Reduces blood sugar. Lowers cholesterol. Lowers blood pressure. Helps manage weight. Helps reduce acne.",
      brewingGuide:
        "Steep one tea bag in hot water for 3-5 minutes. Do not boil. Honey may be added if preferred. Best time: Morning before breakfast or after meals.",
      deliveryInfo: "Delivered via TuShop at reasonable rates.",
      returnInfo: "If unsatisfied, contact us within 14 days.",
      tags: "green-tea,orthodox,antioxidant,kenyan",
      price: 500,
      stock: 50,
      isFeatured: true,
      isBestSeller: true,
      weight: "30g",
      servings: "15 cups",
      categorySlug: "green-tea",
    },
    {
      name: "Green Tea with Shell Ginger",
      slug: "green-tea-with-shell-ginger",
      shortDesc: "Green tea with shell ginger and citrus notes",
      description:
        "A fragrant blend of Kenyan green tea with shell ginger, peppermint, dried lemon and cayenne.",
      ingredients:
        "Green Tea, Shell Ginger, Peppermint, Dried Lemon, Cayenne, Citric Acid",
      benefits:
        "Rich in antioxidants. Improves focus. Supports digestion. Reduces blood sugar.",
      brewingGuide:
        "Steep one tea bag in hot water for 3-5 minutes. Do not boil. Honey may be added if preferred.",
      deliveryInfo: "Delivered via TuShop at reasonable rates.",
      returnInfo: "If unsatisfied, contact us within 14 days.",
      tags: "green-tea,ginger,citrus,aromatic",
      price: 350,
      stock: 40,
      isFeatured: true,
      isBestSeller: false,
      weight: "50g",
      servings: "25 cups",
      categorySlug: "green-tea",
    },
    {
      name: "Pure Green Tea (Loose)",
      slug: "pure-green-tea-loose",
      shortDesc: "Classic loose leaf pure green tea",
      description:
        "A clean, pure green tea from the Kenyan highlands. Bright, vegetal notes with a smooth finish.",
      ingredients: "Pure Orthodox Green Tea",
      benefits:
        "Rich in antioxidants. Improves focus. Reduces blood sugar. Lowers cholesterol. Helps manage weight.",
      brewingGuide:
        "Steep one spoonful of loose leaf in hot water for 3-5 minutes. Do not boil. Sieve before drinking.",
      deliveryInfo: "Delivered via TuShop at reasonable rates.",
      returnInfo: "If unsatisfied, contact us within 14 days.",
      tags: "green-tea,loose-leaf,daily",
      price: 350,
      stock: 60,
      isFeatured: false,
      isBestSeller: false,
      weight: "50g",
      servings: "25 cups",
      categorySlug: "green-tea",
    },
    {
      name: "Pure Orthodox Purple Tea",
      slug: "pure-orthodox-purple-tea",
      shortDesc: "Rare orthodox purple tea in pyramid bags",
      description:
        "A rare and exquisite purple tea from Kenya. Naturally rich in anthocyanins. Smooth, slightly sweet, uniquely Kenyan.",
      ingredients: "Pure Orthodox Tea",
      benefits:
        "High in anthocyanins. Supports cognition. Improves skin. Helps manage weight. Helps fight acne. Helps fight colds and flu.",
      brewingGuide:
        "Steep one tea bag in hot water for 3-5 minutes. Do not boil. Suitable any time of day.",
      deliveryInfo: "Delivered via TuShop at reasonable rates.",
      returnInfo: "If unsatisfied, contact us within 14 days.",
      tags: "purple-tea,orthodox,antioxidant,premium",
      price: 700,
      stock: 20,
      isFeatured: true,
      isBestSeller: true,
      weight: "30g",
      servings: "15 cups",
      categorySlug: "purple-tea",
    },
    {
      name: "Pure Orthodox Purple Tea (Loose)",
      slug: "pure-orthodox-purple-tea-loose",
      shortDesc: "Rare purple tea in loose leaf form",
      description:
        "The same premium purple tea in loose leaf form. Naturally rich in anthocyanins with a smooth, slightly sweet flavor.",
      ingredients: "Pure Orthodox Tea",
      benefits:
        "High in anthocyanins. Supports cognition. Improves skin. Helps manage weight. Helps fight colds and flu.",
      brewingGuide:
        "Steep one spoonful of loose leaf in hot water for 3-5 minutes. Do not boil. Sieve before drinking.",
      deliveryInfo: "Delivered via TuShop at reasonable rates.",
      returnInfo: "If unsatisfied, contact us within 14 days.",
      tags: "purple-tea,loose-leaf,antioxidant",
      price: 500,
      stock: 25,
      isFeatured: false,
      isBestSeller: false,
      weight: "50g",
      servings: "25 cups",
      categorySlug: "purple-tea",
    },
    {
      name: "Purple Tea with Lemon Verbena",
      slug: "purple-tea-with-lemon-verbena",
      shortDesc: "Purple tea with lemon verbena and hibiscus",
      description:
        "A vibrant blend of rare Kenyan purple tea with lemon verbena, hibiscus, and ginger. Citrusy, refreshing, and uniquely uplifting.",
      ingredients:
        "Purple Tea, Lemon Verbena, Hibiscus, Ginger, Cayenne, Citric Acid",
      benefits:
        "High in anthocyanins. Supports cognition. Rich in vitamin C. Aids digestion.",
      brewingGuide:
        "Steep one tea bag in hot water for 3-5 minutes. Do not boil. Honey may be added if preferred.",
      deliveryInfo: "Delivered via TuShop at reasonable rates.",
      returnInfo: "If unsatisfied, contact us within 14 days.",
      tags: "purple-tea,lemon-verbena,hibiscus,ginger",
      price: 500,
      stock: 30,
      isFeatured: true,
      isBestSeller: false,
      weight: "50g",
      servings: "25 cups",
      categorySlug: "purple-tea",
    },
    {
      name: "Chamomile with Peppermint",
      slug: "chamomile-with-peppermint",
      shortDesc: "Calming chamomile with peppermint and herbs",
      description:
        "A calming caffeine-free herbal blend of chamomile and peppermint with rosemary, geranium and dandelion.",
      ingredients: "Chamomile, Peppermint, Rosemary, Geranium, Dandelion",
      benefits:
        "Promotes relaxation. Supports sleep. Reduces anxiety. Relieves bloating. Helps lower blood sugar. Helps with nausea and insomnia.",
      brewingGuide:
        "Steep for 3-5 minutes. Do not boil. Honey may be added. Best time: Before bed.",
      deliveryInfo: "Delivered via TuShop at reasonable rates.",
      returnInfo: "If unsatisfied, contact us within 14 days.",
      tags: "herbal,chamomile,peppermint,bedtime",
      price: 600,
      stock: 35,
      isFeatured: true,
      isBestSeller: false,
      weight: "50g",
      servings: "25 cups",
      categorySlug: "herbal-infusion",
    },
    {
      name: "Hibiscus with Lemongrass",
      slug: "hibiscus-with-lemongrass-bags",
      shortDesc: "Vibrant hibiscus with lemongrass tea bags",
      description:
        "A vibrant, tangy herbal infusion of hibiscus and lemongrass with peppermint, thyme and fennel.",
      ingredients: "Hibiscus, Lemongrass, Peppermint, Thyme, Fennel",
      benefits:
        "Rich in Vitamin C. Supports immunity. Lowers blood pressure. Lowers cholesterol. Relieves flu and cough.",
      brewingGuide:
        "Steep one tea bag in hot water for 3-5 minutes. Do not boil. Serve hot or iced. Suitable any time.",
      deliveryInfo: "Delivered via TuShop at reasonable rates.",
      returnInfo: "If unsatisfied, contact us within 14 days.",
      tags: "herbal,hibiscus,lemongrass,vitamin-c",
      price: 350,
      stock: 40,
      isFeatured: false,
      isBestSeller: false,
      weight: "50g",
      servings: "25 cups",
      categorySlug: "herbal-infusion",
    },
    {
      name: "Hibiscus & Lemongrass",
      slug: "hibiscus-lemongrass-pyramid",
      shortDesc: "Pure hibiscus and lemongrass pyramid bags",
      description:
        "A pure, vibrant blend of hibiscus petals and lemongrass in premium pyramid tea bags.",
      ingredients: "Hibiscus, Lemongrass",
      benefits:
        "Rich in Vitamin C. Supports immunity. Lowers blood pressure. Relieves flu and cough.",
      brewingGuide:
        "Steep one pyramid tea bag in hot water for 3-5 minutes. Do not boil.",
      deliveryInfo: "Delivered via TuShop at reasonable rates.",
      returnInfo: "If unsatisfied, contact us within 14 days.",
      tags: "herbal,hibiscus,lemongrass,pyramid",
      price: 500,
      stock: 25,
      isFeatured: true,
      isBestSeller: false,
      weight: "30g",
      servings: "15 cups",
      categorySlug: "herbal-infusion",
    },
    {
      name: "Hibiscus with Lemongrass (Jar)",
      slug: "hibiscus-with-lemongrass-jar",
      shortDesc: "Loose hibiscus and lemongrass in a premium jar",
      description:
        "A vibrant loose herbal blend of hibiscus and lemongrass with peppermint and thyme in a premium jar.",
      ingredients: "Hibiscus, Lemongrass, Peppermint, Thyme",
      benefits: "Rich in Vitamin C. Supports immunity. Lowers blood pressure.",
      brewingGuide:
        "Steep one spoonful in hot water for 3-5 minutes. Do not boil. Serve hot or iced.",
      deliveryInfo: "Delivered via TuShop at reasonable rates.",
      returnInfo: "If unsatisfied, contact us within 14 days.",
      tags: "herbal,hibiscus,lemongrass,jar",
      price: 600,
      stock: 20,
      isFeatured: false,
      isBestSeller: false,
      weight: "50g",
      servings: "25 cups",
      categorySlug: "herbal-infusion",
    },
    {
      name: "Turmeric with Baobab",
      slug: "turmeric-with-baobab",
      shortDesc: "Golden turmeric with baobab and ashwagandha",
      description:
        "A warming golden blend of turmeric, baobab, ashwagandha, star anise and cinnamon.",
      ingredients: "Turmeric, Baobab, Ashwagandha, Star Anise, Cinnamon",
      benefits:
        "Anti-inflammatory. Supports digestion. Improves circulation. Supports immunity. Helps relieve arthritis and body pain.",
      brewingGuide:
        "Steep one spoonful in hot water for 3-5 minutes. Do not boil. Honey may be added. Best time: Evening after supper.",
      deliveryInfo: "Delivered via TuShop at reasonable rates.",
      returnInfo: "If unsatisfied, contact us within 14 days.",
      tags: "herbal,turmeric,baobab,ashwagandha",
      price: 600,
      stock: 25,
      isFeatured: true,
      isBestSeller: false,
      weight: "100g",
      servings: "30 cups",
      categorySlug: "herbal-infusion",
    },
  ]

  for (const p of products) {
    const categoryId = cats.get(p.categorySlug)
    if (!categoryId) {
      console.warn(`  ⚠ Category not found for ${p.name}`)
      continue
    }

    const { categorySlug: _catSlug, ...productData } = p

    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { ...productData, categoryId },
      create: { ...productData, categoryId },
    })

    // Replace product images with Unsplash photography
    const existingProduct = await prisma.product.findUnique({
      where: { slug: p.slug },
    })
    if (existingProduct) {
      // Remove old placeholder images
      await prisma.productImage.deleteMany({
        where: { productId: existingProduct.id },
      })
      // Add real Unsplash images
      const urls = productImages[p.slug] || []
      for (let i = 0; i < urls.length; i++) {
        await prisma.productImage.create({
          data: {
            url: urls[i],
            alt: p.name,
            sortOrder: i,
            isPrimary: i === 0,
            productId: existingProduct.id,
          },
        })
      }
    }

    // Mark all products as PUBLISHED with status field
    await prisma.product.update({
      where: { slug: p.slug },
      data: { status: ProductStatus.PUBLISHED, isActive: true },
    })
  }

  console.log("  ✅ 6 products created with images\n")
  console.log("╔══════════════════════════════════════════════════════╗")
  console.log("║              TEST ACCOUNTS                          ║")
  console.log("╠══════════════════════════════════════════════════════╣")
  console.log("║                                                     ║")
  console.log("║  ADMIN:                                            ║")
  console.log("║    Email:    admin@tulliatea.com                    ║")
  console.log("║    Password: Admin123!                              ║")
  console.log("║                                                     ║")
  console.log("║  CUSTOMER:                                         ║")
  console.log("║    Email:    customer@test.com                      ║")
  console.log("║    Password: Customer1!                             ║")
  console.log("║                                                     ║")
  console.log("╚══════════════════════════════════════════════════════╝")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
