export type NavItem = {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: string
  children?: NavItem[]
}

export const mainNav: NavItem[] = [
  { title: "Shop", href: "/products" },
  { title: "About", href: "/about" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
]

export const shopNav: NavItem[] = [
  { title: "All Teas", href: "/products" },
  { title: "New Arrivals", href: "/products?sort=newest" },
  { title: "Best Sellers", href: "/products?sort=bestsellers" },
  { title: "Gift Sets", href: "/products?category=gift-sets" },
]

export const accountNav: NavItem[] = [
  { title: "Profile", href: "/account" },
  { title: "Orders", href: "/account/orders" },
  { title: "Addresses", href: "/account/addresses" },
  { title: "Settings", href: "/account/settings" },
]

export const adminNav: NavItem[] = [
  { title: "Dashboard", href: "/admin" },
  { title: "Products", href: "/admin/products" },
  { title: "Orders", href: "/admin/orders" },
  { title: "Categories", href: "/admin/categories" },
  { title: "Coupons", href: "/admin/coupons" },
  { title: "Pages", href: "/admin/pages" },
]
