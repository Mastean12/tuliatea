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

const productImages: Record<string, string[]> = {
  "pure-orthodox-green-tea": [
    U("1556679343-c7306c1976bc"),
    U("1564890369478-c89ca6d9cde9"),
  ],
  "green-tea-with-shell-ginger": [
    U("1564890369478-c89ca6d9cde9"),
    U("1556679343-c7306c1976bc"),
  ],
  "pure-green-tea": [
    U("1556679343-c7306c1976bc"),
    U("1564890369478-c89ca6d9cde9"),
  ],
  "pure-orthodox-purple-tea": [
    U("1594631252845-29fc4cc8cde9"),
    U("1556881286-fc6915169721"),
  ],
  "purple-tea-with-lemon-verbena": [
    U("1556881286-fc6915169721"),
    U("1594631252845-29fc4cc8cde9"),
  ],
  "chamomile-with-peppermint": [
    U("1556881286-fc6915169721"),
    U("1563911892437-1feda0179e1b"),
  ],
  "hibiscus-with-lemongrass": [
    U("1563911892437-1feda0179e1b"),
    U("1556881286-fc6915169721"),
  ],
  "turmeric-with-baobab": [
    U("1563911892437-1feda0179e1b"),
    U("1594631252845-29fc4cc8cde9"),
  ],
  "pure-honey": [U("1556881286-fc6915169721"), U("1564890369478-c89ca6d9cde9")],
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
      name: "Pure Orthodox Green Tea",
      slug: "pure-orthodox-green-tea",
      shortDesc: "Traditional orthodox green tea from Kenyan highlands",
      description:
        "A premium orthodox green tea made from carefully selected tea leaves. Light, refreshing, and packed with natural antioxidants. The traditional processing method preserves the leaf's natural character and delicate flavor profile.",
      ingredients: "100% premium Kenyan green tea leaves",
      benefits:
        "High in catechins, boosts metabolism, supports brain function, rich in antioxidants. Best enjoyed in the morning or early afternoon for a gentle energy lift.",
      brewingGuide:
        "Heat water to 80°C. Steep 1 teaspoon per cup for 2-3 minutes. Do not use boiling water. Best time to drink: Morning or early afternoon.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "green-tea,orthodox,antioxidant,kenyan",
      price: 1800,
      stock: 50,
      isFeatured: true,
      isBestSeller: true,
      status: ProductStatus.PUBLISHED,
      weight: "80g",
      servings: "25-30 cups",
      categorySlug: "green-tea",
    },
    {
      name: "Green Tea with Shell Ginger",
      slug: "green-tea-with-shell-ginger",
      shortDesc: "Green tea infused with aromatic shell ginger",
      description:
        "A fragrant blend of premium Kenyan green tea and shell ginger. The subtle floral and spicy notes of shell ginger complement the grassy freshness of green tea, creating a uniquely aromatic and soothing cup.",
      ingredients: "Kenyan green tea, shell ginger",
      benefits:
        "Aids digestion, reduces inflammation, supports immunity. The shell ginger adds a warming quality that makes this blend ideal for afternoon enjoyment.",
      brewingGuide:
        "Heat water to 80°C. Steep 1 teaspoon per cup for 2-3 minutes. Best time to drink: Afternoon.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "green-tea,ginger,aromatic,kenyan",
      price: 2200,
      stock: 30,
      isFeatured: true,
      isBestSeller: false,
      status: ProductStatus.PUBLISHED,
      weight: "80g",
      servings: "25-30 cups",
      categorySlug: "green-tea",
    },
    {
      name: "Pure Green Tea",
      slug: "pure-green-tea",
      shortDesc: "Classic pure Kenyan green tea",
      description:
        "A clean, pure green tea from the Kenyan highlands. Bright, vegetal notes with a smooth finish. This everyday green tea delivers consistent quality and refreshing taste in every cup.",
      ingredients: "100% premium Kenyan green tea leaves",
      benefits:
        "Rich in antioxidants, supports heart health, boosts metabolism. Perfect for daily wellness routines.",
      brewingGuide:
        "Heat water to 80°C. Steep 1 teaspoon per cup for 2-3 minutes. Best time to drink: Morning or afternoon.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "green-tea,classic,daily,kenyan",
      price: 1500,
      stock: 60,
      isFeatured: true,
      isBestSeller: true,
      status: ProductStatus.PUBLISHED,
      weight: "100g",
      servings: "30-35 cups",
      categorySlug: "green-tea",
    },
    {
      name: "Pure Orthodox Purple Tea",
      slug: "pure-orthodox-purple-tea",
      shortDesc: "Rare orthodox purple tea from Kenya",
      description:
        "A rare and exquisite purple tea from Kenya. Naturally rich in anthocyanins — the same antioxidants found in blueberries. The orthodox processing method preserves the tea's unique purple hue and smooth, slightly sweet flavor.",
      ingredients: "100% Kenyan purple tea leaves",
      benefits:
        "High in anthocyanins, supports heart health, rich in antioxidants, unique flavor profile. A premium tea for connoisseurs.",
      brewingGuide:
        "Heat water to 85°C. Steep 1 teaspoon per cup for 2-3 minutes. Watch the color transform from green to purple. Best time to drink: Afternoon.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "purple-tea,orthodox,antioxidant,premium,kenyan",
      price: 2800,
      comparePrice: 3200,
      stock: 20,
      isFeatured: true,
      isBestSeller: true,
      status: ProductStatus.PUBLISHED,
      weight: "75g",
      servings: "20-25 cups",
      categorySlug: "purple-tea",
    },
    {
      name: "Purple Tea with Lemon Verbena",
      slug: "purple-tea-with-lemon-verbena",
      shortDesc: "Purple tea blended with refreshing lemon verbena",
      description:
        "A vibrant blend of rare Kenyan purple tea and lemon verbena. The citrusy, refreshing notes of lemon verbena perfectly complement the smooth, earthy character of purple tea. A uniquely uplifting cup.",
      ingredients: "Kenyan purple tea, lemon verbena",
      benefits:
        "Rich in anthocyanins, aids digestion, refreshing, supports relaxation. The lemon verbena adds a calming yet uplifting quality.",
      brewingGuide:
        "Heat water to 85°C. Steep 1 teaspoon per cup for 2-3 minutes. Best time to drink: Afternoon or evening.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "purple-tea,lemon-verbena,refreshing,kenyan",
      price: 2600,
      stock: 25,
      isFeatured: false,
      isBestSeller: false,
      status: ProductStatus.PUBLISHED,
      weight: "75g",
      servings: "20-25 cups",
      categorySlug: "purple-tea",
    },
    {
      name: "Chamomile with Peppermint",
      slug: "chamomile-with-peppermint",
      shortDesc: "Soothing chamomile blended with cooling peppermint",
      description:
        "A calming caffeine-free blend of chamomile flowers and peppermint leaves. The sweet, apple-like notes of chamomile are balanced by the cool, refreshing finish of peppermint. Perfect for evening relaxation.",
      ingredients: "Chamomile flowers, peppermint leaves",
      benefits:
        "Promotes relaxation, aids digestion, reduces anxiety, caffeine-free. Ideal for evening wind-down or after meals.",
      brewingGuide:
        "Boil water to 100°C. Steep 1 tablespoon per cup for 5-7 minutes. Best time to drink: Evening or before bed.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "herbal,chamomile,peppermint,bedtime,caffeine-free",
      price: 2000,
      stock: 35,
      isFeatured: true,
      isBestSeller: false,
      status: ProductStatus.PUBLISHED,
      weight: "80g",
      servings: "25-30 cups",
      categorySlug: "herbal-infusion",
    },
    {
      name: "Hibiscus with Lemongrass",
      slug: "hibiscus-with-lemongrass",
      shortDesc: "Vibrant hibiscus with zesty lemongrass",
      description:
        "A vibrant, tangy herbal infusion made from hibiscus petals and lemongrass. Naturally caffeine-free and packed with vitamin C. Bright crimson in color with a refreshing citrus finish.",
      ingredients: "Hibiscus flowers, lemongrass",
      benefits:
        "Rich in vitamin C, supports immunity, aids hydration, refreshing. Enjoy hot or iced for a refreshing wellness drink.",
      brewingGuide:
        "Boil water to 100°C. Steep 1 tablespoon per cup for 5-7 minutes. Serve hot or chilled over ice. Best time to drink: Any time of day.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "herbal,hibiscus,lemongrass,vitamin-c,caffeine-free",
      price: 1900,
      stock: 30,
      isFeatured: false,
      isBestSeller: false,
      status: ProductStatus.PUBLISHED,
      weight: "80g",
      servings: "25-30 cups",
      categorySlug: "herbal-infusion",
    },
    {
      name: "Turmeric with Baobab",
      slug: "turmeric-with-baobab",
      shortDesc: "Golden turmeric blended with vitamin-rich baobab",
      description:
        "A warming, golden blend of turmeric and baobab fruit powder. Turmeric's earthy, anti-inflammatory properties are complemented by the tangy, vitamin C-rich baobab. Naturally caffeine-free and deeply nourishing.",
      ingredients: "Turmeric, baobab powder, ginger, black pepper",
      benefits:
        "Anti-inflammatory, rich in vitamin C, supports immunity, aids digestion. The black pepper enhances turmeric absorption.",
      brewingGuide:
        "Boil water to 100°C. Steep 1 tablespoon per cup for 5-7 minutes. Add honey to taste. Best time to drink: Morning or afternoon.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "herbal,turmeric,baobab,immunity,caffeine-free",
      price: 2400,
      stock: 25,
      isFeatured: true,
      isBestSeller: false,
      status: ProductStatus.PUBLISHED,
      weight: "100g",
      servings: "20-25 cups",
      categorySlug: "herbal-infusion",
    },
    {
      name: "Pure Honey",
      slug: "pure-honey",
      shortDesc: "Pure raw honey from Kenyan beekeepers",
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
      isBestSeller: false,
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
