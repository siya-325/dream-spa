import { Clock, MapPin, Navigation } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import { site } from "@/data/site"
import { cn } from "@/lib/utils"

type LocationPanelProps = {
  /** Hides the section wrapper padding when embedded in another section. */
  bare?: boolean
}

export function LocationPanel({ bare = false }: LocationPanelProps) {
  const content = (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-16">
      <div className="flex flex-col lg:w-[38%]">
        <span className="eyebrow flex items-center gap-3 text-muted-foreground">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          Visit us
        </span>
        <h2 className="display mt-6 text-3xl text-balance sm:text-4xl">
          Gurukul, Ahmedabad
        </h2>

        <div className="mt-10 flex flex-col gap-8 border-t border-border pt-8">
          <div className="flex gap-4">
            <MapPin
              className="mt-0.5 size-4 shrink-0 text-accent"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-1">
              <span className="eyebrow text-muted-foreground">Address</span>
              <address className="text-sm leading-relaxed text-foreground not-italic">
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.area}, {site.address.city}
                <br />
                {site.address.state} {site.address.pincode}
              </address>
            </div>
          </div>

          <div className="flex gap-4">
            <Clock
              className="mt-0.5 size-4 shrink-0 text-accent"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-1">
              <span className="eyebrow text-muted-foreground">Hours</span>
              <ul className="flex flex-col gap-1 text-sm leading-relaxed text-foreground">
                {site.hours.map((entry) => (
                  <li key={entry.days} className="flex flex-wrap gap-x-2">
                    <span>{entry.days}</span>
                    <span className="text-muted-foreground">{entry.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {site.hoursNote}
              </p>
            </div>
          </div>
        </div>

        <a
          href={site.maps.directions}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "mt-10 self-start",
          )}
        >
          <Navigation aria-hidden="true" />
          Get directions
        </a>
      </div>

      <div className="relative min-h-[20rem] flex-1 overflow-hidden border border-clay bg-sand-deep lg:min-h-[26rem]">
        <iframe
          title={`Map showing the location of ${site.name} in ${site.address.area}, ${site.address.city}`}
          src={site.maps.embed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 size-full grayscale-[0.35]"
        />
      </div>
    </div>
  )

  if (bare) return content

  return (
    <section className="py-20 lg:py-28">
      <div className="shell">
        <Reveal>{content}</Reveal>
      </div>
    </section>
  )
}
