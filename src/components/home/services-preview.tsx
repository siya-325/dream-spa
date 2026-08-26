import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ServiceCard } from "@/components/services/service-card"
import { buttonVariants } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import { featuredServices } from "@/data/services"
import { cn } from "@/lib/utils"

export function ServicesPreview() {
  return (
    <section className="py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-border pb-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow flex items-center gap-3 text-muted-foreground">
                <span aria-hidden="true" className="h-px w-8 bg-accent" />
                Treatments
              </span>
              <h2 className="display mt-6 text-3xl text-balance sm:text-4xl lg:text-[2.75rem]">
                Where most guests begin.
              </h2>
            </div>
            <Link
              href="/services"
              className={cn(
                buttonVariants({ variant: "link", size: "sm" }),
                "h-auto shrink-0 self-start px-0 md:self-end",
              )}
            >
              View all treatments
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, index) => (
            <Reveal as="li" index={index} key={service.slug}>
              <ServiceCard service={service} number={index + 1} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
