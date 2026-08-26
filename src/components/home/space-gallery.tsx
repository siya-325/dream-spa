import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Reveal } from "@/components/ui/reveal"

export function SpaceGallery() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="shell">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
          {/* Left Column: Image with floating tag overlay */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative overflow-hidden rounded-sm group">
                <Image
                  src="/images/space-gallery-preview.jpg"
                  alt="Warm light and quiet atmosphere inside Dream Spa"
                  width={1200}
                  height={750}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  priority={false}
                />
                <div className="absolute bottom-6 left-6 z-10 border border-border/40 bg-background/90 px-4 py-2.5 backdrop-blur-md shadow-sm sm:bottom-8 sm:left-8">
                  <span className="eyebrow text-[0.6875rem] font-medium tracking-[0.14em] text-foreground uppercase">
                    A moment, made yours
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Editorial Copy & CTA */}
          <div className="flex flex-col justify-between self-stretch lg:col-span-5 lg:py-2">
            <div className="hidden w-full border-t border-border/60 lg:block" />

            <div className="my-auto py-6">
              <Reveal>
                <span className="eyebrow mb-4 block text-xs tracking-widest text-muted-foreground uppercase">
                  The Space
                </span>
                <h2 className="display text-balance text-3xl sm:text-4xl lg:text-[2.65rem] lg:leading-[1.18]">
                  Warm light.
                  <br />
                  Unhurried hands.
                </h2>
                <div className="mt-10 sm:mt-12">
                  <Link
                    href="/gallery"
                    className="group inline-flex items-center gap-2.5 border-b border-foreground pb-1 text-xs font-semibold tracking-[0.12em] text-foreground uppercase transition-colors hover:border-accent hover:text-accent"
                  >
                    <span>Step inside</span>
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
