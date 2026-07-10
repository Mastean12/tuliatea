import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  const categories = [
    {
      name: "Green Tea",
      slug: "green-tea",
      description: "Premium Kenyan green teas",
      sortOrder: 1,
    },
    {
      name: "Purple Tea",
      slug: "purple-tea",
      description: "Antioxidant-rich purple teas",
      sortOrder: 2,
    },
    {
      name: "Herbal Infusion",
      slug: "herbal-infusion",
      description: "Naturally caffeine-free herbal blends",
      sortOrder: 3,
    },
    {
      name: "Honey",
      slug: "honey",
      description: "Pure Kenyan honey",
      sortOrder: 4,
    },
    {
      name: "Black Tea",
      slug: "black-tea",
      description: "Full-bodied Kenyan black teas",
      sortOrder: 5,
    },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    })
  }

  const catMap = new Map<string, string>()
  for (const cat of categories) {
    const c = await prisma.category.findUnique({ where: { slug: cat.slug } })
    if (c) catMap.set(cat.slug, c.id)
  }

  const products = [
    {
      name: "Kenyan Sunrise Black Tea",
      slug: "kenyan-sunrise-black-tea",
      description:
        "A bold, full-bodied black tea from the highlands of Kenya. Rich in flavor with a bright copper liquor and smooth finish. Perfect for breakfast or anytime you need a robust cup.",
      ingredients: "100% premium Kenyan black tea leaves",
      benefits:
        "Rich in antioxidants, natural energy boost, supports heart health",
      brewingGuide:
        "Boil fresh water to 100°C. Steep 1 teaspoon per cup for 3-5 minutes. Serve plain or with milk.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide. International shipping available.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "black-tea,breakfast,classic,kenyan",
      price: 1500,
      stock: 50,
      isFeatured: true,
      weight: "100g",
      categorySlug: "black-tea",
    },
    {
      name: "Serenity Green Tea",
      slug: "serenity-green-tea",
      description:
        "A delicate, soothing green tea with grassy notes and a clean finish. Sourced from the finest tea gardens in Kenya. Light, refreshing, and packed with natural goodness.",
      ingredients: "100% premium Kenyan green tea leaves",
      benefits:
        "High in catechins, boosts metabolism, supports brain function, rich in antioxidants",
      brewingGuide:
        "Heat water to 80°C. Steep 1 teaspoon per cup for 2-3 minutes. Do not use boiling water.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide. International shipping available.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "green-tea,antioxidant,light,refreshing",
      price: 1800,
      comparePrice: 2200,
      stock: 35,
      isFeatured: true,
      weight: "80g",
      categorySlug: "green-tea",
    },
    {
      name: "Golden Turmeric Infusion",
      slug: "golden-turmeric-infusion",
      description:
        "A warming, golden blend of turmeric, ginger, and lemongrass. Naturally caffeine-free and perfect for any time of day. Soothing, aromatic, and deeply nourishing.",
      ingredients: "Turmeric, ginger, lemongrass, black pepper, cinnamon",
      benefits:
        "Anti-inflammatory, supports immunity, aids digestion, warming and soothing",
      brewingGuide:
        "Boil water to 100°C. Steep 1 tablespoon per cup for 5-7 minutes. Add honey to taste.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide. International shipping available.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "herbal,turmeric,wellness,caffeine-free",
      price: 2200,
      stock: 25,
      isFeatured: true,
      weight: "100g",
      categorySlug: "herbal-infusion",
    },
    {
      name: "Moringa Wellness Tea",
      slug: "moringa-wellness-tea",
      description:
        "Pure Kenyan moringa leaf tea packed with natural antioxidants and nutrients. A vibrant green infusion that supports daily wellness and natural energy.",
      ingredients: "100% organic Kenyan moringa leaves",
      benefits:
        "High in vitamins A, C, and E, supports energy, rich in iron and calcium",
      brewingGuide:
        "Heat water to 85°C. Steep 1 teaspoon per cup for 3-4 minutes. Enjoy plain or with a touch of honey.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide. International shipping available.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "moringa,superfood,wellness,nutritious",
      price: 1600,
      stock: 40,
      isFeatured: true,
      weight: "75g",
      categorySlug: "herbal-infusion",
    },
    {
      name: "Rift Valley Breakfast",
      slug: "rift-valley-breakfast",
      description:
        "A robust, full-bodied breakfast blend from the Great Rift Valley. Malty notes with a satisfying finish. The perfect start to your day.",
      ingredients: "100% premium Kenyan black tea leaves",
      benefits: "Natural energy, rich flavor, supports focus and alertness",
      brewingGuide:
        "Boil water to 100°C. Steep 1 teaspoon per cup for 3-4 minutes. Serve with milk and sugar to taste.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide. International shipping available.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "black-tea,breakfast,classic,malty",
      price: 1800,
      stock: 60,
      isFeatured: true,
      weight: "120g",
      categorySlug: "black-tea",
    },
    {
      name: "Lemongrass & Ginger Zest",
      slug: "lemongrass-ginger-zest",
      description:
        "A refreshing, zesty herbal infusion made from Kenyan-grown lemongrass and ginger. Naturally caffeine-free and invigorating. Perfect hot or iced.",
      ingredients: "Lemongrass, ginger, lemon verbena",
      benefits: "Aids digestion, reduces inflammation, refreshing and calming",
      brewingGuide:
        "Boil water to 100°C. Steep 1 tablespoon per cup for 5 minutes. Enjoy plain or with honey.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide. International shipping available.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "herbal,ginger,caffeine-free,refreshing",
      price: 1900,
      stock: 30,
      isFeatured: false,
      weight: "80g",
      categorySlug: "herbal-infusion",
    },
    {
      name: "Earl Grey Lavender",
      slug: "earl-grey-lavender",
      description:
        "Classic Earl Grey with a twist of Kenyan lavender. Bergamot notes meet floral elegance for a truly premium cup. A sophisticated blend for tea connoisseurs.",
      ingredients: "Kenyan black tea, bergamot oil, lavender flowers",
      benefits: "Calming, aromatic, supports relaxation, rich in antioxidants",
      brewingGuide:
        "Boil water to 100°C. Steep 1 teaspoon per cup for 3-4 minutes. Serve plain to appreciate the floral notes.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide. International shipping available.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "black-tea,floral,premium,earl-grey",
      price: 2100,
      stock: 20,
      isFeatured: false,
      weight: "100g",
      categorySlug: "black-tea",
    },
    {
      name: "Chamomile & Honeybush",
      slug: "chamomile-honeybush",
      description:
        "A calming, caffeine-free blend of chamomile and honeybush. Sweet, floral, and perfect for evening relaxation. Naturally soothing and gently sweet.",
      ingredients: "Chamomile flowers, honeybush, natural flavor",
      benefits:
        "Promotes sleep, reduces anxiety, supports digestion, caffeine-free",
      brewingGuide:
        "Boil water to 100°C. Steep 1 tablespoon per cup for 5-7 minutes. Enjoy before bed for best results.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide. International shipping available.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "herbal,chamomile,bedtime,caffeine-free",
      price: 2000,
      stock: 25,
      isFeatured: true,
      weight: "75g",
      categorySlug: "herbal-infusion",
    },
    {
      name: "Kenyan Purple Tea",
      slug: "kenyan-purple-tea",
      description:
        "A rare and exquisite purple tea from Kenya. Naturally rich in anthocyanins — the same antioxidants found in blueberries. Smooth, slightly sweet, with a unique earthy flavor.",
      ingredients: "100% Kenyan purple tea leaves",
      benefits:
        "High in anthocyanins, supports heart health, rich in antioxidants, unique flavor profile",
      brewingGuide:
        "Heat water to 85°C. Steep 1 teaspoon per cup for 2-3 minutes. Watch the color transform from green to purple.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide. International shipping available.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "purple-tea,antioxidant,rare,premium",
      price: 2800,
      comparePrice: 3200,
      stock: 15,
      isFeatured: true,
      weight: "75g",
      categorySlug: "purple-tea",
    },
    {
      name: "Pure Kenyan Honey",
      slug: "pure-kenyan-honey",
      description:
        "Pure, raw honey sourced from Kenyan beekeepers. Naturally sweet, rich in flavor, and packed with natural enzymes. Perfect with tea or on its own.",
      ingredients: "100% pure raw Kenyan honey",
      benefits:
        "Natural sweetener, rich in antioxidants, supports immunity, soothes sore throats",
      brewingGuide:
        "Enjoy a spoonful in your tea, on toast, or straight from the jar. Store at room temperature.",
      deliveryInfo:
        "Delivered within 1-3 business days in Nairobi, 3-7 days nationwide. International shipping available.",
      returnInfo:
        "If unsatisfied, contact us within 14 days of delivery for a full refund or exchange.",
      tags: "honey,natural,sweetener,raw",
      price: 1200,
      stock: 45,
      isFeatured: false,
      weight: "250g",
      categorySlug: "honey",
    },
  ]

  for (const p of products) {
    const categoryId = catMap.get(p.categorySlug)
    if (!categoryId) {
      console.warn(`  ⚠ Category not found for ${p.name}, skipping`)
      continue
    }
    const { categorySlug: _catSlug, ...data } = p
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { ...data, categoryId },
      create: { ...data, categoryId },
    })
  }

  console.log("✅ Seeding complete.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
