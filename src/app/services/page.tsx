import type { Metadata } from "next"

import { ServiceCard } from "@/components/services/service-card"
import { CtaBand } from "@/components/shared/cta-band"
import { PageHeader } from "@/components/shared/page-header"
import { Reveal } from "@/components/ui/reveal"
import { serviceCategories, servicesByCategory } from "@/data/services"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Massage therapies, ayurvedic and water-based wellness rituals, couple experiences and customised facials at Dream Spa in Gurukul, Ahmedabad.",
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Treatments"
        title="Nine treatments, each adjusted to the person on the bed."
        description="We keep the menu short on purpose. Every session is set up in conversation — pressure, oil and pace are decided with you before we start."
        aside={
          <nav aria-label="Service categories" className="flex flex-col gap-3">
            {serviceCategories.map((category) => (
              <a
                key={category.slug}
                href={`#${category.slug}`}
                className="eyebrow text-muted-foreground transition-colors hover:text-accent"
              >
                {category.name}
              </a>
            ))}
          </nav>
        }
      />

      {serviceCategories.map((category, categoryIndex) => {
        const items = servicesByCategory(category.slug)

        return (
          <section
            key={category.slug}
            id={category.slug}
            className="scroll-mt-24 border-b border-border py-20 last:border-b-0 lg:py-28"
          >
            <div className="shell">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-xl">
                  <span className="eyebrow flex items-center gap-3 text-muted-foreground">
                    <span aria-hidden="true" className="h-px w-8 bg-accent" />
                    {String(categoryIndex + 1).padStart(2, "0")}
                  </span>
                  <h2 className="display mt-5 text-3xl text-balance sm:text-4xl">
                    {category.name}
                  </h2>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-pretty text-muted-foreground">
                  {category.description}
                </p>
              </div>

              <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((service, index) => (
                  <Reveal as="li" key={service.slug} index={index}>
                    <ServiceCard
                      service={service}
                      priority={categoryIndex === 0 && index === 0}
                    />
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        )
      })}

      <CtaBand
        eyebrow="Not sure which one"
        title="Tell us how you feel and we will pick."
        description="A quick call is usually enough. Describe where you are stiff or how tired you are, and we will recommend the right session and length."
      />
    </>
  )
}
