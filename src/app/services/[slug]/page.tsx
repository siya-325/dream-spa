import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, Check, MessageCircle, Phone } from "lucide-react"

import { ServiceCard } from "@/components/services/service-card"
import { CtaBand } from "@/components/shared/cta-band"
import { buttonVariants } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import { SectionHeading } from "@/components/ui/section-heading"
import {
  getCategory,
  getService,
  relatedServices,
  services,
} from "@/data/services"
import { site } from "@/data/site"
import { cn } from "@/lib/utils"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)

  if (!service) return { title: "Treatment not found" }

  return {
    title: service.name,
    description: service.summary,
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const service = getService(slug)

  if (!service) notFound()

  const category = getCategory(service.category)
  const related = relatedServices(service)

  return (
    <>
      <div className="shell pt-24 sm:pt-28 lg:pt-32">
        <Link
          href="/services"
          className="eyebrow inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          All treatments
        </Link>
      </div>

      <section className="pt-10 pb-20 lg:pt-14 lg:pb-28">
        <div className="shell flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:w-[46%]">
            <span className="eyebrow flex items-center gap-3 text-muted-foreground">
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              {category.name}
            </span>
            <h1 className="display mt-6 text-4xl text-balance sm:text-5xl lg:text-[3.25rem]">
              {service.name}
            </h1>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-pretty text-muted-foreground">
              {service.summary}
            </p>

            <dl className="mt-10 flex gap-12 border-y border-border py-6">
              <div>
                <dt className="eyebrow text-muted-foreground">Session</dt>
                <dd className="display mt-3 text-xl">{service.duration}</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Booking</dt>
                <dd className="display mt-3 text-xl">By appointment</dd>
              </div>
            </dl>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={site.phone.href}
                className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
              >
                <Phone aria-hidden="true" />
                {site.phone.display}
              </a>
              <a
                href={site.phone.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                <MessageCircle aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="flex flex-col lg:w-[54%]">
            <figure className="relative aspect-4/5 overflow-hidden bg-sand-deep sm:aspect-3/2">
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-cover"
              />
            </figure>

            <div className="mt-10 flex flex-col gap-6 text-base leading-relaxed text-pretty text-muted-foreground">
              {service.description.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 border-t border-border-strong pt-8">
              <h2 className="eyebrow text-foreground">What it helps with</h2>
              <ul className="mt-6 flex flex-col gap-4">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-pretty text-muted-foreground">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="What to expect"
            title="How the session runs, start to finish."
          />
          <div className="relative mt-12 px-4 sm:px-8">
            {/* Connecting line at vertical middle with a dot at the start */}
            <div
              aria-hidden="true"
              className="hidden sm:block absolute top-1/2 inset-x-0 -translate-y-1/2 h-px bg-accent z-0"
            >
              <span className="absolute top-1/2 left-0 -translate-y-1/2 size-2.5 rounded-full bg-accent z-20" />
            </div>

            <ol className="relative z-10 grid gap-6 sm:grid-cols-3 lg:gap-8">
              {service.expect.map((step, index) => (
                <Reveal as="li" key={step.title} index={index}>
                  <div className="flex flex-col h-full rounded-2xl bg-sand p-8 sm:p-10">
                    <span className="eyebrow text-xs font-semibold uppercase tracking-widest text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="display mt-4 font-serif text-2xl font-medium text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="You may also like"
            title="Other treatments guests pair with this."
          />
          <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal as="li" key={item.slug} index={index}>
                <ServiceCard service={item} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        eyebrow="Reserve a Session"
        title={`Book your ${service.name}.`}
        description="Call or WhatsApp us to confirm your preferred therapist, treatment and arrival time."
      />
    </>
  )
}
