import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Reveal } from "@/components/ui/reveal"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const principles = [
  {
    title: "We ask before we begin",
    body: "Pressure, oil and focus areas are decided in conversation — every single visit, not just the first one.",
  },
  {
    title: "Trained therapists only",
    body: "Our team is trained in classical massage technique and traditional ayurvedic therapy, and works to a consistent standard.",
  },
  {
    title: "Private, clean rooms",
    body: "Fresh linen for every guest, individual rooms and a door that stays closed for the length of your session.",
  },
]

export function Intro() {
  return (
    <section className="bg-sand py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-col gap-14 lg:flex-row lg:gap-20">
          <Reveal className="lg:w-[40%]">
            <figure className="relative aspect-3/4 overflow-hidden bg-sand-deep">
              <Image
                src="/images/about-reception.png"
                alt="The Dream Spa reception area with warm oak furniture and dried flowers"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </figure>
          </Reveal>

          <div className="flex flex-col lg:w-[60%] lg:pt-6">
            <Reveal>
              <span className="eyebrow flex items-center gap-3 text-muted-foreground">
                <span aria-hidden="true" className="h-px w-8 bg-accent" />
                Our approach
              </span>
              <h2 className="display mt-6 text-3xl text-balance sm:text-4xl lg:text-[2.75rem]">
                A spa built around the person on the table.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">
                Most spas hand you a laminated list and hope you pick something.
                We would rather understand what your body has been through this
                week — then choose the treatment together.
              </p>
            </Reveal>

            <ul className="mt-12 flex flex-col">
              {principles.map((item, index) => (
                <Reveal as="li" index={index} key={item.title}>
                  <div className="flex flex-col gap-3 border-t border-clay py-7 sm:flex-row sm:gap-10">
                    <span className="eyebrow shrink-0 pt-1 text-accent sm:w-16">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-2">
                      <h3 className="display text-xl">{item.title}</h3>
                      <p className="max-w-lg text-sm leading-relaxed text-pretty text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal index={3}>
              <Link
                href="/about"
                className={cn(
                  buttonVariants({ variant: "link", size: "sm" }),
                  "mt-8 h-auto self-start px-0",
                )}
              >
                More about Dream Spa
                <ArrowRight aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
