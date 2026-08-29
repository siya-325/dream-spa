import Image from "next/image"
import Link from "next/link"
import { ArrowRight, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react"

import { Reveal } from "@/components/ui/reveal"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const principles = [
  {
    icon: HeartHandshake,
    title: "Personalised Consultation",
    body: "Pressure, oil blend, and focus areas are decided in conversation — every single visit, not just your first.",
  },
  {
    icon: ShieldCheck,
    title: "Trained Therapists",
    body: "Our team is trained in classical massage techniques and traditional ayurvedic therapies to ensure consistent excellence.",
  },
  {
    icon: Sparkles,
    title: "Private & Clean Suites",
    body: "Fresh linen for every guest, private sanitized suites, and complete quiet for the full duration of your treatment.",
  },
]

export function Intro() {
  return (
    <section className="bg-sand py-20 lg:py-28">
      <div className="shell flex flex-col gap-16 lg:gap-20">
        {/* Top Row: Image on Left, Heading & Expanded Description on Right */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Image Left */}
          <Reveal className="lg:w-1/2">
            <figure className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl border border-clay/40 bg-sand-deep shadow-md">
              <Image
                src="/images/about-reception.png"
                alt="The Dream Spa reception area with warm oak furniture and dried flowers"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </figure>
          </Reveal>

          {/* Heading & Description Right */}
          <div className="flex flex-col lg:w-1/2">
            <Reveal>
              <span className="eyebrow flex items-center gap-3 text-muted-foreground">
                <span aria-hidden="true" className="h-px w-8 bg-accent" />
                Our approach
              </span>
              <h2 className="display mt-6 text-3xl text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                A spa built around the person on the table.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-pretty text-muted-foreground">
                Most spas hand you a laminated menu and hope you pick something.
                We would rather understand what your body has been through this
                week — whether it is muscle stiffness from long work hours, post-workout fatigue, or daily stress.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-pretty text-muted-foreground">
                Every single treatment begins with a brief personal consultation.
                The pressure, choice of essential oil blend, and exact target zones are set by you before we begin.
              </p>
              <div className="mt-8">
                <Link
                  href="/about"
                  className={cn(
                    buttonVariants({ variant: "link", size: "sm" }),
                    "h-auto px-0 font-semibold text-accent hover:text-accent/80",
                  )}
                >
                  More about Dream Spa
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom Row: 3 Principles in 3 Columns */}
        <div className="pt-6 lg:pt-10">
          <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-3 sm:gap-8 lg:gap-12">
            {principles.map((item, index) => {
              const Icon = item.icon
              return (
                <Reveal index={index} key={item.title}>
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-5 flex size-16 items-center justify-center rounded-full border border-clay/60 bg-background text-accent shadow-xs">
                      <Icon className="size-7" />
                    </div>
                    <h3 className="display font-serif text-xl font-medium text-foreground sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
