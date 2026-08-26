import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import type { Service } from "@/types"
import { cn } from "@/lib/utils"

type ServiceCardProps = {
  service: Service
  /** Displays a two-digit index in the corner of the image. */
  number?: number
  className?: string
  priority?: boolean
}

export function ServiceCard({
  service,
  number,
  className,
  priority = false,
}: ServiceCardProps) {
  return (
    <article className={cn("group flex flex-col", className)}>
      <Link href={`/services/${service.slug}`} className="flex flex-col">
        <div className="relative aspect-4/5 overflow-hidden bg-sand-deep">
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {number !== undefined && (
            <span className="absolute top-4 left-4 flex size-8 items-center justify-center bg-background/90 text-[0.625rem] tracking-[0.1em] text-muted-foreground">
              {String(number).padStart(2, "0")}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col pt-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="display text-xl text-foreground sm:text-2xl">
              {service.name}
            </h3>
            <ArrowUpRight
              className="mt-1 size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              aria-hidden="true"
            />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-foreground">
            {service.summary}
          </p>
          <p className="eyebrow mt-5 text-muted-foreground/80">
            {service.duration}
          </p>
        </div>
      </Link>
    </article>
  )
}
