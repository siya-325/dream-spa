import Link from "next/link"
import { MessageCircle, Phone } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import { site } from "@/data/site"
import { cn } from "@/lib/utils"

type CtaBandProps = {
  eyebrow?: string
  title?: string
  description?: string
}

export function CtaBand({
  eyebrow = "Book a visit",
  title = "Your hour is waiting.",
  description = "Call or message us with a time that suits you. We will confirm the therapist and the treatment together.",
}: CtaBandProps) {
  return (
    <section className="py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <div className="grain flex flex-col gap-10 border border-clay bg-sand p-10 sm:p-14 lg:flex-row lg:items-end lg:justify-between lg:p-20">
            <div className="max-w-lg">
              <span className="eyebrow flex items-center gap-3 text-muted-foreground">
                <span aria-hidden="true" className="h-px w-8 bg-accent" />
                {eyebrow}
              </span>
              <h2 className="display mt-6 text-3xl text-balance sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-pretty text-muted-foreground">
                {description}
              </p>
            </div>

            <div className="grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-col">
              <a
                href={site.phone.href}
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                  "sm:col-span-1",
                )}
              >
                <Phone aria-hidden="true" />
                {site.phone.display}
              </a>
              <a
                href={site.phone.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "sm:col-span-1",
                )}
              >
                <MessageCircle aria-hidden="true" />
                Message on WhatsApp
              </a>
              <div className="flex justify-start sm:col-span-2 sm:justify-center lg:justify-start">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "link", size: "sm" }),
                    "h-auto px-0 lg:mt-1",
                  )}
                >
                  Directions &amp; opening hours
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
