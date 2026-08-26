import type { Service, ServiceCategory, ServiceCategorySlug } from "@/types"

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "massage-therapies",
    name: "Massage Therapies",
    description: "Classic and deep bodywork, adapted to how you feel that day.",
  },
  {
    slug: "wellness-rituals",
    name: "Wellness Rituals",
    description: "Ayurvedic and water-based treatments for slower, fuller recovery.",
  },
  {
    slug: "couple-experiences",
    name: "Couple Experiences",
    description: "Two therapists, one private room, shared quiet.",
  },
  {
    slug: "beauty-and-skin",
    name: "Beauty & Skin",
    description: "Facials built around your skin rather than a fixed menu.",
  },
]

export const services: Service[] = [
  {
    slug: "signature-body-massage",
    name: "Signature Body Massage",
    category: "massage-therapies",
    summary:
      "A full-body session that reads your tension first and sets the pressure to match.",
    description: [
      "Our most requested treatment, and the one we recommend for a first visit. The therapist begins with a short conversation about how your body feels, where you carry stress and how much pressure you actually enjoy.",
      "Long, continuous strokes move from the back and shoulders through the legs, arms and neck, warming the tissue before working into it. The rhythm stays steady from beginning to end, which is what allows the nervous system to settle.",
    ],
    duration: "60 – 90 min",
    benefits: [
      "Releases everyday tension across the back, neck and shoulders",
      "Improves circulation and eases stiffness",
      "Calms the nervous system and supports better sleep",
    ],
    expect: [
      {
        title: "Before",
        body: "A brief consultation, a change of clothes and a few quiet minutes with warm water.",
      },
      {
        title: "During",
        body: "Warm oil, dimmed light and continuous pressure that stays within your comfort.",
      },
      {
        title: "After",
        body: "Time to sit, rehydrate and leave without being rushed.",
      },
    ],
    image: {
      src: "/images/services/signature-body-massage.png",
      alt: "Therapist performing a full-body massage in a warmly lit treatment room",
      replace: "client photo — signature body massage in the treatment room",
    },
    featured: true,
  },
  {
    slug: "deep-tissue-massage",
    name: "Deep Tissue Massage",
    category: "massage-therapies",
    summary:
      "Slow, focused pressure for the knots that a lighter massage never quite reaches.",
    description: [
      "Deep tissue work is deliberate and unhurried. The therapist stays with one area at a time, working through the deeper layers of muscle and connective tissue rather than covering the whole body quickly.",
      "It suits desk-bound shoulders, long-commute backs and anyone who trains regularly. Pressure is always negotiated, never assumed.",
    ],
    duration: "60 – 90 min",
    benefits: [
      "Targets chronic knots and long-held muscular tightness",
      "Helps restore range of movement",
      "Supports recovery after physical work or training",
    ],
    expect: [
      {
        title: "Before",
        body: "We map the areas that need attention and agree on a comfortable pressure.",
      },
      {
        title: "During",
        body: "Slower strokes, sustained pressure and regular check-ins as we work deeper.",
      },
      {
        title: "After",
        body: "Gentle stretching guidance and a reminder to drink plenty of water.",
      },
    ],
    image: {
      src: "/images/services/deep-tissue-massage.png",
      alt: "Close view of a therapist applying focused pressure to a guest's shoulder",
      replace: "client photo — deep tissue treatment detail",
    },
    featured: true,
  },
  {
    slug: "aromatherapy-massage",
    name: "Aromatherapy Massage",
    category: "massage-therapies",
    summary:
      "Light, flowing strokes with a blend of essential oils chosen for you.",
    description: [
      "Aromatherapy is the gentlest treatment on our menu. You choose from a small selection of essential oil blends, and the therapist works with lighter, flowing pressure so the scent and the touch do the work together.",
      "It is the session to book when you are more mentally tired than physically sore.",
    ],
    duration: "60 min",
    benefits: [
      "Eases mental fatigue and restlessness",
      "Leaves skin soft and conditioned",
      "A gentle option for first-time guests",
    ],
    expect: [
      {
        title: "Before",
        body: "You choose your oil blend from a short, seasonal selection.",
      },
      {
        title: "During",
        body: "Light, rhythmic strokes over the full body with warmed oil.",
      },
      {
        title: "After",
        body: "A quiet moment and a warm drink before you head out.",
      },
    ],
    image: {
      src: "/images/services/aromatherapy-massage.png",
      alt: "Small glass bottles of aromatherapy oils beside folded towels",
      replace: "client photo — aromatherapy oil selection",
    },
    featured: true,
  },
  {
    slug: "hot-oil-massage",
    name: "Hot Oil Massage",
    category: "massage-therapies",
    summary: "Warm, generously applied oil that loosens the body before the pressure begins.",
    description: [
      "Warmed oil is poured slowly and worked in with the palms, so the muscle softens before any real pressure arrives. Guests describe it as the most comforting treatment we offer, particularly in cooler months.",
      "Pressure sits between our aromatherapy and deep tissue sessions.",
    ],
    duration: "60 – 90 min",
    benefits: [
      "Deeply warming and comforting",
      "Relieves dryness and stiffness",
      "Prepares the body for deeper work",
    ],
    expect: [
      { title: "Before", body: "A warm shower and a short consultation." },
      { title: "During", body: "Continuously warmed oil, applied in slow layers." },
      { title: "After", body: "Rest time before you dress and leave." },
    ],
    image: {
      src: "/images/services/hot-oil-massage.png",
      alt: "Warm oil being poured over a guest's back during a massage",
      replace: "client photo — hot oil treatment",
    },
  },
  {
    slug: "swedish-massage",
    name: "Swedish Massage",
    category: "massage-therapies",
    summary: "The classic relaxation massage — even pressure, steady rhythm, no surprises.",
    description: [
      "A well-executed Swedish massage remains one of the best ways to unwind. Long gliding strokes, kneading and light percussion move over the full body at a consistent, medium pressure.",
      "If you want something dependable rather than intense, start here.",
    ],
    duration: "60 min",
    benefits: [
      "Reduces general fatigue and stress",
      "Improves circulation",
      "Comfortable, predictable pressure throughout",
    ],
    expect: [
      { title: "Before", body: "A short chat about pressure preference." },
      { title: "During", body: "Even, flowing strokes across the full body." },
      { title: "After", body: "Water, quiet and unhurried time to gather yourself." },
    ],
    image: {
      src: "/images/services/swedish-massage.png",
      alt: "Guest relaxing face down on a massage bed with folded white towels",
      replace: "client photo — Swedish massage session",
    },
  },
  {
    slug: "ayurvedic-treatments",
    name: "Ayurvedic Treatments",
    category: "wellness-rituals",
    summary: "Traditional herbal-oil therapies performed at an unhurried pace.",
    description: [
      "Our ayurvedic treatments follow traditional technique: warm herbal oils, methodical strokes and a pace that does not rush. The therapist selects the oil after a short discussion about your constitution and how you have been feeling.",
      "These sessions are best experienced as a course rather than a one-off.",
    ],
    duration: "75 – 90 min",
    benefits: [
      "Grounding and restorative",
      "Nourishes skin and joints with herbal oils",
      "Suited to a regular wellness routine",
    ],
    expect: [
      { title: "Before", body: "A short consultation to choose the right oil." },
      { title: "During", body: "Methodical strokes with continuously warmed herbal oil." },
      { title: "After", body: "Guidance on rest, food and follow-up sessions." },
    ],
    image: {
      src: "/images/services/ayurvedic-treatments.png",
      alt: "Brass bowl of herbal oil with dried herbs on a wooden tray",
      replace: "client photo — ayurvedic oils and preparation tray",
    },
  },
  {
    slug: "jacuzzi-therapy",
    name: "Jacuzzi Therapy",
    category: "wellness-rituals",
    summary: "Warm water and jets to loosen the body before or after a treatment.",
    description: [
      "A warm jacuzzi session is a simple, effective way to release surface tension. Water pressure works over the back, hips and legs while the heat opens up circulation.",
      "Most guests pair it with a massage — before, to soften the muscle, or after, to extend the calm.",
    ],
    duration: "20 – 30 min",
    benefits: [
      "Soothes tired legs and lower back",
      "Warms the body ahead of deeper bodywork",
      "Extends the relaxation of a massage",
    ],
    expect: [
      { title: "Before", body: "A rinse and a towel; the water is set to a comfortable temperature." },
      { title: "During", body: "Private time in the jacuzzi with the jets set to your liking." },
      { title: "After", body: "Cool water, a robe and a quiet space to rest." },
    ],
    image: {
      src: "/images/services/jacuzzi-therapy.png",
      alt: "Warm jacuzzi with rippling water and candlelight in a stone-lined room",
      replace: "client photo — jacuzzi room",
    },
  },
  {
    slug: "couple-massage",
    name: "Couple Massage",
    category: "couple-experiences",
    summary: "Two therapists, one private room, side-by-side treatment.",
    description: [
      "A shared session in a private double room, with a therapist for each of you. Pressure and treatment style are chosen individually, so you do not have to agree on anything except the time.",
      "A quiet way to spend an hour together without a conversation to maintain.",
    ],
    duration: "60 – 90 min",
    benefits: [
      "Complete privacy for two",
      "Individually adjusted pressure and oils",
      "A calm alternative to a usual evening out",
    ],
    expect: [
      { title: "Before", body: "Separate short consultations, then you settle in together." },
      { title: "During", body: "Two therapists working in parallel in a private room." },
      { title: "After", body: "Time in the room to rest before you leave." },
    ],
    image: {
      src: "/images/services/couple-massage.png",
      alt: "Private double treatment room with two massage beds and warm lighting",
      replace: "client photo — couple treatment room",
    },
  },
  {
    slug: "customised-facial",
    name: "Customised Facial",
    category: "beauty-and-skin",
    summary: "Cleanse, exfoliate, massage and mask — sequenced for your skin.",
    description: [
      "Rather than a fixed facial menu, we assess your skin first and build the session around it: cleansing, gentle exfoliation, extraction where needed, facial massage and a mask matched to your skin's condition that day.",
      "Expect a calm, methodical treatment with visible freshness afterwards rather than dramatic promises.",
    ],
    duration: "45 – 60 min",
    benefits: [
      "Clears congestion and dullness",
      "Relieves tension around the jaw, brow and temples",
      "Products chosen for your skin type on the day",
    ],
    expect: [
      { title: "Before", body: "A skin assessment under good light." },
      { title: "During", body: "Cleansing, exfoliation, facial massage and a suitable mask." },
      { title: "After", body: "Simple aftercare guidance — no product pressure." },
    ],
    image: {
      src: "/images/services/customised-facial.png",
      alt: "Guest receiving a facial treatment with a therapist applying product",
      replace: "client photo — facial treatment",
    },
  },
]

export const featuredServices = services.filter((service) => service.featured)

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export function getCategory(slug: ServiceCategorySlug): ServiceCategory {
  const category = serviceCategories.find((item) => item.slug === slug)
  if (!category) throw new Error(`Unknown service category: ${slug}`)
  return category
}

export function servicesByCategory(slug: ServiceCategorySlug): Service[] {
  return services.filter((service) => service.category === slug)
}

export function relatedServices(service: Service, limit = 3): Service[] {
  const sameCategory = services.filter(
    (item) => item.category === service.category && item.slug !== service.slug,
  )
  const others = services.filter(
    (item) => item.category !== service.category && item.slug !== service.slug,
  )
  return [...sameCategory, ...others].slice(0, limit)
}
