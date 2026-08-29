import Image from "next/image"
import Link from "next/link"
import { Phone } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { site } from "@/data/site"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center bg-sand-deep">
      {/* Background Image */}
      <Image
        src="/images/hero-neck-massage-closeup.jpg"
        alt="Close-up of a relaxing neck and back massage session at Dream Spa"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Left Side Content Overlay */}
      <div className="shell relative z-10 w-full pt-20 lg:pt-24">
        <div className="max-w-xl">
          <span className="eyebrow flex items-center gap-3 text-white/80">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            GURUKUL, AHMEDABAD
          </span>

          <h1 className="display mt-6 text-4xl text-balance sm:text-5xl lg:text-6xl font-serif text-white leading-[1.15] drop-shadow-sm">
            An hour that belongs entirely to you.
          </h1>

          <p className="mt-6 text-base leading-relaxed text-pretty text-white/85 drop-shadow-sm">
            Dream Spa is a small beauty and wellness spa in Gurukul. Every
            session begins with a conversation, not a menu — so the pressure,
            the oil and the pace are set by you.
          </p>

          <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "rounded-none h-12 px-7 text-sm font-medium",
              )}
            >
              Book a session
            </Link>
            <a
              href={site.phone.href}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-none bg-white text-foreground hover:bg-white/90 border-border-strong h-12 px-7 text-sm font-medium",
              )}
            >
              <Phone className="size-4" aria-hidden="true" />
              {site.phone.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
