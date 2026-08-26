export type ServiceCategorySlug =
  | "massage-therapies"
  | "wellness-rituals"
  | "couple-experiences"
  | "beauty-and-skin"

export type ServiceCategory = {
  slug: ServiceCategorySlug
  name: string
  description: string
}

export type Service = {
  slug: string
  name: string
  category: ServiceCategorySlug
  /** One-line summary used on cards and listings. */
  summary: string
  /** Longer editorial copy used on the service detail page. */
  description: string[]
  /** Indicative session length. */
  duration: string
  benefits: string[]
  expect: { title: string; body: string }[]
  image: SiteImage
  featured?: boolean
}

export type SiteImage = {
  src: string
  alt: string
  /** Note for the client so real photography can replace this asset. */
  replace: string
}

export type Testimonial = {
  id: string
  quote: string
  name: string
  rating: number
  context: string
}

export type NavLink = {
  label: string
  href: string
  children?: { label: string; href: string; description?: string }[]
}
