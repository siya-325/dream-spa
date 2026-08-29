import Image from "next/image"
import { Maximize2 } from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"
import { Reveal } from "@/components/ui/reveal"
import { galleryCategories, type GalleryItem } from "@/data/gallery"
import { cn } from "@/lib/utils"

type GalleryHeroProps = {
  activeCategory: string
  onSelectCategory: (id: string) => void
  filteredCount: number
  onSelectFeaturedImage: (item: GalleryItem) => void
  featuredItem: GalleryItem
}

export function GalleryHero({
  activeCategory,
  onSelectCategory,
  filteredCount,
  onSelectFeaturedImage,
  featuredItem,
}: GalleryHeroProps) {
  return (
    <section className="relative w-full border-b border-border bg-sand/40">
      <PageHeader
        eyebrow="Spaces & Moments"
        title="A quiet refuge, captured in light and shadow."
        description="Take a look inside our Gurukul spa. From our private treatment rooms and warm linen suites to our serene jacuzzi and tranquil reception."
        className="border-b-0"
      />

      {/* Featured Hero Banner */}
      <div className="shell py-6 sm:py-8 lg:py-12">
        <Reveal>
          <div className="group relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden rounded-2xl border border-clay/40 bg-sand-deep shadow-lg">
            <Image
              src={featuredItem.image}
              alt={featuredItem.title}
              fill
              priority
              sizes="100vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8 lg:inset-x-10 lg:bottom-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
              <div className="max-w-xl">
                <span className="eyebrow inline-flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-widest text-white/80">
                  <span className="size-1.5 rounded-full bg-accent" />
                  Featured Space — Room 01
                </span>
                <h2 className="display mt-1.5 sm:mt-2 font-serif text-xl sm:text-3xl lg:text-4xl text-white">
                  Blackout linen, warm oak &amp; acoustic quiet.
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onSelectFeaturedImage(featuredItem)}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-foreground backdrop-blur-md transition-all hover:scale-105 hover:bg-white self-start sm:self-auto sm:px-5 sm:py-2.5"
              >
                <Maximize2 className="size-3.5" />
                View Full Space
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Category Filter Bar */}
      <div className="shell pb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <h3 className="eyebrow text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Showing {filteredCount} Spaces &amp; Details
          </h3>
          <div className="flex flex-wrap gap-2">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={cn(
                  "rounded-none px-3.5 py-1.5 text-xs font-medium transition-colors",
                  activeCategory === cat.id
                    ? "bg-accent font-semibold text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
