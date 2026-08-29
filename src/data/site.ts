/**
 * Single source of truth for Dream Spa business information.
 * Update here and it propagates across the entire site.
 */

export const site = {
  name: "Dream Spa",
  tagline: "Beauty & wellness spa in Ahmedabad",
  established: 2019,
  url: "https://dreamspaahmedabad.in",
  description:
    "Dream Spa is a beauty and wellness spa in Gurukul, Ahmedabad, offering personalised massage therapies, ayurvedic treatments and skin care in a calm, private setting.",
  address: {
    line1: "A-112, 1st Floor, Sanskrut Galleria",
    line2: "Subhash Chowk, Behind Hanuman Mandir",
    area: "Tarun Nagar Part 2, Gurukul",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380052",
  },
  phone: {
    display: "+91 88666 65784",
    href: "tel:+918866665784",
    whatsapp: "https://wa.me/918866665784",
  },
  hours: [
    { days: "Monday – Saturday", time: "10:00 am – 9:00 pm" },
    { days: "Sunday", time: "10:00 am – 9:00 pm" },
  ],
  /** Short, verifiable note instead of an unverifiable claim. */
  hoursNote: "Appointments recommended. Walk-ins subject to availability.",
  maps: {
    /** Embed of the street address — no scraped imagery or review data. */
    embed:
      "https://www.google.com/maps?q=Sanskrut+Galleria,+Subhash+Chowk,+Gurukul,+Ahmedabad,+Gujarat+380052&output=embed",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Sanskrut+Galleria,+Subhash+Chowk,+Gurukul,+Ahmedabad,+Gujarat+380052",
  },
  social: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/dream_spa_gurukul/?hl=en",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/people/Dream-Spa/61553850848736/?locale=fo_FO#",
    },
    {
      label: "Google",
      href: "https://share.google/O6Dy4YQyRecYsC0YH",
    },
    {
      label: "Justdial",
      href: "https://www.justdial.com/Ahmedabad/Dream-Spa-Behind-Hanuman-Mandir-Gurukul/079PXX79-XX79-231108151707-L5N9_BZDET",
    },
  ],
} as const

export const fullAddress = [
  site.address.line1,
  site.address.line2,
  site.address.area,
  `${site.address.city}, ${site.address.state} ${site.address.pincode}`,
].join(", ")

export const yearsOfCare = new Date().getFullYear() - site.established
