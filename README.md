# Tullia Tea

**Premium Kenyan Wellness Teas & Herbal Infusions**

Tullia Tea is the signature brand of Rectangular Foods, a Kenyan-based agribusiness established in 2022. A woman-led enterprise crafting specialty teas and herbal infusions through value-addition of natural and preservative-free ingredients.

---

## Tech Stack

| Layer          | Technology                  |
| -------------- | --------------------------- |
| **Framework**  | Next.js 16 (App Router)     |
| **Language**   | TypeScript                  |
| **Styling**    | Tailwind CSS v4 + shadcn/ui |
| **Database**   | PostgreSQL (via Neon)       |
| **ORM**        | Prisma v7                   |
| **Auth**       | Auth.js v5 (next-auth)      |
| **State**      | Zustand                     |
| **Forms**      | React Hook Form + Zod       |
| **Images**     | Cloudinary                  |
| **Animations** | Framer Motion               |
| **Icons**      | Lucide React                |
| **Deployment** | Vercel                      |

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (Neon recommended)
- Cloudinary account

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable                | Required | Description                                               |
| ----------------------- | -------- | --------------------------------------------------------- |
| `DATABASE_URL`          | Yes      | PostgreSQL connection string                              |
| `AUTH_SECRET`           | Yes      | Auth.js encryption secret (run `openssl rand -base64 32`) |
| `CLOUDINARY_CLOUD_NAME` | Yes      | Cloudinary cloud name                                     |
| `CLOUDINARY_API_KEY`    | Yes      | Cloudinary API key                                        |
| `CLOUDINARY_API_SECRET` | Yes      | Cloudinary API secret                                     |
| `NEXT_PUBLIC_SITE_URL`  | No       | Site URL (default: http://localhost:3000)                 |

### Installation

```bash
npm install
npm run db:push    # Push schema to database
npm run db:seed    # Seed with products + test accounts
npm run dev        # Start development server
```

### Test Accounts

After seeding, you can log in with:

| Role         | Email               | Password   |
| ------------ | ------------------- | ---------- |
| **Admin**    | admin@tulliatea.com | Admin123!  |
| **Customer** | customer@test.com   | Customer1! |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Login, register, forgot/reset password
│   ├── (shop)/            # Public pages (home, products, about, contact, cart, checkout)
│   ├── admin/             # Admin dashboard (products, orders, CMS)
│   └── api/               # API routes (auth, products, orders, upload, media)
├── components/            # Reusable UI components
│   ├── admin/             # Admin-specific components
│   ├── auth/              # Auth forms
│   ├── cart/              # Cart sheet and items
│   ├── checkout/          # Checkout flow components
│   ├── contact/           # Contact page components
│   ├── dashboard/         # Customer dashboard components
│   ├── home/              # Homepage sections
│   ├── layout/            # Navbar, Footer
│   └── products/          # Product cards, filters, gallery
├── lib/                   # Shared utilities, auth config, Prisma client
│   ├── actions/           # Server actions
│   └── data/              # Static content and product data
├── config/                # Site configuration
├── hooks/                 # Custom hooks (useCart, useDebounce)
├── services/              # Business logic (orders, delivery, payment, notifications)
└── types/                 # TypeScript type definitions
```

---

## Key Features

### Customer Portal

- Browse products with search, filter, sort
- Product detail pages with gallery, brewing guide, health benefits
- Shopping cart with localStorage persistence
- Multi-step checkout (shipping → delivery → payment → review)
- Customer dashboard (profile, orders, addresses, wishlist)
- WhatsApp order notifications

### Admin Portal

- Dashboard with sales and order statistics
- Product management (CRUD with Cloudinary image upload)
- Category management
- Order management with status tracking and internal notes
- CMS for homepage, about, contact, footer content
- Media library with Cloudinary upload
- Collapsible sidebar

### Authentication

- Role-based auth (Customer / Admin / Super Admin)
- Separate login flows for customers and admins
- Session management with Auth.js (JWT strategy)
- Password reset flow

---

## Database

```bash
npm run db:push       # Push schema to database
npm run db:migrate    # Create and run migrations
npm run db:seed       # Seed data
npm run db:studio     # Open Prisma Studio
```

Key models: `User`, `Product`, `Category`, `ProductImage`, `Order`, `OrderItem`, `Address`, `Review`, `Coupon`, `Media`, `CmsSection`, `SiteSetting`

---

## Vercel Deployment

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in Vercel dashboard
4. Deploy — `postinstall` auto-runs `prisma generate`

Required environment variables on Vercel:

- `DATABASE_URL`
- `AUTH_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_SITE_URL`

---

## Brand Colors

| Color         | Hex       | Usage                              |
| ------------- | --------- | ---------------------------------- |
| Forest Green  | `#2E7D32` | Primary buttons, links, navigation |
| Sage Green    | `#66BB6A` | Hover states, borders, support     |
| Sunset Orange | `#F57C00` | Accent, badges, highlights         |
| Earth Clay    | `#B86A3A` | Sale badges, promotions            |
| Warm Cream    | `#FAF7F2` | Page background                    |
| Soft Sage     | `#F3F8F1` | Feature sections                   |

---

## Scripts

| Script              | Purpose               |
| ------------------- | --------------------- |
| `npm run dev`       | Start dev server      |
| `npm run build`     | Production build      |
| `npm run lint`      | Run ESLint            |
| `npm run format`    | Format with Prettier  |
| `npm run typecheck` | TypeScript type check |
| `npm run db:push`   | Push schema to DB     |
| `npm run db:seed`   | Seed database         |
| `npm run prepare`   | Husky install         |

---

## License

© 2026 Rectangular Foods. All rights reserved.
