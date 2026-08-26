import type { NavLink } from "@/types"
import { serviceCategories } from "@/data/services"

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: serviceCategories.map((category) => ({
      label: category.name,
      href: `/services#${category.slug}`,
      description: category.description,
    })),
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
]
