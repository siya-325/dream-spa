import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { site, yearsOfCare } from "@/data/site"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-6 pb-20 lg:pt-10 lg:pb-28">
      <div className="shell">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:gap-16">
          <div className="flex flex-col lg:w-[46%] lg:pb-6">
            <span className="eyebrow flex items-center gap-3 text-muted-foreground">
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              Gurukul, Ahmedabad
            </span>

            <h1 className="display mt-7 text-[2.75rem] text-balance sm:text-6xl lg:text-[4.25rem]">
              An hour that belongs entirely to you.
            </h1>

            <p className="mt-7 max-w-md text-base leading-relaxed text-pretty text-muted-foreground">
              Dream Spa is a small beauty and wellness spa in Gurukul. Every
              session begins with a conversation, not a menu — so the pressure,
              the oil and the pace are set by you.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
              >
                Book a session
              </Link>
              <a
                href={site.phone.href}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                <Phone aria-hidden="true" />
                {site.phone.display}
              </a>
            </div>

            <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-border pt-8">
              <div>
                <dt className="eyebrow text-muted-foreground">Since</dt>
                <dd className="display mt-2 text-2xl">{site.established}</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Years of care</dt>
                <dd className="display mt-2 text-2xl">{yearsOfCare}+</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Open daily</dt>
                <dd className="display mt-2 text-2xl">10 – 9</dd>
              </div>
            </dl>
          </div>

          <figure className="relative lg:w-[54%]">
            <div className="relative aspect-4/5 overflow-hidden bg-sand-deep sm:aspect-3/2 lg:aspect-4/5">
              <Image
                src="/images/hero-treatment-room.png"
                alt="A calm Dream Spa treatment room with warm daylight and a linen-dressed massage bed"
                fill
                priority
                sizes="(min-width: 1024px) 54vw, 100vw"
                className="object-cover"
              />
            </div>

            <figcaption className="absolute bottom-0 left-0 flex max-w-[19rem] flex-col gap-2 bg-background p-6 sm:p-7">
              <span className="eyebrow flex items-center gap-2 text-accent">
                <MapPin className="size-3.5" aria-hidden="true" />
                Find us
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {site.address.line1}, {site.address.line2},{" "}
                {site.address.area} — {site.address.pincode}
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
