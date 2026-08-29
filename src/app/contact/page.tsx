import type { Metadata } from "next"

import { ContactForm } from "@/components/contact/contact-form"
import { ContactHero } from "@/components/contact/contact-hero"
import { CtaBand } from "@/components/shared/cta-band"
import { LocationPanel } from "@/components/shared/location-panel"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Dream Spa in Gurukul, Ahmedabad. View location directions, operating hours, and contact details to book your therapy session.",
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <LocationPanel />
    </>
  )
}
