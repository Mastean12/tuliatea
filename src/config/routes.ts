export const routes = {
  home: "/",
  products: "/products",
  product: (slug: string) => `/products/${slug}`,
  cart: "/cart",
  checkout: "/checkout",
  account: {
    root: "/account",
    profile: "/account/profile",
    orders: "/account/orders",
    order: (id: string) => `/account/orders/${id}`,
    addresses: "/account/addresses",
    password: "/account/password",
    wishlist: "/account/wishlist",
  },
  auth: {
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
  },
  admin: {
    root: "/admin",
    products: "/admin/products",
    product: (id: string) => `/admin/products/${id}`,
    orders: "/admin/orders",
    order: (id: string) => `/admin/orders/${id}`,
    categories: "/admin/categories",
    coupons: "/admin/coupons",
    pages: "/admin/pages",
  },
  api: {
    auth: "/api/auth",
    register: "/api/register",
    products: "/api/products",
    orders: "/api/orders",
    categories: "/api/categories",
    upload: "/api/upload",
  },
  legal: {
    privacy: "/privacy",
    terms: "/terms",
    shipping: "/shipping",
    returns: "/returns",
  },
  static: {
    about: "/about",
    contact: "/contact",
    faq: "/faq",
    blog: "/blog",
  },
} as const

export type Routes = typeof routes
