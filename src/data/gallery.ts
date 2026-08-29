export type GalleryCategory = {
  id: string
  label: string
}

export type GalleryItem = {
  id: number
  title: string
  category: string
  categoryLabel: string
  description: string
  image: string
  aspect: string
}

export const galleryCategories: GalleryCategory[] = [
  { id: "all", label: "All Spaces" },
  { id: "rooms", label: "Treatment Rooms" },
  { id: "rituals", label: "Wellness Suites" },
  { id: "details", label: "Atmosphere & Details" },
]

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Private Treatment Suite",
    category: "rooms",
    categoryLabel: "Treatment Rooms",
    description:
      "Warm oak walls, blackout linen drapes, and dimmable soft daylight.",
    image: "/images/hero-treatment-room.png",
    aspect: "aspect-[16/10]",
  },
  {
    id: 2,
    title: "Reception & Tea Lounge",
    category: "details",
    categoryLabel: "Atmosphere",
    description:
      "Where every visit begins with a conversation and warm herbal tea.",
    image: "/images/about-reception.png",
    aspect: "aspect-[4/3]",
  },
  {
    id: 3,
    title: "Hydrotherapy & Jacuzzi Sanctuary",
    category: "rituals",
    categoryLabel: "Wellness Suites",
    description:
      "Temperature-controlled water jets for deep muscle relaxation.",
    image: "/images/services/jacuzzi-therapy.png",
    aspect: "aspect-[4/3]",
  },
  {
    id: 4,
    title: "Warm Oil & Fresh Linen Care",
    category: "details",
    categoryLabel: "Atmosphere",
    description:
      "Freshly pressed linen and organic essential oils prepared daily.",
    image: "/images/detail-towels.png",
    aspect: "aspect-[16/10]",
  },
  {
    id: 5,
    title: "Couple Therapy Suite",
    category: "rituals",
    categoryLabel: "Wellness Suites",
    description:
      "Side-by-side treatment beds designed for shared relaxation.",
    image: "/images/services/couple-massage.png",
    aspect: "aspect-[4/3]",
  },
  {
    id: 6,
    title: "Aromatherapy & Herbal Oils",
    category: "details",
    categoryLabel: "Atmosphere",
    description:
      "Custom-blended lavender, eucalyptus, and warm sesame oils.",
    image: "/images/services/aromatherapy-massage.png",
    aspect: "aspect-[4/3]",
  },
  {
    id: 7,
    title: "Signature Body Therapy Room",
    category: "rooms",
    categoryLabel: "Treatment Rooms",
    description:
      "Ergonomic tables and acoustic insulation for uninterrupted quiet.",
    image: "/images/services/signature-body-massage.png",
    aspect: "aspect-[16/10]",
  },
  {
    id: 8,
    title: "Ayurvedic Abhyanga Space",
    category: "rituals",
    categoryLabel: "Wellness Suites",
    description: "Traditional wooden droni tables and herbal decoctions.",
    image: "/images/services/ayurvedic-treatments.png",
    aspect: "aspect-[4/3]",
  },
]
