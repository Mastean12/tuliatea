import "dotenv/config"
import { PrismaClient, ProductStatus } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
})

const UNSPLASH_BASE = "https://images.unsplash.com"

const productImages: Record<string, string[]> = {
  "serenity-green-tea": [
    `${UNSPLASH_BASE}/photo-1556679343-c7306c1976bc?w=600&h=600&fit=crop&auto=format`,
    `${UNSPLASH_BASE}/photo-1564890369478-c89ca6d9cde9?w=600&h=600&fit=crop&auto=format`,
  ],
  "kenyan-purple-tea": [
    `${UNSPLASH_BASE}/photo-1563822249366-1ef5b2b2f9c0?w=600&h=600&fit=crop&auto=format`,
    `${UNSPLASH_BASE}/photo-1594631252845-29fc4cc8cde9?w=600&h=600&fit=crop&auto=format`,
  ],
  "golden-turmeric-infusion": [
    `${UNSPLASH_BASE}/photo-1615485290382-441e4b049d5e?w=600&h=600&fit=crop&auto=format`,
    `${UNSPLASH_BASE}/photo-1616671016440-2d0b5eefb6b9?w=600&h=600&fit=crop&auto=format`,
  ],
  "rift-valley-breakfast": [
    `${UNSPLASH_BASE}/photo-1571939228382-b2f2b585ce15?w=600&h=600&fit=crop&auto=format`,
    `${UNSPLASH_BASE}/photo-1556679343-c7306c1976bc?w=600&h=600&fit=crop&auto=format`,
  ],
  "lemongrass-ginger-zest": [
    `${UNSPLASH_BASE}/photo-1563911892437-1feda0179e1b?w=600&h=600&fit=crop&auto=format`,
    `${UNSPLASH_BASE}/photo-1556881286-fc6915169721?w=600&h=600&fit=crop&auto=format`,
  ],
  "pure-kenyan-honey": [
    `${UNSPLASH_BASE}/photo-1587040283496-5b9c5e2ef5b0?w=600&h=600&fit=crop&auto=format`,
    `${UNSPLASH_BASE}/photo-1628761643749-64f0e54a1c16?w=600&h=600&fit=crop&auto=format`,
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
      name: "Honey",
      slug: "honey",
      description: "Pure raw Kenyan honey",
      sortOrder: 4,
    },
    {
      name: "Black Tea",
      slug: "black-tea",
      description: "Full-bodied premium Kenyan black teas",
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

  // ── Products ──────────────────────────────────────────
  const products = [
    {
      name: "Serenity Green Tea",
      slug: "serenity-green-tea",
      shortDesc: "A delicate, soothing green tea with grassy notes",
      description:
        "A delicate, soothing green tea with grassy notes and a clean finish. Sourced from the finest tea gardens in Kenya. Light, refreshing, and packed with natural antioxidants that support overall wellness.",
      ingredients: "100% premium Kenyan green tea leaves",
      benefits:
        "High in catechins, boosts metabolism, supports brain function, rich in antioxidants",
      brewingGuide:
        "Heat water to 80°C. Steep 1 teaspoon per cup for 2-3 minutes. Do not use boiling water.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "green-tea,antioxidant,light,refreshing,kenyan",
      price: 1800,
      comparePrice: 2200,
      stock: 35,
      isFeatured: true,
      status: ProductStatus.PUBLISHED,
      weight: "80g",
      servings: "25-30 cups",
      categorySlug: "green-tea",
    },
    {
      name: "Kenyan Purple Tea",
      slug: "kenyan-purple-tea",
      shortDesc: "A rare, antioxidant-rich purple tea from Kenya",
      description:
        "A rare and exquisite purple tea from Kenya. Naturally rich in anthocyanins — the same antioxidants found in blueberries. Smooth, slightly sweet, with a unique earthy flavor profile you won't find anywhere else.",
      ingredients: "100% Kenyan purple tea leaves",
      benefits:
        "High in anthocyanins, supports heart health, rich in antioxidants, unique flavor",
      brewingGuide:
        "Heat water to 85°C. Steep 1 teaspoon per cup for 2-3 minutes. Watch the color transform from green to purple.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "purple-tea,antioxidant,rare,premium,kenyan",
      price: 2800,
      comparePrice: 3200,
      stock: 15,
      isFeatured: true,
      status: ProductStatus.PUBLISHED,
      weight: "75g",
      servings: "20-25 cups",
      categorySlug: "purple-tea",
    },
    {
      name: "Golden Turmeric Infusion",
      slug: "golden-turmeric-infusion",
      shortDesc: "Warming turmeric, ginger & lemongrass blend",
      description:
        "A warming, golden blend of turmeric, ginger, and lemongrass. Naturally caffeine-free and perfect for any time of day. This aromatic infusion is deeply nourishing and supports natural immunity.",
      ingredients: "Turmeric, ginger, lemongrass, black pepper, cinnamon",
      benefits:
        "Anti-inflammatory, supports immunity, aids digestion, warming and soothing",
      brewingGuide:
        "Boil water to 100°C. Steep 1 tablespoon per cup for 5-7 minutes. Add honey to taste.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "herbal,turmeric,wellness,caffeine-free,immunity",
      price: 2200,
      stock: 25,
      isFeatured: true,
      status: ProductStatus.PUBLISHED,
      weight: "100g",
      servings: "20-25 cups",
      categorySlug: "herbal-infusion",
    },
    {
      name: "Rift Valley Breakfast",
      slug: "rift-valley-breakfast",
      shortDesc: "Bold, malty black tea from the Great Rift Valley",
      description:
        "A robust, full-bodied breakfast blend from the Great Rift Valley. Malty notes with a satisfying finish. The perfect start to your day. This classic Kenyan black tea is beloved by tea connoisseurs worldwide.",
      ingredients: "100% premium Kenyan black tea leaves",
      benefits: "Natural energy, rich flavor, supports focus and alertness",
      brewingGuide:
        "Boil water to 100°C. Steep 1 teaspoon per cup for 3-4 minutes. Serve with milk and sugar to taste.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "black-tea,breakfast,classic,malty,kenyan",
      price: 1800,
      stock: 60,
      isFeatured: true,
      status: ProductStatus.PUBLISHED,
      weight: "120g",
      servings: "40-45 cups",
      categorySlug: "black-tea",
    },
    {
      name: "Lemongrass & Ginger Zest",
      slug: "lemongrass-ginger-zest",
      shortDesc: "Refreshing, zesty herbal infusion",
      description:
        "A refreshing, zesty herbal infusion made from Kenyan-grown lemongrass and ginger. Naturally caffeine-free and invigorating. Perfect served hot or iced on a warm day.",
      ingredients: "Lemongrass, ginger, lemon verbena",
      benefits: "Aids digestion, reduces inflammation, refreshing and calming",
      brewingGuide:
        "Boil water to 100°C. Steep 1 tablespoon per cup for 5 minutes. Enjoy plain or with honey.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "herbal,ginger,caffeine-free,refreshing,zesty",
      price: 1900,
      stock: 30,
      isFeatured: false,
      status: ProductStatus.PUBLISHED,
      weight: "80g",
      servings: "20-25 cups",
      categorySlug: "herbal-infusion",
    },
    {
      name: "Pure Kenyan Honey",
      slug: "pure-kenyan-honey",
      shortDesc: "Raw, pure honey from Kenyan beekeepers",
      description:
        "Pure, raw honey sourced directly from Kenyan beekeepers. Naturally sweet, rich in flavor, and packed with natural enzymes. The perfect natural sweetener for your tea or on its own. Unfiltered and unprocessed.",
      ingredients: "100% pure raw Kenyan honey",
      benefits:
        "Natural sweetener, rich in antioxidants, supports immunity, soothes sore throats",
      brewingGuide:
        "Enjoy a spoonful in your tea, on toast, or straight from the jar. Store at room temperature away from direct sunlight.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "honey,natural,sweetener,raw,kenyan",
      price: 1200,
      comparePrice: 1500,
      stock: 45,
      isFeatured: false,
      status: ProductStatus.PUBLISHED,
      weight: "250g",
      servings: "Approx. 50 servings",
      categorySlug: "honey",
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
